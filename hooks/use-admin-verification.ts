"use client"

import { useState } from "react"
import { authApi } from "@/lib/api/auth"

interface VerificationResult {
  success: boolean
  redirectUrl?: string
}

export function useAdminVerification() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const verifyAdmin = async (email: string): Promise<VerificationResult> => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await authApi.verifyAdmin(email)

      if (response.verified) {
        setSuccess(true)
        return {
          success: true,
          redirectUrl: response.adminUrl,
        }
      } else {
        setError("Email not verified or not authorized as admin")
        return { success: false }
      }
    } catch (err: any) {
      const errorMessage = err.message || "Verification failed. Please try again."
      setError(errorMessage)
      return { success: false }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    verifyAdmin,
    isLoading,
    error,
    success,
  }
}

export default useAdminVerification