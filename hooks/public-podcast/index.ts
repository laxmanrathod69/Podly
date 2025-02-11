"use client"

import {
  onGetRecentPodcasts,
  onGetTrendingPodcasts,
} from "@/actions/podcast.actions"
import { useQuery } from "@tanstack/react-query"
import { useDismissToast, useErrorToast, useLoadingToast } from "../toasts"
import { handleApiResponse } from "../podcast/handle-api-response"

export const useTrendingPodcasts = () => {
  const { data, isLoading, isError, error, isFetched } = useQuery({
    queryKey: ["trending-podcasts"],
    queryFn: onGetTrendingPodcasts,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    // cacheTime: 1000 * 60 * 10, // TODO: Keep data in cache for 10 minutes
    retry: 2, // Retry failed requests up to 2 times
    refetchOnWindowFocus: false, // Prevent refetch when switching tabs
  })

  if (isLoading)
    useLoadingToast("Loading trending podcasts...", "trending-loading")

  if (isFetched) useDismissToast("trending-loading")

  if (isError) {
    useDismissToast("trending-loading")
    useErrorToast(error)
  }

  return { trendingPodcasts: handleApiResponse(data) }
}

export const useRecentPodcasts = () => {
  const { data, isLoading, isError, error, isFetched } = useQuery({
    queryKey: ["recent-podcasts"],
    queryFn: onGetRecentPodcasts,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    // cacheTime: 1000 * 60 * 10, // TODO: Keep data in cache for 10 minutes
    retry: 2, // Retry failed requests up to 2 times
    refetchOnWindowFocus: false, // Prevent refetch when switching tabs
  })

  if (isLoading) useLoadingToast("Loading recent podcasts...", "recent-loading")

  if (isFetched) useDismissToast("recent-loading")

  if (isError) {
    useDismissToast("recent-loading")
    useErrorToast(error)
  }

  return { recentPodcasts: handleApiResponse(data) }
}
