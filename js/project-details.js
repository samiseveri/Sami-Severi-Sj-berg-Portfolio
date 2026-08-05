/**
 * Project details page — populate from URL ?id=
 */
import { getProjectById } from './projects-data.js'

const ProjectDetails = (() => {
  function init() {
    const root = document.querySelector('#project-detail')
    if (!root) return

    const params = new URLSearchParams(window.location.search)
    const id = params.get('id') || 'aurora'
    const project = getProjectById(id)

    if (!project) {
      root.innerHTML = '<p class="section__subtitle">Project not found. <a href="projects.html">Back to projects</a></p>'
      return
    }

    document.title = `${project.title} — Sami-Severi Sjöberg`

    root.innerHTML = `
      <div class="project-detail__header reveal">
        <span class="section__eyebrow">${project.category}</span>
        <h1 class="project-detail__title">${project.title}</h1>
        <p class="project-detail__desc">${project.overview}</p>
        <ul class="project-detail__tags">${project.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
        <div class="project-detail__actions">
          <a href="${project.demo}" class="btn btn--primary" target="_blank" rel="noopener noreferrer" data-ripple>Live Demo</a>
          <a href="${project.github}" class="btn btn--ghost" target="_blank" rel="noopener noreferrer" data-ripple>View on GitHub</a>
          <a href="projects.html" class="btn btn--ghost" data-ripple>← All Projects</a>
        </div>
      </div>
      <div class="project-detail__features glass reveal">
        <h2>Key Features</h2>
        <ul>${project.features.map((f) => `<li>${f}</li>`).join('')}</ul>
      </div>
    `

    // Trigger reveal visibility for dynamically added elements
    root.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'))
  }

  return { init }
})()

export default ProjectDetails
