import { defineConfig } from 'astro/config'

export default defineConfig({
  // Emit projects.html rather than projects/index.html so the static server can
  // keep the extensionless, no-trailing-slash URLs that Next.js served.
  build: { format: 'file' },
  trailingSlash: 'never',
  server: { allowedHosts: ['.lab'] },
  // Keep every font subset as a separate, cacheable file instead of inlining
  // the small ones into the stylesheet.
  vite: { build: { assetsInlineLimit: 0 } },
})
