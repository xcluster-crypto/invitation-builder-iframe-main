"use client"

import { useEffect, useRef, useState } from "react"
import { useInvitationStore } from "@/lib/store"
import JSZip from "jszip"
import FileSaver from "file-saver"

export function InvitationPreview() {
  const {
    coupleNames,
    eventDate,
    eventTime,
    eventLocation,
    eventAddress,
    weddingMessages,
    parentsMessages,
    message,
    parentsMessage,
    showMessage,
    showParentsMessage,
    primaryColor,
    secondaryColor,
    backgroundColor,
    customBackgroundImage,
    presetBackground,
    fontFamily,
    headerFontSize,
    bodyFontSize,
    enableEffects,
    galleryImages,
    mapLocation,
    rgbIntensity,
    rgbBorderWidth,
    animationSpeed,
    malePhoto,
    femalePhoto,
    colorTheme,
    mainImage,
    photoShape,
    getEffectiveBackgroundImage,
    enableRgbEffects,
    backgroundMusic,
    autoplayMusic,
    loopMusic,
    musicVolume,
    enableDigitalGifts,
    giftAccounts,
    enableRSVP,
    rsvpDeadline,
    rsvpMessage,
  } = useInvitationStore()

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Helper function to safely handle image URLs
  const safeImageUrl = (url: string) => {
    if (!url) return ""

    // If it's a data URL, return it as is
    if (url.startsWith("data:")) return url

    // If it's a blob URL, we need to handle it differently
    if (url.startsWith("blob:")) {
      // For blob URLs, we'll use a placeholder and add a data attribute
      // that we can use to identify it in the error handler
      return `/placeholder.svg?height=200&width=200`
    }

    // If it's a relative URL starting with /, return it as is
    if (url.startsWith("/")) return url

    // If it's a relative URL not starting with /, add /
    if (!url.startsWith("http")) {
      return `/${url}`
    }

    return url
  }

  // Function to generate CSS file content
  const generateCSS = () => {
    // Get the effective background image
    const effectiveBackgroundImage = getEffectiveBackgroundImage()
    const safeBackgroundImage = effectiveBackgroundImage ? safeImageUrl(effectiveBackgroundImage) : ""

    // Get color gradient based on selected theme
    const getColorGradient = () => {
      switch (colorTheme) {
        case "golden":
          return "linear-gradient(90deg, #FFD700, #FFA500, #B8860B, #FFD700)"
        case "rose":
          return "linear-gradient(90deg, #FF80AB, #FF4081, #C2185B, #FF80AB)"
        case "ocean":
          return "linear-gradient(90deg, #00B0FF, #0091EA, #01579B, #00B0FF)"
        case "emerald":
          return "linear-gradient(90deg, #00E676, #00C853, #1B5E20, #00E676)"
        case "purple":
          return "linear-gradient(90deg, #AA00FF, #7C4DFF, #6200EA, #AA00FF)"
        default:
          return "linear-gradient(90deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000)"
      }
    }

    // Get shape class for main image
    const getMainImageShapeClass = () => {
      switch (photoShape) {
        case "square":
          return "border-radius: 8px;"
        case "circle":
          return "border-radius: 50%;"
        default:
          return "border-radius: 50%;" // Default to circle
      }
    }

    return `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-align: center;
}

body {
  font-family: '${fontFamily || "Playfair Display"}', sans-serif;
  background-color: ${backgroundColor === "transparent" ? "transparent" : backgroundColor || "#FFFFFF"};
  color: ${primaryColor || "#000000"};
  line-height: 1.6;
  font-size: ${bodyFontSize || 16}px;
  overflow-x: hidden;
}

${
  safeBackgroundImage
    ? `
.bg-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-image: url('${safeBackgroundImage}');
  background-size: cover;
  background-position: center;
  opacity: 1.0;
}
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background-color: rgba(255, 255, 255, 0.5);
}
`
    : ""
}

.text-container {
  background-color: transparent;
  padding: 2rem;
  margin-bottom: 2rem;
  ${enableEffects ? `text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);` : ""}
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

header {
  text-align: center;
  padding: 3rem 1rem;
}

h1, h2, h3 {
  color: ${primaryColor || "#000000"};
  font-size: ${headerFontSize || 32}px;
  margin-bottom: 1rem;
  text-align: center;
}

p {
  text-align: center;
}

.couple-names {
  font-size: ${(headerFontSize || 32) * 1.5}px;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
  ${
    enableEffects
      ? `
  background: linear-gradient(90deg, ${primaryColor || "#000000"}, ${secondaryColor || "#666666"}, ${primaryColor || "#000000"});
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s linear infinite;
  `
      : ""
  }
}

.date-time {
  font-size: ${(headerFontSize || 32) * 0.7}px;
  margin-bottom: 1rem;
  color: ${secondaryColor || "#666666"};
  text-align: center;
}

.location {
  margin-bottom: 2rem;
  text-align: center;
}

.message {
  font-style: italic;
  margin: 2rem 0;
  padding: 1rem;
  border-left: 4px solid ${secondaryColor || "#666666"};
  text-align: center;
}

.parents-message {
  font-style: italic;
  margin: 2rem 0;
  padding: 1rem;
  border-left: 4px solid ${secondaryColor || "#666666"};
  text-align: center;
  color: ${secondaryColor || "#666666"};
}

.section {
  margin: 4rem 0;
  padding: 2rem;
  background-color: transparent;
  border-radius: 10px;
  text-align: center;
  ${
    enableEffects && enableRgbEffects
      ? `
  position: relative;
  z-index: 1;
  `
      : ""
  }
  ${
    enableEffects
      ? `
  transition: transform 0.3s ease;
  `
      : ""
  }
}

${
  enableEffects && enableRgbEffects
    ? `
.section::before {
  content: '';
  position: absolute;
  top: -${rgbBorderWidth || 3}px;
  left: -${rgbBorderWidth || 3}px;
  right: -${rgbBorderWidth || 3}px;
  bottom: -${rgbBorderWidth || 3}px;
  z-index: -1;
  background: ${getColorGradient()};
  background-size: 400% 400%;
  border-radius: 12px;
  filter: blur(3px);
  opacity: ${(rgbIntensity || 7) / 10};
  animation: flowingBorder ${animationSpeed || 3}s linear infinite;
}
`
    : ""
}

.section:hover {
  ${
    enableEffects
      ? `
  transform: translateY(-5px);
  `
      : ""
  }
}

.section-title {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.section-title:after {
  content: '';
  display: block;
  width: 50px;
  height: 3px;
  background-color: ${secondaryColor || "#666666"};
  margin: 1rem auto;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.gallery-item {
  overflow: hidden;
  border-radius: 8px;
  ${
    enableEffects
      ? `
  transition: transform 0.3s ease;
  `
      : ""
  }
}

.gallery-item:hover {
  ${
    enableEffects
      ? `
  transform: scale(1.05);
  `
      : ""
  }
}

.gallery-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.map-container {
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-style: italic;
}

.main-image-container {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.main-image {
  position: relative;
  width: 250px;
  height: 250px;
  margin: 0 auto;
}

.main-image-frame {
  width: 100%;
  height: 100%;
  ${getMainImageShapeClass()}
  overflow: hidden;
  position: relative;
  z-index: 1;
  border: 2px solid white;
}

.main-image-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.couple-photos {
  display: flex;
  justify-content: space-around;
  margin: 2rem 0;
  flex-wrap: wrap;
  background-color: transparent;
  padding: 2rem;
  text-align: center;
}

.photo-container {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 1rem;
}

.photo-frame {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  z-index: 1;
  border: 2px solid white;
}

.photo-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Music player styles */
.music-player {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.music-player:hover {
  transform: scale(1.1);
}

.music-player.playing {
  background-color: rgba(0, 0, 0, 0.8);
}

.music-player i {
  color: ${primaryColor || "#000000"};
  font-size: 20px;
}

/* Digital gifts section */
.gift-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
}

.gift-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

.gift-card-header {
  margin-bottom: 1rem;
  font-weight: bold;
  color: ${primaryColor || "#000000"};
}

.gift-card-content {
  margin-bottom: 1rem;
}

.gift-card-number {
  background-color: #f5f5f5;
  padding: 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 1.1em;
  margin: 0.5rem 0;
}

/* RSVP section */
.rsvp-form {
  max-width: 600px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: ${primaryColor || "#000000"};
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
}

.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
  min-height: 100px;
}

.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
  background-color: white;
}

.form-button {
  background-color: ${primaryColor || "#000000"};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-button:hover {
  background-color: ${secondaryColor || "#666666"};
}

/* Table styles (default for larger screens) */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: gray;
  color: #333;
}

/* Responsive Table Styles (for smaller screens) */
@media (max-width: 768px) {
  table, thead, tbody, th, td, tr {
    display: block; /* Mengubah elemen tabel menjadi block */
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px; /* Menyembunyikan header tabel */
  }

  tr {
    border: 1px solid #ccc;
    margin-bottom: 10px;
    display: block; /* Memastikan setiap baris menjadi block */
  }

  td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%; /* Memberi ruang untuk label (data-label) */
    text-align: right; /* Mengatur teks ke kanan */
  }

  td:before {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    content: attr(data-label); /* Menggunakan atribut data-label sebagai label */
    font-weight: bold;
    text-align: left; /* Mengatur label ke kiri */
  }
}

/* Optional: Adjust padding and margin for better spacing on mobile */
@media (max-width: 480px) {
  .section {
    padding: 15px;
  }

  td {
    padding: 8px 10px; /* Sesuaikan padding sel tabel */
  }
}

${
  enableEffects
    ? `
