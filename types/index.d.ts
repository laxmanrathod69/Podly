declare type ChildrenProp = {
  children: React.ReactNode
}

declare interface AuthFormProps {
  id: string
  type: "email" | "text" | "password"
  label?: string
  placeholder: string
  name: string
}

declare interface User {
  id: string
  name: string
  image?: string | null // TODO: change to undefined
  podcast?: Podcast[]
  monthlyListeners: number
  createdAt?: Date
}

declare interface Podcast {
  id?: string
  title: string
  description: string
  voice: string
  audio?: string | null
  imageUrl: string | undefined
  user?: User
  user_id: string
  transcript: string
  duration: string
  createdAt?: Date
  listeners: number
}

declare interface AudioPlayerContextType {
  currentPodcast: Podcast | null
  isPlaying: boolean
  progress: number
  duration: number
  currentTime: number
  volume: number
  playPodcast: (podcast: Podcast) => void
  togglePlayPause: () => void
  seekTo: (time: number) => void
  skipForward: (seconds?: number) => void
  skipBackward: (seconds?: number) => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  audioRef: React.RefObject<HTMLAudioElement | null>
}

declare interface PodcastDetailProps {
  podcastId: string
  userId: string
}

declare interface PodcastHeaderProps {
  isOwner: boolean
  podcast: Podcast
}

declare interface CoverProps {
  id: string
  title: string
  podcaster: string
  isPlaying: boolean
  handlePlayPause: () => void
  image?: string
}

declare interface PlayerControlsProps {
  forward: () => void
  rewind: () => void
  isPlaying: boolean
  currentTime: number
  duration: number
  handleSeek: (e: React.MouseEvent<HTMLDivElement>) => void
  handlePlayPause: () => void
}

declare interface SliderControlsProps {
  forward: () => void
  rewind: () => void
  isPlaying: boolean
  handlePlayPause: () => void
}

declare interface SliderProps {
  min: number
  max: number
  value: number
  handleChange: (val: number[]) => void
}
