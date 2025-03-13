"use client"

import { onGenerateContent } from "@/actions/podcast/podcast.actions"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useGenerateContent = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (prompt: string) => onGenerateContent(prompt),

    onSuccess: (response) => {
      if (response.status !== 200) {
        toast.error(response.message || "Something went wrong")
        return
      }

      toast.success(response.message)
      queryClient.invalidateQueries({ queryKey: ["content"] })
    },
    onError: (error) => {
      toast.error(error.message || "Failed to generate content")
    },
  })

  return {
    generateContent: mutation.mutate,
    isPending: mutation.isPending,
    data: mutation.data?.data,
  }
}
