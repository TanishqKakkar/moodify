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
import { Music, Loader2, Mail, Lock, Github, Chrome } from "lucide-react"
import EmotionBackground from "@/components/emotion-background"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    setTimeout(() => {
      // In a real app, you would validate credentials against a backend
      if (email && password) {
        // Store user session
        localStorage.setItem("user", JSON.stringify({ email }))
        toast({
          title: "Login successful",
          description: "Redirecting to your Moodify experience...",
        })
        router.push("/detect")
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Please check your credentials and try again.",
        })
      }
      setIsLoading(false)
    }, 1500)
  }

  const handleSocialLogin = (provider: string) => {
    setSocialLoading(provider)

    // Simulate social authentication
    setTimeout(() => {
      // Store user session
      localStorage.setItem("user", JSON.stringify({ email: `user@${provider}.com` }))
      toast({
        title: "Login successful",
        description: `Signed in with ${provider}. Redirecting to your Moodify experience...`,
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
              <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
              <p className="text-muted-foreground">
                Sign in to your account to continue your emotional journey and explore your personalized Moodify
                experience.
              </p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                <p className="text-sm">Real-time emotion detection</p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                <p className="text-sm">Personalized visual experiences</p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                <p className="text-sm">Adaptive storytelling</p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                <p className="text-sm">Music recommendations based on mood</p>
              </div>
            </div>
          </div>

          <Card className="w-full bg-background/80 backdrop-blur">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Sign in</CardTitle>
              <CardDescription>Enter your email and password to access your Moodify experience</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => handleSocialLogin("google")}
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
                      onClick={() => handleSocialLogin("github")}
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-primary underline-offset-4 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
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
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="text-primary underline-offset-4 hover:underline">
                    Sign up
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

