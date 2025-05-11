"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { HeartIcon, LockIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// In a real application, this would be fetched from environment variables
// For this demo, we're hardcoding it, but in production you would use:
const CORRECT_PIN = process.env.NEXT_PUBLIC_LOGIN_PIN || "123456";
//const CORRECT_PIN = "123456" // Default PIN

export function LoginPortal() {
  const [pin, setPin] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const router = useRouter()
  const { toast } = useToast()

  // Check if user is already authenticated
  useEffect(() => {
    const authStatus = localStorage.getItem("wedding_builder_auth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
      router.push("/builder")
    }
  }, [router])

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and limit to 6 digits
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 6)
    setPin(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    // Simulate API call
    setTimeout(() => {
      if (pin === CORRECT_PIN) {
        // Set authentication in localStorage
        localStorage.setItem("wedding_builder_auth", "true");
  
        // Set authentication cookie
        document.cookie = "wedding_builder_auth=true; path=/; max-age=86400"; // Cookie valid for 1 day
  
        setIsAuthenticated(true);
  
        // Show success toast
        toast({
          title: "Login Successful",
          description: "Welcome to the Wedding Invitation Builder!",
        });
  
        // Navigate to /builder
        router.push("/builder");
      } else {
        setAttempts(attempts + 1);
        toast({
          title: "Incorrect PIN",
          description: `Please try again. Attempt ${attempts + 1} of 5.`,
          variant: "destructive",
        });
  
        // Lock out after 5 attempts
        if (attempts >= 4) {
          toast({
            title: "Too Many Attempts",
            description: "Please try again later.",
            variant: "destructive",
          });
          setPin("");
        }
      }
      setIsLoading(false);
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <HeartIcon className="h-12 w-12 text-pink-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-pink-600">Wedding Invitation Builder</CardTitle>
          <CardTitle className="text-2xl font-bold text-pink-600">Puri Remaja Asri</CardTitle>
          <CardDescription className="text-gray-600">🎉 Toko Rambutan 📱 Digital Computer 🚀</CardDescription>
          <CardDescription>Please enter your PIN to access the builder</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="password"
                placeholder="Enter 6-digit PIN"
                value={pin}
                onChange={handlePinChange}
                className="pl-10 text-center text-lg tracking-widest"
                maxLength={6}
                inputMode="numeric"
                pattern="[0-9]*"
                autoFocus
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={pin.length !== 6 || isLoading}>
              {isLoading ? "Verifying..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}