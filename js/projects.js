/**
 * Projects page — category filtering
 */
import { PROJECTS } from './projects-data.js'

const Projects = (() => {
  function renderGrid(container, items) {
    container.innerHTML = items
      .map(
        (p) => `
      <article class="project-row reveal" data-category="${p.category}">
        <a href="project-details.html?id=${p.id}" class="project-row__link">
          <div class="project-row__main">
            <div class="project-row__meta">
              <h3 class="project-row__title">${p.title}</h3>
              <span class="project-row__category">${p.category}</span>
            </div>
            <p class="project-row__desc">${p.description}</p>
            <ul class="project-row__tags">${p.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
          </div>
          <span class="project-row__cta" aria-hidden="true">View →</span>
        </a>
      </article>`,
      )
      .join('')

    // Re-observe new reveal elements
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

  function init() {
    const grid = document.querySelector('#projects-grid')
    const filters = document.querySelectorAll('[data-filter]')
    if (!grid) return

    renderGrid(grid, PROJECTS)

    filters.forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.filter
        filters.forEach((b) => b.classList.toggle('is-active', b === btn))

        const filtered = cat === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === cat)
        renderGrid(grid, filtered)
      })
    })
  }

  return { init }
})()

export default Projects
