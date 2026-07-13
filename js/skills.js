/**
 * Skills page — animate progress bars on scroll
 */
const Skills = (() => {
  function init() {
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

  return { init }
})()

export default Skills
