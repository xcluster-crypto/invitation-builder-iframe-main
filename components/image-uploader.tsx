"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, FolderOpen, LinkIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { useInvitationStore } from "@/lib/store"

interface ImageUploaderProps {
  currentImage: string
  onImageSelected: (imageUrl: string) => void
  label: string
  isBackground?: boolean
}

// Define preset backgrounds
const PRESET_BACKGROUNDS = [
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

export function ImageUploader({ currentImage, onImageSelected, label, isBackground = false }: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(currentImage)
  const [imageUrl, setImageUrl] = useState<string>(currentImage)
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { selectedBackgroundForUpload, setSelectedBackgroundForUpload, setPresetBackground } = useInvitationStore()

  // Listen for changes to selectedBackgroundForUpload
  useEffect(() => {
    if (selectedBackgroundForUpload && isBackground) {
      setImageUrl(selectedBackgroundForUpload)
      setPreviewUrl(selectedBackgroundForUpload)
      onImageSelected(selectedBackgroundForUpload)
      // Clear the selection after applying it
      setSelectedBackgroundForUpload("")
    }
  }, [selectedBackgroundForUpload, isBackground, onImageSelected, setSelectedBackgroundForUpload])

  // Update local state when currentImage changes
  useEffect(() => {
    setPreviewUrl(currentImage)
    setImageUrl(currentImage)
  }, [currentImage])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        setPreviewUrl(result)
        setImageUrl(result)
        onImageSelected(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value)
  }

  const handleUrlSubmit = () => {
    if (imageUrl) {
      setPreviewUrl(imageUrl)
      onImageSelected(imageUrl)

      // When applying a custom background image, clear the selected preset background
      if (isBackground) {
        setPresetBackground("")
      }
    }
  }

  const handleRemoveImage = () => {
    setPreviewUrl("")
    setImageUrl("")
    onImageSelected("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handlePresetSelect = (path: string) => {
    setPreviewUrl(path)
    setImageUrl(path)
    onImageSelected(path)
    setIsDialogOpen(false)
  }

  const toggleUrlInput = () => {
    setShowUrlInput(!showUrlInput)
  }

  return (
    <div className="space-y-4">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="image-upload">{label}</Label>

        {isBackground ? (
          <div className="space-y-3">
            {/* Hidden file input */}
            <Input
              id="image-upload"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            {/* URL input field - hidden by default */}
            {showUrlInput && (
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Enter image URL or select from presets"
                  value={imageUrl}
                  onChange={handleUrlChange}
                  className="flex-1"
                />
              </div>
            )}

            <div className="flex items-center gap-2">
              {/* Direct file upload button */}
              <Button
                variant="outline"
                className="flex-1 flex items-center gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <FolderOpen size={16} />
                Choose Background
              </Button>

              {/* Dialog for preset backgrounds */}
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex-1 flex items-center gap-2">
                    <LinkIcon size={16} />
                    Preset Backgrounds
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Select Background Image</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-2 py-4">
                    {PRESET_BACKGROUNDS.map((bg) => (
                      <Card
                        key={bg.id}
                        className="overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                        onClick={() => handlePresetSelect(bg.path)}
                      >
                        <div className="h-24 w-full">
                          <img
                            src={bg.path || "/placeholder.svg"}
                            alt={bg.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-2 text-center text-sm">{bg.name}</div>
                      </Card>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>

              {/* URL toggle button */}
              <Button variant={showUrlInput ? "default" : "outline"} onClick={toggleUrlInput} className="flex-1">
                {showUrlInput ? "Hide URL" : "Enter URL"}
              </Button>

              {/* Apply button */}
              {showUrlInput && (
                <Button onClick={handleUrlSubmit} type="button">
                  Apply
                </Button>
              )}

              {/* Remove button */}
              {previewUrl && (
                <Button variant="outline" size="icon" onClick={handleRemoveImage} type="button">
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
            {previewUrl && (
              <Button variant="outline" size="icon" onClick={handleRemoveImage} type="button">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Preview of selected image */}
      {previewUrl && (
        <div className={`relative border rounded-md overflow-hidden ${isBackground ? "h-40" : ""}`}>
          <img
            src={previewUrl || "/placeholder.svg"}
            alt="Preview"
            className={`w-full ${isBackground ? "h-40 object-cover" : "h-40 object-cover"}`}
          />
        </div>
      )}
    </div>
  )
}
