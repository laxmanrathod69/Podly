"use client"

import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { useMemo, useCallback } from "react"
import { onGetUser } from "@/actions/user/user.actions"
import { toast } from "sonner"

export const useUserProfileData = (userId: string) => {
  const queryKey = useMemo(() => ["user", userId], [userId])
  const queryFn = useCallback(() => onGetUser(userId), [userId])

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn,
    enabled: !!userId,
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
    return { userData: null, isLoading, error }
  }

  return { userData: data.data as User, isLoading, error: null }
}
