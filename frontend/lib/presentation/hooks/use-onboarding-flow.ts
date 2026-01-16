"use client"

// Custom Hook - Onboarding Flow State Machine
// Presentation Layer: Navigation State Management

import { useState, useCallback } from "react"
import type { User } from "@/lib/domain/entities/user"
import type { Bank } from "@/lib/domain/entities/bank"
import type { VerificationResult } from "@/lib/domain/entities/verification"

// State Machine Pattern for flow management
export type OnboardingStep = "registration" | "bank-selection" | "success"

interface OnboardingState {
  currentStep: OnboardingStep
  user: User | null
  selectedBank: Bank | null
  verificationResult: VerificationResult | null
  isLoading: boolean
  error: string | null
}

export function useOnboardingFlow() {
  const [state, setState] = useState<OnboardingState>({
    currentStep: "registration",
    user: null,
    selectedBank: null,
    verificationResult: null,
    isLoading: false,
    error: null,
  })

  const setUser = useCallback((user: User) => {
    setState((prev) => ({
      ...prev,
      user,
      currentStep: "bank-selection",
    }))
  }, [])

  const selectBank = useCallback((bank: Bank) => {
    setState((prev) => ({ ...prev, selectedBank: bank }))
  }, [])

  const setLoading = useCallback((isLoading: boolean) => {
    setState((prev) => ({ ...prev, isLoading }))
  }, [])

  const setVerificationResult = useCallback((result: VerificationResult) => {
    setState((prev) => ({
      ...prev,
      verificationResult: result,
      currentStep: result.success ? "success" : prev.currentStep,
      error: result.success ? null : result.message,
    }))
  }, [])

  const goToStep = useCallback((step: OnboardingStep) => {
    setState((prev) => ({ ...prev, currentStep: step }))
  }, [])

  const reset = useCallback(() => {
    setState({
      currentStep: "registration",
      user: null,
      selectedBank: null,
      verificationResult: null,
      isLoading: false,
      error: null,
    })
  }, [])

  return {
    ...state,
    setUser,
    selectBank,
    setLoading,
    setVerificationResult,
    goToStep,
    reset,
  }
}
