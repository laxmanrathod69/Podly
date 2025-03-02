"use client"

import { LatestPodcastCard } from "@/components/global/podcast-cards/latest-podcast-card"
import { PodcastCard } from "@/components/global/podcast-cards/podcast-card"
import { useRecentPodcasts, useTrendingPodcasts } from "@/hooks/public-podcast"

const PodcastHomePage = () => {
  const { trendingPodcasts } = useTrendingPodcasts()
  const { recentPodcasts } = useRecentPodcasts()

  return (
    <div className="mt-9 max-md:mt-2 flex flex-col gap-9 md:overflow-hidden">
      <section className="flex flex-col gap-8">
        {trendingPodcasts && (
          <div className="flex flex-col gap-3">
            <h1 className="text-20 font-bold text-white-1">
              Trending Podcasts
            </h1>
            <div className="podcast_grid">
              {trendingPodcasts.map((podcast: Podcast) => (
                <PodcastCard key={podcast.id} podcast={podcast} />
              ))}
            </div>
          </div>
        )}
        {recentPodcasts && (
          <div className="flex flex-col gap-4">
            <h1 className="text-20 font-bold text-white-1">Recent Podcasts</h1>
            {recentPodcasts.map((podcast: Podcast) => (
              <LatestPodcastCard key={podcast.id} podcast={podcast} />
            ))}
          </div>
        )}
        {trendingPodcasts && (
          <div className="flex flex-col gap-3">
            <h1 className="text-20 font-bold text-white-1">Popular Podcasts</h1>
            <div className="podcast_grid">
              {trendingPodcasts.map((podcast: Podcast) => (
                <PodcastCard key={podcast.id} podcast={podcast} />
              ))}
              {/* TODO: Add popular podcasts */}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default PodcastHomePage
