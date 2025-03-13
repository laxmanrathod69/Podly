"use client"

import { usePodcastDetails } from "@/hooks/podcast/podcast-details"
import { PodcastHeader } from "./podcast-header"

const PodcastDetails = ({ podcastId, userId }: PodcastDetailProps) => {
  const { podcast } = usePodcastDetails(podcastId)
  if (!podcast?.id) return null // TODO: add error page

  const isOwner: boolean = userId === podcast.user_id

  return (
    <section className="flex w-full flex-col gap-8">
      <PodcastHeader podcast={podcast} isOwner={isOwner} />

      <div className="flex flex-col gap-4">
        <h1 className="text-white-1 text-xl font-extrabold max-md:font-bold">
          About
        </h1>
        <p className="text-white-2 text-sm font-normal max-md:text-center">
          {podcast?.description}
        </p>
      </div>

      {/* WIP: implement like and genres */}
      <div className="flex flex-col gap-4">
        <h1 className="text-white-1 text-xl font-extrabold max-md:font-bold">
          Transcription
        </h1>
        <p className="text-white-2 text-sm font-normal max-md:text-center">
          {podcast?.transcript}
        </p>
      </div>
      {/*WIP: implement similar podcasts */}
    </section>
  )
}

export default PodcastDetails
