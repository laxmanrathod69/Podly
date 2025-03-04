"use client"

import { useMemo } from "react"
import {
  onGetPopularPodcasters,
  onGetTopPodcasters,
} from "@/actions/user.actions"
import { useQuery } from "@tanstack/react-query"

export const useTopPodcasters = () => {
  const queryOptions = useMemo(
    () => ({
      queryKey: ["top-podcasters"],
      queryFn: onGetTopPodcasters,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 2,
      refetchOnWindowFocus: false,
    }),
    [],
  )

  const { data: topPodcasters, isPending, error } = useQuery(queryOptions)

  const result = useMemo(() => {
    if (error || topPodcasters?.status !== 200) {
      return { topPodcasters: null, isPending: false }
    }

    return {
      topPodcasters: "data" in topPodcasters ? topPodcasters?.data : null,
      isPending,
    }
  }, [topPodcasters, isPending, error])

  return result
}

export const usePopularPodcasters = () => {
  const queryOptions = useMemo(
    () => ({
      queryKey: ["popular-podcasters"],
      queryFn: onGetPopularPodcasters,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 2,
      refetchOnWindowFocus: false,
    }),
    [],
  )

  const {
    data: popularPodcasters,
    isPending: isLoading,
    error,
  } = useQuery(queryOptions)

  const result = useMemo(() => {
    if (error || popularPodcasters?.status !== 200) {
      return { popularPodcasters: null, isLoading: false }
    }

    return {
      popularPodcasters:
        "data" in popularPodcasters ? popularPodcasters.data : [],
      isLoading,
    }
  }, [popularPodcasters, isLoading, error])

  return result
}
