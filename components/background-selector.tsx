"use client"

import { useInvitationStore } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"

const BACKGROUNDS = [
  {
    id: "elegant-arch",
    name: "Elegant Arch",
    path: "/backgrounds/elegant-arch.jpeg",
  },
  {
    id: "golden-frame",
    name: "Golden Frame",
    path: "/backgrounds/golden-frame.jpeg",
  },
  {
    id: "damask-pattern",
    name: "Damask Pattern",
    path: "/backgrounds/damask-pattern.jpeg",
  },
  {
    id: "neon-tropical",
    name: "Neon Tropical",
    path: "/backgrounds/neon-tropical.jpg",
  },
]

// Update the BackgroundSelector component to show a preview of the selected background
export function BackgroundSelector() {
  const { presetBackground, setPresetBackground, customBackgroundImage, setSelectedBackgroundForUpload } =
    useInvitationStore()
  const [backgroundsBase64, setBackgroundsBase64] = useState<{ [key: string]: string }>({})
  const [selectedBackground, setSelectedBackground] = useState<string | null>(null)

  // Convert background images to base64 on component mount
  useEffect(() => {
    const loadBackgroundsAsBase64 = async () => {
      const base64Images: { [key: string]: string } = {}

      for (const bg of BACKGROUNDS) {
        try {
          const response = await fetch(bg.path)
          const blob = await response.blob()
          const reader = new FileReader()

          reader.onload = () => {
            base64Images[bg.path] = reader.result as string
            if (Object.keys(base64Images).length === BACKGROUNDS.length) {
              setBackgroundsBase64(base64Images)
            }
          }

          reader.readAsDataURL(blob)
        } catch (error) {
          console.error(`Error loading background image ${bg.path}:`, error)
        }
      }
    }

    loadBackgroundsAsBase64()
  }, [])

  // Update local state when presetBackground changes
  useEffect(() => {
    if (presetBackground) {
      // Find the path that matches either directly or as base64
      const matchingBg = BACKGROUNDS.find(
        (bg) => presetBackground === bg.path || presetBackground === backgroundsBase64[bg.path],
      )
      if (matchingBg) {
        setSelectedBackground(matchingBg.path)
      }
    } else {
      setSelectedBackground(null)
    }
  }, [presetBackground, backgroundsBase64])

  const handleBackgroundChange = (path: string) => {
    console.log("Setting background to:", path)
    setSelectedBackground(path)

    // Use the base64 version if available
    const base64Image = backgroundsBase64[path]
    if (base64Image) {
      setPresetBackground(base64Image)
      setSelectedBackgroundForUpload(base64Image)
    } else {
      setPresetBackground(path)
      setSelectedBackgroundForUpload(path)
    }
  }

  // Find the selected background name for display
  const selectedBgInfo = BACKGROUNDS.find((bg) => bg.path === selectedBackground)

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Select Background</h3>
      {customBackgroundImage && (
        <p className="text-sm text-amber-600 mb-2">
          Note: Custom background image is currently active and will override these selections.
        </p>
      )}
      <RadioGroup
        value={selectedBackground || ""}
        onValueChange={handleBackgroundChange}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {BACKGROUNDS.map((bg) => {
          const isSelected = selectedBackground === bg.path
          return (
            <div key={bg.id} className="space-y-2">
              <RadioGroupItem value={bg.path} id={bg.id} className="sr-only" />
              <Label htmlFor={bg.id} className="cursor-pointer">
                <Card
                  className={`overflow-hidden transition-all hover:scale-105 ${
                    isSelected ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <div className="h-32 w-full">
                    <img src={bg.path || "/placeholder.svg"} alt={bg.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-2 text-center text-sm">{bg.name}</div>
                </Card>
              </Label>
            </div>
          )
        })}
      </RadioGroup>

      {/* Preview of selected background */}
      {selectedBackground && selectedBgInfo && (
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-2">Selected Background: {selectedBgInfo?.name}</h4>
          <div className="border rounded-md overflow-hidden">
            <img
              src={selectedBackground || "/placeholder.svg"}
              alt="Selected background"
              className="w-full h-40 object-cover"
            />
          </div>
        </div>
      )}
    </div>
  )
}
