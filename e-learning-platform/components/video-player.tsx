"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import type YT from "youtube-iframe"

interface VideoPlayerProps {
  url: string
  onComplete: () => void
}

export function VideoPlayer({ url, onComplete }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [player, setPlayer] = useState<YT.Player | null>(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Extract video ID from URL
  const getVideoId = (url: string) => {
    try {
      const urlObj = new URL(url)
      if (urlObj.hostname === "youtu.be") {
        return urlObj.pathname.slice(1)
      }
      return urlObj.searchParams.get("v")
    } catch {
      return null
    }
  }

  const videoId = getVideoId(url)

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      const firstScriptTag = document.getElementsByTagName("script")[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    }

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      if (!videoId) return

      new window.YT.Player(`youtube-player-${videoId}`, {
        videoId,
        height: "100%",
        width: "100%",
        playerVars: {
          autoplay: 0,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            setPlayer(event.target)
            setIsLoading(false)
          },
          onStateChange: (event) => {
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING)
          },
          onError: () => {
            setError("Failed to load video")
            setIsLoading(false)
          },
        },
      })
    }
  }, [videoId])

  useEffect(() => {
    if (player && isPlaying) {
      const interval = setInterval(() => {
        const currentTime = player.getCurrentTime()
        const duration = player.getDuration()
        const calculatedProgress = (currentTime / duration) * 100

        setProgress(calculatedProgress)

        if (calculatedProgress >= 95) {
          onComplete()
          clearInterval(interval)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [player, isPlaying, onComplete])

  if (!videoId) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Invalid video URL. Please provide a valid YouTube video URL.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}
        <div id={`youtube-player-${videoId}`} />
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}

// Add TypeScript definitions for YouTube IFrame API
declare global {
  interface Window {
    YT: typeof YT
    onYouTubeIframeAPIReady: () => void
  }
}

