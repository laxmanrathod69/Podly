"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

export const usePodcast = (podcastId: Id<"podcasts">) => {
  const podcast = useQuery(api.podcasts.getPodcastById, { podcastId });
  return { ...podcast };
};
