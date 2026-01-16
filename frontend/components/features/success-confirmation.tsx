"use client"

import { CheckCircle2, ArrowRight, PartyPopper } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface SuccessConfirmationProps {
  onDashboard: () => void
}

export function SuccessConfirmation({ onDashboard }: SuccessConfirmationProps) {
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <CardContent className="pt-8 pb-6">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Success Animation */}
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-success/20" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-10 w-10 text-success animate-in zoom-in duration-500" />
            </div>
            <PartyPopper className="absolute -right-2 -top-2 h-6 w-6 text-accent animate-bounce" />
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground text-balance">Success!</h2>
            <p className="text-muted-foreground text-pretty max-w-xs mx-auto">
              Your account has been created and your bank details have been verified.
            </p>
          </div>

          {/* Confirmation Details */}
          <div className="w-full rounded-lg bg-muted/50 p-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Status</span>
              <span className="flex items-center gap-1 font-medium text-success">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                Verified
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Account</span>
              <span className="font-medium">Successfully Linked</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button onClick={onDashboard} size="lg" className="w-full gap-2 mt-2">
            Go to Dashboard
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
