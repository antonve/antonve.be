import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://antonve.be',
  integrations: [mdx()],
  // Emit projects.html rather than projects/index.html so the static server can
  // keep the extensionless, no-trailing-slash URLs that Next.js served.
  build: { format: 'file' },
  trailingSlash: 'never',
  server: { allowedHosts: ['.lab'] },
  // Keep every font subset as a separate, cacheable file instead of inlining
  // the small ones into the stylesheet.
  vite: {
    plugins: [tailwindcss()],
    build: { assetsInlineLimit: 0 },
  },
})
