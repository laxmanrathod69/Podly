import { onGeneratePodcastThumbnail } from "@/actions/podcast.actions"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useGeneratePodcastThumbnail = () => {
  const client = useQueryClient()

  const {
    mutate: generatePodcastThumbnail,
    isPending: isGeneratingThumbnail,
    data,
  } = useMutation({
    mutationFn: (prompt: string) => onGeneratePodcastThumbnail(prompt),
    onSuccess: (res) => {
      return toast(res.status !== 200 ? "Error" : "Success", {
        description: res.message,
      })
    },
    onError: (err) => {
      return toast("Error", {
        description: err.message || "An error occurred",
      })
    },
    onSettled: async () => {
      return await client.invalidateQueries({ queryKey: ["podcasts"] })
    },
  })

  return {
    generatePodcastThumbnail,
    isGeneratingThumbnail,
    thumbnail_url: data?.thumbnail,
  }
}
