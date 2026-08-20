/**
 * Social links module — renders GitHub, LinkedIn & Instagram from site-data.js
 */
import { SITE } from './site-data.js'

const ICONS = {
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.09.28-2.25 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
}

const SOCIAL_LINKS = [
  { key: 'linkedin', label: 'LinkedIn', href: SITE.linkedin },
  { key: 'github', label: 'GitHub', href: SITE.github },
  { key: 'instagram', label: 'Instagram', href: SITE.instagram },
]

function linkHTML({ key, label, href }, { size, linkClass }) {
  const classes = ['social-link', `social-link--${key}`, linkClass].filter(Boolean).join(' ')
  return `<a href="${href}" class="${classes}" target="_blank" rel="noopener noreferrer" aria-label="${label}">${ICONS[key]}</a>`
}

function init() {
  document.querySelectorAll('[data-social-links]').forEach((container) => {
    const size = container.dataset.iconSize || '18'
    const linkClass = container.dataset.linkClass || ''
    container.style.setProperty('--social-icon-size', `${size}px`)
    container.innerHTML = SOCIAL_LINKS.map((item) =>
      linkHTML(item, { size, linkClass }),
    ).join('')
  })
}

export default { init, SOCIAL_LINKS, SITE }
