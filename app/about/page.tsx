import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { Brain, Heart, Sparkles, Users } from "lucide-react"
import EmotionBackground from "@/components/emotion-background"

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <EmotionBackground emotion="neutral" />

      <SiteHeader />

      <main className="container relative z-10 py-12 md:py-24">
        <section className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                <span className="gradient-text neutral-gradient">About MoodScape</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-xl text-muted-foreground md:text-2xl">
                Transforming emotions into digital experiences
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold">Our Mission</h2>
              <p className="mb-4 text-lg text-muted-foreground">
                At MoodScape, we believe that emotions are the foundation of human experience. Our mission is to help
                people understand and explore their emotions in new and meaningful ways.
              </p>
              <p className="mb-4 text-lg text-muted-foreground">
                Through cutting-edge AI technology and creative storytelling, we create personalized digital experiences
                that respond to your emotional state, helping you gain insights about yourself and connect more deeply
                with your feelings.
              </p>
              <p className="text-lg text-muted-foreground">
                Whether you're seeking emotional awareness, creative inspiration, or simply a unique digital experience,
                MoodScape offers a journey that adapts to you.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-64 w-64 rounded-full bg-primary/20 p-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Heart className="h-32 w-32 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Team</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="overflow-hidden bg-secondary/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary/20 mx-auto">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-center">The Visionaries</h3>
                <p className="text-muted-foreground text-center">
                  Our founders combined expertise in AI, psychology, and design to create a new way of experiencing
                  emotions digitally.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden bg-secondary/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary/20 mx-auto">
                  <Brain className="h-12 w-12 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-center">The AI Team</h3>
                <p className="text-muted-foreground text-center">
                  Our AI specialists developed advanced emotion detection models that can accurately identify seven
                  distinct emotional states.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden bg-secondary/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary/20 mx-auto">
                  <Sparkles className="h-12 w-12 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-center">The Creatives</h3>
                <p className="text-muted-foreground text-center">
                  Our storytellers, designers, and artists transform emotional data into meaningful and beautiful
                  digital experiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-5xl">
          <div className="rounded-xl bg-secondary/50 p-8 backdrop-blur">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Ready to explore your emotions?</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl">
                Join thousands of users who are discovering new insights about themselves through our emotional
                landscape technology.
              </p>
              <div className="pt-4">
                <Link href="/register">
                  <Button size="lg" className="gap-2">
                    <Sparkles className="h-5 w-5" />
                    Start Your Journey
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} MoodScape. All rights reserved.
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

