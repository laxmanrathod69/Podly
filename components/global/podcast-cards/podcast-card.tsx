"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"

export const PodcastCard = ({ podcast }: { podcast: Podcast }) => {
  const router = useRouter()

  // WIP: handle podcast listeners and monthly listeners
  const handleClick = useCallback(() => {
    router.push(`/podcast/${podcast.id}`, { scroll: true })
  }, [router, podcast.id])

  const podcastImage = useMemo(
    () => (
      <Image
        src={podcast.imageUrl!}
        alt={podcast.title}
        width={175}
        height={175}
        className="w-full max-lg:w-56 rounded-md shadow-lg aspect-square object-cover"
      />
    ),
    [podcast.imageUrl, podcast.title],
  )

  return (
    <div
      className="transition-all duration-75 ease-in hover:bg-black-6/50 md:p-3 rounded-md cursor-pointer"
      onClick={handleClick}
    >
      <figure className="grid grid-cols-1 gap-2">
        {podcastImage}
        <div className="flex flex-col max-md:w-56">
          <h1 className="text-sm truncate font-semibold text-white-1">
            {podcast.title}
          </h1>
          <h2 className="text-xs truncate font-normal capitalize text-white-2 hover:underline w-fit">
            {podcast.user?.name}
          </h2>
        </div>
      </figure>
    </div>
  )
}
