// Domain Entity - Verification Result
// Clean Architecture: Core business entity

export interface VerificationResult {
  success: boolean
  message: string
  timestamp: Date
  verificationId?: string
}

export type VerificationStatus = "pending" | "verified" | "failed"
