/**
 * Main entry — loader, scroll progress, back-to-top, module bootstrap
 */
import Navigation from './navigation.js'
import Animations from './animations.js'
import Experience from './experience.js'
import Projects from './projects.js'
import ProjectDetails from './project-details.js'
import Skills from './skills.js'
import SocialLinks from './social-links.js'

const Main = (() => {
  /** Page loading screen */
  function initLoader() {
    const loader = document.querySelector('.loader')
    if (!loader) return

    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('is-hidden'), 400)
    })
  }

  /** Top scroll progress indicator */
  function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress')
    if (!bar) return

    window.addEventListener(
      'scroll',
      () => {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
        bar.style.width = `${progress}%`
      },
      { passive: true },
    )
  }

  /** Back-to-top button visibility */
  function initBackToTop() {
    const btn = document.querySelector('.back-to-top')
    if (!btn) return

    window.addEventListener(
      'scroll',
      () => {
        btn.classList.toggle('is-visible', window.scrollY > 600)
      },
      { passive: true },
    )

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  /** Lazy-load images with data-src */
  function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]')
    if (!images.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const img = entry.target
          img.src = img.dataset.src
          img.removeAttribute('data-src')
          observer.unobserve(img)
        })
      },
      { rootMargin: '200px' },
    )

    images.forEach((img) => observer.observe(img))
  }

  /** Expand / collapse recommendation letter */
  function initRecommendation() {
    document.querySelectorAll('[data-recommendation]').forEach((card) => {
      const btn = card.querySelector('[data-recommendation-toggle]')
      if (!btn) return

      btn.addEventListener('click', () => {
        const expanded = card.classList.toggle('is-expanded')
        const panel = card.querySelector('.recommendation__expandable')
        btn.setAttribute('aria-expanded', String(expanded))
        btn.textContent = expanded ? 'Show Less' : 'Read More'
        if (panel) panel.setAttribute('aria-hidden', String(!expanded))
      })

      const panel = card.querySelector('.recommendation__expandable')
      if (panel) panel.setAttribute('aria-hidden', 'true')
    })
  }

  function init() {
    initLoader()
    initScrollProgress()
    initBackToTop()
    initLazyLoad()
    initRecommendation()
    Navigation.init()
    SocialLinks.init()
    Animations.init()
    Experience.init()
    Projects.init()
    ProjectDetails.init()
    Skills.init()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()

export default Main
