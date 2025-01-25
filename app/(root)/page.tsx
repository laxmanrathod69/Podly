"use client";

import PodcastCard from "@/components/PodcastCard";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

const Home = () => {
  const trensingPodcasts = useQuery(api.podcasts.getTrendingPodcasts);

  return (
    <div className="mt-9 flex flex-col gap-9 md:overflow-hidden">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>
        <div className="podcast_grid">
          {trensingPodcasts?.map(({ _id }) => (
            <PodcastCard key={_id} podcastId={_id} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
