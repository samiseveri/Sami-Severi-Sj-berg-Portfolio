/**
 * Project details page — populate from URL ?id=
 * Layout mirrors hobby-details: description, optional links, and a technologies panel
 * (same style as the AI hobbies tools panel).
 */
import { getProjectById, hasProjectLink } from './projects-data.js'

const LINK_ICONS = {
  github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
  demo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>`,
}

const TECH_ICON_FONT =
  "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"

/** Preferred short labels for stack monograms */
const TECH_LABELS = {
  html: 'HTML',
  css: 'CSS',
  javascript: 'JS',
  svg: 'SVG',
  react: 'REACT',
  node: 'NODE',
  express: 'EXP',
  postgres: 'PG',
  redux: 'REDX',
  typescript: 'TS',
  vite: 'VITE',
  threejs: '3JS',
  raspberrypi: 'RPI',
  tailwind: 'TW',
}

function monogramIcon(label) {
  const text = String(label || '?')
    .replace(/[^a-zA-Z0-9+#.]/g, '')
    .slice(0, 4)
    .toUpperCase()
  const size = text.length >= 4 ? 8 : text.length === 3 ? 9.5 : 12

  return `<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect width="32" height="32" rx="8" fill="currentColor" opacity="0.14"/><text x="16" y="20.8" text-anchor="middle" font-family="${TECH_ICON_FONT}" font-size="${size}" font-weight="800" letter-spacing="0.04em" fill="currentColor">${text}</text></svg>`
}

function getTechIcon(tool) {
  const label = TECH_LABELS[tool.id] || tool.iconLabel || tool.name
  return monogramIcon(label)
}

function collectProjectLinks(project) {
  const links = []

  if (hasProjectLink(project.demo)) {
    links.push({
      type: 'demo',
      href: project.demo,
      label: project.demoLabel || 'Live Demo',
    })
  }

  if (hasProjectLink(project.github)) {
    links.push({
      type: 'github',
      href: project.github,
      label: project.githubLabel || 'View on GitHub',
    })
  }

  return links
}

function renderProjectLinks(links) {
  if (!links.length) {
    return `<p class="project-detail__unavailable" role="status">Project links are not available yet.</p>`
  }

  return `
    <div class="project-detail__links">
      ${links
        .map(
          (link) => `
        <a
          href="${link.href}"
          class="project-detail__link project-detail__link--${link.type}"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="project-detail__link-icon" aria-hidden="true">${LINK_ICONS[link.type] || ''}</span>
          <span class="project-detail__link-label">${link.label}</span>
        </a>`,
        )
        .join('')}
    </div>
  `
}

function renderTechnologiesPanel(project) {
  const panel = project.technologiesPanel
  if (!panel?.tools?.length) return ''

  return `
    <section class="hobby-tools glass" aria-labelledby="project-tech-title">
      <header class="hobby-tools__header">
        <p class="hobby-tools__eyebrow">Stack</p>
        <h2 id="project-tech-title" class="hobby-tools__title">${panel.title}</h2>
        ${panel.lead ? `<p class="hobby-tools__lead">${panel.lead}</p>` : ''}
      </header>
      <ul class="hobby-tools__list">
        ${panel.tools
          .map(
            (tool) => `
          <li class="hobby-tools__item hobby-tools__item--${tool.id}">
            <span class="hobby-tools__icon" aria-hidden="true">${getTechIcon(tool)}</span>
            <span class="hobby-tools__body">
              <span class="hobby-tools__meta">
                <span class="hobby-tools__name">${tool.name}</span>
                ${tool.badge ? `<span class="hobby-tools__badge">${tool.badge}</span>` : ''}
                <span class="hobby-tools__category">${tool.category}</span>
              </span>
              <span class="hobby-tools__desc">${tool.description}</span>
            </span>
          </li>`,
          )
          .join('')}
      </ul>
    </section>
  `
}

const ProjectDetails = (() => {
  function init() {
    const root = document.querySelector('#project-detail')
    if (!root) return

    const params = new URLSearchParams(window.location.search)
    const id = params.get('id') || 'folio'
    const project = getProjectById(id)

    if (!project) {
      root.innerHTML =
        '<p class="section__subtitle">Project not found. <a href="projects.html">Back to projects</a></p>'
      return
    }

    document.title = `${project.title} — Sami-Severi Sjöberg`

    const links = collectProjectLinks(project)
    const description = project.overview || project.description || ''
    const technologiesPanel = renderTechnologiesPanel(project)

    root.innerHTML = `
      <a href="projects.html" class="project-detail__back reveal">← All Projects</a>
      <div class="project-detail reveal">
        <div class="project-detail__content">
          <span class="section__eyebrow">${project.category}</span>
          <h1 class="project-detail__title">${project.title}</h1>
          <p class="project-detail__overview">${description}</p>
          ${renderProjectLinks(links)}
        </div>
        <aside class="project-detail__media">
          ${
            technologiesPanel ||
            `<p class="project-detail__unavailable" role="status">Technologies will be listed here.</p>`
          }
        </aside>
      </div>
    `

    root.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'))
  }

  return { init }
})()

export default ProjectDetails
