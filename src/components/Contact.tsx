import { useState, type FormEvent } from 'react'
import {
  isValid,
  validateContact,
  type ContactErrors,
  type ContactForm,
} from '../lib/validation'

const EMPTY: ContactForm = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(EMPTY)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [sent, setSent] = useState(false)

  const update = (field: keyof ContactForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const nextErrors = validateContact(form)
    setErrors(nextErrors)
    if (isValid(nextErrors)) {
      setSent(true)
      setForm(EMPTY)
    }
  }

  return (
    <section className="section" id="contact">
      <h2 className="section__title">Contact</h2>
      <p className="contact__intro">
        Have a project in mind or just want to say hello? Send me a message.
      </p>

      {sent ? (
        <div className="contact__success" role="status">
          Thanks, your message is on its way! I&apos;ll get back to you soon. ✨
          <button className="btn btn--ghost" onClick={() => setSent(false)}>
            Send another
          </button>
        </div>
      ) : (
        <form className="contact__form" onSubmit={onSubmit} noValidate>
          <label className="field">
            <span>Name</span>
            <input
              type="text"
              value={form.name}
              onChange={update('name')}
              aria-invalid={!!errors.name}
              placeholder="Ada Lovelace"
            />
            {errors.name && <em className="field__error">{errors.name}</em>}
          </label>

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={update('email')}
              aria-invalid={!!errors.email}
              placeholder="ada@example.com"
            />
            {errors.email && <em className="field__error">{errors.email}</em>}
          </label>

          <label className="field">
            <span>Message</span>
            <textarea
              rows={4}
              value={form.message}
              onChange={update('message')}
              aria-invalid={!!errors.message}
              placeholder="Tell me a little about your project..."
            />
            {errors.message && <em className="field__error">{errors.message}</em>}
          </label>

          <button className="btn btn--primary" type="submit">
            Send message
          </button>
        </form>
      )}
    </section>
  )
}
