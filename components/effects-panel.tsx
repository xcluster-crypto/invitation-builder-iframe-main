"use client"

import { useInvitationStore, type ColorTheme } from "@/lib/store"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card } from "@/components/ui/card"

export function EffectsPanel() {
  const {
    enableShadows,
    setEnableShadows,
    enableHoverEffects,
    setEnableHoverEffects,
    enableRgbEffects,
    setEnableRgbEffects,
    enableEmboss,
    setEnableEmboss,
    animationSpeed,
    setAnimationSpeed,
    rgbIntensity,
    setRgbIntensity,
    rgbBorderWidth,
    setRgbBorderWidth,
    colorTheme,
    setColorTheme,
  } = useInvitationStore()

  const colorThemes: { id: ColorTheme; name: string; gradient: string }[] = [
    {
      id: "rgb",
      name: "Rainbow",
      gradient: "linear-gradient(90deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8)",
    },
    {
      id: "golden",
      name: "Golden",
      gradient: "linear-gradient(90deg, #FFD700, #FFA500, #B8860B)",
    },
    {
      id: "rose",
      name: "Rose",
      gradient: "linear-gradient(90deg, #FF80AB, #FF4081, #C2185B)",
    },
    {
      id: "ocean",
      name: "Ocean",
      gradient: "linear-gradient(90deg, #00B0FF, #0091EA, #01579B)",
    },
    {
      id: "emerald",
      name: "Emerald",
      gradient: "linear-gradient(90deg, #00E676, #00C853, #1B5E20)",
    },
    {
      id: "purple",
      name: "Purple",
      gradient: "linear-gradient(90deg, #AA00FF, #7C4DFF, #6200EA)",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch id="enable-shadows" checked={enableShadows} onCheckedChange={setEnableShadows} />
          <Label htmlFor="enable-shadows">Enable Shadows</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="enable-hover" checked={enableHoverEffects} onCheckedChange={setEnableHoverEffects} />
          <Label htmlFor="enable-hover">Enable Hover Effects</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="enable-rgb" checked={enableRgbEffects} onCheckedChange={setEnableRgbEffects} />
          <Label htmlFor="enable-rgb">Enable Glowing Border Effects</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="enable-emboss" checked={enableEmboss} onCheckedChange={setEnableEmboss} />
          <Label htmlFor="enable-emboss">Enable Emboss Effect</Label>
        </div>
      </div>

      {enableRgbEffects && (
        <>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Border Color Theme</h3>
            <RadioGroup value={colorTheme} onValueChange={(value) => setColorTheme(value as ColorTheme)}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {colorThemes.map((theme) => (
                  <div key={theme.id} className="space-y-2">
                    <RadioGroupItem value={theme.id} id={theme.id} className="sr-only" />
                    <Label htmlFor={theme.id} className="cursor-pointer">
                      <Card
                        className={`overflow-hidden transition-all hover:scale-105 ${
                          theme.id === colorTheme ? "ring-2 ring-primary" : ""
                        }`}
                      >
                        <div
                          className="h-10 w-full"
                          style={{
                            background: theme.gradient,
                          }}
                        />
                        <div className="p-2 text-center text-sm">{theme.name}</div>
                      </Card>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Color Flow Speed: {animationSpeed}s</Label>
            <Slider
              min={1}
              max={10}
              step={1}
              value={[animationSpeed]}
              onValueChange={(value) => setAnimationSpeed(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label>Glow Intensity: {rgbIntensity}</Label>
            <Slider
              min={1}
              max={10}
              step={1}
              value={[rgbIntensity]}
              onValueChange={(value) => setRgbIntensity(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label>Border Width: {rgbBorderWidth}px</Label>
            <Slider
              min={1}
              max={10}
              step={1}
              value={[rgbBorderWidth]}
              onValueChange={(value) => setRgbBorderWidth(value[0])}
            />
          </div>
        </>
      )}
    </div>
  )
}
