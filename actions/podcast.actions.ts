"use server"

import prisma from "@/lib/prisma"
import { generateTextPrompt, generateThumbnailPrompt } from "@/lib/prompt"
import { cleanScript } from "@/lib/utils"
import { CreatePodcastData } from "@/types/podcast"

import { google } from "@ai-sdk/google"
import { generateText } from "ai"

export const onCreatePodcast = async (data: CreatePodcastData) => {
  try {
    if (!data) {
      return { status: 400, message: "Invalid data" }
    }

    const podcast = await prisma.podcast.create({
      data: { ...data },
      select: { id: true },
    })

    if (podcast && podcast.id) {
      return {
        status: 200,
        message: "Podcast created successfully",
        id: podcast.id,
      }
    }

    return { status: 400, message: "Failed to create podcast" }
  } catch (error: any) {
    return {
      status: 500,
      message: error.message || "Oops! Something went wrong.",
    }
  }
}

export const onGeneratePodcastContent = async (topic: string) => {
  try {
    const { text } = await generateText({
      model: google("gemini-1.5-pro-latest", {
        safetySettings: [
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_LOW_AND_ABOVE",
          },
        ],
      }),
      prompt: generateTextPrompt(topic),
    })

    const script = cleanScript(text)

    if (!script) {
      return {
        status: 400,
        message: "Failed to generate podcast script",
      }
    }

    const url =
      "https://realistic-text-to-speech.p.rapidapi.com/v3/generate_voice_over_v2"
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY!,
        "x-rapidapi-host": "realistic-text-to-speech.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        voice_obj: {
          id: 2014,
          voice_id: "en-US-Neural2-A",
          gender: "Male",
          language_code: "en-US",
          language_name: "US English",
          voice_name: "John",
          status: 2,
          rank: 0,
          type: "google_tts",
          isPlaying: false,
        },
        json_data: [
          {
            block_index: 0,
            text: script,
          },
        ],
      }),
    }

    const audioData = await fetch(url, options)
    const audio = await audioData.json()

    if (!audioData || !audio[0]?.link) {
      return {
        status: 400,
        message: "Failed to generate podcast speech",
      }
    }

    return {
      status: 200,
      message: "Podcast speech generated successfully",
      audio: audio[0]?.link,
      script,
    }
  } catch (error: any) {
    console.error(`An error occured: ${JSON.stringify(error)}`)
    return {
      status: 500,
      message: error.message || "Oops! Something went wrong.",
    }
  }
}

export const onGeneratePodcastThumbnail = async (prompt: string) => {
  const url = "https://ai-text-to-image-generator-api.p.rapidapi.com/realistic"
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY!,
      "x-rapidapi-host": "ai-text-to-image-generator-api.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: generateThumbnailPrompt(prompt),
    }),
  }

  try {
    if (!prompt) {
      return {
        status: 400,
        message: "Prompt is required",
      }
    }
    const response = await fetch(url, options)
    const result = await response.json()

    if (!result) {
      return {
        status: 400,
        message: "Failed to generate podcast thumbnail",
      }
    }

    return {
      status: 200,
      message: "Podcast thumbnail generated successfully",
      thumbnail: result.url as string,
    }
  } catch (error) {
    console.error(`An error occured: ${JSON.stringify(error)}`)
    return {
      status: 500,
      message: "Oops! Something went wrong.",
    }
  }
}
