"use client"

import { useEffect, useRef } from "react"

interface EmotionBackgroundProps {
  emotion: string | null
}

export default function EmotionBackground({ emotion = "neutral" }: EmotionBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const normalizedEmotion = emotion ? emotion.toLowerCase() : "neutral" // Normalize

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    container.innerHTML = ""

    // Create particles based on emotion
    const particleCount = 50
    const colors = getEmotionColors(normalizedEmotion)

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"

      // Set random position
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`

      // Set random size
      const size = Math.random() * 30 + 10
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`

      // Set random color from emotion colors
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]

      // Set random animation duration
      particle.style.animationDuration = `${Math.random() * 5 + 3}s`

      // Set random animation delay
      particle.style.animationDelay = `${Math.random() * 5}s`

      container.appendChild(particle)
    }

    return () => {
      if (container) {
        container.innerHTML = ""
      }
    }
  }, [emotion])

  return <div ref={containerRef} className={`canvas-container emotion-${normalizedEmotion}`} aria-hidden="true" />
}

// Update helper to use lowercase cases
function getEmotionColors(emotion: string | null): string[] {
  switch (emotion) {
    case "happy":
      return ["rgba(255, 215, 0, 0.6)", "rgba(255, 165, 0, 0.6)", "rgba(255, 140, 0, 0.6)"]
    case "sad":
      return ["rgba(0, 105, 255, 0.6)", "rgba(0, 191, 255, 0.6)", "rgba(30, 144, 255, 0.6)"]
    case "angry":
      return ["rgba(255, 0, 0, 0.6)", "rgba(255, 69, 0, 0.6)", "rgba(255, 99, 71, 0.6)"]
    case "fear":
      return ["rgba(128, 0, 128, 0.6)", "rgba(153, 50, 204, 0.6)", "rgba(186, 85, 211, 0.6)"]
    case "surprise":
      return ["rgba(0, 255, 0, 0.6)", "rgba(127, 255, 0, 0.6)", "rgba(173, 255, 47, 0.6)"]
    case "disgust":
      return ["rgba(0, 128, 128, 0.6)", "rgba(32, 178, 170, 0.6)", "rgba(95, 158, 160, 0.6)"]
    case "neutral":
    default:
      return ["rgba(128, 128, 128, 0.6)", "rgba(169, 169, 169, 0.6)", "rgba(192, 192, 192, 0.6)"]
  }
}

