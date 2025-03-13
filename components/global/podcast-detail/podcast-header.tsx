"use client"

import { usePodcast } from "@/context/provider"
import Image from "next/image"
import Link from "next/link"
import { GlobalDropdownMenu } from "../drop-down"
import { ThreeDots } from "@/public/icons/three-dots"
import { PlayCircle } from "@/public/icons/play-circle"
import { PauseCircle } from "@/public/icons/pause-circle"
import { useCallback } from "react"
import { PODCAST_DETAILS_ITEMS } from "@/constants/constant"
import { Button } from "@/components/ui/button"

export const PodcastHeader = ({ isOwner, podcast }: PodcastHeaderProps) => {
  const { playPodcast, currentPodcast, togglePlayPause, isPlaying } =
    usePodcast()

  const dropdownMenuItems = useCallback(() => {
    return PODCAST_DETAILS_ITEMS(isOwner)
  }, [isOwner])

  const isCurrentlyPlaying = currentPodcast?.id === podcast?.id && isPlaying

  const handlePlayPause = () => {
    if (currentPodcast?.id === podcast?.id) {
      togglePlayPause()
    } else {
      playPodcast(podcast)
    }
  }

  return (
    <header className="mt-5 md:mt-8 w-full flex flex-col gap-8">
      <div className="flex w-full gap-5 max-md:flex-col">
        <div className="shadow-2xl">
          <Image
            src={podcast.imageUrl!}
            width={200}
            height={200}
            alt="Podcast image"
            className="aspect-square object-cover rounded-lg max-w-[200px]"
          />
        </div>
        <div className="flex flex-col justify-end gap-4">
          <article className="text-3xl font-black tracking-[-0.32px] text-white-1">
            <h1>{podcast.title}</h1>
          </article>
          <figure className="flex items-center gap-2">
            <Image
              src={podcast.user?.image!}
              width={30}
              height={30}
              alt="Caster icon"
              className="rounded-full object-cover"
            />
            <Link
              href={`/user/${podcast.user_id}`}
              className="text-sm font-normal text-white-3 hover:underline"
            >
              <h2>{podcast.user?.name}</h2>
            </Link>
          </figure>
        </div>
      </div>
      <div className="flex items-center justify-start gap-6">
        <Button
          type="button"
          size="icon"
          onClick={handlePlayPause}
          className="flex items-center gap-2 hover:scale-105 transition-transform"
          aria-label="Play Podcast"
          title="Play Podcast"
        >
          {isCurrentlyPlaying ? (
            <PauseCircle w="50" h="50" />
          ) : (
            <PlayCircle w="50" h="50" />
          )}
        </Button>

        <div className="hover:scale-110 transition-all duration-75 ease-in">
          <GlobalDropdownMenu
            trigger={<ThreeDots />}
            items={dropdownMenuItems()}
          />
        </div>
      </div>
    </header>
  )
}
