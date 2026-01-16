"use client"

import type React from "react"

import { Shield } from "lucide-react"
import { ProgressSteps } from "@/components/ui/progress-steps"
import type { OnboardingStep } from "@/lib/presentation/hooks/use-onboarding-flow"

interface OnboardingLayoutProps {
  currentStep: OnboardingStep
  children: React.ReactNode
}

const steps = [
  { id: "registration", label: "Details" },
  { id: "bank-selection", label: "Bank" },
  { id: "success", label: "Complete" },
]

const stepIndexMap: Record<OnboardingStep, number> = {
  registration: 0,
  "bank-selection": 1,
  success: 2,
}

export function OnboardingLayout({ currentStep, children }: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">Pay by Bank</span>
          </div>
          <ProgressSteps steps={steps} currentStep={stepIndexMap[currentStep]} className="hidden sm:flex" />
        </div>
      </header>

      {/* Mobile Progress */}
      <div className="sm:hidden border-b bg-background px-4 py-3">
        <ProgressSteps steps={steps} currentStep={stepIndexMap[currentStep]} />
      </div>

      {/* Main Content */}
      <main className="container px-4 py-8 md:py-12">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">{children}</div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/50 mt-auto">
        <div className="container px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Secured with standard encryption • Your data is protected
          </p>
        </div>
      </footer>
    </div>
  )
}
