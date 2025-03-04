import { onGeneratePodcastContent } from "@/actions/podcast.actions"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

// Generate podcast content
export const useGeneratePodcastContent = () => {
  const client = useQueryClient()

  const {
    mutate: generatePodcastContent,
    isPending: isGenerating,
    data: podcastContent,
  } = useMutation({
    mutationFn: (voicePrompt: string) => onGeneratePodcastContent(voicePrompt),
    onSuccess: (res) => {
      return toast(res.status !== 200 ? "Error" : "Success", {
        description: res.message,
      })
    },
    onError: (err) => {
      return toast("Error", { description: err.message })
    },
    onSettled: async () => {
      return await client.invalidateQueries({ queryKey: ["podcasts"] })
    },
  })

  return {
    generatePodcastContent,
    isGenerating,
    podcastContent,
  }
}
