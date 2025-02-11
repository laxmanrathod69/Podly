"use client"

import { PodcastCard } from "@/components/global/podcast-cards/podcast-card"
import { useRecentPodcasts, useTrendingPodcasts } from "@/hooks/public-podcast"

const PodcastHomePage = () => {
  const { trendingPodcasts } = useTrendingPodcasts()
  const { recentPodcasts } = useRecentPodcasts()

  return (
    <div className="mt-9 flex flex-col gap-9 md:overflow-hidden">
      <section className="flex flex-col gap-5">
        {trendingPodcasts && (
          <>
            <div className="flex items-center justify-between">
              <h1 className="text-20 font-bold text-white-1">
                Trending Podcasts
              </h1>
              {/* TODO: Add link */}
              <p className="text-sm text-orange-1 font-medium">See All</p>{" "}
            </div>
            <div className="podcast_grid">
              {trendingPodcasts.map((podcast: Podcast) => (
                <PodcastCard key={podcast.id} podcast={podcast} />
              ))}
            </div>
          </>
        )}
        {recentPodcasts && (
          <>
            <h1 className="text-20 font-bold text-white-1">Latests Podcasts</h1>
            <div className="podcast_grid">
              {recentPodcasts.map((podcast: Podcast) => (
                <PodcastCard key={podcast.id} podcast={podcast} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default PodcastHomePage
