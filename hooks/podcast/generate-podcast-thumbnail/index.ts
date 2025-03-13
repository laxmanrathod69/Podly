"use client"

import { onGenerateThumbnail } from "@/actions/podcast/podcast.actions"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useGenerateThumbnail = () => {
  const client = useQueryClient()

  const { mutate, isPending, data } = useMutation({
    mutationFn: (prompt: string) => onGenerateThumbnail(prompt),

    onSuccess: (res) => {
      if (res.status !== 200) {
        toast.error(res.message || "Something went wrong")
        return
      }

      toast.success(res.message)
      client.invalidateQueries({ queryKey: ["content"] })
    },

    onError: (err) => {
      toast.error(err.message || "Failed to generate content")
    },
  })

  return {
    isPending,
    image_url: data?.data as string,
    generateThumbnail: mutate,
  }
}
