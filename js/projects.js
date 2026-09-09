/**
 * Projects page — accessible category filtering (filter buttons, not tabs)
 */
import { PROJECTS, hasProjectLink } from './projects-data.js'

const Projects = (() => {
  function primaryHref(project) {
    if (hasProjectLink(project.demo))
      return { href: project.demo, external: true, label: 'Open project' }
    if (hasProjectLink(project.github))
      return { href: project.github, external: true, label: 'View on GitHub' }
    return {
      href: `project-details.html?id=${encodeURIComponent(project.id)}`,
      external: false,
      label: 'View details',
    }
  }

  function renderGrid(container, items) {
    container.innerHTML = items
      .map((p) => {
        const primary = primaryHref(p)
        const detailsHref = `project-details.html?id=${encodeURIComponent(p.id)}`
        const externalAttrs = primary.external ? ' target="_blank" rel="noopener noreferrer"' : ''

        return `
      <article class="project-row reveal" data-category="${p.category}" data-project-id="${p.id}">
        <div class="project-row__link">
          <div class="project-row__main">
            <div class="project-row__meta">
              <h3 class="project-row__title">${p.title}</h3>
              <span class="project-row__category">${p.category}</span>
            </div>
            <p class="project-row__desc">${p.description}</p>
            <ul class="project-row__tags">${p.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
            <div class="project-row__actions">
              <a class="project-row__action project-row__action--primary" href="${primary.href}"${externalAttrs}>${primary.label} →</a>
              <a class="project-row__action project-row__action--secondary" href="${detailsHref}">Case study</a>
            </div>
          </div>
        </div>
      </article>`
      })
      .join('')

    container.querySelectorAll('.reveal').forEach((el) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1 },
      )
      observer.observe(el)
    })
  }

  function setActiveFilter(filters, activeBtn) {
    filters.forEach((btn) => {
      const isActive = btn === activeBtn
      btn.classList.toggle('is-active', isActive)
      btn.setAttribute('aria-pressed', String(isActive))
    })
  }

  function init() {
    const grid = document.querySelector('#projects-grid')
    const filters = [...document.querySelectorAll('[data-filter]')]
    if (!grid) return

    renderGrid(grid, PROJECTS)
    setActiveFilter(filters, filters.find((btn) => btn.dataset.filter === 'all') || filters[0])

    filters.forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.filter
        setActiveFilter(filters, btn)

        const filtered = cat === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === cat)
        renderGrid(grid, filtered)

        grid.setAttribute('aria-busy', 'false')
        const live = document.querySelector('#projects-filter-status')
        if (live) {
          live.textContent = `Showing ${filtered.length} project${filtered.length === 1 ? '' : 's'}`
        }
      })
    })
  }

  return { init }
})()

export default Projects
