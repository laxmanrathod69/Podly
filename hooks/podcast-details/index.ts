"use client"

import { onGetPodcastDetails } from "@/actions/podcast.actions"
import { useQuery } from "@tanstack/react-query"
import { useDismissToast, useErrorToast, useLoadingToast } from "../toasts"
import { handleSingleApiResponse } from "../podcast/handle-api-response"

export const usePodcastDetails = (podcastId: string) => {
  const { data, isLoading, isError, error, isFetched } = useQuery({
    queryKey: ["podcast-details", podcastId],
    queryFn: () => onGetPodcastDetails(podcastId),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  if (isLoading) useLoadingToast("Please wait, loading podcast...", podcastId)

  if (isFetched) useDismissToast(podcastId)

  if (isError) {
    useDismissToast(podcastId)
    useErrorToast(error)
  }

  return { podcast: handleSingleApiResponse(data) }
}
