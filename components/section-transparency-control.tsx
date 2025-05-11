"use client"

import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

interface SectionTransparencyControlProps {
  label: string
  value: number
  onChange: (value: number) => void
}

export function SectionTransparencyControl({ label, value, onChange }: SectionTransparencyControlProps) {
  // Calculate opacity percentage for display
  const opacityPercentage = Math.round(value * 100)

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label>{label}</Label>
        <span className="text-xs text-muted-foreground">{opacityPercentage}% Opacity</span>
      </div>
      <Slider min={0} max={1} step={0.05} value={[value]} onValueChange={(values) => onChange(values[0])} />
    </div>
  )
}
