// Use Case - Validate User Input
// Clean Architecture: Application Business Rules

import { type User, type UserValidationResult, IBAN, Email } from "../entities/user"

// Strategy Pattern for validation
interface ValidationStrategy {
  validate(value: string): boolean
  getErrorMessage(): string
}

class FullNameValidationStrategy implements ValidationStrategy {
  validate(value: string): boolean {
    return value.trim().length >= 2 && value.trim().split(" ").length >= 1
  }
  getErrorMessage(): string {
    return "Please enter your full name"
  }
}

class EmailValidationStrategy implements ValidationStrategy {
  validate(value: string): boolean {
    return new Email(value).isValid()
  }
  getErrorMessage(): string {
    return "Please enter a valid email address"
  }
}

class IBANValidationStrategy implements ValidationStrategy {
  validate(value: string): boolean {
    return new IBAN(value).isValid()
  }
  getErrorMessage(): string {
    return "Please enter a valid IBAN (e.g., GB82WEST12345698765432)"
  }
}

// Use Case implementation
export class ValidateUserUseCase {
  private strategies: Map<keyof User, ValidationStrategy>

  constructor() {
    this.strategies = new Map([
      ["fullName", new FullNameValidationStrategy()],
      ["email", new EmailValidationStrategy()],
      ["iban", new IBANValidationStrategy()],
    ])
  }

  execute(user: Partial<User>): UserValidationResult {
    const errors: Record<string, string> = {}

    for (const [field, strategy] of this.strategies) {
      const value = user[field as keyof typeof user] as string
      if (!value || !strategy.validate(value)) {
        errors[field] = strategy.getErrorMessage()
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    }
  }

  validateField(field: keyof User, value: string): string | null {
    const strategy = this.strategies.get(field)
    if (strategy && !strategy.validate(value)) {
      return strategy.getErrorMessage()
    }
    return null
  }
}
