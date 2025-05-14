"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useInvitationStore } from "@/lib/store"

export function MapSelector() {
  const { setMapLocation } = useInvitationStore()
  const [inputEmbedUrl, setInputEmbedUrl] = useState<string>("")

  const handleSetEmbedUrl = () => {
    setMapLocation(inputEmbedUrl) // Mengatur nilai mapLocation di store
  }


  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="embed-url">Embed HTML Code URL (Google Maps)</Label>
        <Input
          id="embed-url"
          type="text"
          placeholder="Paste your Google Maps embed HTML code URL here"
          value={inputEmbedUrl}
          onChange={(e) => setInputEmbedUrl(e.target.value)}
        />
        <Button onClick={handleSetEmbedUrl} type="button">
          Set
        </Button>
        <div className="text-sm text-gray-500 mt-2">
          <strong>How to get the embed HTML code URL:</strong>
          <ol className="list-decimal list-inside">
            <li>Open <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Google Maps</a>.</li>
            <li>Search for the location you want to embed.</li>
            <li>Click the "Share" button and select "Embed a map".</li>
            <li>Copy the URL from the iframe code, remove and do not use the &lt;iframe src=" ... and &lt;/iframe&gt; tags, (e.g. <code>https://www.google.com/maps/embed?pb=...`</code>).</li>
            <li>Paste the URL into the input field above, then edit the size to width="870" height="400".</li>
          </ol>
        </div>
      </div>

      {/* Div untuk peta */}
      {inputEmbedUrl && (
        <div className="border rounded-md overflow-hidden h-64 mt-4">
          <iframe
            src={inputEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      )}
    </div>
  )
}