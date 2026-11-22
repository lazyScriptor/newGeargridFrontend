#!/usr/bin/env node
// Checks the built site (dist/) for the basics every page needs to rank and to
// preview well when shared. Run after `npm run build`. Exits 1 on any problem.

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = join(fileURLToPath(new URL('..', import.meta.url)), 'dist')
const ORIGIN = 'https://geargrid.live'
const problems = []
const fail = (file, msg) => problems.push(`${file}: ${msg}`)

const htmlFiles = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) return name === 'assets' ? [] : htmlFiles(p)
    return name.endsWith('.html') ? [p] : []
  })

const urlFor = (file) => {
  const rel = relative(dist, file).replace(/\\/g, '/')
  if (rel === 'index.html') return `${ORIGIN}/`
  if (rel.endsWith('/index.html')) return `${ORIGIN}/${rel.slice(0, -'index.html'.length)}`
  return `${ORIGIN}/${rel.slice(0, -'.html'.length)}`
}

const attr = (html, re) => html.match(re)?.[1]?.replace(/&amp;/g, '&').replace(/&quot;/g, '"')
const decode = (s) => s?.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')

const titles = new Map()
const descriptions = new Map()
const pages = htmlFiles(dist)
const report = []

for (const file of pages) {
  const name = relative(dist, file)
  const html = readFileSync(file, 'utf8')
  const is404 = name === '404.html'

  const h1s = html.match(/<h1[\s>]/g)?.length ?? 0
  if (h1s !== 1) fail(name, `has ${h1s} <h1> (needs exactly 1)`)

  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1])
  if (!title) fail(name, 'no <title>')
  else if (title.length > 65) fail(name, `title is ${title.length} chars (max 65): ${title}`)

  const desc = attr(html, /<meta name="description" content="([^"]*)"/)
  if (!desc) fail(name, 'no meta description')
  else if (desc.length < 50 || desc.length > 170) fail(name, `description is ${desc.length} chars (50–170)`)

  if (!/<div id="root">\s*<[a-z]/.test(html)) fail(name, 'not prerendered (#root is empty)')
  if (html.includes('<!--app-')) fail(name, 'placeholder left in the HTML')

  for (const block of html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g) ?? []) {
    try {
      JSON.parse(block.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, ''))
    } catch (e) {
      fail(name, `JSON-LD does not parse: ${e.message}`)
    }
  }

  if (is404) {
    if (!html.includes('<meta name="robots" content="noindex"')) fail(name, '404 page is not noindex')
    continue
  }

  if (title) titles.set(title, [...(titles.get(title) ?? []), name])
  if (desc) descriptions.set(desc, [...(descriptions.get(desc) ?? []), name])

  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/)
  if (canonical !== urlFor(file)) fail(name, `canonical ${canonical} should be ${urlFor(file)}`)
  for (const prop of ['og:title', 'og:description', 'og:url', 'og:image']) {
    if (!html.includes(`property="${prop}"`)) fail(name, `missing ${prop}`)
  }
  if (!html.includes('application/ld+json')) fail(name, 'no JSON-LD')
  if (/#1(?![\w])|number one|no\. ?1\b/i.test(html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/href="[^"]*"/g, ''))) {
    fail(name, 'contains a "#1"-style claim')
  }
  report.push(`${urlFor(file).padEnd(62)} ${String(title?.length).padStart(3)}t ${String(desc?.length).padStart(3)}d  ${title}`)
}

for (const [t, files] of titles) if (files.length > 1) fail(files.join(', '), `share the title "${t}"`)
for (const [, files] of descriptions) if (files.length > 1) fail(files.join(', '), 'share the same description')

// Sitemap and files agree both ways.
const sitemapPath = join(dist, 'sitemap.xml')
if (!existsSync(sitemapPath)) fail('sitemap.xml', 'missing')
else {
  const locs = [...readFileSync(sitemapPath, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  const served = new Set(pages.filter((f) => !f.endsWith('404.html')).map(urlFor))
  for (const loc of locs) if (!served.has(loc)) fail('sitemap.xml', `${loc} has no page`)
  for (const url of served) if (!locs.includes(url)) fail('sitemap.xml', `${url} is missing`)
}
if (!existsSync(join(dist, '404.html'))) fail('404.html', 'missing')

console.log(report.join('\n'))
if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n  ${problems.join('\n  ')}`)
  process.exit(1)
}
console.log(`\nSEO check passed: ${pages.length} HTML files.`)
