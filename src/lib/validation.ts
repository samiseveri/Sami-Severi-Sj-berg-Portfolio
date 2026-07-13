export interface ContactForm {
  name: string
  email: string
  message: string
}

export type ContactErrors = Partial<Record<keyof ContactForm, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContact(form: ContactForm): ContactErrors {
  const errors: ContactErrors = {}

  if (!form.name.trim()) {
    errors.name = 'Please tell me your name.'
  }

  if (!form.email.trim()) {
    errors.email = 'An email is required so I can reply.'
  } else if (!EMAIL_RE.test(form.email.trim())) {
    errors.email = 'That does not look like a valid email address.'
  }

  if (form.message.trim().length < 10) {
    errors.message = 'Your message should be at least 10 characters.'
  }

  return errors
}

export function isValid(errors: ContactErrors): boolean {
  return Object.keys(errors).length === 0
}
