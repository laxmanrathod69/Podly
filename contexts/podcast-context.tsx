"use client"

import { PodcastContextType } from "@/types/indexx"
import { createContext, useContext, useState } from "react"

const PodcastContext = createContext<PodcastContextType | null>(null)

export const PodcastProvider = ({ children }: ChildrenProp) => {
  const [currentPodcast, setCurrentPodcast] = useState<string>("")

  const playPodcast = (podcastId: string) => {
    setCurrentPodcast(podcastId)
  }

  return (
    <PodcastContext.Provider value={{ currentPodcast, playPodcast }}>
      {children}
    </PodcastContext.Provider>
  )
}

export const usePodcast = () => {
  const context = useContext(PodcastContext)
  if (!context) {
    console.error(`Error while getting podcast context: ${context}`)
    throw new Error("usePodcast must be used within a PodcastProvider")
  }
  return context
}
