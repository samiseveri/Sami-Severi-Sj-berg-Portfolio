/**
 * Project details page — populate from URL ?id=
 * Layout mirrors hobby-details: description + optional links + media.
 */
import { getProjectById, hasProjectLink } from './projects-data.js'

const LINK_ICONS = {
  github: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
  demo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>`,
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

function renderProjectMedia(project) {
  if (!project.image) {
    return `
      <div class="project-detail__photo-frame is-empty">
        <div class="project-detail__photo-fallback" aria-hidden="true">
          <p>Add a project image</p>
        </div>
      </div>
    `
  }

  const fitClass = project.imageFit === 'contain' ? ' project-detail__photo-frame--fit' : ''

  return `
    <div class="project-detail__photo-frame${fitClass}">
      <img
        class="project-detail__photo"
        src="${project.image}"
        alt="${project.title} preview"
        width="640"
        height="480"
        loading="eager"
        decoding="async"
      />
    </div>
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

    root.innerHTML = `
      <a href="projects.html" class="project-detail__back reveal">← All Projects</a>
      <div class="project-detail reveal">
        <div class="project-detail__content">
          <span class="section__eyebrow">${project.category}</span>
          <h1 class="project-detail__title">${project.title}</h1>
          <p class="project-detail__overview">${description}</p>
          ${
            project.tags?.length
              ? `<ul class="project-detail__tags">${project.tags.map((tag) => `<li>${tag}</li>`).join('')}</ul>`
              : ''
          }
          ${renderProjectLinks(links)}
          ${renderFeatures(project)}
        </div>
        <aside class="project-detail__media">
          ${renderProjectMedia(project)}
        </aside>
      </div>
    `

    root.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'))
  }

  return { init }
})()

export default ProjectDetails
