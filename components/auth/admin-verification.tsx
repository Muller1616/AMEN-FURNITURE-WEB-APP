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
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Professional Office Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop" 
          alt="Modern Office Space" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-blue-900/75 to-slate-900/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <Button 
          variant="ghost" 
          className="mb-6 text-white hover:text-blue-400 hover:bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300" 
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Role Selection
        </Button>

        <Card className="border-2 border-white/20 bg-white/95 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Admin Verification</CardTitle>
            <CardDescription className="text-base text-gray-600">
              Enter your admin email to verify access
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-semibold text-gray-700">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@amenfurniture.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-5 w-5" />
                  <AlertDescription className="text-sm">{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-500 bg-green-50">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <AlertDescription className="text-sm text-green-800">
                    Verification successful! Redirecting to admin dashboard...
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
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