// Use Case - Verify Bank Account
// Clean Architecture: Application Business Rules

import type { User } from "../entities/user"
import type { Bank } from "../entities/bank"
import type { VerificationResult } from "../entities/verification"

// Repository interface (Dependency Inversion Principle)
export interface BankVerificationRepository {
  verify(user: User, bank: Bank): Promise<VerificationResult>
}

// Use Case implementation
export class VerifyBankAccountUseCase {
  constructor(private repository: BankVerificationRepository) {}

  async execute(user: User, bank: Bank): Promise<VerificationResult> {
    // Business rule: Both user and bank must be provided
    if (!user.fullName || !user.email || !user.iban) {
      return {
        success: false,
        message: "Incomplete user information",
        timestamp: new Date(),
      }
    }

    if (!bank.id) {
      return {
        success: false,
        message: "No bank selected",
        timestamp: new Date(),
      }
    }

    return await this.repository.verify(user, bank)
  }
}
