//auth/user-auth-form

"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Loader2, AlertCircle, Sparkles } from "lucide-react";
import { useAuth } from "../../contexts/auth-context";

// FIXED: Changed from onBack to onClose
interface UserAuthFormProps {
  onClose: () => void;
}

export default function UserAuthForm({ onClose }: UserAuthFormProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const { login, signup, isLoading, error } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(loginData.email, loginData.password);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      return;
    }

    await signup({
      email: signupData.email,
      password: signupData.password,
      username: signupData.username,
      firstName: signupData.firstName,
      lastName: signupData.lastName,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop Overlay with Blur */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Stunning Background Image */}
      <div
        className="fixed inset-0 z-0 transition-transform duration-700 ease-out"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <img
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2558&auto=format&fit=crop"
          alt="Elegant Living Room"
          className="w-full h-full object-cover scale-110 opacity-30"
        />
      </div>

      {/* Brand Logo - Top Left */}
      <div className="fixed top-6 left-6 z-50">
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl px-6 py-3 shadow-2xl">
          <Sparkles className="w-7 h-7 text-amber-400 animate-pulse" />
          <span className="text-white font-black text-2xl tracking-tight">
            AMEN FURNITURE
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div
          ref={cardRef}
          className={`w-full max-w-md transition-all duration-700 ${
            isVisible
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-10 opacity-0 scale-95"
          }`}
        >
          <Card className="relative border-2 border-white/30 bg-white/95 backdrop-blur-xl shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 rounded-3xl overflow-hidden">
            {/* Close Button */}
            <Button
              onClick={onClose}
              variant="ghost"
              className="absolute top-4 right-4 z-50 w-10 h-10 p-0 rounded-full hover:bg-red-500/20 hover:text-red-600 transition-all duration-300 hover:scale-110 hover:rotate-90 border-2 border-transparent hover:border-red-500/30"
            >
              <X className="w-6 h-6" />
            </Button>

            <CardHeader className="text-center pb-6 pt-8">
              <div className="mx-auto mb-1 w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg animate-pulse-slow">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <CardTitle
                className="text-3xl font-bold text-gray-900 
              "
              >
                Welcome Back
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs
                value={activeTab}
                onValueChange={(v) => setActiveTab(v as "login" | "signup")}
              >
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 p-1 rounded-xl">
                  <TabsTrigger
                    value="login"
                    className="text-base font-semibold rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="text-base font-semibold rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="login-email"
                        className="text-base font-semibold text-gray-700"
                      >
                        Email
                      </Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="you@example.com"
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData({ ...loginData, email: e.target.value })
                        }
                        required
                        disabled={isLoading}
                        className="h-12 text-base border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="login-password"
                        className="text-base font-semibold text-gray-700"
                      >
                        Password
                      </Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                        required
                        disabled={isLoading}
                        className="h-12 text-base border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
                      />
                    </div>

                    {error && (
                      <Alert
                        variant="destructive"
                        className="rounded-xl border-2 animate-shake"
                      >
                        <AlertCircle className="h-5 w-5" />
                        <AlertDescription className="text-sm">
                          {error}
                        </AlertDescription>
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-semibold bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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
                      <Label
                        htmlFor="username"
                        className="text-base font-semibold text-gray-700"
                      >
                        Username
                      </Label>
                      <Input
                        id="username"
                        type="text"
                        placeholder="johndoe"
                        value={signupData.username}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            username: e.target.value,
                          })
                        }
                        required
                        disabled={isLoading}
                        className="h-12 text-base border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="firstName"
                          className="text-base font-semibold text-gray-700"
                        >
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          value={signupData.firstName}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              firstName: e.target.value,
                            })
                          }
                          required
                          disabled={isLoading}
                          className="h-12 text-base border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="lastName"
                          className="text-base font-semibold text-gray-700"
                        >
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          value={signupData.lastName}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              lastName: e.target.value,
                            })
                          }
                          required
                          disabled={isLoading}
                          className="h-12 text-base border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="signup-email"
                        className="text-base font-semibold text-gray-700"
                      >
                        Email
                      </Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        value={signupData.email}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            email: e.target.value,
                          })
                        }
                        required
                        disabled={isLoading}
                        className="h-12 text-base border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="signup-password"
                        className="text-base font-semibold text-gray-700"
                      >
                        Password
                      </Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={signupData.password}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            password: e.target.value,
                          })
                        }
                        required
                        disabled={isLoading}
                        className="h-12 text-base border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="confirm-password"
                        className="text-base font-semibold text-gray-700"
                      >
                        Confirm Password
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        value={signupData.confirmPassword}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            confirmPassword: e.target.value,
                          })
                        }
                        required
                        disabled={isLoading}
                        className="h-12 text-base border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
                      />
                    </div>

                    {signupData.password !== signupData.confirmPassword &&
                      signupData.confirmPassword && (
                        <Alert
                          variant="destructive"
                          className="rounded-xl border-2 animate-shake"
                        >
                          <AlertCircle className="h-5 w-5" />
                          <AlertDescription className="text-sm">
                            Passwords do not match
                          </AlertDescription>
                        </Alert>
                      )}

                    {error && (
                      <Alert
                        variant="destructive"
                        className="rounded-xl border-2 animate-shake"
                      >
                        <AlertCircle className="h-5 w-5" />
                        <AlertDescription className="text-sm">
                          {error}
                        </AlertDescription>
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-semibold bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
