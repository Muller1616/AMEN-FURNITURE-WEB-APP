"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { authApi } from "@/lib/api/auth"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  username: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (data: SignupData) => Promise<void>
  logout: () => void
  clearError: () => void
}

interface SignupData {
  email: string
  password: string
  username: string
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
        const token = typeof window !== 'undefined' ? localStorage.getItem("access_token") : null
        const storedUser = typeof window !== 'undefined' ? localStorage.getItem("user") : null
        
        if (token && storedUser) {
          // Try to use stored user data first
          setUser(JSON.parse(storedUser))
          
          // Optionally verify token is still valid
          try {
            const userData = await authApi.getCurrentUser()
            const formattedUser = {
              id: userData.id,
              email: userData.email,
              firstName: userData.first_name,
              lastName: userData.last_name,
              username: userData.username,
            }
            setUser(formattedUser)
            if (typeof window !== 'undefined') {
              localStorage.setItem("user", JSON.stringify(formattedUser))
            }
          } catch {
            // Token invalid, clear storage
            if (typeof window !== 'undefined') {
              localStorage.removeItem("access_token")
              localStorage.removeItem("refresh_token")
              localStorage.removeItem("user")
            }
            setUser(null)
          }
        }
      } catch (err) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem("access_token")
          localStorage.removeItem("refresh_token")
          localStorage.removeItem("user")
        }
        setUser(null)
      }
    }
    checkAuth()
  }, [mounted])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await authApi.login(email, password)
      
      // Store tokens
      if (typeof window !== 'undefined') {
        localStorage.setItem("access_token", response.access)
        localStorage.setItem("refresh_token", response.refresh)
      }

      // Format user data to camelCase
      const formattedUser = {
        id: response.user.id,
        email: response.user.email,
        firstName: response.user.first_name,
        lastName: response.user.last_name,
        username: response.user.username,
      }

      setUser(formattedUser)
      
      // Store user data
      if (typeof window !== 'undefined') {
        localStorage.setItem("user", JSON.stringify(formattedUser))
      }

      // No automatic redirect - let the component handle it
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.")
      throw err // Re-throw so calling component knows it failed
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (data: SignupData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await authApi.signup(data)
      
      // Store tokens
      if (typeof window !== 'undefined') {
        localStorage.setItem("access_token", response.access)
        localStorage.setItem("refresh_token", response.refresh)
      }

      // Format user data to camelCase
      const formattedUser = {
        id: response.user.id,
        email: response.user.email,
        firstName: response.user.first_name,
        lastName: response.user.last_name,
        username: response.user.username,
      }

      setUser(formattedUser)
      
      // Store user data
      if (typeof window !== 'undefined') {
        localStorage.setItem("user", JSON.stringify(formattedUser))
      }

      // No automatic redirect - let the component handle it
    } catch (err: any) {
      setError(err.message || "Signup failed. Please try again.")
      throw err // Re-throw so calling component knows it failed
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    authApi.logout() // This clears localStorage
    setUser(null)
    setError(null)
    
    // Redirect to home
    if (typeof window !== 'undefined') {
      window.location.href = "/"
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