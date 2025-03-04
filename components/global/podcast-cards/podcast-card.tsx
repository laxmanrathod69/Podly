"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"

export const PodcastCard = ({ podcast }: { podcast: Podcast }) => {
  const router = useRouter()

  const handleClick = useCallback(() => {
    // WIP: handle podcast listeners and monthly listeners
    router.push(`/podcast/${podcast.id}`, { scroll: true })
  }, [router, podcast.id])

  const podcastImage = useMemo(
    () => (
      <Image
        src={podcast.thumbnail!}
        alt={podcast.title}
        width={174}
        height={174}
        className="aspect-square h-fit w-full rounded-xl"
      />
    ),
    [podcast.thumbnail, podcast.title],
  )

  return (
    <div className="cursor-pointer" onClick={handleClick}>
      <figure className="grid grid-cols-1 gap-2">
        {podcastImage}
        <div className="flex flex-col">
          <h1 className="text-sm truncate font-semibold text-white-1">
            {podcast.title}
          </h1>
          <h2 className="text-xs truncate font-normal capitalize text-white-2">
            {podcast.user?.name}
          </h2>
        </div>
      </figure>
    </div>
  )
}
