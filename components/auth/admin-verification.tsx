"use client"

import { useEffect } from "react"

interface AdminVerificationProps {
  onBack: () => void
}

// This component is no longer needed since we redirect directly
// But keeping it for compatibility
function AdminVerification({ onBack }: AdminVerificationProps) {
  useEffect(() => {
    // Redirect immediately to Django admin
    window.location.href = "https://auth-ldoq.onrender.com"
  }, [])

  return null
}

export default AdminVerification