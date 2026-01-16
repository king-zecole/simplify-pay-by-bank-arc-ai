"use client"

import { useState } from "react"
import { Check, ArrowLeft, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { type Bank, BankFactory } from "@/lib/domain/entities/bank"

interface BankSelectionProps {
  selectedBank: Bank | null
  onSelect: (bank: Bank) => void
  onSubmit: () => void
  onBack: () => void
  isLoading: boolean
}

export function BankSelection({ selectedBank, onSelect, onSubmit, onBack, isLoading }: BankSelectionProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const banks = BankFactory.getAvailableBanks()

  const handleSubmit = () => {
    if (selectedBank) {
      setIsAnimating(true)
      setTimeout(onSubmit, 300)
    }
  }

  return (
    <Card className={cn("w-full max-w-md mx-auto transition-all duration-300", isAnimating && "scale-95 opacity-0")}>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-balance">Select Your Bank</CardTitle>
        <CardDescription className="text-pretty">
          Choose your primary banking provider for secure verification
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {banks.map((bank) => {
            const isSelected = selectedBank?.id === bank.id

            return (
              <button
                key={bank.id}
                type="button"
                onClick={() => onSelect(bank)}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200",
                  "hover:border-primary/50 hover:bg-muted/50",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  isSelected ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-card",
                )}
                aria-pressed={isSelected}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-lg text-2xl"
                  style={{ backgroundColor: `${bank.color}15` }}
                >
                  {bank.logo}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-foreground">{bank.name}</p>
                  <p className="text-sm text-muted-foreground">{bank.code}</p>
                </div>
                <div
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all",
                    isSelected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30",
                  )}
                >
                  {isSelected && <Check className="h-3 w-3" />}
                </div>
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
          <Shield className="h-4 w-4 shrink-0" />
          <span>Your data is encrypted and securely transmitted</span>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onBack} className="gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedBank || isLoading}
            className="flex-1 gap-2"
            size="lg"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Verifying...
              </>
            ) : (
              "Verify Bank"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
