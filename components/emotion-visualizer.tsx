"use client"

import { useEffect, useRef } from "react"

const emotionColors: Record<string, string> = {
  Angry: "#ff4d4f",
  Disgust: "#52c41a",
  Fear: "#722ed1",
  Happy: "#faad14",
  Neutral: "#bfbfbf",
  Sad: "#1890ff",
  Surprise: "#eb2f96",
};

interface EmotionVisualizerProps {
  emotion: string
}

export default function EmotionVisualizer({ emotion }: EmotionVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const normalizedEmotion = emotion.toLowerCase() // Normalize once

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Animation variables
    let particles: Particle[] = []
    let animationFrameId: number

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor(x: number, y: number, size: number, speedX: number, speedY: number, color: string) {
        this.x = x
        this.y = y
        this.size = size
        this.speedX = speedX
        this.speedY = speedY
        this.color = color
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) {
          this.speedX *= -1
        }

        if (this.y < 0 || this.y > canvas.height) {
          this.speedY *= -1
        }
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    // Create particles based on emotion
    const createParticles = () => {
      particles = []
      const particleCount = 50
      const colors = getEmotionColors(normalizedEmotion)

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 10 + 2
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const speedX = (Math.random() - 0.5) * getEmotionSpeed(normalizedEmotion)
        const speedY = (Math.random() - 0.5) * getEmotionSpeed(normalizedEmotion)
        const color = colors[Math.floor(Math.random() * colors.length)]

        particles.push(new Particle(x, y, size, speedX, speedY, color))
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawEmotionBackground(ctx, canvas.width, canvas.height, normalizedEmotion)
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })
      drawConnections()
      animationFrameId = requestAnimationFrame(animate)
    }

    const drawConnections = () => {
      const maxDistance = 100
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < maxDistance) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${getEmotionRgb(normalizedEmotion)}, ${1 - distance / maxDistance})`
            ctx.lineWidth = 1
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    createParticles()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [emotion])

  return (
    <div className="flex flex-col space-y-6">
      <div className="text-center">
        <h2 className={`text-2xl font-bold gradient-text ${normalizedEmotion}-gradient`}>
          Your {capitalizeEmotion(normalizedEmotion)} Visualization
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">Watch how your emotions transform into visual patterns</p>
      </div>

      <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>

      <div className="prose prose-sm max-w-none dark:prose-invert">
        <h3>About Your {capitalizeEmotion(normalizedEmotion)} Visualization</h3>
        <p>{getEmotionDescription(normalizedEmotion)}</p>
      </div>
    </div>
  )
}

// Helper functions
function getEmotionColors(emotion: string): string[] {
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

function getEmotionSpeed(emotion: string): number {
  switch (emotion) {
    case "happy":
      return 3
    case "sad":
      return 1
    case "angry":
      return 4
    case "fear":
      return 3.5
    case "surprise":
      return 5
    case "disgust":
      return 2
    case "neutral":
    default:
      return 2
  }
}

function getEmotionRgb(emotion: string): string {
  switch (emotion) {
    case "happy":
      return "255, 215, 0"
    case "sad":
      return "0, 105, 255"
    case "angry":
      return "255, 0, 0"
    case "fear":
      return "128, 0, 128"
    case "surprise":
      return "0, 255, 0"
    case "disgust":
      return "0, 128, 128"
    case "neutral":
    default:
      return "128, 128, 128"
  }
}

function drawEmotionBackground(ctx: CanvasRenderingContext2D, width: number, height: number, emotion: string) {
  const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width / 2)

  switch (emotion) {
    case "happy":
      gradient.addColorStop(0, "rgba(255, 215, 0, 0.1)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      break
    case "sad":
      gradient.addColorStop(0, "rgba(0, 105, 255, 0.1)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      break
    case "angry":
      gradient.addColorStop(0, "rgba(255, 0, 0, 0.1)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      break
    case "fear":
      gradient.addColorStop(0, "rgba(128, 0, 128, 0.1)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      break
    case "surprise":
      gradient.addColorStop(0, "rgba(0, 255, 0, 0.1)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      break
    case "disgust":
      gradient.addColorStop(0, "rgba(0, 128, 128, 0.1)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      break
    case "neutral":
    default:
      gradient.addColorStop(0, "rgba(128, 128, 128, 0.1)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      break
  }

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
}

function getEmotionDescription(emotion: string): string {
  switch (emotion) {
    case "happy":
      return "Your happiness creates bright, energetic patterns with golden particles that move playfully across the canvas. The connections between particles represent the social bonds that happiness often strengthens."
    case "sad":
      return "Your sadness manifests as slow-moving blue particles that drift gently across the canvas. The connections between them are more sparse, reflecting the feeling of isolation that can accompany sadness."
    case "angry":
      return "Your anger generates fast, erratic red particles that move intensely across the canvas. The connections between particles are strong but chaotic, representing the turbulent energy of anger."
    case "fear":
      return "Your fear creates purple particles that move unpredictably, sometimes clustering together for safety. The connections between particles appear and disappear rapidly, reflecting the uncertainty of fear."
    case "surprise":
      return "Your surprise manifests as bright green particles that move in unexpected bursts across the canvas. The connections between particles form and break quickly, representing the sudden shifts in attention that come with surprise."
    case "disgust":
      return "Your disgust creates teal particles that tend to maintain distance from each other. The connections between particles are minimal, reflecting the aversion and withdrawal associated with disgust."
    case "neutral":
    default:
      return "Your neutral state creates a balanced pattern of gray particles moving at a moderate pace. The connections between particles are steady and predictable, reflecting a calm and centered emotional state."
  }
}


function capitalizeEmotion(emotion: string): string {
  return emotion.charAt(0).toUpperCase() + emotion.slice(1);
}

