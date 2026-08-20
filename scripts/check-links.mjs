/**
 * Basic local link checker for static HTML pages.
 * Verifies same-origin href/src paths resolve to files on disk.
 * External http(s) links are reported but not required to succeed offline.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const htmlFiles = fs.readdirSync(root).filter((name) => name.endsWith('.html'))

const attrPattern = /\b(?:href|src)=["']([^"'#]+)["']/gi
const skipProtocols = /^(mailto:|tel:|data:|javascript:)/i

let failures = 0
let checked = 0

function resolveLocal(fromFile, target) {
  const clean = target.split('?')[0].split('#')[0]
  if (!clean || skipProtocols.test(clean) || /^https?:\/\//i.test(clean)) return null
  const baseDir = path.dirname(path.join(root, fromFile))
  return path.normalize(path.join(baseDir, decodeURIComponent(clean)))
}

for (const file of htmlFiles) {
  const content = fs.readFileSync(path.join(root, file), 'utf8')
  let match
  while ((match = attrPattern.exec(content))) {
    const target = match[1]
    checked += 1

    if (/^https?:\/\//i.test(target)) {
      continue
    }

    const resolved = resolveLocal(file, target)
    if (!resolved) continue

    if (!resolved.startsWith(root)) {
      console.error(`[outside-root] ${file} -> ${target}`)
      failures += 1
      continue
    }

    if (!fs.existsSync(resolved)) {
      console.error(`[missing] ${file} -> ${target}`)
      failures += 1
    }
  }
}

console.log(`Checked ${checked} local/external references across ${htmlFiles.length} HTML files.`)
if (failures > 0) {
  console.error(`Found ${failures} broken local link(s).`)
  process.exit(1)
}

console.log('All local links resolved.')
