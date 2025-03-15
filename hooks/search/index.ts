"use client"

import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { useMemo, useCallback } from "react"
import { onSearch } from "@/actions/user/search.actions"
import { toast } from "sonner"

export const useSearch = (query: string) => {
  const queryKey = useMemo(() => ["search", query], [query])
  const queryFn = useCallback(() => onSearch(query), [query])

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn,
    enabled: query.length > 0,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

  if (error) {
    toast.error(error.message)
  }

  if (data?.status !== 200) {
    return { data: null, isLoading }
  }

  return { data: data.data as User[], isLoading }
}
