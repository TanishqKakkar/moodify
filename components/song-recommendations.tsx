"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, SkipForward, Volume2 } from "lucide-react"

interface Song {
  title: string
  artist: string
  cover: string
}

interface SongRecommendationsProps {
  emotion: string
}

// Define song recommendations based on emotions
const songRecommendations: Record<string, Song[]> = {
  happy: [
    { title: "Happy", artist: "Pharrell Williams", cover: "/placeholder.svg?height=60&width=60" },
    { title: "Walking on Sunshine", artist: "Katrina & The Waves", cover: "/placeholder.svg?height=60&width=60" },
    { title: "Good as Hell", artist: "Lizzo", cover: "/placeholder.svg?height=60&width=60" },
  ],
  sad: [
    { title: "Someone Like You", artist: "Adele", cover: "/placeholder.svg?height=60&width=60" },
    { title: "Fix You", artist: "Coldplay", cover: "/placeholder.svg?height=60&width=60" },
    { title: "Hurt", artist: "Johnny Cash", cover: "/placeholder.svg?height=60&width=60" },
  ],
  angry: [
    { title: "Rage Against the Machine", artist: "Killing in the Name", cover: "/placeholder.svg?height=60&width=60" },
    { title: "Break Stuff", artist: "Limp Bizkit", cover: "/placeholder.svg?height=60&width=60" },
    { title: "Given Up", artist: "Linkin Park", cover: "/placeholder.svg?height=60&width=60" },
  ],
  fear: [
    { title: "Everybody's Scared", artist: "MISSIO", cover: "/placeholder.svg?height=60&width=60" },
    { title: "Fear", artist: "Kendrick Lamar", cover: "/placeholder.svg?height=60&width=60" },
    { title: "Paranoid", artist: "Black Sabbath", cover: "/placeholder.svg?height=60&width=60" },
  ],
  surprise: [
    { title: "Wow", artist: "Post Malone", cover: "/placeholder.svg?height=60&width=60" },
    { title: "Surprise Yourself", artist: "Jack Garratt", cover: "/placeholder.svg?height=60&width=60" },
    { title: "Surprise Hotel", artist: "Fool's Gold", cover: "/placeholder.svg?height=60&width=60" },
  ],
  disgust: [
    { title: "Creep", artist: "Radiohead", cover: "/placeholder.svg?height=60&width=60" },
    { title: "Loser", artist: "Beck", cover: "/placeholder.svg?height=60&width=60" },
    { title: "Somebody That I Used to Know", artist: "Gotye", cover: "/placeholder.svg?height=60&width=60" },
  ],
  neutral: [
    { title: "Breathe", artist: "Télépopmusik", cover: "/placeholder.svg?height=60&width=60" },
    { title: "Weightless", artist: "Marconi Union", cover: "/placeholder.svg?height=60&width=60" },
    { title: "Intro", artist: "The xx", cover: "/placeholder.svg?height=60&width=60" },
  ],
}

export default function SongRecommendations({ emotion }: SongRecommendationsProps) {
  const [currentSong, setCurrentSong] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const songs = songRecommendations[emotion as keyof typeof songRecommendations] || songRecommendations.neutral

  const togglePlay = (index: number) => {
    if (currentSong === index && isPlaying) {
      setIsPlaying(false)
    } else {
      setCurrentSong(index)
      setIsPlaying(true)
    }
  }

  const nextSong = () => {
    if (currentSong !== null) {
      const nextIndex = (currentSong + 1) % songs.length
      setCurrentSong(nextIndex)
      setIsPlaying(true)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Music for Your Mood</h3>
      <p className="text-sm text-muted-foreground mb-4">These songs complement your {emotion} emotional state</p>

      <div className="space-y-3">
        {songs.map((song, index) => (
          <Card key={index} className={`transition-all ${currentSong === index ? "border-primary" : ""}`}>
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <img
                    src={song.cover || "/placeholder.svg"}
                    alt={song.title}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute inset-0 m-auto h-8 w-8 rounded-full opacity-90"
                    onClick={() => togglePlay(index)}
                  >
                    {currentSong === index && isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{song.title}</p>
                  <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                </div>
                {currentSong === index && isPlaying && (
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1 items-center">
                      <div
                        className="w-1 h-3 bg-primary rounded-full animate-pulse"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-1 h-5 bg-primary rounded-full animate-pulse"
                        style={{ animationDelay: "200ms" }}
                      ></div>
                      <div
                        className="w-1 h-4 bg-primary rounded-full animate-pulse"
                        style={{ animationDelay: "400ms" }}
                      ></div>
                      <div
                        className="w-1 h-6 bg-primary rounded-full animate-pulse"
                        style={{ animationDelay: "600ms" }}
                      ></div>
                    </div>
                    <Button size="icon" variant="ghost" onClick={nextSong} className="h-8 w-8">
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="pt-2 text-center">
        <Button variant="outline" size="sm" className="gap-2">
          <Volume2 className="h-4 w-4" />
          View All Recommendations
        </Button>
      </div>
    </div>
  )
}

