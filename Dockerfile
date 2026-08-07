# Builder image
FROM docker.io/node:24.18.0-alpine AS build

WORKDIR /app

# Set up pnpm
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm config set store-dir .pnpm-store
RUN pnpm fetch

# Build
COPY . .
RUN pnpm install --frozen-lockfile --offline
RUN pnpm run build

# Runtime image
FROM docker.io/node:24.18.0-alpine AS release

ENV PORT=3000

WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
