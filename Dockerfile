# Builder image
FROM docker.io/node:20-alpine AS build

ARG PROJECT_NAME

WORKDIR /app

# Set up pnpm
RUN npm install -g pnpm && pnpm config set store-dir .pnpm-store
COPY pnpm-lock.yaml .npmrc* ./
RUN pnpm fetch

# Build
COPY . .
RUN pnpm install --frozen-lockfile --offline --ignore-scripts
RUN pnpm run build
RUN pnpm install --prod --frozen-lockfile --offline --shamefully-hoist

# Runtime image
FROM docker.io/node:20-alpine AS release

ARG PROJECT_NAME

ENV PORT=3000

WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static* ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public* ./public

# WORKAROUND FOR: https://github.com/vercel/next.js/discussions/39432
RUN rm -rf ./node_modules
COPY --from=build /app/node_modules ./node_modules
# END WORKAROUND

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]