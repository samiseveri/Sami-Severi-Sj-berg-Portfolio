import { describe, it, expect } from 'vitest'
import { validateContact, isValid } from './validation'

describe('validateContact', () => {
  it('accepts a fully valid form', () => {
    const errors = validateContact({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      message: 'Hello, I would love to work with you!',
    })
    expect(isValid(errors)).toBe(true)
  })

  it('flags a missing name', () => {
    const errors = validateContact({
      name: '   ',
      email: 'ada@example.com',
      message: 'A perfectly long enough message.',
    })
    expect(errors.name).toBeDefined()
    expect(isValid(errors)).toBe(false)
  })

  it('flags an invalid email', () => {
    const errors = validateContact({
      name: 'Ada',
      email: 'not-an-email',
      message: 'A perfectly long enough message.',
    })
    expect(errors.email).toBeDefined()
  })

  it('flags a too-short message', () => {
    const errors = validateContact({
      name: 'Ada',
      email: 'ada@example.com',
      message: 'short',
    })
    expect(errors.message).toBeDefined()
  })
})
