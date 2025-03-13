"use client"

import { useCallback, useMemo } from "react"

import { useQuery, keepPreviousData } from "@tanstack/react-query"
import {
  onGetPopularPodcasters,
  onGetTopPodcasters,
} from "@/actions/user/user.actions"
import { toast } from "sonner"

export const useTopPodcasters = () => {
  const queryKey = useMemo(() => ["top-podcasters"], [])
  const queryFn = useCallback(() => onGetTopPodcasters(), [])

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
    return { topPodcasters: null, isLoading, error }
  }

  return { topPodcasters: data.data as User[], isLoading, error: null }
}

export const usePopularPodcasters = () => {
  const queryKey = useMemo(() => ["popular-podcasters"], [])
  const queryFn = useCallback(() => onGetPopularPodcasters(), [])
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
    return { popularPodcasters: null, isLoading, error }
  }

  return { popularPodcasters: data.data as User[], isLoading, error: null }
}
