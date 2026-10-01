/**
 * Animations module — scroll reveals, typing effect, magnetic buttons, ripples
 */
import { TYPING_PHRASES } from './site-data.js'

const Animations = (() => {
  let typeIndex = 0
  let charIndex = 0
  let isDeleting = false

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  /** Intersection Observer for scroll-triggered reveals */
  function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal')
    if (!elements.length) return

    if (prefersReducedMotion()) {
      elements.forEach((el) => {
        el.classList.add('is-visible')
        el.classList.add('is-reveal-done')
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target
          el.classList.add('is-visible')
          observer.unobserve(el)

          // Clear stagger delays after the entrance so hover/tilt feel the same on every card
          const style = getComputedStyle(el)
          const delays = style.transitionDelay.split(',').map((v) => parseFloat(v) * 1000 || 0)
          const durations = style.transitionDuration.split(',').map((v) => parseFloat(v) * 1000 || 0)
          const wait = Math.max(0, ...delays.map((delay, i) => delay + (durations[i] || durations[0] || 0)))

          window.setTimeout(() => {
            el.style.transitionDelay = '0s'
            el.classList.add('is-reveal-done')
          }, wait)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    elements.forEach((el) => observer.observe(el))
  }

  /** Typing animation for hero role text */
  function initTypingEffect() {
    const el = document.querySelector('[data-typing]')
    if (!el) return

    if (prefersReducedMotion()) {
      el.textContent = TYPING_PHRASES[0] || ''
      return
    }

    const speed = 80
    const pause = 2000

    function tick() {
      const phrase = TYPING_PHRASES[typeIndex]

      if (!isDeleting) {
        el.textContent = phrase.substring(0, charIndex + 1)
        charIndex++
        if (charIndex === phrase.length) {
          isDeleting = true
          setTimeout(tick, pause)
          return
        }
      } else {
        el.textContent = phrase.substring(0, charIndex - 1)
        charIndex--
        if (charIndex === 0) {
          isDeleting = false
          typeIndex = (typeIndex + 1) % TYPING_PHRASES.length
        }
      }

      setTimeout(tick, isDeleting ? speed / 2 : speed)
    }

    tick()
  }

  /** Magnetic hover effect on buttons */
  function initMagneticButtons() {
    if (prefersReducedMotion()) return

    document.querySelectorAll('[data-magnetic]').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`
      })

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = ''
      })
    })
  }

  /** Ripple effect on click */
  function initRippleEffect() {
    if (prefersReducedMotion()) return

    document.querySelectorAll('[data-ripple]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const ripple = document.createElement('span')
        ripple.className = 'btn__ripple'
        ripple.style.width = ripple.style.height = `${size}px`
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`
        btn.appendChild(ripple)
        ripple.addEventListener('animationend', () => ripple.remove())
      })
    })
  }

  /** Animated number counters triggered on scroll */
  function initAnimatedCounters() {
    const counters = document.querySelectorAll('[data-count]')
    if (!counters.length) return

    const animate = (el) => {
      const target = parseInt(el.dataset.count, 10)

      if (prefersReducedMotion()) {
        el.textContent = target
        return
      }

      const duration = 1400
      const start = performance.now()

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        el.textContent = Math.floor(eased * target)
        if (progress < 1) requestAnimationFrame(step)
        else el.textContent = target
      }

      requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          animate(entry.target)
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.5 },
    )

    counters.forEach((el) => observer.observe(el))
  }

  /** Subtle 3D tilt on hobby cards — same timing on every card */
  function initCardTilt() {
    if (prefersReducedMotion()) return

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!canHover) return

    const tiltTransition = 'transform 0.35s var(--ease-spring)'
    const followTransition = 'transform 0.12s ease-out'

    document.querySelectorAll('[data-tilt]').forEach((card) => {
      card.addEventListener('mouseenter', () => {
        card.style.transitionDelay = '0s'
        card.style.transition = tiltTransition
        card.style.transform = 'perspective(700px) translateY(-10px) scale(1.03)'
      })

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        card.style.transitionDelay = '0s'
        card.style.transition = followTransition
        card.style.transform = `perspective(700px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-10px) scale(1.03)`
      })

      card.addEventListener('mouseleave', () => {
        card.style.transitionDelay = '0s'
        card.style.transition = tiltTransition
        card.style.transform = ''
      })
    })
  }

  function init() {
    initScrollReveal()
    initTypingEffect()
    initMagneticButtons()
    initRippleEffect()
    initAnimatedCounters()
    initCardTilt()
  }

  return { init }
})()

export default Animations
