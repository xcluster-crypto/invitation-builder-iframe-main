"use client"

import { useState, useEffect, useRef } from "react"
import { useInvitationStore } from "@/lib/store"

declare global {
  interface Window {
    google: any
    initMap?: () => void
  }
}

export function LoadApi() {
  const { mapLocation, setMapLocation, eventAddress, setEventAddress } = useInvitationStore()
  const [inputLocation, setInputLocation] = useState(eventAddress || "")
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [marker, setMarker] = useState<google.maps.Marker | null>(null)
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  // Load Google Maps API via script from mapsJavaScriptAPI.js
  useEffect(() => {
    const loadGoogleApi = () => {
      if (!window.google) {
        const existingScript = document.querySelector('script[src="mapsJavaScriptAPI.js"]');
        if (!existingScript) {
          const script = document.createElement("script");
          script.src = "mapsJavaScriptAPI.js"; // Ensure this path is correct
          script.async = true;
          script.defer = true;
          script.onload = () => {
            if (window.initMap) {
              window.initMap();
            }
          };
          document.head.appendChild(script);
        }
      } else {
        if (window.initMap) {
          window.initMap();
        }
      }
    };
  
    // Define the initializeMap function globally
    window.initMap = () => {
      if (window.google && mapRef.current && !mapLoaded) {
        const mapInstance = new window.google.maps.Map(mapRef.current, {
          center: { lat: -6.302039, lng: 106.889892 }, // Default center: Jakarta
          zoom: 12,
        });
        setMap(mapInstance);
        const geocoderInstance = new window.google.maps.Geocoder();
        setGeocoder(geocoderInstance);
        setMapLoaded(true);
      }
    };
  
    loadGoogleApi();
  }, []);

  // Update marker on map when inputLocation changes
  const handleSetLocation = () => {
    if (geocoder && inputLocation && map) {
      geocoder.geocode({ address: inputLocation }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const location = results[0].geometry.location
          map.setCenter(location)
          map.setZoom(15)
          if (marker) {
            marker.setMap(null)
          }
          const newMarker = new window.google.maps.Marker({
            position: location,
            map: map,
          })
          setMarker(newMarker)
          // Save coordinates
          setMapLocation(inputLocation)
          setEventAddress(inputLocation)
        } else {
          alert("Geocode was not successful for the following reason: " + status)
        }
      })
    }
  }
}

