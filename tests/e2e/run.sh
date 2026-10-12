#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../.."

scratch=$(mktemp -d "${TMPDIR:-/tmp}/antonve-e2e.XXXXXX")
site_container=
error_container=
cleanup() {
  for container in "$site_container" "$error_container"; do
    if [ -n "$container" ]; then
      docker rm --force "$container" >/dev/null
    fi
  done
  rm -rf "$scratch"
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

site_image=${SITE_IMAGE:-antonve-site:e2e-$(basename "$scratch")}
if [ -z "${SITE_IMAGE:-}" ]; then
  docker build --tag "$site_image" .
fi
# Own fresh containers on Docker-assigned ports, so another checkout cannot be reused.
site_container=$(docker run --detach --publish 127.0.0.1::3000 "$site_image")
test "$(docker exec "$site_container" id -u)" -ne 0
docker exec "$site_container" nginx -t
export E2E_BASE_URL="http://$(docker port "$site_container" 3000/tcp)"
curl --fail --silent --show-error --retry 30 --retry-all-errors --retry-delay 1 --output /dev/null "$E2E_BASE_URL/"

# Exercise the release image's error_page rules without exposing test routes in production.
docker cp "$site_container:/etc/nginx/conf.d/default.conf" "$scratch/production.conf"
awk 'FNR == NR { fixture = fixture $0 ORS; next }
  /^    location = \/ \{/ { printf "%s", fixture }
  { print }' tests/e2e/nginx-errors.conf "$scratch/production.conf" > "$scratch/nginx.conf"
error_container=$(docker run --detach --publish 127.0.0.1::3000 \
  --volume "$scratch/nginx.conf:/etc/nginx/conf.d/default.conf:ro" "$site_image")
export E2E_ERROR_BASE_URL="http://$(docker port "$error_container" 3000/tcp)"
curl --fail --silent --show-error --retry 30 --retry-all-errors --retry-delay 1 --output /dev/null "$E2E_ERROR_BASE_URL/"

playwright_version=$(node -p "require('./package.json').devDependencies['@playwright/test']")
result=0
docker run --rm --ipc=host --network host --user "$(id -u):$(id -g)" --env HOME=/tmp --env CI \
  --env E2E_BASE_URL --env E2E_ERROR_BASE_URL \
  --volume "$PWD:/work" --workdir /work \
  "mcr.microsoft.com/playwright:v${playwright_version}-noble" \
  bash -c 'corepack pnpm exec playwright test "$@"' bash "$@" || result=$?

mkdir -p test-results
docker cp "$site_container:/srv/www" "$scratch/dist"
image_id=$(docker image inspect "$site_image" --format '{{.Id}}')
node --input-type=module - "$scratch/dist" "$image_id" "$(git rev-parse HEAD)" <<'JS' > test-results/runtime.json
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const files = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
  const path = join(dir, entry.name);
  return entry.isDirectory() ? files(path) : [path];
});
const paths = files(process.argv[2]);
console.log(JSON.stringify({
  revision: process.argv[4],
  imageId: process.argv[3],
  files: paths.length,
  bytes: paths.reduce((sum, path) => sum + statSync(path).size, 0),
}, null, 2));
JS
cat test-results/runtime.json
exit "$result"
