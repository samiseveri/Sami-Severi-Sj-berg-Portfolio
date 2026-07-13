/**
 * Contact form validation (used on contact.html — stub ready for Phase 2)
 */
const ContactForm = (() => {
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  function validate(form) {
    const errors = {}
    const name = form.name.value.trim()
    const email = form.email.value.trim()
    const subject = form.subject.value.trim()
    const message = form.message.value.trim()

    if (!name) errors.name = 'Please enter your name.'
    if (!email) errors.email = 'Email is required.'
    else if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email.'
    if (!subject) errors.subject = 'Please add a subject.'
    if (message.length < 10) errors.message = 'Message must be at least 10 characters.'

    return errors
  }

  function showErrors(form, errors) {
    form.querySelectorAll('.field__error').forEach((el) => el.remove())
    form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'))

    Object.entries(errors).forEach(([field, msg]) => {
      const input = form.elements[field]
      if (!input) return
      input.setAttribute('aria-invalid', 'true')
      const err = document.createElement('span')
      err.className = 'field__error'
      err.textContent = msg
      input.parentElement.appendChild(err)
    })
  }

  function init() {
    const form = document.querySelector('#contact-form')
    if (!form) return

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const errors = validate(form)
      if (Object.keys(errors).length) {
        showErrors(form, errors)
        return
      }

      const success = form.querySelector('.form-success')
      form.reset()
      form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'))
      form.querySelectorAll('.field__error').forEach((el) => el.remove())
      if (success) success.hidden = false
    })
  }

  return { init }
})()

export default ContactForm
