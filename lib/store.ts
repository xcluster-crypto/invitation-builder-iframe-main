"use client"

import { create } from "zustand"

// Define color theme types
export type ColorTheme = "rgb" | "golden" | "rose" | "ocean" | "emerald" | "purple"

// Define photo shape types
export type PhotoShape = "circle" | "square" | ""

// Define message types
export interface WeddingMessage {
  id: string
  content: string
}

// Define RSVP guest type
export interface Guest {
  id: string
  name: string
  email: string
  phone: string
  attending: boolean | null
  numberOfGuests: number
  message: string
}

interface InvitationState {
  // Main Image
  mainImage: string
  setMainImage: (imageUrl: string) => void
  photoShape: PhotoShape
  setPhotoShape: (shape: PhotoShape) => void

  // Basic Information
  coupleNames: string
  setCoupleNames: (names: string) => void
  eventDate: string
  setEventDate: (date: string) => void
  eventTime: string
  setEventTime: (time: string) => void
  eventLocation: string
  setEventLocation: (location: string) => void
  eventAddress: string
  setEventAddress: (address: string) => void

  // Wedding Messages
  weddingMessages: WeddingMessage[]
  addWeddingMessage: () => void
  updateWeddingMessage: (id: string, content: string) => void
  removeWeddingMessage: (id: string) => void

  // Parents Messages
  parentsMessages: WeddingMessage[]
  addParentsMessage: () => void
  updateParentsMessage: (id: string, content: string) => void
  removeParentsMessage: (id: string) => void

  // Legacy message fields (for backward compatibility)
  message: string
  setMessage: (message: string) => void
  parentsMessage: string
  setParentsMessage: (message: string) => void
  showMessage: boolean
  setShowMessage: (show: boolean) => void
  showParentsMessage: boolean
  setShowParentsMessage: (show: boolean) => void

  // Couple Photos
  malePhoto: string
  setMalePhoto: (imageUrl: string) => void
  femalePhoto: string
  setFemalePhoto: (imageUrl: string) => void

  // Design
  primaryColor: string
  setPrimaryColor: (color: string) => void
  secondaryColor: string
  setSecondaryColor: (color: string) => void
  backgroundColor: string
  setBackgroundColor: (color: string) => void
  backgroundImage: string
  setBackgroundImage: (imageUrl: string) => void
  presetBackground: string
  setPresetBackground: (imageUrl: string) => void
  customBackgroundImage: string
  setCustomBackgroundImage: (imageUrl: string) => void
  fontFamily: string
  setFontFamily: (font: string) => void
  headerFontSize: number
  setHeaderFontSize: (size: number) => void
  bodyFontSize: number
  setBodyFontSize: (size: number) => void

  // Section Transparency
  basicInfoTransparency: number
  setBasicInfoTransparency: (transparency: number) => void
  couplePhotosTransparency: number
  setCouplePhotosTransparency: (transparency: number) => void
  designTransparency: number
  setDesignTransparency: (transparency: number) => void
  galleryTransparency: number
  setGalleryTransparency: (transparency: number) => void
  mapTransparency: number
  setMapTransparency: (transparency: number) => void

  // Gallery
  galleryImages: string[]
  addGalleryImage: (imageUrl: string) => void
  removeGalleryImage: (index: number) => void

  // Map
  mapLocation: string
  setMapLocation: (location: string) => void

  // Effects
  enableEffects: boolean
  setEnableEffects: (enable: boolean) => void
  enableShadows: boolean
  setEnableShadows: (enable: boolean) => void
  enableHoverEffects: boolean
  setEnableHoverEffects: (enable: boolean) => void
  enableRgbEffects: boolean
  setEnableRgbEffects: (enable: boolean) => void
  enableEmboss: boolean
  setEnableEmboss: (enable: boolean) => void
  animationSpeed: number
  setAnimationSpeed: (speed: number) => void

  // RGB Effects customization
  rgbIntensity: number
  setRgbIntensity: (intensity: number) => void
  rgbBorderWidth: number
  setRgbBorderWidth: (width: number) => void

  // Color Theme
  colorTheme: ColorTheme
  setColorTheme: (theme: ColorTheme) => void

  // Get effective background image
  getEffectiveBackgroundImage: () => string

  // For background selection and image uploader communication
  selectedBackgroundForUpload: string
  setSelectedBackgroundForUpload: (url: string) => void

  // Music Background
  backgroundMusic: string
  setBackgroundMusic: (musicUrl: string) => void
  autoplayMusic: boolean
  setAutoplayMusic: (autoplay: boolean) => void
  loopMusic: boolean
  setLoopMusic: (loop: boolean) => void
  musicVolume: number
  setMusicVolume: (volume: number) => void

