/**
 * Social links module — renders GitHub, LinkedIn & Instagram from site-data.js
 */
import { SITE } from './site-data.js'

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: SITE.linkedin, icon: 'assets/icons/linkedin.svg' },
  { label: 'GitHub', href: SITE.github, icon: 'assets/icons/github.svg' },
  { label: 'Instagram', href: SITE.instagram, icon: 'assets/icons/instagram.svg' },
]

function linkHTML({ label, href, icon }, { size, linkClass }) {
  const cls = linkClass ? ` class="${linkClass}"` : ''
  return `<a href="${href}"${cls} target="_blank" rel="noopener noreferrer" aria-label="${label}"><img src="${icon}" alt="" width="${size}" height="${size}" /></a>`
}

function init() {
  document.querySelectorAll('[data-social-links]').forEach((container) => {
    const size = container.dataset.iconSize || '18'
    const linkClass = container.dataset.linkClass || ''
    container.innerHTML = SOCIAL_LINKS.map((item) =>
      linkHTML(item, { size, linkClass }),
    ).join('')
  })
}

export default { init, SOCIAL_LINKS, SITE }
