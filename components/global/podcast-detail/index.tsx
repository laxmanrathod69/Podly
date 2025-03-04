"use client"

import { usePodcastDetails } from "@/hooks/podcast-details"
import { PodcastHeader } from "./podcast-header"

const PodcastDetails = ({ podcastId, userId }: PodcastDetailProps) => {
  const { podcast } = usePodcastDetails(podcastId)
  if (!podcast) return null

  const isOwner: boolean = userId === podcast.user?.id // WIP: implement it later

  return (
    <section className="flex w-full flex-col gap-8">
      <PodcastHeader podcast={podcast!} isOwner={isOwner} />

      <div className="flex flex-col gap-4">
        <h1 className="text-white-1 text-xl font-extrabold max-md:font-bold">
          About
        </h1>
        <p className="text-white-2 text-sm font-normal max-md:text-center">
          {podcast?.description}
        </p>
      </div>

      {/* WIP: implement like and genres <div className="text-white-1">LIKE GENRE</div> */}
      <div className="flex flex-col gap-4">
        <h1 className="text-white-1 text-xl font-extrabold max-md:font-bold">
          Transcription
        </h1>
        <p className="text-white-2 text-sm font-normal max-md:text-center">
          {podcast?.transcript}
        </p>
      </div>
      {/* <section className="flex flex-col mt-8 gap-5">
            <h1 className="text-20 font-bold text-white-1">Similar Podcasts</h1>
            {similarPodcasts && similarPodcasts.length > 0 ? (
              <div className="podcast_grid">
                {similarPodcasts?.map((podcast) => (
                  <PodcastCard podcastId={podcast._id} />
                ))}
              </div>
            ) : (
              <>
                <EmptyState
                  title="No similar podcasts found"
                  buttonLink="/discover"
                  buttonText="Discover More Podcasts"
                /> 
              </>
            )}
          </section> */}
    </section>
  )
}

export default PodcastDetails
