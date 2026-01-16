"use client"

// Custom Hook - Registration Form State Management
// Presentation Layer: UI State Management

import { useState, useCallback } from "react"
import type { User } from "@/lib/domain/entities/user"
import { ValidateUserUseCase } from "@/lib/domain/use-cases/validate-user"

interface RegistrationFormState {
  user: Partial<User>
  errors: Record<string, string>
  touched: Record<string, boolean>
  isSubmitting: boolean
}

export function useRegistrationForm() {
  const [state, setState] = useState<RegistrationFormState>({
    user: { fullName: "", email: "", iban: "" },
    errors: {},
    touched: {},
    isSubmitting: false,
  })

  const validateUseCase = new ValidateUserUseCase()

  const setField = useCallback((field: keyof User, value: string) => {
    setState((prev) => ({
      ...prev,
      user: { ...prev.user, [field]: value },
      touched: { ...prev.touched, [field]: true },
    }))
  }, [])

  const validateField = useCallback(
    (field: keyof User) => {
      const value = state.user[field] as string
      const error = validateUseCase.validateField(field, value || "")

      setState((prev) => ({
        ...prev,
        errors: error
          ? { ...prev.errors, [field]: error }
          : Object.fromEntries(Object.entries(prev.errors).filter(([k]) => k !== field)),
      }))

      return !error
    },
    [state.user],
  )

  const validateAll = useCallback(() => {
    const result = validateUseCase.execute(state.user)
    setState((prev) => ({ ...prev, errors: result.errors }))
    return result.isValid
  }, [state.user])

  const reset = useCallback(() => {
    setState({
      user: { fullName: "", email: "", iban: "" },
      errors: {},
      touched: {},
      isSubmitting: false,
    })
  }, [])

  return {
    user: state.user,
    errors: state.errors,
    touched: state.touched,
    isSubmitting: state.isSubmitting,
    setField,
    validateField,
    validateAll,
    reset,
  }
}
