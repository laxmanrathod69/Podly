"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { usePodcast } from "@/context/provider"
import { PauseCircle } from "@/public/icons/pause-circle"
import { PlayCircle } from "@/public/icons/play-circle"
import Image from "next/image"
import Link from "next/link"

export const LatestPodcastCard = ({ podcast }: { podcast: Podcast }) => {
  const { playPodcast, currentPodcast, togglePlayPause, isPlaying } =
    usePodcast()

  const isCurrentlyPlaying = currentPodcast?.id === podcast.id && isPlaying

  const handlePlayPause = () => {
    if (currentPodcast?.id === podcast.id) {
      togglePlayPause()
    } else {
      playPodcast(podcast)
    }
  }

  return (
    <div className="flex flex-col w-full gap-5">
      <div className="flex items-center justify-between gap-10 text-white-1 font-semibold text-sm">
        <div className="flex items-center gap-6">
          <Button
            type="button"
            size="icon"
            onClick={handlePlayPause}
            className="cursor-pointer rounded-full"
            aria-label="Play podcast"
            title="Play podcast"
          >
            {isCurrentlyPlaying ? (
              <PauseCircle w="35" h="35" />
            ) : (
              <PlayCircle w="35" h="35" />
            )}
          </Button>
          <Link
            href={`/podcast/${podcast.id}`}
            className="flex items-center gap-4"
          >
            <Image
              src={podcast.imageUrl!}
              alt="imageUrl"
              width={52}
              height={52}
              className="rounded-md aspect-square object-cover"
            />
            <p className="truncate w-72 hover:underline">{podcast.title}</p>
          </Link>
        </div>
        <div className="flex items-center gap-16">
          <div className="flex items-center gap-4">
            <Image
              src="/icons/headphone.svg"
              alt="headphone"
              width={24}
              height={24}
            />
            <p>{podcast.listeners}</p>
          </div>
          <div className="flex items-center gap-4">
            <Image
              src="/icons/watch.svg"
              alt="duration"
              width={24}
              height={24}
            />
            <p>{podcast.duration}</p>
          </div>
        </div>
      </div>
      <Separator className="bg-black-4" />
    </div>
  )
}
