"use client"

import type React from "react"
import { useInvitationStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card } from "@/components/ui/card"

export function MainImage() {
  const {
    mainImage,
    setMainImage,
    colorTheme,
    enableEffects,
    enableRgbEffects,
    enableShadows,
    rgbIntensity,
    animationSpeed,
    enableHoverEffects,
    photoShape,
    setPhotoShape,
  } = useInvitationStore()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        setMainImage(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setMainImage("")
  }

  // Calculate effect classes based on settings
  const photoEffectClass = enableEffects ? `photo-border${enableRgbEffects ? " photo-border-" + colorTheme : ""}` : ""
  const shadowStyle = enableShadows && enableEffects ? { boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)" } : {}

  // Shape classes
  const getShapeClass = () => {
    switch (photoShape) {
      case "square":
        return "rounded-md"
      case "circle":
        return "rounded-full"
      default:
        return "rounded-full" // Default to circle if no selection
    }
  }

  return (
    <div className="space-y-6">
      <Label className="block text-center text-lg font-medium">Main Wedding Photo</Label>

      <div className="space-y-4">
        <Label className="block text-sm">Select Photo Shape</Label>
        <RadioGroup value={photoShape || ""} onValueChange={setPhotoShape} className="flex justify-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <RadioGroupItem value="circle" id="shape-circle" className="sr-only" />
            <Label htmlFor="shape-circle" className="cursor-pointer">
              <Card
                className={`w-16 h-16 flex items-center justify-center ${photoShape === "circle" ? "ring-2 ring-primary" : ""}`}
              >
                <div className="w-12 h-12 rounded-full bg-gray-200"></div>
              </Card>
              <span className="text-xs text-center block mt-1">Circle</span>
            </Label>
          </div>

          <div className="flex flex-col items-center gap-2">
            <RadioGroupItem value="square" id="shape-square" className="sr-only" />
            <Label htmlFor="shape-square" className="cursor-pointer">
              <Card
                className={`w-16 h-16 flex items-center justify-center ${photoShape === "square" ? "ring-2 ring-primary" : ""}`}
              >
                <div className="w-12 h-12 rounded-md bg-gray-200"></div>
              </Card>
              <span className="text-xs text-center block mt-1">Square</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-center">
        <div
          className={`relative w-64 h-64 overflow-hidden border-2 ${getShapeClass()} ${photoEffectClass}`}
          style={shadowStyle}
        >
          {mainImage ? (
            <>
              <img src={mainImage || "/placeholder.svg"} alt="Main Wedding" className="w-full h-full object-cover" />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <label
                htmlFor="main-photo-upload"
                className="cursor-pointer bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm"
              >
                Upload Photo
              </label>
              <input
                id="main-photo-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          )}
        </div>
      </div>
      {mainImage && (
        <div className="flex justify-center">
          <label
            htmlFor="main-photo-upload"
            className="cursor-pointer bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm"
          >
            Change Photo
          </label>
          <input id="main-photo-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </div>
      )}

      <style jsx global>{`
        .photo-border {
          position: relative;
          transition: transform 0.3s ease;
        }
        
        .photo-border:hover {
          transform: ${enableEffects && enableHoverEffects ? "scale(1.05)" : "none"};
        }
        
        .photo-border-rgb::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          z-index: -1;
          background: linear-gradient(90deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
          background-size: 400% 400%;
          border-radius: 50%;
          filter: blur(3px);
          animation: flowingBorder ${animationSpeed}s linear infinite;
          opacity: ${rgbIntensity / 10};
        }
        
        .photo-border-golden::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          z-index: -1;
          background: linear-gradient(90deg, #FFD700, #FFA500, #B8860B, #FFD700);
          background-size: 400% 400%;
          border-radius: 50%;
          filter: blur(3px);
          animation: flowingBorder ${animationSpeed}s linear infinite;
          opacity: ${rgbIntensity / 10};
        }
        
        .photo-border-rose::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          z-index: -1;
          background: linear-gradient(90deg, #FF80AB, #FF4081, #C2185B, #FF80AB);
          background-size: 400% 400%;
          border-radius: 50%;
          filter: blur(3px);
          animation: flowingBorder ${animationSpeed}s linear infinite;
          opacity: ${rgbIntensity / 10};
        }
        
        .photo-border-ocean::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          z-index: -1;
          background: linear-gradient(90deg, #00B0FF, #0091EA, #01579B, #00B0FF);
          background-size: 400% 400%;
          border-radius: 50%;
          filter: blur(3px);
          animation: flowingBorder ${animationSpeed}s linear infinite;
          opacity: ${rgbIntensity / 10};
        }
        
        .photo-border-emerald::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          z-index: -1;
          background: linear-gradient(90deg, #00E676, #00C853, #1B5E20, #00E676);
          background-size: 400% 400%;
          border-radius: 50%;
          filter: blur(3px);
          animation: flowingBorder ${animationSpeed}s linear infinite;
          opacity: ${rgbIntensity / 10};
        }
        
        .photo-border-purple::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          z-index: -1;
          background: linear-gradient(90deg, #AA00FF, #7C4DFF, #6200EA, #AA00FF);
          background-size: 400% 400%;
          border-radius: 50%;
          filter: blur(3px);
          animation: flowingBorder ${animationSpeed}s linear infinite;
          opacity: ${rgbIntensity / 10};
        }
        
        @keyframes flowingBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  )
}
