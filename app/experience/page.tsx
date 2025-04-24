"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Brain, ChevronRight, LineChart, Sparkles, Music } from "lucide-react"
import AuthCheck from "@/components/auth-check"
import EmotionBackground from "@/components/emotion-background"
import EmotionStory from "@/components/emotion-story"
import EmotionVisualizer from "@/components/emotion-visualizer"
import SongRecommendations from "@/components/song-recommendations"
import { SiteHeader } from "@/components/site-header"

export default function ExperiencePage() {
  const [emotion, setEmotion] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"visualizer" | "story" | "music">("visualizer")
  const router = useRouter()

  useEffect(() => {
    // Get the detected emotion from localStorage
    const detectedEmotion = localStorage.getItem("emotion")
    if (detectedEmotion) {
      setEmotion(detectedEmotion)
    } else {
      // Default to neutral if no emotion is detected
      setEmotion("neutral")
    }
  }, [])

  const handleFeedback = () => {
    router.push("/feedback")
  }

  if (!emotion) {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <p>Loading your Moodify experience...</p>
      </div>
    )
  }

  return (
    <AuthCheck>
      <div className={`relative min-h-screen emotion-${emotion}`}>
        <EmotionBackground emotion={emotion} />
        <SiteHeader />

        <div className="container flex min-h-screen flex-col py-12">
          <div className="mb-8 text-center">
            <h1 className={`text-4xl font-bold gradient-text ${emotion}-gradient`}>
              Your {emotion.charAt(0).toUpperCase() + emotion.slice(1)} Moodscape
            </h1>
            <p className="mt-2 text-muted-foreground">Explore how your emotions transform your digital environment</p>
          </div>

          <div className="mx-auto mb-8 flex w-full max-w-md justify-center space-x-2 rounded-lg bg-secondary/30 p-1 backdrop-blur">
            <Button
              variant={activeTab === "visualizer" ? "default" : "ghost"}
              className="flex-1"
              onClick={() => setActiveTab("visualizer")}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Visualizer
            </Button>
            <Button
              variant={activeTab === "story" ? "default" : "ghost"}
              className="flex-1"
              onClick={() => setActiveTab("story")}
            >
              <Brain className="mr-2 h-4 w-4" />
              Story
            </Button>
            <Button
              variant={activeTab === "music" ? "default" : "ghost"}
              className="flex-1"
              onClick={() => setActiveTab("music")}
            >
              <Music className="mr-2 h-4 w-4" />
              Music
            </Button>
          </div>

          <Card className="mx-auto w-full max-w-4xl flex-1 bg-background/80 backdrop-blur">
            <CardContent className="p-6 md:p-10">
              {activeTab === "visualizer" ? (
                <EmotionVisualizer emotion={emotion} />
              ) : activeTab === "story" ? (
                <EmotionStory emotion={emotion} />
              ) : (
                <SongRecommendations emotion={emotion} />
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/detect">Try Another Emotion</Link>
              </Button>
              <Button onClick={handleFeedback} className="gap-1">
                Continue to Feedback
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-8 text-center">
            <Link href="/insights">
              <Button variant="outline" className="gap-2">
                <LineChart className="h-4 w-4" />
                View Your Emotional Insights
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AuthCheck>
  )
}

