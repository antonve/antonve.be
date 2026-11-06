# Static Astro site

This is a fully static Astro site, not a single-page app. Its only client-side
JavaScript is the small inline theme script in `src/layouts/Layout.astro`, and
every page must still work without it. Do not add `client:*` directives,
bundled or external scripts, an SSR adapter, or view transitions; CI fails if
the build output contains script files or `<script src>` tags. Check the current Astro
documentation before changing framework APIs or configuration.

## Dev server

Keep a dev server running for this checkout whenever you work on it. At the
start of new work, look for an `astro dev` process whose working directory is
this checkout and reuse it if it answers; otherwise start one with
`pnpm dev --host 127.0.0.1 --port <free port>`. On T3 Code VMs, expose it with
`t3-preview start <port>` (`astro.config.mjs` already allows `.lab` hosts).
When your changes are ready, give the user the preview link.
