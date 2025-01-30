export interface CreatePodcastData {
  title: string
  description: string
  voice: string
  audio?: string
  thumbnail?: string
  voiceId: string
  voiceStyle: string
  authorId: string
  authorImage?: string | undefined
  transcript: string
  imagePrompt?: string
  audioDuration: number
  views: number
}
