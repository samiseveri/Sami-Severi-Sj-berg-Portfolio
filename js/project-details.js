/**
 * Project details page — populate from URL ?id= / #id
 */
import { getProjectById, getProjectStatusLabel, hasProjectLink } from './projects-data.js'

const ProjectDetails = (() => {
  function renderActions(project) {
    const actions = []

    if (hasProjectLink(project.demo)) {
      actions.push(
        `<a href="${project.demo}" class="btn btn--primary" target="_blank" rel="noopener noreferrer" data-ripple>Live Demo</a>`,
      )
    }

    if (hasProjectLink(project.github)) {
      actions.push(
        `<a href="${project.github}" class="btn btn--ghost" target="_blank" rel="noopener noreferrer" data-ripple>View on GitHub</a>`,
      )
    } else if (hasProjectLink(project.website)) {
      const label = project.websiteLabel || 'Visit site'
      actions.push(
        `<a href="${project.website}" class="btn btn--ghost" target="_blank" rel="noopener noreferrer" data-ripple>${label}</a>`,
      )
    }

    if (!actions.length) return ''

    return `<div class="project-detail__actions">${actions.join('')}</div>`
  }

  function init() {
    const root = document.querySelector('#project-detail')
    if (!root) return

    // Prefer ?id=, then #id — some static servers strip query strings on clean URLs
    const params = new URLSearchParams(window.location.search)
    const hashId = window.location.hash.replace(/^#/, '')
    const id = params.get('id') || hashId || 'bittera-signage'
    const project = getProjectById(id)

    if (!project) {
      root.innerHTML = '<p class="section__subtitle">Project not found.</p>'
      return
    }

    document.title = `${project.title} — Sami-Severi Sjöberg`

    const statusLabel = getProjectStatusLabel(project.status)
    const statusBadge = project.status
      ? `<span class="project-status project-status--${project.status}">${statusLabel}</span>`
      : ''

    root.innerHTML = `
      <div class="project-detail__header reveal">
        <div class="project-detail__eyebrow-row">
          <span class="section__eyebrow">${project.category}</span>
          ${statusBadge}
        </div>
        <h1 class="project-detail__title">${project.title}</h1>
        <p class="project-detail__desc">${project.overview}</p>
        <ul class="project-detail__tags">${project.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
        ${renderActions(project)}
      </div>
      <div class="project-detail__features glass reveal">
        <h2>Key Features</h2>
        <ul>${project.features.map((f) => `<li>${f}</li>`).join('')}</ul>
      </div>
    `

    root.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'))
  }

  return { init }
})()

export default ProjectDetails
