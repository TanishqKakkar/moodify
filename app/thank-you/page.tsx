"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import AuthCheck from "@/components/auth-check"
import EmotionBackground from "@/components/emotion-background"
import { SiteHeader } from "@/components/site-header"

export default function ThankYouPage() {
  // Clear emotion data when reaching thank you page
  useEffect(() => {
    localStorage.removeItem("emotion")
  }, [])

  return (
    <AuthCheck>
      <div className="relative min-h-screen">
        <EmotionBackground emotion="happy" />
        <SiteHeader />

        <div className="container flex min-h-screen flex-col items-center justify-center py-12">
          <Card className="w-full max-w-md text-center bg-background/80 backdrop-blur">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl">Thank You!</CardTitle>
              <CardDescription>We appreciate you taking the time to experience MoodScape.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your feedback helps us improve and create better emotional experiences. We hope you enjoyed your
                personalized MoodScape!
              </p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button asChild className="w-full">
                <Link href="/detect">Try Another Emotion</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/">Return Home</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AuthCheck>
  )
}

