"use client"

import { onGeneratePodcastThumbnail } from "@/actions/podcast.actions"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useGeneratePodcastThumbnail = () => {
  const client = useQueryClient()

  const {
    data,
    isPending,
    mutate: generateThumbnail,
  } = useMutation({
    mutationFn: (prompt: string) => onGeneratePodcastThumbnail(prompt),
    onSuccess: (data) =>
      toast(data.status !== 200 ? "Error" : "Success", {
        description: data.message,
      }),
    onError: (err) =>
      toast("Error", { description: err.message || "An error occurred" }),
    onSettled: async () => {
      return await client.invalidateQueries({ queryKey: ["podcasts"] })
    },
  })

  return {
    thumbnail_url: data && "thumbnail" in data ? data.thumbnail : "",
    isPending,
    generateThumbnail,
  }
}
