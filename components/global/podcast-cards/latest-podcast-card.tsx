"use client"

import { Separator } from "@/components/ui/separator"
import { usePodcast } from "@/contexts/podcast-context"
import { PlayCircle } from "@/public/icons/play-circle"
import Image from "next/image"
import Link from "next/link"

export const LatestPodcastCard = ({ podcast }: { podcast: Podcast }) => {
  const { playPodcast } = usePodcast()

  return (
    <div className="flex flex-col w-full gap-5">
      <div className="flex items-center justify-between gap-10 text-white-1 font-semibold text-sm">
        <div className="flex items-center gap-6">
          <button
            onClick={() => (podcast?.id ? playPodcast(podcast.id!) : null)}
            className="cursor-pointer"
            aria-label="Play podcast"
            title="Play podcast"
          >
            <PlayCircle w="30" h="30" />
          </button>
          <Link
            href={`/podcast/${podcast.id}`}
            className="flex items-center gap-4"
          >
            <Image
              src={podcast.thumbnail!}
              alt="thumbnail"
              width={52}
              height={52}
              className="rounded-md aspect-square object-cover"
            />
            <p className="truncate w-72">{podcast.title}</p>
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
            <p>{podcast.audioDuration}</p>
          </div>
        </div>
      </div>
      <Separator className="bg-black-4" />
    </div>
  )
}
