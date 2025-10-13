"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { useAdminVerification } from "@/hooks/use-admin-verification"

interface AdminVerificationProps {
  onBack: () => void
}

function AdminVerification({ onBack }: AdminVerificationProps) {
  const [email, setEmail] = useState("")
  const { verifyAdmin, isLoading, error, success } = useAdminVerification()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await verifyAdmin(email)

    if (result.success && result.redirectUrl) {
      // Redirect to Django admin page
      window.location.href = result.redirectUrl
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="/elegant-office-furniture-and-workspace.jpg" alt="Admin Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <Button variant="ghost" className="mb-4 text-white hover:text-white/80" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Role Selection
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Admin Verification</CardTitle>
            <CardDescription>Enter your admin email to verify access</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@amenfurniture.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-500 text-green-700">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>Verification successful! Redirecting to admin dashboard...</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Continue"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminVerification