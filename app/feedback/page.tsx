"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import AuthCheck from "@/components/auth-check"
import EmotionBackground from "@/components/emotion-background"
import { SiteHeader } from "@/components/site-header"
import { Loader2, MessageSquare, Star, ThumbsUp, Music, Sparkles, Brain } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FeedbackPage() {
  const [rating, setRating] = useState<number | null>(null)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [experienceRating, setExperienceRating] = useState<number | null>(null)
  const [accuracyRating, setAccuracyRating] = useState<number | null>(null)
  const [musicRating, setMusicRating] = useState<number | null>(null)
  const [storyRating, setStoryRating] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("overall")
  const router = useRouter()
  const { toast } = useToast()
  const [emotion, setEmotion] = useState<string | null>(null)

  // Get the detected emotion from localStorage
  useState(() => {
    const detectedEmotion = localStorage.getItem("emotion")
    if (detectedEmotion) {
      setEmotion(detectedEmotion)
    } else {
      setEmotion("neutral")
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!rating) {
      toast({
        variant: "destructive",
        title: "Rating required",
        description: "Please provide an overall rating before submitting.",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate sending feedback to a backend
    setTimeout(() => {
      toast({
        title: "Feedback submitted",
        description: "Thank you for your valuable feedback!",
      })
      setIsSubmitting(false)
      router.push("/thank-you")
    }, 1500)
  }

  return (
    <AuthCheck>
      <div className="relative min-h-screen">
        <EmotionBackground emotion={emotion || "neutral"} />
        <SiteHeader />

        <div className="container flex min-h-screen flex-col items-center justify-center py-12">
          <Card className="w-full max-w-2xl bg-background/80 backdrop-blur">
            <form onSubmit={handleSubmit}>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Share Your Feedback</CardTitle>
                <CardDescription>Help us improve your Moodify experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overall" className="flex flex-col items-center gap-1 py-2 h-auto">
                      <Star className="h-4 w-4" />
                      <span className="text-xs">Overall</span>
                    </TabsTrigger>
                    <TabsTrigger value="emotion" className="flex flex-col items-center gap-1 py-2 h-auto">
                      <Brain className="h-4 w-4" />
                      <span className="text-xs">Emotion</span>
                    </TabsTrigger>
                    <TabsTrigger value="visuals" className="flex flex-col items-center gap-1 py-2 h-auto">
                      <Sparkles className="h-4 w-4" />
                      <span className="text-xs">Visuals</span>
                    </TabsTrigger>
                    <TabsTrigger value="music" className="flex flex-col items-center gap-1 py-2 h-auto">
                      <Music className="h-4 w-4" />
                      <span className="text-xs">Music</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overall" className="space-y-4 pt-4">
                    <div className="space-y-3">
                      <h3 className="font-medium flex items-center gap-2">
                        <Star className="h-5 w-5 text-primary" />
                        Overall Experience
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        How would you rate your overall experience with Moodify?
                      </p>
                      <div className="flex justify-center">
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              className={`h-10 w-10 rounded-full flex items-center justify-center transition-all ${
                                rating && star <= rating
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                              }`}
                            >
                              {star}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="emotion" className="space-y-4 pt-4">
                    <div className="space-y-3">
                      <h3 className="font-medium flex items-center gap-2">
                        <ThumbsUp className="h-5 w-5 text-primary" />
                        Emotion Detection Accuracy
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        How accurately did our system detect your emotions?
                      </p>
                      <div className="flex justify-center">
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setAccuracyRating(star)}
                              className={`h-10 w-10 rounded-full flex items-center justify-center transition-all ${
                                accuracyRating && star <= accuracyRating
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                              }`}
                            >
                              {star}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-medium flex items-center gap-2">
                        <Brain className="h-5 w-5 text-primary" />
                        Story Experience
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        How would you rate the stories that matched your emotions?
                      </p>
                      <div className="flex justify-center">
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setStoryRating(star)}
                              className={`h-10 w-10 rounded-full flex items-center justify-center transition-all ${
                                storyRating && star <= storyRating
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                              }`}
                            >
                              {star}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="visuals" className="space-y-4 pt-4">
                    <div className="space-y-3">
                      <h3 className="font-medium flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        Visual Experience
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        How would you rate the visual experience of your Moodify?
                      </p>
                      <div className="flex justify-center">
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setExperienceRating(star)}
                              className={`h-10 w-10 rounded-full flex items-center justify-center transition-all ${
                                experienceRating && star <= experienceRating
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                              }`}
                            >
                              {star}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="music" className="space-y-4 pt-4">
                    <div className="space-y-3">
                      <h3 className="font-medium flex items-center gap-2">
                        <Music className="h-5 w-5 text-primary" />
                        Music Recommendations
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        How well did the music recommendations match your emotional state?
                      </p>
                      <div className="flex justify-center">
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setMusicRating(star)}
                              className={`h-10 w-10 rounded-full flex items-center justify-center transition-all ${
                                musicRating && star <= musicRating
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                              }`}
                            >
                              {star}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="space-y-3 pt-4">
                  <Label htmlFor="comment" className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Additional Comments
                  </Label>
                  <Textarea
                    id="comment"
                    placeholder="Share your thoughts, suggestions, or any issues you encountered..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={5}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Feedback"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </AuthCheck>
  )
}

