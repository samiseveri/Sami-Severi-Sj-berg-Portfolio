/**
 * Live crawl: fetch every page under /pages and verify same-origin links.
 */
import http from 'node:http'

const origin = process.env.SITE_ORIGIN || 'http://127.0.0.1:5500'
const startPaths = [
  '/',
  '/pages/index.html',
  '/pages/about.html',
  '/pages/experience.html',
  '/pages/projects.html',
  '/pages/project-details.html?id=bittera-signage#bittera-signage',
  '/pages/skills.html',
  '/pages/education.html',
  '/pages/hobbies.html',
  '/pages/hobby-details.html?id=gaming#gaming',
  '/pages/contact.html',
  '/about',
  '/about.html',
  '/contact',
  '/404.html',
]

const skip = /^(mailto:|tel:|data:|javascript:|https?:)/i
const seen = new Set()
const queue = [...startPaths]
const failures = []
const ok = []

function fetchUrl(url) {
  return new Promise((resolve) => {
    const req = http.get(url, { headers: { Accept: 'text/html,*/*' } }, (res) => {
      const chunks = []
      res.on('data', (c) => chunks.push(c))
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: Buffer.concat(chunks).toString('utf8'),
        })
      })
    })
    req.on('error', (err) => resolve({ status: 0, error: err.message, body: '', headers: {} }))
  })
}

function absUrl(from, href) {
  try {
    return new URL(href, from).href
  } catch {
    return null
  }
}

while (queue.length) {
  const path = queue.shift()
  if (seen.has(path)) continue
  seen.add(path)

  const url = path.startsWith('http') ? path : `${origin}${path}`
  const res = await fetchUrl(url)
  const loc = res.headers.location
  const finalUrl = loc ? absUrl(url, loc) : url

  if (res.status >= 300 && res.status < 400 && loc) {
    const nextPath = new URL(finalUrl).pathname + new URL(finalUrl).search + new URL(finalUrl).hash
    if (!seen.has(nextPath) && new URL(finalUrl).origin === new URL(origin).origin) {
      queue.push(nextPath)
    }
    ok.push(`${res.status} ${path} -> ${loc}`)
    continue
  }

  if (res.status !== 200) {
    failures.push(`${res.status || 'ERR'} ${path}${res.error ? ` (${res.error})` : ''}`)
    continue
  }

  ok.push(`200 ${path}`)

  if (!/text\/html/i.test(res.headers['content-type'] || '')) continue

  const hrefs = [...res.body.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)].map((m) => m[1])
  for (const href of hrefs) {
    if (!href || href.startsWith('#') || skip.test(href)) continue
    const absolute = absUrl(finalUrl || url, href)
    if (!absolute) continue
    const u = new URL(absolute)
    if (u.origin !== new URL(origin).origin) continue
    // Only enqueue HTML navigations and known static assets checks as HEAD-ish GET
    const next = u.pathname + u.search
    if (seen.has(next)) continue
    // Crawl HTML pages; also verify assets once
    if (
      next.includes('/pages/') ||
      next.endsWith('.html') ||
      next.endsWith('/') ||
      next.startsWith('/css/') ||
      next.startsWith('/js/') ||
      next.startsWith('/assets/')
    ) {
      queue.push(next)
    }
  }
}

console.log(`Checked ${seen.size} URLs`)
for (const line of ok) console.log(`  OK  ${line}`)
if (failures.length) {
  console.error(`\n${failures.length} failure(s):`)
  for (const line of failures) console.error(`  FAIL ${line}`)
  process.exit(1)
}
console.log('\nAll crawled URLs OK.')
