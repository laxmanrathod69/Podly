"use client"

import { usePodcast } from "@/context/provider"
import { useUserProfileData } from "@/hooks/user/user-profile-data"
import { PauseCircle } from "@/public/icons/pause-circle"
import { PlayCircle } from "@/public/icons/play-circle"
import Image from "next/image"
import { GlobalDropdownMenu } from "../drop-down"
import { ThreeDots } from "@/public/icons/three-dots"
import { useCallback, useMemo, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { USER_PROFILE_ITEMS } from "@/constants/constant"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Props {
  userId: string
  authUserId: string | undefined
}

export const UserProfile = ({ userId, authUserId }: Props) => {
  const [active, setActive] = useState<string>("")

  const { userData: user, isLoading } = useUserProfileData(userId)
  const { currentPodcast, playPodcast, togglePlayPause, isPlaying } =
    usePodcast()
  const router = useRouter()

  const dropdownMenuItems = useMemo(() => {
    const isOwner = authUserId === user?.id
    return USER_PROFILE_ITEMS(isOwner)
  }, [authUserId, user?.id])

  const handlePlayPause = useCallback(() => {
    if (currentPodcast?.id === user?.podcast?.[0]?.id) {
      togglePlayPause()
    } else {
      playPodcast(user?.podcast?.[0]!)
    }
  }, [currentPodcast?.id, playPodcast, togglePlayPause, user?.podcast])

  if (!user?.id) {
    router.push("/sign-in")
    return null
  }

  const isCurrentlyPlaying =
    currentPodcast?.id === user.podcast?.[0]?.id && isPlaying

  return (
    <div className="grid grid-cols-1 w-full h-full">
      <header className="h-full w-full flex gap-6 max-md:flex-col drop-shadow-md rounded-md max-sm:items-center">
        <figure>
          <Image
            src={user?.image || "/icons/profile.svg"}
            alt="User image"
            width={200}
            height={200}
            className="w-56 h-56 max-md:w-56 max-md:h-56 rounded-md shadow-lg aspect-square object-cover"
          />
        </figure>
        <div className="flex flex-col gap-3 justify-end">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/verified.svg"
              alt="Verified icon"
              width={16}
              height={16}
            />
            <h4 className="text-xs text-white-2 font-medium">
              Verified Creator
            </h4>
          </div>
          <h1 className="text-5xl text-white-1 font-black">{user.name}</h1>
          <h3 className="text-xs text-white-2 font-semibold">{`${user.monthlyListeners} monthly listeners`}</h3>
        </div>
      </header>
      <section className="pt-8 flex flex-col gap-8">
        <div className="flex items-center justify-start gap-6">
          {user?.podcast?.length ? (
            <Button
              type="button"
              size="icon"
              onClick={handlePlayPause}
              className="flex items-center gap-2 hover:scale-105 transition-transform"
            >
              {isCurrentlyPlaying ? (
                <PauseCircle w="50" h="50" />
              ) : (
                <PlayCircle w="50" h="50" />
              )}
            </Button>
          ) : null}

          <div className="hover:scale-110 transition-all duration-75 ease-in">
            <GlobalDropdownMenu
              trigger={<ThreeDots />}
              items={dropdownMenuItems}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl text-white-1 font-black">Podcasts</h2>
          <div>
            {user?.podcast?.length === 0 ? (
              <p className="text-white-2 font-medium text-sm">
                No podcasts found
              </p>
            ) : (
              user?.podcast?.map((podcast: Podcast, index: number) => (
                <div
                  key={podcast.id}
                  className={cn(
                    "flex justify-between items-center hover:bg-black-6/50 py-[0.65rem] md:px-6 rounded-md transition-all duration-300 ease-in-out",
                    { "bg-black-6": active === podcast.id },
                  )}
                  onClick={() => setActive(podcast.id!)}
                >
                  <div className="flex items-center gap-6">
                    <h3 className="text-base font-medium text-white-2">
                      {index + 1}
                    </h3>
                    <div className="flex items-center gap-3 min-w-[21.7rem]">
                      <Image
                        src={podcast.imageUrl!}
                        alt="imageUrl"
                        width={45}
                        height={45}
                        className="rounded-md aspect-square object-cover"
                      />
                      <Link
                        href={`/podcast/${podcast.id}`}
                        className="truncate"
                      >
                        <h3 className="text-base font-semibold text-white-1 hover:underline max-sm:text-xs">
                          {podcast.title}
                        </h3>
                      </Link>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-white-2 max-md:hidden">
                    {podcast.listeners}
                  </p>
                  <p className="text-sm font-medium text-white-2 max-md:hidden">
                    {podcast.duration}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
