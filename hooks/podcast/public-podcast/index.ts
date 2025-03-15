"use client"

import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { useCallback, useMemo } from "react"
import {
  onGetPopularPodcasts,
  onGetRecentPodcasts,
  onGetTrendingPodcasts,
} from "@/actions/podcast/podcast.actions"
import { toast } from "sonner"

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
    toast.error(error.message)
  }

  if (data?.status !== 200) {
    return { trendingPodcasts: null, isLoading, error }
  }

  return { trendingPodcasts: data.data as Podcast[], isLoading, error: null }
}

export const usePopularPodcasts = () => {
  const queryKey = useMemo(() => ["popular-podcasts"], [])
  const queryFn = useCallback(() => onGetPopularPodcasts(), [])

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
    toast.error(error.message)
  }

  if (data?.status !== 200) {
    return { popularPodcasts: null, isLoading, error }
  }

  return { popularPodcasts: data.data as Podcast[], isLoading, error: null }
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
    toast.error(error.message)
  }

  if (data?.status !== 200) {
    return { recentPodcasts: null, isLoading, error }
  }

  return { recentPodcasts: data.data as Podcast[], isLoading, error: null }
}
