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
  image?: string
  firstname: string
  lastname: string
  createdAt: Date
  clerkId: string
  podcast: Podcast[]
  monthlyListeners?: number
}

declare interface Podcast {
  id: string
  title: string
  description: string
  voice: string
  audio?: string | null
  thumbnail: string
  authorId: string
  authorImage?: string | null
  transcript: string
  audioDuration: number
  listeners: number
  createdAt: Date
  author: {
    id: string
    firstname: string
    lastname: string
    image?: string | null
  }
}

declare interface CreatePodcastData {
  title: string
  description: string
  voice: string
  audio?: string | null
  thumbnail: string
  transcript: string
  audioDuration: number
  listeners: number
  author: {
    id: string
    firstname: string
    lastname: string
    image?: string | null
  }
}

declare type APIResponse =
  | {
      status: number
      message?: string
      data?: Podcast[]
    }
  | { status: number; message?: string; data?: Podcast }

declare interface PodcastDetailProps {
  podcastId: string
  userId: string
}
