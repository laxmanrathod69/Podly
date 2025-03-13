"use client"

import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { useCallback, useMemo } from "react"
import { onGetPodcastDetails } from "@/actions/podcast/podcast.actions"
import { toast } from "sonner"

export const usePodcastDetails = (podcastId: string) => {
  const queryKey = useMemo(() => ["podcast-details", podcastId], [podcastId])
  const queryFn = useCallback(() => onGetPodcastDetails(podcastId), [podcastId])

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn,
    enabled: !!podcastId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
  })

  if (error) {
    toast.error(error.message)
  }

  if (data?.status !== 200) {
    return { podcast: null, isLoading, error }
  }

  return { podcast: data.data as Podcast, isLoading, error: null }
}
