/**
 * Skills page — render skill categories and animate progress bars
 */
import { SKILL_CATEGORIES } from './skills-data.js'

function formatYears(years) {
  return years === 1 ? '1 yr' : `${years} yrs`
}

function formatProjects(projects) {
  return projects === 1 ? '1 project' : `${projects} projects`
}

function renderSkill(skill) {
  return `
    <div class="skill-bar">
      <div class="skill-bar__header">
        <span class="skill-bar__name">${skill.name}</span>
        <span class="skill-bar__meta">${formatYears(skill.years)} · ${formatProjects(skill.projects)}</span>
      </div>
      <div class="skill-bar__track">
        <div class="skill-bar__fill" data-skill-bar="${skill.level}"></div>
      </div>
    </div>`
}

function renderCategory(category) {
  return `
    <div class="skill-category glass reveal">
      <h2 class="skill-category__title">${category.title}</h2>
      ${category.skills.map(renderSkill).join('')}
    </div>`
}

const Skills = (() => {
  function renderGrid() {
    const grid = document.querySelector('#skills-grid')
    if (!grid) return

    grid.innerHTML = SKILL_CATEGORIES.map(renderCategory).join('')
  }

  function initBars() {
    const bars = document.querySelectorAll('[data-skill-bar]')
    if (!bars.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const bar = entry.target
          const level = bar.dataset.skillBar
          bar.style.width = `${level}%`
          observer.unobserve(bar)
        })
      },
      { threshold: 0.3 },
    )

    bars.forEach((bar) => observer.observe(bar))
  }

  function init() {
    renderGrid()
    initBars()
  }

  return { init }
})()

export default Skills
