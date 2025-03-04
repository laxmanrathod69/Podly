"use client"

import { onCreatePodcast } from "@/actions/podcast.actions"
import { useErrorToast2, useSuccessToast } from "@/hooks/toasts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export const useCreatePodcast = () => {
  const router = useRouter()
  const client = useQueryClient()

  const { mutate: createPodcast, isPending } = useMutation({
    mutationFn: (data: Podcast) => onCreatePodcast(data),
    onSuccess(res) {
      const podcastId = "podcastId" in res ? res.podcastId : ""
      useSuccessToast(res.message)
      podcastId ? router.push(`/podcast/${podcastId}`) : null
    },
    onError: (err) => useErrorToast2(err.message),
    onSettled: async () => {
      return await client.invalidateQueries({ queryKey: ["podcasts"] })
    },
  })

  return { createPodcast, isPending }
}
