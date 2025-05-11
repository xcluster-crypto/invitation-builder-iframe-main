"use client"
import { useInvitationStore } from "@/lib/store"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ColorPicker } from "@/components/color-picker"
import { ImageUploader } from "@/components/image-uploader"
import { GalleryManager } from "@/components/gallery-manager"
import { MapSelector } from "@/components/map-selector"
import { ThemeSelector } from "@/components/theme-selector"
import { FontSelector } from "@/components/font-selector"
import { EffectsPanel } from "@/components/effects-panel"
import { CouplePhotos } from "@/components/couple-photos"
import { MainImage } from "@/components/main-image"
import { Button } from "@/components/ui/button"
import { BackgroundSelector } from "@/components/background-selector"
import { MusicBackground } from "@/components/music-background"
import { DigitalGifts } from "@/components/digital-gifts"
import { RSVPManager } from "@/components/rsvp-manager"
import { useRouter } from "next/navigation"
import { LogOut, Plus, Trash2 } from "lucide-react"
import { useRef } from "react"

export function InvitationBuilder() {
  const router = useRouter()
  const imageUploaderRef = useRef<HTMLInputElement>(null)
  const imagePreviewRef = useRef<HTMLDivElement>(null)

  const {
    coupleNames,
    setCoupleNames,
    eventDate,
    setEventDate,
    eventTime,
    setEventTime,
    eventLocation,
    setEventLocation,
    eventAddress,
    setEventAddress,
    weddingMessages,
    addWeddingMessage,
    updateWeddingMessage,
    removeWeddingMessage,
    parentsMessages,
    addParentsMessage,
    updateParentsMessage,
    removeParentsMessage,
    message,
    setMessage,
    parentsMessage,
    setParentsMessage,
    showMessage,
    setShowMessage,
    showParentsMessage,
    setShowParentsMessage,
    primaryColor,
    setPrimaryColor,
    secondaryColor,
    setSecondaryColor,
    backgroundColor,
    setBackgroundColor,
    customBackgroundImage,
    setCustomBackgroundImage,
    presetBackground,
    setPresetBackground,
    fontFamily,
    setFontFamily,
    headerFontSize,
    setHeaderFontSize,
    bodyFontSize,
    setBodyFontSize,
    enableEffects,
    setEnableEffects,
  } = useInvitationStore()

  // Function to set transparent background
  const setTransparentBackground = () => {
    setBackgroundColor("transparent")
  }

  // Function to clear custom background and use preset
  const clearCustomBackground = () => {
    // Clear the custom background in the store
    setCustomBackgroundImage("")

    // Clear the URL input field in the ImageUploader component
    const urlInput = document.querySelector('.ImageUploader input[type="text"]') as HTMLInputElement
    if (urlInput) {
      urlInput.value = ""
    }

    // Clear the file input in the ImageUploader component
    const fileInput = document.getElementById("image-upload") as HTMLInputElement
    if (fileInput) {
      fileInput.value = ""
    }

    // Remove the preview image
    const previewContainer = document.querySelector(".ImageUploader .relative.border.rounded-md") as HTMLElement
    if (previewContainer) {
      previewContainer.style.display = "none"
    }
  }

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("wedding_builder_auth")
    router.push("/")
  }

  return (
    <div className="space-y-6">
      {/* Logout button */}
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
          <LogOut size={16} />
          Logout
        </Button>
      </div>

      {/* Main Image at the top */}
      <div className="mb-8">
        <MainImage />
      </div>

      <Accordion type="multiple" defaultValue={["basic-info", "couple-photos"]}>
        <AccordionItem value="basic-info">
          <AccordionTrigger>Basic Information</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="couple-names">Couple Names</Label>
                <Input
                  id="couple-names"
                  placeholder="e.g. John & Jane"
                  value={coupleNames}
                  onChange={(e) => setCoupleNames(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="event-date">Wedding Date</Label>
                  <Input id="event-date" type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event-time">Wedding Time</Label>
                  <Input id="event-time" type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="event-location">Venue Name</Label>
                <Input
                  id="event-location"
                  placeholder="e.g. Grand Ballroom"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="event-address">Venue Address</Label>
                <Textarea
                  id="event-address"
                  placeholder="Enter full address"
                  value={eventAddress}
                  onChange={(e) => setEventAddress(e.target.value)}
                />
              </div>

              {/* Wedding Messages Section */}
              <div className="space-y-4 border-t pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Wedding Messages</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={addWeddingMessage} className="flex items-center gap-1">
                      <Plus size={14} />
                      Add Wedding Message
                    </Button>
                    <Button variant="outline" size="sm" onClick={addParentsMessage} className="flex items-center gap-1">
                      <Plus size={14} />
                      Add Parents Message
                    </Button>
                  </div>
                </div>

                {/* Legacy message fields for backward compatibility */}
                {showMessage && (
                  <div className="grid gap-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="message">Wedding Message</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowMessage(false)}
                        className="h-6 px-2 text-muted-foreground"
                      >
                        Hide
                      </Button>
                    </div>
                    <Textarea
                      id="message"
                      placeholder="Enter your wedding message or invitation text"
                      className="min-h-[100px]"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                )}

                {showParentsMessage && (
                  <div className="grid gap-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="parents-message">Wedding Message Parents</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowParentsMessage(false)}
                        className="h-6 px-2 text-muted-foreground"
                      >
                        Hide
                      </Button>
                    </div>
                    <Textarea
                      id="parents-message"
                      placeholder="Enter a message from the parents"
                      className="min-h-[100px]"
                      value={parentsMessage}
                      onChange={(e) => setParentsMessage(e.target.value)}
                    />
                  </div>
                )}

                {/* Wedding Messages */}
                {weddingMessages.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground">Wedding Messages</h4>
                    {weddingMessages.map((msg, index) => (
                      <div key={msg.id} className="grid gap-2 border p-3 rounded-md">
                        <div className="flex justify-between items-center">
                          <Label htmlFor={`wedding-message-${msg.id}`}>{/* Wedding Message {index + 1} */}</Label>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeWeddingMessage(msg.id)}
                            className="h-6 w-6 text-destructive"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                        <Textarea
                          id={`wedding-message-${msg.id}`}
                          placeholder={`Enter wedding message ${index + 1}`}
                          className="min-h-[100px]"
                          value={msg.content}
                          onChange={(e) => updateWeddingMessage(msg.id, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Parents Messages */}
                {parentsMessages.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground">Parents Messages</h4>
                    {parentsMessages.map((msg, index) => (
                      <div key={msg.id} className="grid gap-2 border p-3 rounded-md">
                        <div className="flex justify-between items-center">
                          <Label htmlFor={`parents-message-${msg.id}`}>{/* Parents Message {index + 1} */}</Label>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeParentsMessage(msg.id)}
                            className="h-6 w-6 text-destructive"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                        <Textarea
                          id={`parents-message-${msg.id}`}
                          placeholder={`Enter parents message ${index + 1}`}
                          className="min-h-[100px]"
                          value={msg.content}
                          onChange={(e) => updateParentsMessage(msg.id, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="couple-photos">
          <AccordionTrigger>Couple Photos</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <CouplePhotos />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="design">
          <AccordionTrigger>Design & Theme</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              <ThemeSelector />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Colors</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="mb-2 block">Primary Color</Label>
                    <ColorPicker color={primaryColor} onChange={setPrimaryColor} />
                  </div>
                  <div>
                    <Label className="mb-2 block">Secondary Color</Label>
                    <ColorPicker color={secondaryColor} onChange={setSecondaryColor} />
                  </div>
                  <div>
                    <Label className="mb-2 block">Background Color</Label>
                    <div className="flex items-end gap-2">
                      <ColorPicker color={backgroundColor} onChange={setBackgroundColor} />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={setTransparentBackground}
                        className="whitespace-nowrap"
                      >
                        Set Transparent
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-t border-b py-4 my-6">
                <h3 className="text-lg font-medium mb-4">Background Selection</h3>
                <BackgroundSelector />
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Custom Background Image</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Upload a custom background image (will override the selected background)
                </p>
                {customBackgroundImage && (
                  <div className="p-2 bg-amber-50 border border-amber-200 rounded-md mb-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-amber-600">
                        Custom background is active. To use a preset background, please remove this custom image.
                      </p>
                      <Button variant="outline" size="sm" onClick={clearCustomBackground}>
                        Remove Custom
                      </Button>
                    </div>
                  </div>
                )}
                <div className="ImageUploader">
                  <ImageUploader
                    currentImage={customBackgroundImage}
                    onImageSelected={setCustomBackgroundImage}
                    label="Upload Background Image"
                    isBackground={true}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Typography</h3>
                <div className="space-y-4">
                  <FontSelector currentFont={fontFamily} onFontSelected={setFontFamily} />

                  <div className="grid gap-2">
                    <Label>Header Font Size: {headerFontSize}px</Label>
                    <Slider
                      min={16}
                      max={72}
                      step={1}
                      value={[headerFontSize]}
                      onValueChange={(value) => setHeaderFontSize(value[0])}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Body Font Size: {bodyFontSize}px</Label>
                    <Slider
                      min={12}
                      max={24}
                      step={1}
                      value={[bodyFontSize]}
                      onValueChange={(value) => setBodyFontSize(value[0])}
                    />
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="music">
          <AccordionTrigger>Music Background</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <MusicBackground />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="gallery">
          <AccordionTrigger>Photo Gallery</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <GalleryManager />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="map">
          <AccordionTrigger>Location Map</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <MapSelector />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="gifts">
          <AccordionTrigger>Gift Digital</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <DigitalGifts />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rsvp">
          <AccordionTrigger>RSVP</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <RSVPManager />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="effects">
          <AccordionTrigger>Visual Effects</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="enable-effects" checked={enableEffects} onCheckedChange={setEnableEffects} />
                <Label htmlFor="enable-effects">Enable Visual Effects</Label>
              </div>

              {enableEffects && <EffectsPanel />}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
