# Builder image
FROM docker.io/node:24.22.1-alpine AS build

WORKDIR /app

# Set up pnpm
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm config set store-dir .pnpm-store
RUN pnpm fetch

# Build
COPY . .
RUN pnpm install --frozen-lockfile --offline
RUN pnpm run typecheck && pnpm run build
# Enforce the static site's no-JavaScript contract on the files we actually ship.
RUN test -z "$(find dist -name '*.js' -o -name '*.mjs')" \
    && ! grep -rl '<script' dist

# Runtime image: static files served by nginx as a non-root user (uid 101)
FROM docker.io/nginxinc/nginx-unprivileged:1.31.7-alpine AS release

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /srv/www

EXPOSE 3000
