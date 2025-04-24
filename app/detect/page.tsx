"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Camera, Loader2 } from "lucide-react"
import AuthCheck from "@/components/auth-check"
import EmotionBackground from "@/components/emotion-background"
//import { loadTensorflowModel } from "@/lib/emotion-detection"
import { SiteHeader } from "@/components/site-header"
import { detectEmotion as detectEmotionAPI } from "@/lib/emotion-detection"

export default function DetectPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isModelLoading, setIsModelLoading] = useState(true)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [detectedEmotion, setDetectedEmotion] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  // Load TensorFlow.js model
  useEffect(() => {
    const loadModel = async () => {
      try {
        // REMOVE or COMMENT OUT this line:
        // await loadTensorflowModel()

        setIsModelLoading(false)
        toast({
          title: "AI model loaded",
          description: "Our emotion detection model is ready to use.",
        })
      } catch (error) {
        console.error("Failed to load model:", error)
        toast({
          variant: "destructive",
          title: "Model loading failed",
          description: "Please refresh the page to try again.",
        })
      }
    }

    loadModel()
  }, [toast])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCameraActive(true)
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Camera access denied",
        description: "Please allow camera access to detect emotions.",
      })
      console.error("Error accessing camera:", err)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setIsCameraActive(false)
    }
  }

  const detectEmotion = () => {
    if (!isCameraActive) return

    setIsLoading(true)

    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)

        canvasRef.current.toBlob(async (blob) => {
          if (blob) {
            try {
              const emotion = await detectEmotionAPI(blob)
              setDetectedEmotion(emotion)
              toast({
                title: "Emotion detected!",
                description: `We detected that you're feeling ${emotion}.`,
              })
              // Store emotion in lowercase and navigate to /story
              localStorage.setItem("emotion", emotion.toLowerCase());
              setTimeout(() => {
                router.push("/experience") // Go to experience page, not story
              }, 2000)
            } catch (error) {
              toast({
                variant: "destructive",
                title: "Detection failed",
                description: "Could not detect emotion. Please try again.",
              })
            } finally {
              setIsLoading(false)
            }
          }
        }, "image/png")
      }
    }
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <AuthCheck>
      <div className="relative min-h-screen">
        <EmotionBackground emotion={detectedEmotion } />
        <SiteHeader />

        <div className="container flex min-h-screen flex-col items-center justify-center py-12">
          <Card className="w-full max-w-3xl bg-background/80 backdrop-blur">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Emotion Detection</CardTitle>
              <CardDescription>
                We'll analyze your facial expressions to create your personalized MoodScape
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              <div className="relative aspect-video w-full max-w-xl overflow-hidden rounded-lg bg-muted">
                {!isCameraActive && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Camera className="mb-2 h-12 w-12 text-muted-foreground" />
                    <p className="text-center text-muted-foreground">Camera is not active</p>
                  </div>
                )}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`h-full w-full object-cover ${!isCameraActive ? "hidden" : ""}`}
                />
                <canvas ref={canvasRef} className="hidden" />

                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                    <Loader2 className="mb-2 h-12 w-12 animate-spin text-primary" />
                    <p className="text-center font-medium">Analyzing your emotions...</p>
                  </div>
                )}

                {detectedEmotion && !isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                    <div className="text-center">
                      <p className="mb-2 text-xl font-bold">Detected Emotion:</p>
                      <p className="text-3xl font-bold text-primary capitalize">{detectedEmotion}</p>
                      <p className="mt-4">Creating your personalized MoodScape...</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
                {!isCameraActive ? (
                  <Button onClick={startCamera} className="flex-1" disabled={isModelLoading}>
                    {isModelLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading AI Model...
                      </>
                    ) : (
                      "Start Camera"
                    )}
                  </Button>
                ) : (
                  <>
                    <Button onClick={stopCamera} variant="outline" className="flex-1">
                      Stop Camera
                    </Button>
                    <Button onClick={detectEmotion} disabled={isLoading || !!detectedEmotion} className="flex-1">
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Detecting...
                        </>
                      ) : (
                        "Detect Emotion"
                      )}
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center text-sm text-muted-foreground">
              <p>Your privacy is important to us. Images are processed locally and not stored.</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AuthCheck>
  )
}

