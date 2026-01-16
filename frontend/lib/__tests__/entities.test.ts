// Unit Tests - Domain Entities
// Testing Value Objects and Entities

import { IBAN, Email } from "../domain/entities/user"
import { BankFactory } from "../domain/entities/bank"

describe("Value Objects", () => {
  describe("IBAN", () => {
    it("should validate correct IBAN format", () => {
      const iban = new IBAN("GB82WEST12345698765432")
      expect(iban.isValid()).toBe(true)
    })

    it("should reject invalid IBAN format", () => {
      const iban = new IBAN("invalid")
      expect(iban.isValid()).toBe(false)
    })

    it("should normalize IBAN by removing spaces", () => {
      const iban = new IBAN("GB82 WEST 1234 5698 7654 32")
      expect(iban.toString()).toBe("GB82WEST12345698765432")
    })

    it("should convert to uppercase", () => {
      const iban = new IBAN("gb82west12345698765432")
      expect(iban.toString()).toBe("GB82WEST12345698765432")
    })
  })

  describe("Email", () => {
    it("should validate correct email format", () => {
      const email = new Email("test@example.com")
      expect(email.isValid()).toBe(true)
    })

    it("should reject invalid email format", () => {
      const email = new Email("invalid-email")
      expect(email.isValid()).toBe(false)
    })

    it("should normalize email to lowercase", () => {
      const email = new Email("Test@Example.COM")
      expect(email.toString()).toBe("test@example.com")
    })
  })
})

describe("BankFactory", () => {
  it("should create a bank instance", () => {
    const bank = BankFactory.createBank("1", "Test Bank", "TEST", "🏦", "#000000")

    expect(bank.id).toBe("1")
    expect(bank.name).toBe("Test Bank")
    expect(bank.code).toBe("TEST")
  })

  it("should return available banks", () => {
    const banks = BankFactory.getAvailableBanks()

    expect(banks).toHaveLength(4)
    expect(banks.map((b) => b.name)).toContain("Santander")
    expect(banks.map((b) => b.name)).toContain("Barclays")
    expect(banks.map((b) => b.name)).toContain("Lloyds")
    expect(banks.map((b) => b.name)).toContain("HSBC")
  })
})
