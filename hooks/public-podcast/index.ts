"use client"

import {
  onGetRecentPodcasts,
  onGetTrendingPodcasts,
} from "@/actions/podcast.actions"
import { useQuery } from "@tanstack/react-query"
import { useDismissToast, useErrorToast, useLoadingToast } from "../toasts"
import { handleApiResponse } from "../podcast/handle-api-response"

const usePodcastQuery = (
  queryKey: string[],
  queryFn: () => Promise<any>,
  loadingMessage: string,
) => {
  const { data, isLoading, isError, error, isFetched } = useQuery({
    queryKey,
    queryFn,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
    refetchOnWindowFocus: false,
  })

  if (isLoading) useLoadingToast(loadingMessage, `${queryKey[0]}-loading`)

  if (isFetched) useDismissToast(`${queryKey[0]}-loading`)

  if (isError) {
    useDismissToast(`${queryKey[0]}-loading`)
    useErrorToast(error)
  }

  return { data: handleApiResponse(data) }
}

export const useTrendingPodcasts = () => {
  const { data: trendingPodcasts } = usePodcastQuery(
    ["trending-podcasts"],
    onGetTrendingPodcasts,
    "Loading trending podcasts...",
  )
  return { trendingPodcasts }
}

export const useRecentPodcasts = () => {
  const { data: recentPodcasts } = usePodcastQuery(
    ["recent-podcasts"],
    onGetRecentPodcasts,
    "Loading recent podcasts...",
  )
  return { recentPodcasts }
}
