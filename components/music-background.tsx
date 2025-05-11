"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useInvitationStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Music, X, Play, Pause } from "lucide-react"

export function MusicBackground() {
  const {
    backgroundMusic,
    setBackgroundMusic,
    autoplayMusic,
    setAutoplayMusic,
    loopMusic,
    setLoopMusic,
    musicVolume,
    setMusicVolume,
  } = useInvitationStore()
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleMusicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check if the file is an audio file
      if (!file.type.startsWith("audio/")) {
        alert("Please upload an audio file (.mp3, .wav, etc.)")
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        setBackgroundMusic(result)

        // Reset audio player
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current.load()
          setIsPlaying(false)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveMusic = () => {
    setBackgroundMusic("")
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setMusicVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="music-upload" className="text-base font-medium">
            Background Music
          </Label>
          {backgroundMusic && (
            <Button variant="outline" size="sm" onClick={handleRemoveMusic} className="flex items-center gap-1">
              <X className="h-4 w-4" /> Remove
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Input
            id="music-upload"
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleMusicUpload}
            className="flex-1"
          />
        </div>

        {backgroundMusic && (
          <div className="space-y-4 p-4 border rounded-md bg-muted/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={togglePlay} className="h-8 w-8">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <span className="text-sm font-medium">Preview</span>
              </div>
              <Music className="h-5 w-5 text-muted-foreground" />
            </div>

            <audio
              ref={audioRef}
              src={backgroundMusic}
              loop={loopMusic}
              className="hidden"
              onEnded={() => setIsPlaying(false)}
            />

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="music-volume">Volume</Label>
                <span className="text-xs text-muted-foreground">{musicVolume}%</span>
              </div>
              <Slider
                id="music-volume"
                min={0}
                max={100}
                step={1}
                value={[musicVolume]}
                onValueChange={handleVolumeChange}
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center space-x-2">
                <Switch id="autoplay-music" checked={autoplayMusic} onCheckedChange={setAutoplayMusic} />
                <Label htmlFor="autoplay-music">Autoplay music when invitation opens</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="loop-music" checked={loopMusic} onCheckedChange={setLoopMusic} />
                <Label htmlFor="loop-music">Loop music</Label>
              </div>
            </div>
          </div>
        )}

        {!backgroundMusic && (
          <div className="text-center p-6 border border-dashed rounded-md bg-muted/10">
            <Music className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Upload an audio file (.mp3, .wav, .ogg) to add background music to your invitation
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
