// Domain Entity - User
// Clean Architecture: Core business entity

export interface User {
  id?: string
  fullName: string
  email: string
  iban: string
}

export interface UserValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

// Value Object for IBAN validation
export class IBAN {
  private readonly value: string

  constructor(iban: string) {
    this.value = iban.replace(/\s/g, "").toUpperCase()
  }

  isValid(): boolean {
    // Basic IBAN validation (simplified for demo)
    const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4,30}$/
    return ibanRegex.test(this.value) && this.value.length >= 15 && this.value.length <= 34
  }

  toString(): string {
    return this.value
  }
}

// Value Object for Email validation
export class Email {
  private readonly value: string

  constructor(email: string) {
    this.value = email.toLowerCase().trim()
  }

  isValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(this.value)
  }

  toString(): string {
    return this.value
  }
}
