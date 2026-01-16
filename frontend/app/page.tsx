"use client"

import { useCallback } from "react"
import { OnboardingLayout } from "@/components/layout/onboarding-layout"
import { RegistrationForm } from "@/components/features/registration-form"
import { BankSelection } from "@/components/features/bank-selection"
import { SuccessConfirmation } from "@/components/features/success-confirmation"
import { useOnboardingFlow } from "@/lib/presentation/hooks/use-onboarding-flow"
import { ApiBankVerificationRepository } from "@/lib/infrastructure/repositories/bank-verification-repository"
import { VerifyBankAccountUseCase } from "@/lib/domain/use-cases/verify-bank-account"
import type { User } from "@/lib/domain/entities/user"
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const {
    currentStep,
    user,
    selectedBank,
    isLoading,
    setUser,
    selectBank,
    setLoading,
    setVerificationResult,
    goToStep,
    reset,
  } = useOnboardingFlow()

  const { toast } = useToast()

  const handleRegistrationSubmit = useCallback(
    (userData: User) => {
      setUser(userData)
    },
    [setUser],
  )

  const handleBankVerification = useCallback(async () => {
    if (!user || !selectedBank) return

    setLoading(true)

    try {
      const repository = new ApiBankVerificationRepository()
      const useCase = new VerifyBankAccountUseCase(repository)
      const result = await useCase.execute(user, selectedBank)

      setVerificationResult(result)

      if (!result.success) {
        toast({
          title: "Verification Failed",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [user, selectedBank, setLoading, setVerificationResult, toast])

  const handleDashboard = useCallback(() => {
    toast({
      title: "Welcome to Dashboard",
      description: "This would navigate to your dashboard in a real app.",
    })
    reset()
  }, [reset, toast])

  return (
    <OnboardingLayout currentStep={currentStep}>
      {currentStep === "registration" && <RegistrationForm onSubmit={handleRegistrationSubmit} />}

      {currentStep === "bank-selection" && (
        <BankSelection
          selectedBank={selectedBank}
          onSelect={selectBank}
          onSubmit={handleBankVerification}
          onBack={() => goToStep("registration")}
          isLoading={isLoading}
        />
      )}

      {currentStep === "success" && <SuccessConfirmation onDashboard={handleDashboard} />}
    </OnboardingLayout>
  )
}
