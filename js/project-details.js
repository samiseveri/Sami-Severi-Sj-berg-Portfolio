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

const TECH_ICONS = {
  html: `<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect width="32" height="32" rx="8" fill="currentColor" opacity="0.14"/><path d="M8.5 6.5h15l-1.4 15.7L16 26.5l-6.1-4.3L8.5 6.5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M12 12.2h8.2l-.2 2.2h-5.6l.15 1.7h5.3l-.35 3.7L16 21.5l-3.45-1.7-.2-2.1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  css: `<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect width="32" height="32" rx="8" fill="currentColor" opacity="0.14"/><path d="M8.5 6.5h15l-1.4 15.7L16 26.5l-6.1-4.3L8.5 6.5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M12.2 12.2h7.8l-.25 2.5H14.3l.15 1.6h5.1l-.45 4.4L16 22l-3.1-1.5-.2-2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  javascript: `<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect width="32" height="32" rx="8" fill="currentColor" opacity="0.14"/><path d="M12.2 22.2c.45.75 1.05 1.3 2.2 1.3 1.2 0 2-.6 2-1.95v-8.35h2.15v8.4c0 2.55-1.5 3.75-4.05 3.75-2.2 0-3.55-1.15-4.2-2.5l1.9-.65Zm7.35-.05c.35.6.85 1.1 1.9 1.1.95 0 1.55-.5 1.55-1.15 0-.8-.6-1.1-1.7-1.55l-.6-.25c-1.7-.7-2.85-1.6-2.85-3.45 0-1.75 1.35-3.1 3.45-3.1 1.5 0 2.55.5 3.3 1.9l-1.8 1.15c-.35-.65-.85-.95-1.5-.95-.7 0-1.15.4-1.15 1 0 .7.45 1 1.5 1.4l.6.25c2 .85 3.1 1.75 3.1 3.7 0 2.1-1.65 3.25-3.85 3.25-2.15 0-3.55-1.05-4.2-2.35l1.85-.95Z" fill="currentColor"/></svg>`,
  svg: `<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect width="32" height="32" rx="8" fill="currentColor" opacity="0.14"/><path d="M9 20.5 16 8.5l7 12H9Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="12.2" cy="14.2" r="1.35" fill="currentColor"/><path d="M8.5 23.5h15" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
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
            <span class="hobby-tools__icon" aria-hidden="true">${TECH_ICONS[tool.id] || ''}</span>
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

function renderFeatures(project) {
  if (!project.features?.length) return ''

  return `
    <div class="project-detail__features glass">
      <h2>Highlights</h2>
      <ul>${project.features.map((item) => `<li>${item}</li>`).join('')}</ul>
    </div>
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
          ${renderFeatures(project)}
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
