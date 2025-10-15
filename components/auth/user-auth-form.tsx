"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react"
import { useAuth } from "../../contexts/auth-context"

interface UserAuthFormProps {
  onBack: () => void
}

export default function UserAuthForm({ onBack }: UserAuthFormProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")
  const { login, signup, isLoading, error } = useAuth()
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  // Signup form state
  const [signupData, setSignupData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(loginData.email, loginData.password)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (signupData.password !== signupData.confirmPassword) {
      return
    }

    await signup({
      email: signupData.email,
      password: signupData.password,
      username: signupData.username,
      firstName: signupData.firstName,
      lastName: signupData.lastName,
    })
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Stunning Background Image */}
      <div 
        className="absolute inset-0 z-0 transition-transform duration-700 ease-out"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <img 
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2558&auto=format&fit=crop" 
          alt="Elegant Living Room" 
          className="w-full h-full object-cover scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-black/75" />
      </div>

      {/* Content */}
      <div className={`relative z-10 w-full max-w-md transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <Button 
          variant="ghost" 
          className="mb-6 text-white hover:text-amber-400 hover:bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105" 
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Role Selection
        </Button>

        <Card className="border-2 border-white/20 bg-white/95 backdrop-blur-xl shadow-2xl hover:shadow-amber-500/20 transition-all duration-500">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</CardTitle>
            <CardDescription className="text-base text-gray-600">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "signup")}>
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100">
                <TabsTrigger value="login" className="text-base font-semibold data-[state=active]:bg-amber-500 data-[state=active]:text-white transition-all duration-300">
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="text-base font-semibold data-[state=active]:bg-amber-500 data-[state=active]:text-white transition-all duration-300">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-base font-semibold text-gray-700">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                      disabled={isLoading}
                      className="h-12 text-base border-gray-300 focus:border-amber-500 focus:ring-amber-500 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-base font-semibold text-gray-700">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                      disabled={isLoading}
                      className="h-12 text-base border-gray-300 focus:border-amber-500 focus:ring-amber-500 transition-all duration-300"
                    />
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-5 w-5" />
                      <AlertDescription className="text-sm">{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-base font-semibold text-gray-700">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="johndoe"
                      value={signupData.username}
                      onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                      required
                      disabled={isLoading}
                      className="h-12 text-base border-gray-300 focus:border-amber-500 focus:ring-amber-500 transition-all duration-300"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-base font-semibold text-gray-700">First Name</Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        value={signupData.firstName}
                        onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                        required
                        disabled={isLoading}
                        className="h-12 text-base border-gray-300 focus:border-amber-500 focus:ring-amber-500 transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-base font-semibold text-gray-700">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        value={signupData.lastName}
                        onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                        required
                        disabled={isLoading}
                        className="h-12 text-base border-gray-300 focus:border-amber-500 focus:ring-amber-500 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-base font-semibold text-gray-700">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                      disabled={isLoading}
                      className="h-12 text-base border-gray-300 focus:border-amber-500 focus:ring-amber-500 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-base font-semibold text-gray-700">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                      disabled={isLoading}
                      className="h-12 text-base border-gray-300 focus:border-amber-500 focus:ring-amber-500 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-base font-semibold text-gray-700">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      required
                      disabled={isLoading}
                      className="h-12 text-base border-gray-300 focus:border-amber-500 focus:ring-amber-500 transition-all duration-300"
                    />
                  </div>

                  {signupData.password !== signupData.confirmPassword && signupData.confirmPassword && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-5 w-5" />
                      <AlertDescription className="text-sm">Passwords do not match</AlertDescription>
                    </Alert>
                  )}

                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-5 w-5" />
                      <AlertDescription className="text-sm">{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}