"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: string
  label: string
}

interface ProgressStepsProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function ProgressSteps({ steps, currentStep, className }: ProgressStepsProps) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isCurrent = index === currentStep

        return (
          <div key={step.id} className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all duration-300",
                isCompleted && "bg-primary text-primary-foreground",
                isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                !isCompleted && !isCurrent && "bg-muted text-muted-foreground",
              )}
            >
              {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
            </div>
            <span
              className={cn(
                "hidden text-sm font-medium sm:inline",
                isCurrent && "text-foreground",
                !isCurrent && "text-muted-foreground",
              )}
            >
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-0.5 w-8 transition-colors duration-300 sm:w-12",
                  isCompleted ? "bg-primary" : "bg-muted",
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
