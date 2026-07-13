/**
 * Main entry — loader, scroll progress, back-to-top, module bootstrap
 */
import Navigation from './navigation.js'
import Animations from './animations.js'
import ContactForm from './contact.js'

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

  function init() {
    initLoader()
    initScrollProgress()
    initBackToTop()
    initLazyLoad()
    Navigation.init()
    Animations.init()
    ContactForm.init()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()

export default Main
