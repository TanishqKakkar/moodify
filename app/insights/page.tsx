"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AuthCheck from "@/components/auth-check"
import EmotionBackground from "@/components/emotion-background"
import { SiteHeader } from "@/components/site-header"

// Mock data for emotion history
const mockEmotionHistory = [
  { date: "2023-03-01", emotion: "happy" },
  { date: "2023-03-02", emotion: "neutral" },
  { date: "2023-03-03", emotion: "sad" },
  { date: "2023-03-04", emotion: "angry" },
  { date: "2023-03-05", emotion: "happy" },
  { date: "2023-03-06", emotion: "surprise" },
  { date: "2023-03-07", emotion: "neutral" },
  { date: "2023-03-08", emotion: "fear" },
  { date: "2023-03-09", emotion: "happy" },
  { date: "2023-03-10", emotion: "disgust" },
]

export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState("history")

  return (
    <AuthCheck>
      <div className="relative min-h-screen">
        <EmotionBackground emotion="neutral" />
        <SiteHeader />

        <div className="container py-12">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold">Your Emotional Insights</h1>
              <p className="mt-2 text-muted-foreground">
                Track your emotional patterns and gain insights about yourself
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="history">Emotion History</TabsTrigger>
                <TabsTrigger value="patterns">Patterns</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>

              <TabsContent value="history" className="space-y-4">
                <Card className="bg-background/80 backdrop-blur">
                  <CardHeader>
                    <CardTitle>Your Recent Emotions</CardTitle>
                    <CardDescription>A timeline of your emotional states</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockEmotionHistory.map((entry, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="flex-shrink-0 text-sm text-muted-foreground">
                            {new Date(entry.date).toLocaleDateString()}
                          </div>
                          <div
                            className={`h-2 w-2 rounded-full bg-${entry.emotion === "neutral" ? "gray" : entry.emotion}-500`}
                          />
                          <div className="flex-1">
                            <div className="h-2 rounded-full bg-secondary">
                              <div
                                className={`h-2 rounded-full bg-primary theme-${entry.emotion}`}
                                style={{ width: "100%" }}
                              />
                            </div>
                          </div>
                          <div className="flex-shrink-0 font-medium capitalize">{entry.emotion}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="patterns" className="space-y-4">
                <Card className="bg-background/80 backdrop-blur">
                  <CardHeader>
                    <CardTitle>Emotional Patterns</CardTitle>
                    <CardDescription>Insights about your emotional trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg bg-secondary/50 p-4">
                        <h3 className="mb-2 font-medium">Dominant Emotions</h3>
                        <p className="text-sm text-muted-foreground">
                          Your most frequent emotions are <span className="font-medium">Happy</span> and{" "}
                          <span className="font-medium">Neutral</span>, which appeared in 30% and 20% of your sessions
                          respectively.
                        </p>
                      </div>

                      <div className="rounded-lg bg-secondary/50 p-4">
                        <h3 className="mb-2 font-medium">Weekly Patterns</h3>
                        <p className="text-sm text-muted-foreground">
                          You tend to experience more positive emotions on weekends and more neutral emotions during the
                          workweek.
                        </p>
                      </div>

                      <div className="rounded-lg bg-secondary/50 p-4">
                        <h3 className="mb-2 font-medium">Emotional Transitions</h3>
                        <p className="text-sm text-muted-foreground">
                          You often transition from Sad to Happy within 2-3 days, showing good emotional resilience.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4">
                <Card className="bg-background/80 backdrop-blur">
                  <CardHeader>
                    <CardTitle>Personalized Recommendations</CardTitle>
                    <CardDescription>Suggestions based on your emotional patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg bg-secondary/50 p-4">
                        <h3 className="mb-2 font-medium">Content Recommendations</h3>
                        <p className="text-sm text-muted-foreground">
                          Based on your emotional patterns, you might enjoy stories with themes of adventure and
                          discovery, which tend to enhance your already positive emotional states.
                        </p>
                      </div>

                      <div className="rounded-lg bg-secondary/50 p-4">
                        <h3 className="mb-2 font-medium">Emotional Balance</h3>
                        <p className="text-sm text-muted-foreground">
                          Your emotional range is diverse, which is healthy. Continue exploring different emotional
                          states through varied experiences and content.
                        </p>
                      </div>

                      <div className="rounded-lg bg-secondary/50 p-4">
                        <h3 className="mb-2 font-medium">Mindfulness Suggestion</h3>
                        <p className="text-sm text-muted-foreground">
                          When experiencing anger or fear, try engaging with calming content or practicing mindfulness
                          exercises to help transition to more neutral or positive states.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AuthCheck>
  )
}

