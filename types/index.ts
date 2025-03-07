/* eslint-disable no-unused-vars */

import { Dispatch, SetStateAction } from "react"

import { Id } from "@/convex/_generated/dataModel"

export interface EmptyStateProps {
  title: string
  search?: boolean
  buttonText?: string
  buttonLink?: string
}

export interface TopPodcastersProps {
  _id: Id<"users">
  _creationTime: number
  email: string
  imageUrl: string
  clerkId: string
  name: string
  podcast: {
    podcastTitle: string
    podcastId: Id<"podcasts">
  }[]
  totalPodcasts: number
}

export interface PodcastProps {
  _id: Id<"podcasts">
  _creationTime: number
  audioStorageId: Id<"_storage"> | null
  user: Id<"users">
  podcastTitle: string
  podcastDescription: string
  audioUrl: string | null
  imageUrl: string | null
  imageStorageId: Id<"_storage"> | null
  author: string
  authorId: string
  authorImageUrl: string
  voicePrompt: string
  imagePrompt: string | null
  voiceName: string
  audioDuration: number
  views: number
}

export interface ProfilePodcastProps {
  podcasts: PodcastProps[]
  listeners: number
}

export interface GeneratePodcastContentProps {
  audio: string
  voicePrompt: string
  setVoicePrompt: Dispatch<SetStateAction<string>>
  setAudio: Dispatch<SetStateAction<string>>
  setAudioDuration: Dispatch<SetStateAction<number>>
  setTranscript: Dispatch<SetStateAction<string>>
}

export interface GenerateThumbnailProps {
  thumbnail: string
  setThumbnail: Dispatch<SetStateAction<string>>
  imagePrompt: string
  setImagePrompt: Dispatch<SetStateAction<string>>
}

export interface LatestPodcastCardProps {
  imgUrl: string
  title: string
  duration: string
  index: number
  audioUrl: string
  author: string
  views: number
  podcastId: Id<"podcasts">
}

export interface PodcastDetailPlayerProps {
  isOwner: boolean
  podcastId: Id<"podcasts">
}

export interface AudioProps {
  title: string
  audioUrl: string
  author: string
  imageUrl: string
  podcastId: string
}

export interface AudioContextType {
  audio: AudioProps | undefined
  setAudio: React.Dispatch<React.SetStateAction<AudioProps | undefined>>
}

export interface PodcastCardProps {
  podcastId: Id<"podcasts">
}

export interface CarouselProps {
  fansLikeDetail: TopPodcastersProps[]
}

export interface ProfileCardProps {
  podcastData: ProfilePodcastProps
  imageUrl: string
  userFirstName: string
}

export type UseDotButtonType = {
  selectedIndex: number
  scrollSnaps: number[]
  onDotButtonClick: (index: number) => void
}
