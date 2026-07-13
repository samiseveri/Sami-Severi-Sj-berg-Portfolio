/**
 * Experience page — expandable role cards
 */
const Experience = (() => {
  function toggleCard(card, header, body, open) {
    card.classList.toggle('is-open', open)
    header.setAttribute('aria-expanded', String(open))
    body.hidden = !open

    if (open) {
      body.style.maxHeight = `${body.scrollHeight}px`
    } else {
      body.style.maxHeight = '0px'
    }
  }

  function init() {
    const cards = document.querySelectorAll('[data-exp-card]')
    if (!cards.length) return

    cards.forEach((card) => {
      const header = card.querySelector('.exp-card__header')
      const body = card.querySelector('.exp-card__body')
      if (!header || !body) return

      body.hidden = true
      body.style.maxHeight = '0px'

      header.addEventListener('click', () => {
        const isOpen = card.classList.contains('is-open')

        // Close other cards (accordion behavior)
        cards.forEach((other) => {
          if (other === card) return
          const otherHeader = other.querySelector('.exp-card__header')
          const otherBody = other.querySelector('.exp-card__body')
          if (otherHeader && otherBody) toggleCard(other, otherHeader, otherBody, false)
        })

        toggleCard(card, header, body, !isOpen)
      })
    })

    // Open first card by default
    const first = cards[0]
    const firstHeader = first?.querySelector('.exp-card__header')
    const firstBody = first?.querySelector('.exp-card__body')
    if (first && firstHeader && firstBody) {
      requestAnimationFrame(() => toggleCard(first, firstHeader, firstBody, true))
    }
  }

  return { init }
})()

export default Experience