.photo-border {
  position: relative;
}

.photo-border::before {
  content: '';
  position: absolute;
  top: -${rgbBorderWidth || 3}px;
  left: -${rgbBorderWidth || 3}px;
  right: -${rgbBorderWidth || 3}px;
  bottom: -${rgbBorderWidth || 3}px;
  z-index: -1;
  background: ${getColorGradient()};
  background-size: 400% 400%;
  border-radius: 50%;
  filter: blur(3px);
  opacity: ${(rgbIntensity || 7) / 10};
  animation: flowingBorder ${animationSpeed || 3}s linear infinite;
}

.rgb-border {
  position: relative;
  z-index: 1;
  border-radius: 10px;
}

.rgb-border::before {
  content: '';
  position: absolute;
  top: -${rgbBorderWidth || 3}px;
  left: -${rgbBorderWidth || 3}px;
  right: -${rgbBorderWidth || 3}px;
  bottom: -${rgbBorderWidth || 3}px;
  z-index: -1;
  background: ${getColorGradient()};
  background-size: 400% 400%;
  border-radius: 12px;
  filter: blur(3px);
  opacity: ${(rgbIntensity || 7) / 10};
  animation: flowingBorder ${animationSpeed || 3}s linear infinite;
}

@keyframes flowingBorder {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes shine {
  to {
    background-position: 200% center;
  }
}
`
    : ""
}

footer {
  text-align: center;
  padding: 2rem;
  margin-top: 4rem;
  color: ${primaryColor || "#000000"};
}

/* Responsive design */
@media (max-width: 768px) {
  .container {
    padding: 0.5rem;
    width: 100%;
    max-width: 100%;
  }
  
  header {
    padding: 1.5rem 1rem;
  }
  
  .couple-names {
    font-size: ${(headerFontSize || 32) * 1.2}px;
  }
  
  .date-time {
    font-size: ${(headerFontSize || 32) * 0.6}px;
  }
  
  .section {
    padding: 1.5rem;
    margin: 1.5rem 0;
  }
  
  .gallery {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.5rem;
  }
  
  .text-container {
    padding: 1rem;
  }
  
  .map-container {
    height: 300px;
  }
  
  .message, .parents-message {
    padding: 0.5rem;
  }
  
  .couple-photos {
    flex-direction: column;
    align-items: center;
  }
  
  .main-image {
    width: 200px;
    height: 200px;
  }
  
  .gift-container {
    flex-direction: column;
    align-items: center;
  }
  
  .gift-card {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .couple-names {
    font-size: ${(headerFontSize || 32) * 1}px;
  }
  
  .date-time {
    font-size: ${(headerFontSize || 32) * 0.5}px;
  }
  
  .section {
    padding: 1rem;
    margin: 1rem 0;
  }
  
  .photo-container {
    width: 150px;
    height: 150px;
  }
  
  .main-image {
    width: 180px;
    height: 180px;
  }
}

/* Error handling for images */
img {
  min-height: 20px;
  min-width: 20px;
}

img.error {
  position: relative;
  background-color: #f8f8f8;
}

img.error::after {
  content: '⚠️ Image could not be loaded';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: #666;
}

/* Loading indicator */
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: ${primaryColor || "#000000"};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

  /* Modal styles */
  .modal {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
  }

      table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th, td {
      padding: 10px;
      text-align: left;
      border: 1px solid #ddd;
    }
    th {
      background-color: #f4f4f4;
    }
    .pagination {
      text-align: center;
      margin-top: 20px;
    }
    .pagination button {
      margin: 0 5px;
      padding: 5px 10px;
      border: none;
      background-color: #007bff;
      color: #fff;
      border-radius: 4px;
      cursor: pointer;
    }
    .pagination button.active {
      background-color: #0056b3;
    }
    .pagination button:hover {
      background-color: #0056b3;
    }
 `
 }

  // Function to generate JavaScript file content
  const generateJS = () => {
    return `

      // Handle image loading errors
      function handleImageError(img) {
        img.classList.add('error');
        img.src = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 1 1%22%3E%3C%2Fsvg%3E';
        img.alt = 'Image failed to load';
        img.style.backgroundColor = '#f8f8f8';
        img.style.border = '1px dashed #ccc';
      }
  
      window.addEventListener('DOMContentLoaded', function () {
        // Add error handlers to all images
        const images = document.querySelectorAll('img');
        images.forEach(function (img) {
          img.onerror = function () {
            handleImageError(this);
          };
        });
  
        // Remove loading indicator
        const loadingContainer = document.getElementById('loading-container');
        if (loadingContainer) {
          loadingContainer.style.display = 'none';
        }

        // RSVP form handling
        const attendingSelect = document.getElementById('attending');
        if (attendingSelect) {
          attendingSelect.addEventListener('change', function() {
            const guestsGroup = document.getElementById('guests-group');
            if (this.value === 'yes') {
              guestsGroup.style.display = 'block';
            } else {
              guestsGroup.style.display = 'none';
            }
          });
        }

        const rsvpForm = document.getElementById('rsvp-form');
        if (rsvpForm) {
          rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your RSVP! We have received your response.');
            this.reset();
          });
        }
    
        // Music player
        const musicPlayer = document.getElementById('music-player');
        const audio = document.getElementById('background-music');
  
        if (musicPlayer && audio) {
          // Handle audio loading error
          audio.onerror = function () {
            console.error('Error loading audio file');
            musicPlayer.style.display = 'none';
          };
  
          // Update player state based on audio state
          function updatePlayerState() {
            if (!audio.paused) {
              musicPlayer.classList.add('playing');
              musicPlayer.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
              musicPlayer.classList.remove('playing');
              musicPlayer.innerHTML = '<i class="fas fa-music"></i>';
            }
          }
  
          // Toggle play/pause when clicking the music player
          musicPlayer.addEventListener('click', function () {
            if (audio.paused) {
              audio.play().catch(function (error) {
                console.error('Error playing audio:', error);
              });
            } else {
              audio.pause();
            }
            updatePlayerState();
          });
  
          // Update player state when audio plays or pauses
          audio.addEventListener('play', updatePlayerState);
          audio.addEventListener('pause', updatePlayerState);
  
          // Initial state update
          updatePlayerState();

          document.getElementById('attending').addEventListener('change', function() {
            const guestsGroup = document.getElementById('guests-group');
            if (this.value === 'yes') {
              guestsGroup.style.display = 'block';
            } else {
              guestsGroup.style.display = 'none';
            }
          });

        }
      });
    `;
  };

 
  // Function to generate HTML file content
  const generateHTML = (): string => {
   const safeEmbedUrl = mapLocation ? mapLocation.toString().replace(/'/g, "\\'") : ""
    const formattedDate = eventDate
      ? new Date(eventDate).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

    const formattedRsvpDeadline = rsvpDeadline
      ? new Date(rsvpDeadline).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";
        
      // Get color gradient based on selected theme
      const getColorGradient = () => {
        switch (colorTheme) {
          case "golden":
            return "linear-gradient(90deg, #FFD700, #FFA500, #B8860B, #FFD700)"
          case "rose":
            return "linear-gradient(90deg, #FF80AB, #FF4081, #C2185B, #FF80AB)"
          case "ocean":
            return "linear-gradient(90deg, #00B0FF, #0091EA, #01579B, #00B0FF)"
          case "emerald":
            return "linear-gradient(90deg, #00E676, #00C853, #1B5E20, #00E676)"
          case "purple":
            return "linear-gradient(90deg, #AA00FF, #7C4DFF, #6200EA, #AA00FF)"
          default:
            return "linear-gradient(90deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000)"
        }
      }

      // Get shape class for main image
      const getMainImageShapeClass = () => {
        switch (photoShape) {
          case "square":
            return "border-radius: 8px;"
          case "circle":
            return "border-radius: 50%;"
          default:
            return "border-radius: 50%;" // Default to circle
        }
      }

    // Process the background image URL safely
    // Get the effective background image
    const effectiveBackgroundImage = getEffectiveBackgroundImage()
    const safeBackgroundImage = effectiveBackgroundImage ? safeImageUrl(effectiveBackgroundImage) : ""

    // Generate HTML content
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${coupleNames || "Wedding Invitation"}</title>
  <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent((fontFamily || "Playfair Display").replace(/ /g, "+"))}:wght@400;700&display=swap" rel="stylesheet">
  <link rel="icon" href="favicon.png" type="image/png">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      text-align: center;
    }
    
    body {
      font-family: '${fontFamily || "Playfair Display"}', sans-serif;
      background-color: ${backgroundColor === "transparent" ? "transparent" : backgroundColor || "#FFFFFF"};
      color: ${primaryColor || "#000000"};
      line-height: 1.6;
      font-size: ${bodyFontSize || 16}px;
      overflow-x: hidden;
    }
    
    ${
      safeBackgroundImage
        ? `
    .bg-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-image: url('${safeBackgroundImage}');
      background-size: cover;
      background-position: center;
      opacity: 1.0;
    }
    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -2;
      background-color: rgba(255, 255, 255, 0.5);
    }
    `
        : ""
    }
    
    .text-container {
      background-color: transparent;
      padding: 2rem;
      margin-bottom: 2rem;
      ${enableEffects ? `text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);` : ""}
    }
    
    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }
    
    header {
      text-align: center;
      padding: 3rem 1rem;
    }
    
    h1, h2, h3 {
      color: ${primaryColor || "#000000"};
      font-size: ${headerFontSize || 32}px;
      margin-bottom: 1rem;
      text-align: center;
    }
    
    p {
      text-align: center;
    }
    
    .couple-names {
      font-size: ${(headerFontSize || 32) * 1.5}px;
      font-weight: bold;
      margin-bottom: 1rem;
      text-align: center;
      ${
        enableEffects
          ? `
      background: linear-gradient(90deg, ${primaryColor || "#000000"}, ${secondaryColor || "#666666"}, ${primaryColor || "#000000"});
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shine 3s linear infinite;
      `
          : ""
      }
    }
    
    .date-time {
      font-size: ${(headerFontSize || 32) * 0.7}px;
      margin-bottom: 1rem;
      color: ${secondaryColor || "#666666"};
      text-align: center;
    }
    
    .location {
      margin-bottom: 2rem;
      text-align: center;
    }
    
    .message {
      font-style: italic;
      margin: 2rem 0;
      padding: 1rem;
      border-left: 4px solid ${secondaryColor || "#666666"};
      text-align: center;
    }
    
    .parents-message {
      font-style: italic;
      margin: 2rem 0;
      padding: 1rem;
      border-left: 4px solid ${secondaryColor || "#666666"};
      text-align: center;
      color: ${secondaryColor || "#666666"};
    }
    
    .section {
      margin: 4rem 0;
      padding: 2rem;
      background-color: transparent;
      border-radius: 10px;
      text-align: center;
      ${
        enableEffects && enableRgbEffects
          ? `
      position: relative;
      z-index: 1;
      `
          : ""
      }
      ${
        enableEffects
          ? `
      transition: transform 0.3s ease;
      `
          : ""
      }
    }
    
    ${
      enableEffects && enableRgbEffects
        ? `
    .section::before {
      content: '';
      position: absolute;
      top: -${rgbBorderWidth || 3}px;
      left: -${rgbBorderWidth || 3}px;
      right: -${rgbBorderWidth || 3}px;
      bottom: -${rgbBorderWidth || 3}px;
      z-index: -1;
      background: ${getColorGradient()};
      background-size: 400% 400%;
      border-radius: 12px;
      filter: blur(3px);
      opacity: ${(rgbIntensity || 7) / 10};
      animation: flowingBorder ${animationSpeed || 3}s linear infinite;
    }
    `
        : ""
    }
    
    .section:hover {
      ${
        enableEffects
          ? `
      transform: translateY(-5px);
      `
          : ""
      }
    }
    
    .section-title {
      text-align: center;
      margin-bottom: 2rem;
      position: relative;
    }
    
    .section-title:after {
      content: '';
      display: block;
      width: 50px;
      height: 3px;
      background-color: ${secondaryColor || "#666666"};
      margin: 1rem auto;
    }
    
    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }
    
    .gallery-item {
      overflow: hidden;
      border-radius: 8px;
      ${
        enableEffects
          ? `
      transition: transform 0.3s ease;
      `
          : ""
      }
    }
    
    .gallery-item:hover {
      ${
        enableEffects
          ? `
      transform: scale(1.05);
      `
          : ""
      }
    }
    
    .gallery-item img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      display: block;
    }
    
    .map-container {
      height: 400px;
      border-radius: 8px;
      overflow: hidden;
      background-color: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666;
      font-style: italic;
    }
    
    .main-image-container {
      display: flex;
      justify-content: center;
      margin: 2rem 0;
    }
    
    .main-image {
      position: relative;
      width: 250px;
      height: 250px;
      margin: 0 auto;
    }
    
    .main-image-frame {
      width: 100%;
      height: 100%;
      ${getMainImageShapeClass()}
      overflow: hidden;
      position: relative;
      z-index: 1;
      border: 2px solid white;
    }
    
    .main-image-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .couple-photos {
      display: flex;
      justify-content: space-around;
      margin: 2rem 0;
      flex-wrap: wrap;
      background-color: transparent;
      padding: 2rem;
      text-align: center;
    }
    
    .photo-container {
      position: relative;
      width: 200px;
      height: 200px;
      margin: 1rem;
    }
    
    .photo-frame {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
      position: relative;
      z-index: 1;
      border: 2px solid white;
    }
    
    .photo-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    /* Music player styles */
    .music-player {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 100;
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .music-player:hover {
      transform: scale(1.1);
    }
    
    .music-player.playing {
      background-color: rgba(0, 0, 0, 0.8);
    }
    
    .music-player i {
      color: ${primaryColor || "#000000"};
      font-size: 20px;
    }
    
    /* Digital gifts section */
    .gift-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
      margin: 2rem 0;
    }
    
    .gift-card {
      background-color: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      width: 300px;
      text-align: center;
    }
    
    .gift-card-header {
      margin-bottom: 1rem;
      font-weight: bold;
      color: ${primaryColor || "#000000"};
    }
    
    .gift-card-content {
      margin-bottom: 1rem;
    }
    
    .gift-card-number {
      background-color: #f5f5f5;
      padding: 0.5rem;
      border-radius: 4px;
      font-family: monospace;
      font-size: 1.1em;
      margin: 0.5rem 0;
    }
    
    /* RSVP section */
    .rsvp-form {
      max-width: 600px;
      margin: 0 auto;
      background-color: rgba(255, 255, 255, 0.8);
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .form-group {
      margin-bottom: 1.5rem;
      text-align: left;
    }
    
    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
      color: ${primaryColor || "#000000"};
    }
    
    .form-input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-family: inherit;
      font-size: 1rem;
    }
    
    .form-textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-family: inherit;
      font-size: 1rem;
      min-height: 100px;
    }
    
    .form-select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-family: inherit;
      font-size: 1rem;
      background-color: white;
    }
    
    .form-button {
      background-color: ${primaryColor || "#000000"};
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    
    .form-button:hover {
      background-color: ${secondaryColor || "#666666"};
    }
    
    ${
      enableEffects
        ? `
    .photo-border {
      position: relative;
    }
    
    .photo-border::before {
      content: '';
      position: absolute;
      top: -${rgbBorderWidth || 3}px;
      left: -${rgbBorderWidth || 3}px;
      right: -${rgbBorderWidth || 3}px;
      bottom: -${rgbBorderWidth || 3}px;
      z-index: -1;
      background: ${getColorGradient()};
      background-size: 400% 400%;
      border-radius: 50%;
      filter: blur(3px);
      opacity: ${(rgbIntensity || 7) / 10};
      animation: flowingBorder ${animationSpeed || 3}s linear infinite;
    }
    
    .rgb-border {
      position: relative;
      z-index: 1;
      border-radius: 10px;
    }

    .rgb-border::before {
      content: '';
      position: absolute;
      top: -${rgbBorderWidth || 3}px;
      left: -${rgbBorderWidth || 3}px;
      right: -${rgbBorderWidth || 3}px;
      bottom: -${rgbBorderWidth || 3}px;
      z-index: -1;
      background: ${getColorGradient()};
      background-size: 400% 400%;
      border-radius: 12px;
      filter: blur(3px);
      opacity: ${(rgbIntensity || 7) / 10};
      animation: flowingBorder ${animationSpeed || 3}s linear infinite;
    }

    @keyframes flowingBorder {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes shine {
      to {
        background-position: 200% center;
      }
    }
    `
        : ""
    }
    
    footer {
      text-align: center;
      padding: 2rem;
      margin-top: 4rem;
      color: ${primaryColor || "#000000"};
    }
    
    /* Responsive design */
    @media (max-width: 768px) {
      .container {
        padding: 0.5rem;
        width: 100%;
        max-width: 100%;
      }
      
      header {
        padding: 1.5rem 1rem;
      }
      
      .couple-names {
        font-size: ${(headerFontSize || 32) * 1.2}px;
      }
      
      .date-time {
        font-size: ${(headerFontSize || 32) * 0.6}px;
      }
      
      .section {
        padding: 1.5rem;
        margin: 1.5rem 0;
      }
      
      .gallery {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 0.5rem;
      }
      
      .text-container {
        padding: 1rem;
      }
      
      .map-container {
        height: 300px;
      }
      
      .message, .parents-message {
        padding: 0.5rem;
      }
      
      .couple-photos {
        flex-direction: column;
        align-items: center;
      }
      
      .main-image {
        width: 200px;
        height: 200px;
      }
      
      .gift-container {
        flex-direction: column;
        align-items: center;
      }
      
      .gift-card {
        width: 100%;
      }
    }

    @media (max-width: 480px) {
      .couple-names {
        font-size: ${(headerFontSize || 32) * 1}px;
      }
      
      .date-time {
        font-size: ${(headerFontSize || 32) * 0.5}px;
      }
      
      .section {
        padding: 1rem;
        margin: 1rem 0;
      }
      
      .photo-container {
        width: 150px;
        height: 150px;
      }
      
      .main-image {
        width: 180px;
        height: 180px;
      }
    }

    /* Error handling for images */
    img {
      min-height: 20px;
      min-width: 20px;
    }
    
    img.error {
      position: relative;
      background-color: #f8f8f8;
    }
    
    img.error::after {
      content: '⚠️ Image could not be loaded';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 14px;
      color: #666;
    }

    /* Loading indicator */
    .loading-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 255, 255, 0.8);
      z-index: 9999;
    }

    .loading-spinner {
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-left-color: ${primaryColor || "#000000"};
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
  <script>
    // Handle image loading errors
    function handleImageError(img) {
      img.classList.add('error');
      img.src = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 1 1%22%3E%3C%2Fsvg%3E';
      img.alt = 'Image failed to load';
      img.style.backgroundColor = '#f8f8f8';
      img.style.border = '1px dashed #ccc';
    }

    window.addEventListener('DOMContentLoaded', function() {
      // Add error handlers to all images
      const images = document.querySelectorAll('img');
      images.forEach(function(img) {
        img.onerror = function() {
          handleImageError(this);
        };
      });

      // Remove loading indicator
      const loadingContainer = document.getElementById('loading-container');
      if (loadingContainer) {
        loadingContainer.style.display = 'none';
      }
    });
  </script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  </head>
<body>
  <!-- Loading indicator -->
  <div id="loading-container" class="loading-container">
    <div class="loading-spinner"></div>
  </div>

  ${safeBackgroundImage ? '<div class="bg-container"></div>' : ""}

  <div class="container">
    ${
      mainImage
        ? `
    <div class="main-image-container">
      <div class="main-image">
        <div class="main-image-frame photo-border">
          <img src="${safeImageUrl(mainImage)}" alt="Main Wedding Photo" onerror="handleImageError(this)" />
        </div>
      </div>
    </div>
    `
        : ""
    }
    
    <header>
      <div class="text-container">
        <div class="couple-names">${coupleNames || "Couple Names"}</div>
        <div class="date-time">
          ${formattedDate || "Wedding Date"} • ${eventTime || "00:00"}
        </div>
        <div class="location">
          <h3>${eventLocation || "Wedding Venue"}</h3>
          <p>${eventAddress || "Venue Address"}</p>
        </div>
      </div>
    </header>
    
    ${
      malePhoto || femalePhoto
        ? `
    <div class="couple-photos">
      ${
        malePhoto
          ? `
      <div class="photo-container">
        <div class="photo-frame photo-border">
          <img src="${safeImageUrl(malePhoto)}" alt="Groom" onerror="handleImageError(this)" />
        </div>
      </div>
      `
          : ""
      }
      ${
        femalePhoto
          ? `
      <div class="photo-container">
        <div class="photo-frame photo-border">
          <img src="${safeImageUrl(femalePhoto)}" alt="Bride" onerror="handleImageError(this)" />
        </div>
      </div>
      `
          : ""
      }
    </div>
    `
        : ""
    }
    
    <div class="section ${enableEffects && enableRgbEffects ? "rgb-border" : ""}">
      ${
        // Legacy wedding message
        showMessage && message
          ? `
      <div class="message">
        ${message || "Your wedding message will appear here."}
      </div>
      `
          : ""
      }
      
      ${
        // New wedding messages
        weddingMessages.length > 0
          ? weddingMessages
              .map(
                (msg, index) => `
        <div class="message">
          ${msg.content}
        </div>
      `,
              )
              .join("")
          : ""
      }

      ${
        // Legacy parents message
        showParentsMessage && parentsMessage
          ? `
      <div class="parents-message">
        ${parentsMessage || "Message from the parents will appear here."}
      </div>
      `
          : ""
      }
      
      ${
        // New parents messages
        parentsMessages.length > 0
          ? parentsMessages
              .map(
                (msg, index) => `
        <div class="parents-message">
          ${msg.content}
        </div>
      `,
              )
              .join("")
          : ""
      }
    </div>
    
    ${
      galleryImages && galleryImages.length > 0
        ? `
    <div class="section ${enableEffects && enableRgbEffects ? "rgb-border" : ""}">
      <h2 class="section-title">Our Gallery</h2>
      <div class="gallery">
        ${galleryImages
          .map(
            (img) => `
          <div class="gallery-item">
            <img src="${safeImageUrl(img)}" alt="Couple photo" onerror="handleImageError(this)" />
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
    `
        : ""
    }

    ${
      mapLocation
        ? `
    <div class="section ${enableEffects && enableRgbEffects ? "rgb-border" : ""}">
      <div class="map-container">
        <iframe
          src="${safeEmbedUrl}"
          width="100%"
          height="100%"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
    `
        : "<p>Map location is not available.</p>"
    }
    
    ${
      enableDigitalGifts && giftAccounts.length > 0
        ? `
    <div class="section ${enableEffects && enableRgbEffects ? "rgb-border" : ""}">
      <h2 class="section-title">Digital Gifts</h2>
      <p>Your presence is the greatest gift. However, if you wish to honor us with a gift, we've provided the following options:</p>
      
      <div class="gift-container">
        ${giftAccounts
          .map(
            (account) => `
          <div class="gift-card">
            <div class="gift-card-header">${account.bank}</div>
            <div class="gift-card-content">
              <p>${account.accountName}</p>
              <div class="gift-card-number">${account.accountNumber}</div>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
    `
        : ""
    }
    
    ${
      enableRSVP
        ? `
    <div class="section ${enableEffects && enableRgbEffects ? "rgb-border" : ""}">
      <h2 class="section-title">RSVP</h2>
      <p>${rsvpMessage}</p>
      ${rsvpDeadline ? `<p class="text-muted-foreground">Please respond by ${formattedRsvpDeadline}</p>` : ""}
      
      <div class="rsvp-form">
        <form id="rsvp-form">
          <div class="form-group">
            <label class="form-label" for="name">Your Name</label>
            <input class="form-input" type="text" id="name" name="name" required>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="alamat">Address Home</label>
            <input class="form-input" type="alamat" id="alamat" name="alamat">
          </div>
          
          <div class="form-group">
            <label class="form-label" for="phone">Phone</label>
            <input class="form-input" type="tel" id="phone" name="phone">
          </div>
          
          <div class="form-group">
            <label class="form-label" for="attending">Will you attend?</label>
            <select class="form-select" id="attending" name="attending" required>
              <option value="">Please select</option>
              <option value="yes">Yes, I will attend</option>
              <option value="no">No, I cannot attend</option>
            </select>
          </div>
          
          <div class="form-group" id="guests-group" style="display: none;">
            <label class="form-label" for="guests">Number of Guests</label>
            <select class="form-select" id="guests" name="guests">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="message">Message (Optional)</label>
            <textarea class="form-textarea" id="message" name="message"></textarea>
          </div>
          
          <div class="form-group" style="text-align: center;">
            <button type="submit" class="form-button">Submit RSVP</button>
          </div>
        </form>
      </div>
      <script>
        // RSVP form handling
        const attendingSelect = document.getElementById('attending');
        if (attendingSelect) {
          attendingSelect.addEventListener('change', function() {
            const guestsGroup = document.getElementById('guests-group');
            if (this.value === 'yes') {
              guestsGroup.style.display = 'block';
            } else {
              guestsGroup.style.display = 'none';
            }
          });
        }

        const rsvpForm = document.getElementById('rsvp-form');
        if (rsvpForm) {
          rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your RSVP! We have received your response.');
            this.reset();
          });
        }

        // Open IndexedDB
        const dbPromise = indexedDB.open('RSVPDatabase', 1);

        dbPromise.onupgradeneeded = function (event) {
          const db = event.target.result;
          if (!db.objectStoreNames.contains('RSVPStore')) {
            db.createObjectStore('RSVPStore', { keyPath: 'id', autoIncrement: true });
          }
        };

        dbPromise.onerror = function (event) {
          console.error('IndexedDB error:', event.target.errorCode);
        };

        // Handle RSVP form submission
        document.getElementById('rsvp-form').addEventListener('submit', function (event) {
          event.preventDefault(); // Prevent default form submission

          const name = document.getElementById('name').value;
          const address = document.getElementById('alamat').value;
          const phone = document.getElementById('phone').value;
          const attending = document.getElementById('attending').value;
          const guests = document.getElementById('guests').value || null;
          const message = document.getElementById('message').value;

          const rsvpData = { name, address, phone, attending, guests, message };

          const dbRequest = indexedDB.open('RSVPDatabase', 1);

          dbRequest.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction('RSVPStore', 'readwrite');
            const store = transaction.objectStore('RSVPStore');
            store.add(rsvpData);

            transaction.oncomplete = function () {
              alert('RSVP submitted successfully!');
              document.getElementById('rsvp-form').reset();
            };

            transaction.onerror = function (event) {
              console.error('Transaction error:', event.target.error);
            };
          };
        });
      </script>
    </div>
    `
        : ""
    }
          
    <!-- Guest List Section -->
    <div class="section">
      <h2 onclick="openGuestList()" style="cursor: pointer; color: blue; text-decoration: underline;">
        Guest List
      </h2>
      <p>We can't wait to celebrate with you!</p>
    </div>
   </div>
    <script>
      // Function to open guest.html in a new tab
      function openGuestList() {
        window.open('guest.html', '_blank');
      }
      
      // Open IndexedDB
      const dbPromise = indexedDB.open('RSVPDatabase', 1);

      dbPromise.onupgradeneeded = function (event) {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('RSVPStore')) {
          db.createObjectStore('RSVPStore', { keyPath: 'id', autoIncrement: true });
        }
      };

      dbPromise.onerror = function (event) {
        console.error('IndexedDB error:', event.target.errorCode);
      };

      // Handle RSVP form submission
      document.getElementById('rsvp-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById('name').value;
        const address = document.getElementById('alamat').value;
        const phone = document.getElementById('phone').value;
        const attending = document.getElementById('attending').value;
        const guests = document.getElementById('guests').value || null;
        const message = document.getElementById('message').value;

        const rsvpData = { name, address, phone, attending, guests, message };

        const dbRequest = indexedDB.open('RSVPDatabase', 1);

        dbRequest.onsuccess = function (event) {
          const db = event.target.result;
          const transaction = db.transaction('RSVPStore', 'readwrite');
          const store = transaction.objectStore('RSVPStore');
          store.add(rsvpData);

          transaction.oncomplete = function () {
            alert('RSVP submitted successfully!');
            document.getElementById('rsvp-form').reset();
          };

          transaction.onerror = function (event) {
            console.error('Transaction error:', event.target.error);
          };
        };
      });
    </script>
  
  ${
    backgroundMusic
      ? `
  <div class="music-player" id="music-player">
    <i class="fas fa-music"></i>
  </div>
  
  <audio id="background-music" src="${safeImageUrl(backgroundMusic)}" ${autoplayMusic ? "autoplay" : ""} ${
    loopMusic ? "loop" : ""
  } style="display: none;"></audio>
  
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const musicPlayer = document.getElementById('music-player');
      const audio = document.getElementById('background-music');
      
      // Set initial volume
      audio.volume = ${musicVolume / 100};
      
      // Handle audio loading error
      audio.onerror = function() {
        console.error('Error loading audio file');
        musicPlayer.style.display = 'none';
      };
      
      // Update player state based on audio state
      function updatePlayerState() {
        if (!audio.paused) {
          musicPlayer.classList.add('playing');
          musicPlayer.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
          musicPlayer.classList.remove('playing');
          musicPlayer.innerHTML = '<i class="fas fa-music"></i>';
        }
      }
      
      // Toggle play/pause when clicking the music player
      musicPlayer.addEventListener('click', function() {
        if (audio.paused) {
          audio.play().catch(function(error) {
            console.error('Error playing audio:', error);
          });
        } else {
          audio.pause();
        }
        updatePlayerState();
      });
      
      // Update player state when audio plays or pauses
      audio.addEventListener('play', updatePlayerState);
      audio.addEventListener('pause', updatePlayerState);
      
      // Initial state update
      updatePlayerState();
    });
  </script>
  `
      : ""
  }
</body>
</html>
`
  return htmlContent
    }

    // Function to generate indexHTML file content
  const generateIndexHTML = () => {
    // Format date for display
    const formattedDate = eventDate
      ? new Date(eventDate).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : ""

    // Format RSVP deadline for display
    const formattedRsvpDeadline = rsvpDeadline
      ? new Date(rsvpDeadline).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : ""

    // Gunakan embedUrl dari input MapSelector
    const safeEmbedUrl = mapLocation ? mapLocation.toString().replace(/'/g, "\\'") : ""

    // Get the effective background image
    const effectiveBackgroundImage = getEffectiveBackgroundImage()
    const safeBackgroundImage = effectiveBackgroundImage ? safeImageUrl(effectiveBackgroundImage) : ""

    // Generate IndexHTML content
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${coupleNames || "Wedding Invitation"}</title>
  <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily.replace(/ /g, "+") || "Playfair+Display")}:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <link rel="stylesheet" href="style.css">
  <link rel="icon" href="favicon.png" type="image/png">
  <script src="script.js"></script>
</head>
<body>
  <!-- Loading indicator -->
  <div id="loading-container" class="loading-container">
    <div class="loading-spinner"></div>
  </div>

  ${safeBackgroundImage ? '<div class="bg-container"></div>' : ""}
  
  <div class="container">
    ${
      mainImage
        ? `
    <div class="main-image-container">
      <div class="main-image">
        <div class="main-image-frame photo-border">
          <img src="main-image.${mainImage.split(";")[0].split("/")[1]}" alt="Main Wedding Photo" />
        </div>
      </div>
    </div>
    `
        : ""
    }
    
    <header>
      <div class="text-container">
        <div class="couple-names">${coupleNames || "Couple Names"}</div>
        <div class="date-time">
          ${formattedDate || "Wedding Date"} • ${eventTime || "00:00"}
        </div>
        <div class="location">
          <h3>${eventLocation || "Wedding Venue"}</h3>
          <p>${eventAddress || "Venue Address"}</p>
        </div>
      </div>
    </header>
    
    ${
      malePhoto || femalePhoto
        ? `
    <div class="couple-photos">
      ${
        malePhoto
          ? `
      <div class="photo-container">
        <div class="photo-frame photo-border">
          <img src="male-photo.${malePhoto.split(";")[0].split("/")[1]}" alt="Groom" />
        </div>
      </div>
      `
          : ""
      }
      ${
        femalePhoto
          ? `
      <div class="photo-container">
        <div class="photo-frame photo-border">
          <img src="female-photo.${femalePhoto.split(";")[0].split("/")[1]}" alt="Bride" />
        </div>
      </div>
      `
          : ""
      }
    </div>
    `
        : ""
    }
    
    <div class="section ${enableEffects && enableRgbEffects ? "rgb-border" : ""}">
      ${
        // Legacy wedding message
        showMessage && message
          ? `
      <div class="message">
        ${message || "Your wedding message will appear here."}
      </div>
      `
          : ""
      }
      
      ${
        // New wedding messages
        weddingMessages.length > 0
          ? weddingMessages
              .map(
                (msg, index) => `
        <div class="message">
          ${msg.content}
        </div>
      `,
              )
              .join("")
          : ""
      }

      ${
        // Legacy parents message
        showParentsMessage && parentsMessage
          ? `
      <div class="parents-message">
        ${parentsMessage || "Message from the parents will appear here."}
      </div>
      `
          : ""
      }
      
      ${
        // New parents messages
        parentsMessages.length > 0
          ? parentsMessages
              .map(
                (msg, index) => `
        <div class="parents-message">
          ${msg.content}
        </div>
      `,
              )
              .join("")
          : ""
      }
    </div>
    
    ${
      galleryImages && galleryImages.length > 0
        ? `
    <div class="section ${enableEffects && enableRgbEffects ? "rgb-border" : ""}">
      <h2 class="section-title">Our Gallery</h2>
      <div class="gallery">
        ${galleryImages
          .map(
            (img, index) => `
          <div class="gallery-item">
            <img src="gallery-image-${index + 1}.${img.split(";")[0].split("/")[1]}" alt="Gallery Image ${index + 1}" />
          </div>
        `
          )
          .join("")}
      </div>
    </div>
    `
        : ""
    }
    
    ${
      mapLocation
        ? `
    <div class="section">
      <h2 class="section-title">Location</h2>
      <div class="map-container">
        <iframe
          src="${safeEmbedUrl}"
          width="100%"
          height="450"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
    `
        : ""
    }
    
    ${
      enableDigitalGifts && giftAccounts.length > 0
        ? `
    <div class="section ${enableEffects && enableRgbEffects ? "rgb-border" : ""}">
      <h2 class="section-title">Digital Gifts</h2>
      <p>Your presence is the greatest gift. However, if you wish to honor us with a gift, we've provided the following options:</p>
      
      <div class="gift-container">
        ${giftAccounts
          .map(
            (account) => `
          <div class="gift-card">
            <div class="gift-card-header">${account.bank}</div>
            <div class="gift-card-content">
              <p>${account.accountName}</p>
              <div class="gift-card-number">${account.accountNumber}</div>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
    `
        : ""
    }
    
    ${
      enableRSVP
        ? `
    <div class="section ${enableEffects && enableRgbEffects ? "rgb-border" : ""}">
      <h2 class="section-title">RSVP</h2>
      <p>${rsvpMessage}</p>
      ${rsvpDeadline ? `<p class="text-muted-foreground">Please respond by ${formattedRsvpDeadline}</p>` : ""}
      
      <div class="rsvp-form">
        <form id="rsvp-form">
          <div class="form-group">
            <label class="form-label" for="name">Your Name</label>
            <input class="form-input" type="text" id="name" name="name" required>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="alamat">Address Home</label>
            <input class="form-input" type="alamat" id="alamat" name="alamat">
          </div>
          
          <div class="form-group">
            <label class="form-label" for="phone">Phone</label>
            <input class="form-input" type="tel" id="phone" name="phone">
          </div>
          
          <div class="form-group">
            <label class="form-label" for="attending">Will you attend?</label>
            <select class="form-select" id="attending" name="attending" required>
              <option value="">Please select</option>
              <option value="yes">Yes, I will attend</option>
              <option value="no">No, I cannot attend</option>
            </select>
          </div>
          
          <div class="form-group" id="guests-group" style="display: none;">
            <label class="form-label" for="guests">Number of Guests</label>
            <select class="form-select" id="guests" name="guests">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="message">Message (Optional)</label>
            <textarea class="form-textarea" id="message" name="message"></textarea>
          </div>
          
          <div class="form-group" style="text-align: center;">
            <button type="submit" class="form-button">Submit RSVP</button>
          </div>
        </form>
      </div>
    </div>      
    `
        : ""
    }

    <!-- Guest List Section -->
    <div class="section">
      <h2 onclick="openGuestList()" style="cursor: pointer; color: blue; text-decoration: underline;">
        Guest List
      </h2>
      <p>We can't wait to celebrate with you!</p>
    </div>
   </div>
    <script>
      // Function to open guest.html in a new tab
      function openGuestList() {
        window.open('guest.html', '_blank');
      }
      
      // Open IndexedDB
      const dbPromise = indexedDB.open('RSVPDatabase', 1);

      dbPromise.onupgradeneeded = function (event) {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('RSVPStore')) {
          db.createObjectStore('RSVPStore', { keyPath: 'id', autoIncrement: true });
        }
      };

      dbPromise.onerror = function (event) {
        console.error('IndexedDB error:', event.target.errorCode);
      };

      // Handle RSVP form submission
      document.getElementById('rsvp-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById('name').value;
        const address = document.getElementById('alamat').value;
        const phone = document.getElementById('phone').value;
        const attending = document.getElementById('attending').value;
        const guests = document.getElementById('guests').value || null;
        const message = document.getElementById('message').value;

        const rsvpData = { name, address, phone, attending, guests, message };

        const dbRequest = indexedDB.open('RSVPDatabase', 1);

        dbRequest.onsuccess = function (event) {
          const db = event.target.result;
          const transaction = db.transaction('RSVPStore', 'readwrite');
          const store = transaction.objectStore('RSVPStore');
          store.add(rsvpData);

          transaction.oncomplete = function () {
            alert('RSVP submitted successfully!');
            document.getElementById('rsvp-form').reset();
          };

          transaction.onerror = function (event) {
            console.error('Transaction error:', event.target.error);
          };
        };
      });
    </script>
  
  ${
    backgroundMusic
      ? `
  <div class="music-player" id="music-player">
    <i class="fas fa-music"></i>
  </div>
  
  <audio id="background-music" src="music.mp3" ${autoplayMusic ? "autoplay" : ""} ${
    loopMusic ? "loop" : ""
  } style="display: none;"></audio>
  `
      : ""
  }
  
  <!-- <script src="script.js"></script> -->
