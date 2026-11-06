import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://antonve.be',
  integrations: [mdx()],
  // Highlight code for both schemes; globals.css swaps to the dark one.
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light-default', dark: 'github-dark-default' },
      // On the site's warm code background two light-theme colours dip under
      // WCAG AA; swap them for darker shades from the same GitHub palette.
      transformers: [
        {
          span(node) {
            const style = node.properties.style
            if (typeof style === 'string') {
              node.properties.style = style.replace(/^color:#(6E7781|8250DF)/i, (_, hex) =>
                hex.toUpperCase() === '6E7781' ? 'color:#57606A' : 'color:#6639BA',
              )
            }
          },
        },
      ],
    },
  },
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
