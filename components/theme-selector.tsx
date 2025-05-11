"use client"

import { useInvitationStore } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useState } from "react"

const THEMES = [
  {
    id: "elegant",
    name: "Elegant",
    primaryColor: "#8B5A2B",
    secondaryColor: "#D4AF37",
    backgroundColor: "#FFFFFF",
    fontFamily: "Playfair Display",
  },
  {
    id: "romantic",
    name: "Romantic",
    primaryColor: "#D8667A",
    secondaryColor: "#F7CAD0",
    backgroundColor: "#FFF5F6",
    fontFamily: "Dancing Script",
  },
  {
    id: "modern",
    name: "Modern",
    primaryColor: "#2D3748",
    secondaryColor: "#A0AEC0",
    backgroundColor: "#F7FAFC",
    fontFamily: "Montserrat",
  },
  {
    id: "rustic",
    name: "Rustic",
    primaryColor: "#5D4037",
    secondaryColor: "#8D6E63",
    backgroundColor: "#EFEBE9",
    fontFamily: "Amatic SC",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    primaryColor: "#1A202C",
    secondaryColor: "#718096",
    backgroundColor: "#FFFFFF",
    fontFamily: "Raleway",
  },
]

export function ThemeSelector() {
  const { setPrimaryColor, setSecondaryColor, setBackgroundColor, setFontFamily } = useInvitationStore()
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId)
    const theme = THEMES.find((t) => t.id === themeId)
    if (theme) {
      setPrimaryColor(theme.primaryColor)
      setSecondaryColor(theme.secondaryColor)
      setBackgroundColor(theme.backgroundColor)
      setFontFamily(theme.fontFamily)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Select Theme</h3>
      <RadioGroup value={selectedTheme || ""} onValueChange={handleThemeChange}>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {THEMES.map((theme) => (
            <div key={theme.id} className="space-y-2">
              <RadioGroupItem value={theme.id} id={theme.id} className="sr-only" />
              <Label htmlFor={theme.id} className="cursor-pointer">
                <Card
                  className={`overflow-hidden transition-all hover:scale-105 ${
                    theme.id === selectedTheme ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <div
                    className="h-20"
                    style={{
                      background: `linear-gradient(to right, ${theme.primaryColor}, ${theme.secondaryColor})`,
                    }}
                  />
                  <CardContent className="p-3">
                    <p className="text-center font-medium">{theme.name}</p>
                  </CardContent>
                </Card>
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}
