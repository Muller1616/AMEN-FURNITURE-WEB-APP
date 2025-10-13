"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { authApi } from "@/lib/api/auth"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "user" | "admin"
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (data: SignupData) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

interface SignupData {
  email: string
  password: string
  firstName: string
  lastName: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted (client-side only)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Check if user is already logged in on mount
  useEffect(() => {
    if (!mounted) return

    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("auth_token")
        if (token) {
          const userData = await authApi.getCurrentUser()
          setUser(userData)
        }
      } catch (err) {
        localStorage.removeItem("auth_token")
      }
    }
    checkAuth()
  }, [mounted])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await authApi.login(email, password)
      localStorage.setItem("auth_token", response.token)
      setUser(response.user)

      // Redirect to appropriate page based on role
      if (response.user.role === "admin") {
        window.location.href = "/admin"
      } else {
        window.location.href = "/products"
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (data: SignupData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await authApi.signup(data)
      localStorage.setItem("auth_token", response.token)
      setUser(response.user)

      // Redirect to products page after signup
      window.location.href = "/products"
    } catch (err: any) {
      setError(err.message || "Signup failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)

    try {
      await authApi.logout()
      localStorage.removeItem("auth_token")
      setUser(null)
      window.location.href = "/"
    } catch (err: any) {
      setError(err.message || "Logout failed.")
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = () => setError(null)

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, signup, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}