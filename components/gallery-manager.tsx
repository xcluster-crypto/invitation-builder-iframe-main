"use client"

import { useState } from "react"
import { useInvitationStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { ImageUploader } from "@/components/image-uploader"
import { X } from "lucide-react"

export function GalleryManager() {
  const { galleryImages, addGalleryImage, removeGalleryImage } = useInvitationStore()
  const [tempImage, setTempImage] = useState("")

  const handleAddImage = () => {
    if (tempImage) {
      addGalleryImage(tempImage)
      setTempImage("")
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Add Photos to Gallery</h3>
        <ImageUploader currentImage={tempImage} onImageSelected={setTempImage} label="Upload Photo" />
        <Button onClick={handleAddImage} disabled={!tempImage} className="w-full">
          Add to Gallery
        </Button>
      </div>

      {galleryImages.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Gallery Images ({galleryImages.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeGalleryImage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
