// Unit Tests - TDD Pattern
// Testing the ValidateUserUseCase

import { ValidateUserUseCase } from "../domain/use-cases/validate-user"
import type { User } from "../domain/entities/user"

describe("ValidateUserUseCase", () => {
  let useCase: ValidateUserUseCase

  beforeEach(() => {
    useCase = new ValidateUserUseCase()
  })

  describe("execute", () => {
    it("should return valid for complete and correct user data", () => {
      const user: User = {
        fullName: "John Smith",
        email: "john@example.com",
        iban: "GB82WEST12345698765432",
      }

      const result = useCase.execute(user)

      expect(result.isValid).toBe(true)
      expect(result.errors).toEqual({})
    })

    it("should return errors for empty user data", () => {
      const user: Partial<User> = {
        fullName: "",
        email: "",
        iban: "",
      }

      const result = useCase.execute(user)

      expect(result.isValid).toBe(false)
      expect(Object.keys(result.errors)).toHaveLength(3)
    })

    it("should return error for invalid email", () => {
      const user: User = {
        fullName: "John Smith",
        email: "invalid-email",
        iban: "GB82WEST12345698765432",
      }

      const result = useCase.execute(user)

      expect(result.isValid).toBe(false)
      expect(result.errors.email).toBeDefined()
    })

    it("should return error for invalid IBAN", () => {
      const user: User = {
        fullName: "John Smith",
        email: "john@example.com",
        iban: "12345",
      }

      const result = useCase.execute(user)

      expect(result.isValid).toBe(false)
      expect(result.errors.iban).toBeDefined()
    })
  })

  describe("validateField", () => {
    it("should validate email field correctly", () => {
      expect(useCase.validateField("email", "valid@email.com")).toBeNull()
      expect(useCase.validateField("email", "invalid")).not.toBeNull()
    })

    it("should validate IBAN field correctly", () => {
      expect(useCase.validateField("iban", "GB82WEST12345698765432")).toBeNull()
      expect(useCase.validateField("iban", "invalid")).not.toBeNull()
    })

    it("should validate fullName field correctly", () => {
      expect(useCase.validateField("fullName", "John")).toBeNull()
      expect(useCase.validateField("fullName", "")).not.toBeNull()
    })
  })
})
