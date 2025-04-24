import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Camera, Heart, Sparkles, Music } from "lucide-react"
import EmotionBackground from "@/components/emotion-background"
import { SiteHeader } from "@/components/site-header"
import { SignInButton, SignedOut, SignedIn } from "@clerk/nextjs"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <EmotionBackground emotion="neutral" />

      <SiteHeader />

      <main className="container relative z-10 py-12 md:py-24">
        <section className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="gradient-text neutral-gradient">Transform Your Emotions</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-xl text-muted-foreground md:text-2xl">
                Experience a digital landscape that evolves with your emotions
              </p>
            </div>
            <div className="space-x-4">
              {/* Show SignInButton only when signed out */}
              <SignedOut>
                <SignInButton mode="modal" redirectUrl="/detect" asChild>
                  <Button size="lg" className="gap-2">
                    <Sparkles className="h-5 w-5" />
                    Begin Your Journey
                  </Button>
                </SignInButton>
              </SignedOut>
              {/* Optionally, show something else when signed in */}
              <SignedIn>
                {/* Example: Redirect to /detect or show a button */}
                <Link href="/detect">
                  <Button size="lg" className="gap-2">
                    <Sparkles className="h-5 w-5" />
                    Go to Detect
                  </Button>
                </Link>
              </SignedIn>
              <Link href="#how-it-works">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto mt-24 max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">How Moodify Works</h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden bg-secondary/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Emotion Detection</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes your facial expressions in real-time to detect your emotional state.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden bg-secondary/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Digital Transformation</h3>
                <p className="text-muted-foreground">
                  Watch as your digital environment transforms to reflect your emotional state.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden bg-secondary/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Adaptive Storytelling</h3>
                <p className="text-muted-foreground">
                  Experience stories and content that adapt to your emotions for a personalized journey.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden bg-secondary/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  <Music className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Music Recommendations</h3>
                <p className="text-muted-foreground">
                  Discover songs that perfectly match your current emotional state.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden bg-secondary/50 backdrop-blur md:col-span-2">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Powered by Advanced AI</h3>
                <p className="text-muted-foreground">
                  Our emotion detection model is trained on thousands of facial expressions to accurately identify 7
                  distinct emotions: Happy, Sad, Angry, Fear, Surprise, Disgust, and Neutral.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-5xl">
          <div className="rounded-xl bg-secondary/50 p-8 backdrop-blur">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Ready to experience your emotions in a new way?
                </h2>
                <p className="text-muted-foreground">
                  Join thousands of users who are exploring their emotional landscapes and discovering new insights
                  about themselves.
                </p>
                <div>
                  <Link href="/register">
                    <Button size="lg" className="gap-2">
                      <Sparkles className="h-5 w-5" />
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-64 w-64 rounded-full bg-primary/20 p-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Music className="h-32 w-32 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Moodify. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