  // Digital Gifts
  enableDigitalGifts: boolean
  setEnableDigitalGifts: (enable: boolean) => void
  giftAccounts: Array<{ bank: string; accountName: string; accountNumber: string }>
  addGiftAccount: (account: { bank: string; accountName: string; accountNumber: string }) => void
  removeGiftAccount: (index: number) => void
  updateGiftAccount: (index: number, account: { bank: string; accountName: string; accountNumber: string }) => void

  // RSVP
  enableRSVP: boolean
  setEnableRSVP: (enable: boolean) => void
  rsvpDeadline: string
  setRsvpDeadline: (date: string) => void
  guests: Guest[]
  addGuest: (guest: Guest) => void
  removeGuest: (id: string) => void
  updateGuest: (id: string, updates: Partial<Guest>) => void
  rsvpMessage: string
  setRsvpMessage: (message: string) => void
}

// Generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9)

// Add transparency settings to the store implementation
export const useInvitationStore = create<InvitationState>((set, get) => ({
  // Main Image
  mainImage: "",
  setMainImage: (imageUrl) => set({ mainImage: imageUrl }),
  photoShape: "",
  setPhotoShape: (shape) => set({ photoShape: shape }),

  // Basic Information
  coupleNames: "John & Jane",
  setCoupleNames: (names) => set({ coupleNames: names }),
  eventDate: "2023-12-31",
  setEventDate: (date) => set({ eventDate: date }),
  eventTime: "18:00",
  setEventTime: (time) => set({ eventTime: time }),
  eventLocation: "Grand Ballroom",
  setEventLocation: (location) => set({ eventLocation: location }),
  eventAddress: "jl. Raya taman mini indonesia indah, TMII, Jakarta Timur, Indonesia",
  setEventAddress: (address) => set({ eventAddress: address }),

  // Wedding Messages
  weddingMessages: [],
  addWeddingMessage: () =>
    set((state) => ({
      weddingMessages: [
        ...state.weddingMessages,
        {
          id: generateId(),
          content: `Wedding Message ${state.weddingMessages.length + 1}`,
        },
      ],
    })),
  updateWeddingMessage: (id, content) =>
    set((state) => ({
      weddingMessages: state.weddingMessages.map((msg) => (msg.id === id ? { ...msg, content } : msg)),
    })),
  removeWeddingMessage: (id) =>
    set((state) => ({
      weddingMessages: state.weddingMessages.filter((msg) => msg.id !== id),
    })),

  // Parents Messages
  parentsMessages: [],
  addParentsMessage: () =>
    set((state) => ({
      parentsMessages: [
        ...state.parentsMessages,
        {
          id: generateId(),
          content: `Parents Message ${state.parentsMessages.length + 1}`,
        },
      ],
    })),
  updateParentsMessage: (id, content) =>
    set((state) => ({
      parentsMessages: state.parentsMessages.map((msg) => (msg.id === id ? { ...msg, content } : msg)),
    })),
  removeParentsMessage: (id) =>
    set((state) => ({
      parentsMessages: state.parentsMessages.filter((msg) => msg.id !== id),
    })),

  // Legacy message fields
  message:
    "We are delighted to invite you to our wedding celebration. Your presence will make our special day even more memorable.",
  setMessage: (message) => set({ message: message }),
  parentsMessage: "With the blessings of our beloved parents, we invite you to share in our joy.",
  setParentsMessage: (message) => set({ parentsMessage: message }),
  showMessage: false,
  setShowMessage: (show) => set({ showMessage: show }),
  showParentsMessage: false,
  setShowParentsMessage: (show) => set({ showParentsMessage: show }),

  // Couple Photos
  malePhoto: "",
  setMalePhoto: (imageUrl) => set({ malePhoto: imageUrl }),
  femalePhoto: "",
  setFemalePhoto: (imageUrl) => set({ femalePhoto: imageUrl }),

  // Design
  primaryColor: "",
  setPrimaryColor: (color) => set({ primaryColor: color }),
  secondaryColor: "",
  setSecondaryColor: (color) => set({ secondaryColor: color }),
  backgroundColor: "#FFFFFF",
  setBackgroundColor: (color) => set({ backgroundColor: color }),
  backgroundImage: "",
  setBackgroundImage: (imageUrl) => set({ backgroundImage: imageUrl }),
  presetBackground: "", // No default background
  setPresetBackground: (imageUrl) =>
    set((state) => {
      const updates: Partial<InvitationState> = { presetBackground: imageUrl }

      // If no custom background is set, also update the backgroundImage
      if (!state.customBackgroundImage) {
        updates.backgroundImage = imageUrl
      }

      return updates
    }),
  customBackgroundImage: "",
  setCustomBackgroundImage: (imageUrl) =>
    set({
      customBackgroundImage: imageUrl,
      // When setting a custom image, update the effective background and clear preset selection
      backgroundImage: imageUrl || get().presetBackground, // Fall back to preset if clearing custom
      presetBackground: imageUrl ? "" : get().presetBackground, // Clear preset if setting custom
    }),

  fontFamily: "",
  setFontFamily: (font) => set({ fontFamily: font }),
  headerFontSize: 32,
  setHeaderFontSize: (size) => set({ headerFontSize: size }),
  bodyFontSize: 16,
  setBodyFontSize: (size) => set({ bodyFontSize: size }),

  // Section Transparency
  basicInfoTransparency: 0,
  setBasicInfoTransparency: (transparency) => set({ basicInfoTransparency: transparency }),
  couplePhotosTransparency: 0,
  setCouplePhotosTransparency: (transparency) => set({ couplePhotosTransparency: transparency }),
  designTransparency: 0,
  setDesignTransparency: (transparency) => set({ designTransparency: transparency }),
  galleryTransparency: 0,
  setGalleryTransparency: (transparency) => set({ galleryTransparency: transparency }),
  mapTransparency: 0,
  setMapTransparency: (transparency) => set({ mapTransparency: transparency }),

  // Gallery
  galleryImages: [],
  addGalleryImage: (imageUrl) =>
    set((state) => ({
      galleryImages: [...state.galleryImages, imageUrl],
    })),
  removeGalleryImage: (index) =>
    set((state) => ({
      galleryImages: state.galleryImages.filter((_, i) => i !== index),
    })),

  // Map
  mapLocation: "",
  setMapLocation: (location) => set({ mapLocation: location }),

  // Effects
  enableEffects: true,
  setEnableEffects: (enable) => set({ enableEffects: enable }),
  enableShadows: true,
  setEnableShadows: (enable) => set({ enableShadows: enable }),
  enableHoverEffects: true,
  setEnableHoverEffects: (enable) => set({ enableHoverEffects: enable }),
  enableRgbEffects: true,
  setEnableRgbEffects: (enable) => set({ enableRgbEffects: enable }),
  enableEmboss: false,
  setEnableEmboss: (enable) => set({ enableEmboss: enable }),
  animationSpeed: 3,
  setAnimationSpeed: (speed) => set({ animationSpeed: speed }),

  // RGB Effects customization
  rgbIntensity: 7,
  setRgbIntensity: (intensity) => set({ rgbIntensity: intensity }),
  rgbBorderWidth: 3,
  setRgbBorderWidth: (width) => set({ rgbBorderWidth: width }),

  // Color Theme
  colorTheme: "rgb",
  setColorTheme: (theme) => set({ colorTheme: theme }),

  // Get effective background image
  getEffectiveBackgroundImage: () => {
    const state = get()
    // Custom background takes precedence if it exists
    if (state.customBackgroundImage) {
      return state.customBackgroundImage
    }
    // Otherwise use the preset background if selected
    else if (state.presetBackground) {
      return state.presetBackground
    }
    // Fall back to the legacy backgroundImage field or empty string
    return state.backgroundImage || ""
  },

  // For background selection and image uploader communication
  selectedBackgroundForUpload: "",
  setSelectedBackgroundForUpload: (url) => set({ selectedBackgroundForUpload: url }),

  // Music Background
  backgroundMusic: "",
  setBackgroundMusic: (musicUrl) => set({ backgroundMusic: musicUrl }),
  autoplayMusic: true,
  setAutoplayMusic: (autoplay) => set({ autoplayMusic: autoplay }),
  loopMusic: true,
  setLoopMusic: (loop) => set({ loopMusic: loop }),
  musicVolume: 50,
  setMusicVolume: (volume) => set({ musicVolume: volume }),

  // Digital Gifts
  enableDigitalGifts: false,
  setEnableDigitalGifts: (enable) => set({ enableDigitalGifts: enable }),
  giftAccounts: [],
  addGiftAccount: (account) =>
    set((state) => ({
      giftAccounts: [...state.giftAccounts, account],
    })),
  removeGiftAccount: (index) =>
    set((state) => ({
      giftAccounts: state.giftAccounts.filter((_, i) => i !== index),
    })),
  updateGiftAccount: (index, account) =>
    set((state) => ({
      giftAccounts: state.giftAccounts.map((acc, i) => (i === index ? account : acc)),
    })),

  // RSVP
  enableRSVP: false,
  setEnableRSVP: (enable) => set({ enableRSVP: enable }),
  rsvpDeadline: "",
  setRsvpDeadline: (date) => set({ rsvpDeadline: date }),
  guests: [],
  addGuest: (guest) =>
    set((state) => ({
      guests: [...state.guests, guest],
    })),
  removeGuest: (id) =>
    set((state) => ({
      guests: state.guests.filter((guest) => guest.id !== id),
    })),
  updateGuest: (id, updates) =>
    set((state) => ({
      guests: state.guests.map((guest) => (guest.id === id ? { ...guest, ...updates } : guest)),
    })),
  rsvpMessage: "We look forward to celebrating with you! Please let us know if you can attend.",
  setRsvpMessage: (message) => set({ rsvpMessage: message }),
}))
