import { Dispatch, JSX, RefObject, SetStateAction } from "react"

export interface DropDownMenuProps {
  trigger?: JSX.Element
  items: { id: string; item: JSX.Element; action: () => void }[]
  specialItems?: { id: string; item: JSX.Element; action: () => void }[]
  className?: string
}

export interface ThumbnailGenerateProps {
  imageUrl: string | undefined
  setImageUrl: Dispatch<SetStateAction<string | undefined>>
  imagePrompt?: string | undefined
  setImagePrompt: Dispatch<SetStateAction<string | undefined>>
}

export interface PodcastContextType {
  currentPodcast: string
  playPodcast: (podcastId: string) => void
}

export interface GeneratePodcastContentProps {
  setAudioUrl: Dispatch<SetStateAction<string | undefined>>
  setDuration: Dispatch<SetStateAction<string>>
  voicePrompt: string
  setTranscript: Dispatch<SetStateAction<string>>
  setVoicePrompt: Dispatch<SetStateAction<string>>
}

export interface DialogBoxProps {
  trigger?: JSX.Element | null
  heading: string
  desc: string
  action?: () => void
}

export interface SelectAiVoiceProps {
  setCurrentVoice: Dispatch<SetStateAction<string>>
  currentVoice: string
}
