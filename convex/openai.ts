import { action } from "./_generated/server";
import { ConvexError, v } from "convex/values";

import axios from "axios";

export const generateAudioAction = action({
  args: { input: v.string(), voice: v.union(v.string(), v.null()) },
  handler: async (_, { voice, input }) => {
    const options = {
      method: "POST",
      url: "https://open-ai-text-to-speech1.p.rapidapi.com",
      headers: {
        "x-rapidapi-key": "7352b8aa12msha4d1a1976ef54bdp1395a9jsnaa48ceb784e7",
        "x-rapidapi-host": "open-ai-text-to-speech1.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        model: "tts-1",
        input,
        voice,
      },
    };

    try {
      const res = await axios.request(options);
      const mp3 = await res.data;
      const buffer = mp3;
      console.log(mp3);
      return buffer;
    } catch (err: any) {
      console.error(err);
      throw new ConvexError(err.message);
    }
  },
});

export const generateThumbnailAction = action({
  args: { prompt: v.string() },
  handler: async (_, { prompt }) => {
    const options = {
      method: "POST",
      url: "https://ai-image-generator3.p.rapidapi.com/generate",
      headers: {
        "x-rapidapi-key": "7352b8aa12msha4d1a1976ef54bdp1395a9jsnaa48ceb784e7",
        "x-rapidapi-host": "ai-image-generator3.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        prompt: prompt,
        page: 1,
      },
    };

    try {
      const response = await axios.request(options);
      const data = await response.data;
      const url = await data.results.images[0];

      if (!url) {
        throw new ConvexError("Error generating thumbnail");
      }

      const imageResponse = await fetch(url);
      const buffer = await imageResponse.arrayBuffer();

      return buffer;
    } catch (error: any) {
      console.error(error);
      throw new ConvexError(error.message);
    }
  },
});
