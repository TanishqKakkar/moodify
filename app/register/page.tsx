"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Music, Loader2, Mail, Lock, User, Github, Chrome } from "lucide-react"
import EmotionBackground from "@/components/emotion-background"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please make sure your passwords match.",
      })
      return
    }

    if (!agreeTerms) {
      toast({
        variant: "destructive",
        title: "Terms and conditions",
        description: "Please agree to the terms and conditions to continue.",
      })
      return
    }

    setIsLoading(true)

    // Simulate registration
    setTimeout(() => {
      // In a real app, you would send registration data to a backend
      if (name && email && password) {
        // Store user session
        localStorage.setItem("user", JSON.stringify({ name, email }))
        toast({
          title: "Registration successful",
          description: "Redirecting to emotion detection...",
        })
        router.push("/detect")
      } else {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: "Please check your information and try again.",
        })
      }
      setIsLoading(false)
    }, 1500)
  }

  const handleSocialSignup = (provider: string) => {
    setSocialLoading(provider)

    // Simulate social authentication
    setTimeout(() => {
      // Store user session
      localStorage.setItem("user", JSON.stringify({ name: `User`, email: `user@${provider}.com` }))
      toast({
        title: "Registration successful",
        description: `Signed up with ${provider}. Redirecting to emotion detection...`,
      })
      router.push("/detect")
      setSocialLoading(null)
    }, 1500)
  }

  return (
    <div className="relative min-h-screen">
      <EmotionBackground emotion="neutral" />

      <div className="container flex min-h-screen flex-col items-center justify-center">
        <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
          <Button variant="ghost" className="flex items-center gap-1">
            <Music className="h-5 w-5 text-primary" />
            <span>Moodify</span>
          </Button>
        </Link>

        <div className="grid w-full max-w-[1000px] grid-cols-1 md:grid-cols-2 gap-6">
          <div className="hidden md:flex flex-col justify-center p-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight">Join Moodify</h1>
              <p className="text-muted-foreground">
                Create an account to start your emotional journey and discover a digital landscape that evolves with
                your feelings.
              </p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                <p className="text-sm">Personalized emotional experiences</p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                <p className="text-sm">Interactive visualizations</p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                <p className="text-sm">Stories that adapt to your mood</p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                <p className="text-sm">Music recommendations based on emotions</p>
              </div>
            </div>
          </div>

          <Card className="w-full bg-background/80 backdrop-blur">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Create an account</CardTitle>
              <CardDescription>Enter your information to start your emotional journey</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => handleSocialSignup("google")}
                      disabled={!!socialLoading}
                    >
                      {socialLoading === "google" ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Chrome className="mr-2 h-4 w-4" />
                      )}
                      Google
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => handleSocialSignup("github")}
                      disabled={!!socialLoading}
                    >
                      {socialLoading === "github" ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Github className="mr-2 h-4 w-4" />
                      )}
                      GitHub
                    </Button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
                      terms of service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
                      privacy policy
                    </Link>
                  </label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create account"
                  )}
                </Button>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary underline-offset-4 hover:underline">
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

