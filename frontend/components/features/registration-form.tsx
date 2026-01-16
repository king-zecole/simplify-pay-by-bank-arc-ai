"use client"

import type React from "react"

import { useState } from "react"
import { UserIcon, Mail, CreditCard, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { User } from "@/lib/domain/entities/user"
import { useRegistrationForm } from "@/lib/presentation/hooks/use-registration-form"

interface RegistrationFormProps {
  onSubmit: (user: User) => void
}

export function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const { user, errors, touched, setField, validateField, validateAll } = useRegistrationForm()
  const [isAnimating, setIsAnimating] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateAll()) {
      setIsAnimating(true)
      setTimeout(() => {
        onSubmit(user as User)
      }, 300)
    }
  }

  const handleBlur = (field: keyof User) => {
    validateField(field)
  }

  const inputFields = [
    {
      id: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "John Smith",
      icon: UserIcon,
      autoComplete: "name",
    },
    {
      id: "email",
      label: "Email Address",
      type: "email",
      placeholder: "john@example.com",
      icon: Mail,
      autoComplete: "email",
    },
    {
      id: "iban",
      label: "IBAN",
      type: "text",
      placeholder: "GB82WEST12345698765432",
      icon: CreditCard,
      autoComplete: "off",
    },
  ] as const

  return (
    <Card className={cn("w-full max-w-md mx-auto transition-all duration-300", isAnimating && "scale-95 opacity-0")}>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-balance">Create Account</CardTitle>
        <CardDescription className="text-pretty">
          Enter your details to get started with secure bank verification
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {inputFields.map((field) => {
            const Icon = field.icon
            const hasError = touched[field.id] && errors[field.id]

            return (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id} className="text-sm font-medium">
                  {field.label}
                </Label>
                <div className="relative">
                  <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    autoComplete={field.autoComplete}
                    value={user[field.id] || ""}
                    onChange={(e) => setField(field.id, e.target.value)}
                    onBlur={() => handleBlur(field.id)}
                    className={cn(
                      "pl-10 transition-colors",
                      hasError && "border-destructive focus-visible:ring-destructive",
                    )}
                    aria-invalid={hasError ? "true" : "false"}
                    aria-describedby={hasError ? `${field.id}-error` : undefined}
                  />
                </div>
                {hasError && (
                  <p
                    id={`${field.id}-error`}
                    className="text-sm text-destructive animate-in fade-in slide-in-from-top-1"
                    role="alert"
                  >
                    {errors[field.id]}
                  </p>
                )}
              </div>
            )
          })}

          <Button type="submit" className="w-full mt-6 gap-2" size="lg">
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
