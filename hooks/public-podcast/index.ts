"use client"

import {
  onGetRecentPodcasts,
  onGetTrendingPodcasts,
} from "@/actions/podcast.actions"
import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { useErrorToast } from "../toasts"
import { useCallback, useMemo } from "react"

export const useTrendingPodcasts = () => {
  const queryKey = useMemo(() => ["trending-podcasts"], [])
  const queryFn = useCallback(() => onGetTrendingPodcasts(), [])

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
  })

  if (error) {
    useErrorToast(error)
  }

  if (data?.status !== 200) {
    return { trendingPodcasts: null, isLoading, error }
  }

  return { trendingPodcasts: data.data as Podcast[], isLoading, error: null }
}

export const useRecentPodcasts = () => {
  const queryKey = useMemo(() => ["recent-podcasts"], [])
  const queryFn = useCallback(() => onGetRecentPodcasts(), [])

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
  })

  if (error) {
    useErrorToast(error)
  }

  if (data?.status !== 200) {
    return { recentPodcasts: null, isLoading, error }
  }

  return { recentPodcasts: data.data, isLoading, error: null }
}
