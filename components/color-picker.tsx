"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [inputColor, setInputColor] = useState(color)

  useEffect(() => {
    setInputColor(color)
  }, [color])

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputColor(e.target.value)
    onChange(e.target.value)
  }

  return (
    <div className="flex items-center space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <div
            className="w-10 h-10 rounded-md cursor-pointer border border-gray-200"
            style={{ backgroundColor: color }}
          />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3">
          <input type="color" value={inputColor} onChange={handleColorChange} className="w-32 h-32" />
        </PopoverContent>
      </Popover>

      <Input
        type="text"
        value={inputColor}
        onChange={(e) => {
          setInputColor(e.target.value)
          onChange(e.target.value)
        }}
        className="w-28"
      />
    </div>
  )
}
