#!/usr/bin/env node
// Runs after the client and SSR builds. Writes one static HTML file per route in
// src/routes.ts (so every page is readable without JavaScript), dist/404.html,
// and dist/sitemap.xml.
//
// Output files match how Cloudflare static assets serve them with the default
// "auto-trailing-slash" handling, so each canonical URL is served without a redirect:
//   '/'         -> dist/index.html        served at /
//   '/si/'      -> dist/si/index.html     served at /si/
//   '/features' -> dist/features.html     served at /features

import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')

// React's production server renderer (the SSR bundle imports react from node_modules).
process.env.NODE_ENV ??= 'production'
const { render, ROUTES, SITE_ORIGIN } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)
const template = readFileSync(join(dist, 'index.html'), 'utf8')
if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('dist/index.html is missing the <!--app-head--> or <!--app-html--> placeholder')
}

function fileFor(path) {
  if (path === '/') return 'index.html'
  if (path.endsWith('/')) return join(path.slice(1), 'index.html')
  return `${path.slice(1)}.html`
}

function page(path) {
  const { lang, appHtml, headHtml } = render(path)
  return template
    .replace('<html lang="en">', `<html lang="${lang}">`)
    .replace('<!--app-head-->', headHtml)
    .replace('<!--app-html-->', appHtml)
}

const written = []
for (const route of ROUTES) {
  const file = join(dist, fileFor(route.path))
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, page(route.path))
  written.push(`${route.path} -> ${fileFor(route.path)}`)
}
writeFileSync(join(dist, '404.html'), page('/__not-found__'))
written.push('404 -> 404.html')

// Sitemap, with hreflang alternates for pages that exist in more than one language.
const today = new Date().toISOString().slice(0, 10)
const urls = ROUTES.map((r) => {
  const alt = Object.entries(r.alternates ?? {})
    .map(([l, p]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_ORIGIN}${p}" />`)
  if (r.alternates?.en) alt.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}${r.alternates.en}" />`)
  return [
    '  <url>',
    `    <loc>${SITE_ORIGIN}${r.path}</loc>`,
    `    <lastmod>${today}</lastmod>`,
    `    <priority>${r.priority.toFixed(1)}</priority>`,
    ...alt,
    '  </url>',
  ].join('\n')
})
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`,
)
written.push(`sitemap.xml (${ROUTES.length} URLs)`)

rmSync(ssrDir, { recursive: true, force: true })
console.log(`Prerendered:\n  ${written.join('\n  ')}`)
