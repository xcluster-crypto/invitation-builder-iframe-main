"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const FONTS = [
  "Playfair Display",
  "Dancing Script",
  "Montserrat",
  "Raleway",
  "Amatic SC",
  "Roboto",
  "Lato",
  "Open Sans",
  "Oswald",
  "Pacifico",
  "Great Vibes",
  "Sacramento",
  "Cinzel",
]

interface FontSelectorProps {
  currentFont: string
  onFontSelected: (font: string) => void
}

export function FontSelector({ currentFont, onFontSelected }: FontSelectorProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor="font-family">Font Family</Label>
      <Select value={currentFont} onValueChange={onFontSelected}>
        <SelectTrigger id="font-family">
          <SelectValue placeholder="Select font" />
        </SelectTrigger>
        <SelectContent>
          {FONTS.map((font) => (
            <SelectItem key={font} value={font} style={{ fontFamily: font }}>
              {font}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
