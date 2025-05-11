"use client"

import type React from "react"
import { useInvitationStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

export function CouplePhotos() {
  const {
    malePhoto,
    setMalePhoto,
    femalePhoto,
    setFemalePhoto,
    colorTheme,
    enableEffects,
    enableRgbEffects,
    enableShadows,
    rgbIntensity,
    animationSpeed,
    enableHoverEffects,
  } = useInvitationStore()

  const handleMalePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        setMalePhoto(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFemalePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        setFemalePhoto(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveMalePhoto = () => {
    setMalePhoto("")
  }

  const handleRemoveFemalePhoto = () => {
    setFemalePhoto("")
  }

  // Calculate effect classes based on settings
  const photoEffectClass = enableEffects ? `photo-border${enableRgbEffects ? " photo-border-" + colorTheme : ""}` : ""
  const shadowStyle = enableShadows && enableEffects ? { boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)" } : {}

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <Label className="block text-center">Groom Photo</Label>
          <div className="flex justify-center">
            <div
              className={`relative w-48 h-48 rounded-full overflow-hidden border-2 ${photoEffectClass}`}
              style={shadowStyle}
            >
              {malePhoto ? (
                <>
                  <img src={malePhoto || "/placeholder.svg"} alt="Groom" className="w-full h-full object-cover" />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={handleRemoveMalePhoto}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <label
                    htmlFor="male-photo-upload"
                    className="cursor-pointer bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm"
                  >
                    Upload Photo
                  </label>
                  <input
                    id="male-photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleMalePhotoChange}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </div>
          {malePhoto && (
            <div className="flex justify-center">
              <label
                htmlFor="male-photo-upload"
                className="cursor-pointer bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm"
              >
                Change Photo
              </label>
              <input
                id="male-photo-upload"
                type="file"
                accept="image/*"
                onChange={handleMalePhotoChange}
                className="hidden"
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Label className="block text-center">Bride Photo</Label>
          <div className="flex justify-center">
            <div
              className={`relative w-48 h-48 rounded-full overflow-hidden border-2 ${photoEffectClass}`}
              style={shadowStyle}
            >
              {femalePhoto ? (
                <>
                  <img src={femalePhoto || "/placeholder.svg"} alt="Bride" className="w-full h-full object-cover" />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={handleRemoveFemalePhoto}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <label
                    htmlFor="female-photo-upload"
                    className="cursor-pointer bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm"
                  >
                    Upload Photo
                  </label>
                  <input
                    id="female-photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFemalePhotoChange}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </div>
          {femalePhoto && (
            <div className="flex justify-center">
              <label
                htmlFor="female-photo-upload"
                className="cursor-pointer bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm"
              >
                Change Photo
              </label>
              <input
                id="female-photo-upload"
                type="file"
                accept="image/*"
                onChange={handleFemalePhotoChange}
                className="hidden"
              />
            </div>
          )}
        </div>
      </div>

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
