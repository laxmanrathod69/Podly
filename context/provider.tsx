"use client"

import { createContext, useContext } from "react"
import { globalContext } from "."

const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null)

export const AudioPlayerProvider = ({ children }: ChildrenProp) => {
  const contextValues = globalContext()

  return (
    <AudioPlayerContext.Provider value={contextValues}>
      {children}
    </AudioPlayerContext.Provider>
  )
}

export const usePodcast = () => {
  const context = useContext(AudioPlayerContext)
  if (!context) {
    throw new Error("useAudioPlayer must be used within an AudioPlayerProvider")
  }
  return context
}
