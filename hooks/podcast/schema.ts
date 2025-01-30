import { z } from "zod"

export const podcastFormSchema = z.object({
  podcastTitle: z.string().min(3),
  podcastDescription: z.string().min(3),
})

export type PodcastFormValues = z.infer<typeof podcastFormSchema>
