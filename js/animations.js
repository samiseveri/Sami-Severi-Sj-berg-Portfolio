/**
 * Animations module — scroll reveals, typing effect, magnetic buttons, ripples
 */
const Animations = (() => {
  const TYPING_PHRASES = [
    'Frontend Engineer',
    'UI/UX Designer',
    'Creative Developer',
    'Problem Solver',
  ]

  let typeIndex = 0
  let charIndex = 0
  let isDeleting = false

  /** Intersection Observer for scroll-triggered reveals */
  function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal')
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
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

  function init() {
    initScrollReveal()
    initTypingEffect()
    initMagneticButtons()
    initRippleEffect()
  }

  return { init }
})()

export default Animations
