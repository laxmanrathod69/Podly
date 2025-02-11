import { onCreatePodcast } from "@/actions/podcast.actions"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const useCreatePodcast = () => {
  const router = useRouter()
  const client = useQueryClient()

  const { mutate: createPodcast, isPending: isCreating } = useMutation({
    mutationFn: (data: CreatePodcastData) => onCreatePodcast(data),
    onSuccess: (res) => {
      toast(res.status !== 200 ? "Error" : "Success", {
        description: res.message,
      })
      return router.push("/")
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

  return { createPodcast, isCreating }
}
