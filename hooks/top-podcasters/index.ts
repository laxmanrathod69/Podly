"use client"

import {
  onGetPopularPodcasters,
  onGetTopPodcasters,
} from "@/actions/user.actions"
import { useQuery } from "@tanstack/react-query"

export const useTopPodcasters = () => {
  const { data: topPodcasters, isPending } = useQuery({
    queryKey: ["top-podcasters"],
    queryFn: onGetTopPodcasters,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 2, // Retry failed requests up to 2 times
    refetchOnWindowFocus: true, // Refetch when switching tabs
  })

  if (topPodcasters?.status !== 200) {
    return { status: 404, message: "No top podcasters found" }
  }

  return {
    topPodcasters: "data" in topPodcasters ? topPodcasters.data : [],
    isPending,
  }
}

export const usePopularPodcasters = () => {
  const { data: popularPodcasters, isPending: isLoading } = useQuery({
    queryKey: ["popular-podcasters"],
    queryFn: onGetPopularPodcasters,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 2, // Retry failed requests up to 2 times
    refetchOnWindowFocus: true, // Refetch when switching tabs
  })

  if (popularPodcasters?.status !== 200) {
    return { status: 404, message: "No popular podcasters found" }
  }

  return {
    popularPodcasters:
      "data" in popularPodcasters ? popularPodcasters.data : [],
    isLoading,
  }
}
