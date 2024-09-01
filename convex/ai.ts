import { action } from "./_generated/server";
import { ConvexError, v } from "convex/values";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import axios from "axios";

export const generatePodcastText = action({
  args: { aiTitlePrompt: v.string() },
  handler: async (_, { aiTitlePrompt }) => {
    try {
      const { text } = await generateText({
        model: google("gemini-1.5-pro-latest"),
        prompt: `Create a podcast episode script on ${aiTitlePrompt}. The episode should be informative, engaging, and total characters should be ${2000} characters  long. Include a brief introduction that hooks the listener, followed by 3-4 main talking points. Incorporate relevant facts, statistics, or expert opinions to support your discussion. Conclude with a summary of key takeaways and a call-to-action for listeners.

        Please keep the language conversational and accessible to a general audience. Do not include a formal intro or outro segment. Instead, focus on delivering clean, concise, and valuable content throughout the episode.

        Remember to maintain a friendly and approachable tone, as if you're having a casual conversation with the listener. Feel free to include occasional humor or anecdotes where appropriate to keep the audience engaged.

        Lastly, provide suggestions for potential guest experts or interviewees who could add value to this episode topic.`,
      });

      if (!text) {
        throw new ConvexError("No podcast was generated");
      }

      const cleanedRes = (txt: string) => {
        return txt.replace(/[*#"']/g, "");
      };

      const textResponse = cleanedRes(text);
      return textResponse;
    } catch (error: any) {
      throw new ConvexError({
        message: "Failed to generate podcast",
        cause: error,
      });
    }
  },
});

export const generateAudioAction = action({
  args: {
    input: v.string(),
    voice: v.union(v.string(), v.null()),
  },
  handler: async (_, { voice, input }) => {
    const options = {
      method: "POST",
      url: "https://api.play.ht/api/v2/tts",
      headers: {
        accept: "*/*",
        "content-type": "application/json",
        AUTHORIZATION: process.env.PLAYHT_SECRET_KEY!,
        "X-USER-ID": process.env.PLAYHT_USERID!,
      },
      data: {
        text: input,
        voice,
        output_format: "mp3",
        voice_engine: "PlayHT2.0",
        quality: "high",
        speed: 1,
        sample_rate: 24000,
        seed: null,
        temperature: null,
        emotion: null, // "male_happy"
        voice_guidance: 3,
        style_guidance: 20,
      },
    };

    try {
      const res = await axios.request(options);
      const responseData = res.data;

      if (typeof responseData === "string") {
        // Parse SSE data
        const match = responseData.match(/event: completed\r\ndata: (.+)\r\n/);
        if (match) {
          const completedData = JSON.parse(match[1]);
          if (completedData.url) {
            return completedData.url;
          }
        }
      } else if (responseData.url) {
        // Direct URL in response
        return responseData.url;
      }

      throw new Error("Audio URL not found in response");
    } catch (err: any) {
      console.error("Error in generateAudioAction:", err);
      throw new Error(`Failed to generate audio: ${err.message}`);
    }
  },
});

export const generateThumbnailAction = action({
  args: { prompt: v.string() },
  handler: async (_, { prompt }) => {
    const options = {
      method: "POST",
      url: "https://ai-text-to-image-generator-api.p.rapidapi.com/realistic",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
        "x-rapidapi-host": process.env.RAPIDAPI_IMG_HOST!,
        "Content-Type": "application/json",
      },
      data: {
        inputs: prompt,
      },
    };

    try {
      const response = await axios.request(options);
      const url = await response.data.url;

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
