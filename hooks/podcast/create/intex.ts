"use client"

import { onCreatePodcast } from "@/actions/podcast/podcast.actions"
import { QUERY_KEYS } from "@/constants"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const useCreatePodcast = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data: Podcast) => await onCreatePodcast(data),
    onMutate: () => {
      return { toastId: toast.loading("Creating podcast...") }
    },
    onSuccess: async (response, _, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId)
      }

      if (response.status !== 201 || !response.data?.id) {
        toast.error(response.message || "Something went wrong")
        return
      }

      toast.success(response.message)

      await Promise.all(
        Object.values(QUERY_KEYS).map((key) =>
          queryClient.invalidateQueries({ queryKey: [key] }),
        ),
      )

      setTimeout(() => {
        router.push(`/podcast/${response.data.id}`)
      }, 10)
    },
    onError: (error, _, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId)
      }

      toast.error(error.message || "Failed to create podcast")
    },
  })

  return {
    createPodcast: mutation.mutate,
    isPending: mutation.isPending,
  }
}