</body>
</html>
`
  }

    // Function to generateGuestHTML file content
    const generateGuestHTML = (guestList: { name: string; alamat?: string; phone?: string; attending: string; guests?: number; message?: string }[]) => {
      // Format date for display
      const formattedDate = eventDate
        ? new Date(eventDate).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : ""
  
      // Get the effective background image
      const effectiveBackgroundImage = getEffectiveBackgroundImage()
      const safeBackgroundImage = effectiveBackgroundImage ? safeImageUrl(effectiveBackgroundImage) : ""
  
  // Generate GuestHTML content
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${coupleNames || "Wedding Invitation"}</title>
  <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily.replace(/ /g, "+") || "Playfair+Display")}:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <link rel="icon" href="favicon.png" type="image/png">
  <link rel="stylesheet" href="style.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
</head>
<body>
  ${safeBackgroundImage ? `<div class="bg-container" style="background-image: url('${safeBackgroundImage}');"></div>` : ""}
  <div class="container">
    <h3>Guest List</h3>
    <div class="location" style="text-align: center;">${coupleNames || "Wedding Invitation"}</div>
    <div class="date-time" style="text-align: center;">${formattedDate || "Event Date"} at ${eventTime || "Event Time"}</div>
    <div class="location" style="text-align: center;">${eventLocation || "Event Location"}</div>

    ${
      guestList.length > 0
        ? `
    <div class="section ${enableEffects && enableRgbEffects ? "rgb-border" : ""}">
      <!-- Bagian atas tombol dan icon -->
	     <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
  	    <!-- Icon kembali ke home -->
  	    <a href="/" title="Kembali ke Home" style="text-decoration: none; font-size: 20px; color: #000;">
    	    <i class="fas fa-arrow-left"></i>
  	    </a>
        <!-- Tombol + dan Download di tengah -->
	      <div style="display: flex; gap: 10px;">
    	   <button type="button" class="form-button" id="show-rsvp-form-btn" style="margin-bottom: 10px;">
             <i class="fas fa-plus"></i>
         </button>
         <button type="button" class="form-button" id="download-pdf-btn" style="margin-bottom: 10px;">
             <i class="fas fa-download"></i>
         </button>
        </div>
       </div>
     <table border="1" width="100%">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Attending</th>
          <th>Guests</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody id="guest-list">
       <!-- Example data, replace with dynamic data from IndexedDB -->
      </tbody>
     </table>
    </div>
    <div id="pagination" style="text-align: center; margin-top: 10px;">
      <!-- Pagination buttons will be dynamically added here -->
    </div>
      <!-- RSVP Modal -->
    <div id="rsvp-modal" class="modal" style="display: none;">
      <div class="modal-content">
        <span class="close-btn" id="close-modal-btn">&times;</span>
        <h3>Add RSVP</h3>
        <form id="rsvp-form">
          <div>
            <label for="name">Name:</label>
            <input type="text" id="name" required>
          </div>
          <div>
            <label for="address">Address:</label>
            <input type="text" id="address" required>
          </div>
          <div>
            <label for="phone">Phone:</label>
            <input type="text" id="phone" required>
          </div>
          <div>
            <label for="attending">Attending:</label>
            <select id="attending" required>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div id="guests-container" style="display: true;">
            <label for="guests">Guests:</label>
            <input type="number" id="guests" min="0">
          </div>
          <div>
            <label for="message">Message:</label>
            <textarea id="message"></textarea>
          </div>
          <button type="submit">Submit RSVP</button>
        </form>
      </div>
    </div>
    `
        : `<p class="empty-message">No guests have RSVP'd yet.</p>`
    }
    </div>
    <script>
      // ==========================
      // Inisialisasi IndexedDB
      // ==========================
      const dbName = 'RSVPDatabase';
      const storeName = 'RSVPStore';

      let db;

      function initDB() {
        const request = indexedDB.open(dbName, 1);
        request.onupgradeneeded = function (event) {
          db = event.target.result;
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
          }
        };
        request.onsuccess = function (event) {
          db = event.target.result;
          loadData(); // Muat data setelah DB siap
        };
        request.onerror = function (event) {
          console.error('Error opening IndexedDB:', event.target.error);
        };
      }

      // ==========================
      // Load data dari IndexedDB
      // ==========================
      let guestList = [];
      const rowsPerPage = 5;
      let currentPage = 1;

      function loadData() {
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();

        request.onsuccess = function () {
          guestList = request.result;
          renderTable();
          renderPagination();
        };
        request.onerror = function () {
          console.error('Error fetching data.');
        };
      }

      // ==========================
      // Render tabel data RSVP
      // ==========================
      function renderTable() {
        const tbody  = document.getElementById('guest-list');
        tbody.innerHTML = '';

        const (startIdx  = (currentPage - 1) * rowsPerPage;
        const endIdx  = Math.min((startIdx  + rowsPerPage, guestList.length);

        for (let i = startIdx; i < endIdx; i++) {
          const guest = guestList[i];
          const row = document.createElement('tr');
          row.innerHTML = \`
            <td>\${i + 1}</td>
            <td>\${guest.name || '-'}</td>
            <td>\${guest.address || '-'}</td>
            <td>\${guest.phone || '-'}</td>
            <td>\${guest.attending || '-'}</td>
            <td>\${guest.guests !== undefined ? guest.guests : '-'}</td>
            <td>\${guest.message || '-'}</td>
          \`;
          tableBody.appendChild(row);
        }
      }

      // ==========================
      // Render pagination
      // ==========================
      function renderPagination() {
        const paginationDiv = document.getElementById('pagination');
        paginationDiv.innerHTML = '';

        const totalPages = Math.ceil(guestList.length / rowsPerPage);
        if (totalPages <= 1) return; // Tidak perlu pagination jika cuma 1 halaman

        for (let i = 1; i <= totalPages; i++) {
          const btn = document.createElement('button');
          btn.textContent = i;
          btn.style.margin = '0 5px';
          btn.style.padding = '5px 10px';
          btn.style.cursor = 'pointer';

          if (i === currentPage) {
            btn.style.backgroundColor = '#007bff';
            btn.style.color = '#fff';
            btn.style.border = 'none';
            btn.style.borderRadius = '4px';
          }

          btn.addEventListener('click', () => {
            currentPage = i;
            renderTable();
            renderPagination();
          });

          paginationDiv.appendChild(btn);
        }
      }

      // ==========================
      // Event listener untuk modal
      // ==========================
      const modal = document.getElementById('rsvp-modal');
      const showModalBtn = document.getElementById('show-rsvp-form-btn');
      const closeModalBtn = document.getElementById('close-modal-btn');

      showModalBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
      });

      closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });

      window.addEventListener('click', (event) => {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });

      // ==========================
      // Handle form submit
      // ==========================
      document.getElementById('rsvp-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const address = document.getElementById('address').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const attending = document.getElementById('attending').value;
        const guests = document.getElementById('guests').value;
        const message = document.getElementById('message').value.trim();

        const newRSVP = {
          name,
          address,
          phone,
          attending,
          guests: guests !== '' ? parseInt(guests) : 0,
          message,
        };

        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        store.add(newRSVP);

        transaction.oncomplete = () => {
          alert('RSVP added successfully!');
          document.getElementById('rsvp-form').reset();
          modal.style.display = 'none';
          loadData(); // Muat ulang data untuk update tabel
        };

        transaction.onerror = () => {
          console.error('Gagal menyimpan RSVP');
        };
      });

      // ==========================
      // Tampilkan/hide Guests input berdasarkan Attending
      // ==========================
      const attendingSelect = document.getElementById('attending');
      const guestsContainer = document.getElementById('guests-container');

      attendingSelect.addEventListener('change', () => {
        if (attendingSelect.value === 'Yes') {
          guestsContainer.style.display = 'block';
        } else {
          guestsContainer.style.display = 'none';
          document.getElementById('guests').value = '';
        }
      });

      // ==========================
      // Download PDF
      // ==========================
      document.getElementById('download-pdf-btn').addEventListener('click', () => {
        if (guestList.length === 0) {
          alert('No data available to download.');
          return;
        }
        generatePDF(guestList);
      });

      async function generatePDF(data) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('Guest List', 10, 10);

        const headers = ['#', 'Name', 'Address', 'Phone', 'Attending', 'Guests', 'Message'];
        let y = 20;
        doc.setFontSize(12);
        doc.text(headers.join(' | '), 10, y);

        data.forEach((guest, index) => {
          y += 10;
          const row = [
            index + 1,
            guest.name,
            guest.address,
            guest.phone,
            guest.attending,
            guest.guests !== undefined ? guest.guests : '-',
            guest.message || '-',
          ];
          doc.text(row.join(' | '), 10, y);
        });

        doc.save('guest_list.pdf');
      }

      // ==========================
      // Inisialisasi
      // ==========================
      window.onload = () => {
        initDB();
      };
    </script>
</body>
</html>
  `;
};

  // Function to generate README.md content
  const generateReadme = () => {
    return `# Wedding Invitation

## Overview
This is a custom wedding invitation created with the Wedding Invitation Builder. It contains all the necessary files to host your own wedding invitation website.

## 📁 ZIP File Structure
After you extract the ZIP file, you will find the following file structure:
wedding-invitation/ 
├── index.html 
├── guest.html 
├── style.css 
├── script.js 
├── music.mp3 
├── README.md
└── favicon.png

### File Explanation:
- \`index.html\`: The main file to open the invitation in the browser.
- \`guest.html\`: The main file to open the invitation in the browser.
- \`style.css\`: CSS file to set the appearance of the invitation.
- \`script.js\`: JavaScript file to add interactivity.
- \`music.mp3\`: Background music file to play automatically (if you added music).
- \`README.md\`: This file, which contains instructions and information about the invitation.
- \`favicon.png\`: Small icon that appears in browser tabs.


## 🚀 How to Run in Local Browser

### 1. \`On Computer (Windows/Mac/Linux):\`
1. Extract the ZIP file into a folder.
2. Open the extracted folder.
3. Double-click on the \`index.html\` file.
4. The invitation will open in your default browser.

### 2. \`On Mobile or iPad:\`
1. Extract the ZIP file using a file manager app (such as **Files** on iOS or **ZArchiver** on Android).
2. Open the extracted folder.
3. Click on the \`index.html\` file.
4. Choose a browser to open the file (such as Chrome, Safari, or others).


## 🌐 How to Run on VPS
Upload all these files to your web hosting service
The invitation will be accessible via the index.html file

### 1. \`Upload Files to VPS:\`
1. Use an FTP application such as \`FileZilla\` or the SCP command to upload the extracted folder to your VPS.

scp -r wedding-invitation/ user@your-vps-ip:/var/www/html/

Make sure the folder is uploaded to your web server directory (example: /var/www/html/).

2. Web Server Configuration:
If you are using Nginx, add the following configuration to the Nginx configuration file:
  server {
  listen 80;
  server_name your-domain.com;

  root /var/www/html/wedding-invitation;
  index index.html;

  location / {
  try_files $uri $uri/ =404;
  }
  }

If you are using Apache, make sure the mod_rewrite module is enabled, and place the file in the root directory of your web server.

3. Access Invitation:
Open a browser and access your VPS URL:
http://your-vps-ip/
or
http://your-domain.com/


📱 Note for Mobile and iPad
If the music doesn't start playing automatically, click anywhere on the screen to start the music (as some browsers block audio autoplay).

❓ FAQ
1. Why doesn't the music start playing automatically?
Some browsers block audio autoplay. Make sure you've interacted with the page (such as clicking on the screen) to start the music.

2. How do I change the music?
Replace the music.mp3 file with another music file. Make sure the file name remains music.mp3.

3. How do I change the favicon?
Replace the favicon.png file with another icon. Make sure the file name remains favicon.png.

🛠️ Support
If you have any issues, please contact the development team or see additional documentation.

Enjoy using your wedding invitation! 🎉


### Explanation:
1. \`File Structure\`:
- Explains the contents of the ZIP file and its functions.

2. \`Local Guide\`:
- Provides steps to run the invitation on a computer, mobile phone, or iPad.

3. \`VPS Guide\`:
- Explains how to upload files to a VPS and configure a web server (Nginx/Apache).

4. \`FAQ\`:
- Answers common questions such as autoplay music and file replacement.

5. \`Support\`:
- Provides information for further assistance.

## Customization
If you want to make further changes:
- Edit the HTML in index.html to change content
- Edit the CSS in style.css to change styling
- Edit the JavaScript in script.js to change functionality

## Credits
Created with the Wedding Invitation Builder
`
  }

  // Function to generate a simple favicon
  const generateFavicon = () => {
    // Simple favicon icon as base64
    return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHrElEQVR4nO1aDYxUVxW+tMVqrJqqqUYb991z37x335RuDVCR+rOioN031P4kq7ZS46LUWEwrUFKDBlrXAsVSu8i8ZSG0abWIVLozG1qlKW7K0gq11J+yago7A6iwRaA1IAT2vfnMvTtPZt/OzryFLLttPMnJzt4357zz3XPuPeeeO4z9n94ihBbmwmMbsZLdDI+l4bHjSLMd8Ni9SLMupNnLWMk+iDXsA2hhSSxiF7DRRGhhH4bHNsNjqMpp9lrJ56ai/JfgsaVIs8aRA9HKJDy2v4zBhZLPf408e6P4fKnW4bHXi+M+lrN3nH8QHrsUHusuGvhbpNkPi5/bkGZL4LFepNlCeOyLJQAa0crGwmOXhaGFNKuDx+6Gx+rPOwhFWMkm6ZlNs21qJpVhaGFX/c/AR9jb9d9mdjE8dgc8ZrPRSljFJipD2VuRwNgFsKz3wzZsSDG51xZf8JNmgy/FLF+ac3xJCwNJPw4c0RpIWh9I8ZQvxVZf0su+Q92+Q4d9SacCR0Cx74jAl7Tfd6gjcMRSOOKKczPQpol+kn/Vd+iOwBH3BJJWBFL8PJD0a1+KHb6k3b4UR0MDhot9RwSBQ4/CNN891BkeE0ixNs5LTkvCvxyB3VJgp03osAgZi/BYguOnJuE+QVggOO4WhNmC43biuJUMzCCO63kff8bo4/GGodmsMSBqDFxjcLxg0xlAUryI2tp3xgbiO+LLofBWS+AHRUO+TRy3cI7p3MCnDAO1NQasGgMTDQNTDQM3cY6vE8d3iWOhICw3OVabhHUJwvoE4akE4ekEodMSmv9kk+a8TdgrCUck4agUOF1893ZL4OOGgWOydPJoeWwggSN+pYR2WAKfNgw8bBJ+UTTieYvwik3YJwX+PcwhFThCT87O/l75T+wQ8yV1KSE1o83mGSUjwTOI68krHet1yI0JROxTAosEx6OJkQXyDeLYEgHi22JeXCA9SmCe4Ng4wkBmC65Dut+4FPfHBaK31LmCo22EgcwVHE8OAEIrYgKhY0pA7VS/TPARBbJAcL3rRTyyNi4QnWXvMTkeibvYp3wShdUtKHRuRaFjCwrLliC4+qozzz/2URTmz0Vh+TIUbr8NwfhxsfQ2Ca53zcj4unhAdCYVOqE9EANIofFW4PhxDKCeHgQ3TEdhViNw9Gj/ZwcPaLlquu83OVZFbZDUFgtIKKCSmAqvii+rm1weREiHXgNOnij/7OQJBA03VtT/gElIm9Hwpt9UBQHGLgwFnrX6tr+K3mj1cE700osV9T9kcjwU8YgqOKsDmTBhbCjwR1voWqgikN89f25AAO3VwfSvMAkPRjziO+L3sTwSrpF/2gKTjSpAtnWeOxB32qD6vQRhmYgAkdQVa434UryuBFTxJmsMXeEOW2gdOYJgnDWo/laTsGSAR6g7HhCHcqGQKqX/0a/6jPDnpwC+f9Y4CoubKnp8bYKjKbLh+FIcjAtkZyh0Ezf6VZ/lvdJydiC2dSK4IlFR92OJviNBZI28EQuI2t5CIXUGGVDrRHmchcKzzwwNRdeu/glzEF6X6DuYRdbI6bhAVodC95oca+PUWwrMmlXxPPHCNp3pq+p0BJ6wCPPLpADU1V0UI7TE90MBlVUXD0hIFcJs3p3AiRODg3jyCQRX2rH1tSUIc0QZIMnkJTGAmDNCAXX+vrNKUhzA9VMH5pcjh1H43l1D0+MIfTyeXRbI5e+tCgS2uCYU2G4TvkLGkA3Q3pk/p6+mWv84gknjz0rHMxbhtnKhVUuXVQdC9B7fEQUloBoDdVWS4nByh0WYWQ6Ibb+rKpDS4+5JR8CpMdSWNyJAOi2h20elY6ryiLXYFQWO2BQKXl1j4FClpDiMvF2FdqTe8yXtiQVCA5F0Xyh4Hef4c5WkOFy8wxK4OVq4SsrEBtLriBtCwW+SoRfdSAD5WYLjW5E14jt8ZmwgkPJ9KoOGhZvqL+2RQncE9xU7goPx34vfK2XVUfxDscOoFrDaVlVTQWVuVU81F4vDBYLr7f5rnOvKW3Uwd9n9wuq42oxiAymGV5sSPlU8Oyulqker2pjjB+HJxe+U8jTD0OcaVbephat2IZUbVLtJGf4jQfiJyfWErUsQ2i3Cc8VuZtRDvkPzhwRCe8Wy+Pnotsdnao+9Ww0AkxRmIEWzvs9w6NBIAPB1TqM1SCbfdlYgygKbMGEsbPtDsHhtb5I+qzr3vhSz+y5zRHPgiMdV9ew74iXNkvboyxwpDirvqhivaLSkY74jDviO+FvfhRAtRNJMhu/PuZtq8m62PT8904hFi0bPdbe678CVH7lUM2Njos93NWy4JJfKbMm57Xep//dOb/9cPpWF4lwq+5ecm1mcdzNTRhWoUtrVsEGH0d7rsjyXyvTm3Ky/tz77CTWWT2VuzKWyXSGgPlCZWWy0UT6VmZlLZQr5+nZ9fZ1PZZu0wW5m96vXPq0vYtGw4cLuVGZqPpVdlnczm3NuZhIbbZRzM23a8Pq2W0Lv5N3MK2qsO5X9DnuzUN7N9CijVViFYzk3e31xXRwYteuhlPalNlExjHpKx8EwJp/KPpdzs4f3N2w4/z/7GCq9eu3Gy/Nu9lTOzQ64Ouio67goX9ehf13xpqCD0zbHv4Iuof8CkH/dHuwAY4IAAAAASUVORK5CYII=`
  }

  useEffect(() => {
    setIsLoading(true)

    // Update iframe content
    if (iframeRef.current) {
      const iframe = iframeRef.current
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document

      if (iframeDoc) {
        iframeDoc.open()
        const htmlContent = generateHTML();
        iframeDoc.write(htmlContent);
        iframeDoc.close()

        // Set up download zip button
        const downloadZipBtn = document.getElementById("download-zip-btn")
        if (downloadZipBtn) {
          downloadZipBtn.onclick = handleZipDownload
        }
      }

      setIsLoading(false)
    }
  }, [
    coupleNames,
    eventDate,
    eventTime,
    eventLocation,
    eventAddress,
    weddingMessages,
    parentsMessages,
    message,
    parentsMessage,
    showMessage,
    showParentsMessage,
    primaryColor,
    secondaryColor,
    backgroundColor,
    customBackgroundImage,
    presetBackground,
    fontFamily,
    headerFontSize,
    bodyFontSize,
    enableEffects,
    galleryImages,
    mapLocation,
    rgbIntensity,
    rgbBorderWidth,
    animationSpeed,
    malePhoto,
    femalePhoto,
    colorTheme,
    mainImage,
    photoShape,
    getEffectiveBackgroundImage,
    enableRgbEffects,
    backgroundMusic,
    autoplayMusic,
    loopMusic,
    musicVolume,
    enableDigitalGifts,
    giftAccounts,
    enableRSVP,
    rsvpDeadline,
    rsvpMessage,
  ])

  const handleZipDownload = async () => {
    try {
      setIsLoading(true);
  
      // Create a new JSZip instance
      const zip = new JSZip();
  
      // Add files to the zip
      // zip.file(`${coupleNames}.html`, generateHTML());
      zip.file("index.html", generateIndexHTML());
      zip.file("guest.html", generateGuestHTML([])); // Pass an empty array or the actual guest list
      zip.file("style.css", generateCSS());
      zip.file("script.js", generateJS());
      zip.file("README.md", generateReadme());

      // Add favicon
      const faviconData = generateFavicon();
      if (faviconData.startsWith("data:image/png;base64,")) {
        const base64Data = faviconData.split(",")[1]; // Ambil hanya data base64 setelah "data:image/png;base64,"
        zip.file("favicon.png", base64Data, { base64: true });
      }
  
      // Add music if available
      if (backgroundMusic) {
        if (backgroundMusic.startsWith("data:audio")) {
          const base64Data = backgroundMusic.split(",")[1];
          zip.file("music.mp3", base64Data, { base64: true });
        } else {
          try {
            const response = await fetch(backgroundMusic);
            const blob = await response.blob();
            zip.file("music.mp3", blob);
          } catch (error) {
            console.error("Error fetching music file:", error);
            zip.file(
              "README.md",
              generateReadme() +
                "\n\nNOTE: The music file could not be included in this zip. Please add your own music.mp3 file."
            );
          }
        }
      }

        // Add gallery images if available
        if (galleryImages && galleryImages.length > 0) {
          galleryImages.forEach((image, index) => {
            if (image.startsWith("data:image")) {
              const [metadata, base64Data] = image.split(",");
              const extension = metadata.split(";")[0].split("/")[1];
              zip.file(`gallery-image-${index + 1}.${extension}`, base64Data, { base64: true });
            }
          });
        }

        // Add main image if available
        if (mainImage && mainImage.startsWith("data:image")) {
          const [metadata, base64Data] = mainImage.split(",");
          const extension = metadata.split(";")[0].split("/")[1];
          zip.file(`main-image.${extension}`, base64Data, { base64: true });
        }

        // Add male photo if available
        if (malePhoto && malePhoto.startsWith("data:image")) {
          const [metadata, base64Data] = malePhoto.split(",");
          const extension = metadata.split(";")[0].split("/")[1];
          zip.file(`male-photo.${extension}`, base64Data, { base64: true });
        }

        // Add female photo if available
        if (femalePhoto && femalePhoto.startsWith("data:image")) {
          const [metadata, base64Data] = femalePhoto.split(",");
          const extension = metadata.split(";")[0].split("/")[1];
          zip.file(`female-photo.${extension}`, base64Data, { base64: true });
        }
      
      // Generate the zip file
      const content = await zip.generateAsync({ type: "blob" });
  
      // Save the zip file
      const fileName = `${coupleNames.replace(/\s+/g, "-").toLowerCase() || "wedding"}-invitation.zip`;
      FileSaver.saveAs(content, fileName);
  
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating zip file:", error);
      alert("There was an error creating the zip file. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-[600px] relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
      <iframe ref={iframeRef} className="w-full h-full border-0" title="Wedding Invitation Preview" />
    </div>
  )
}