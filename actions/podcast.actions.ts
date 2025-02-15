"use server"

import prisma from "@/lib/prisma"
import { generateTextPrompt, generateThumbnailPrompt } from "@/lib/prompt"
import { cleanScript } from "@/lib/utils"

import { google } from "@ai-sdk/google"
import { generateText } from "ai"

const logError = (message: string, error: any) => {
  console.error(`${message}: ${JSON.stringify(error)}`)
}

export const onCreatePodcast = async (data: CreatePodcastData) => {
  if (!data || Object.keys(data).length === 0) {
    return { status: 400, message: "Invalid podcast data provided" }
  }

  try {
    const podcast = await prisma.podcast.create({
      data: {
        title: data.title,
        description: data.description,
        voice: data.voice,
        audio: data.audio,
        thumbnail: data.thumbnail,
        authorId: data.author.id,
        authorImage: data.author.image,
        transcript: data.transcript,
        audioDuration: data.audioDuration,
        listeners: data.listeners,
      },
      select: { id: true },
    })

    if (!podcast?.id) {
      return { status: 400, message: "Failed to create podcast" }
    }

    return {
      status: 201,
      message: "Podcast created successfully",
      podcastId: podcast.id,
    }
  } catch (error: any) {
    logError("Error creating podcast", error)
    return {
      status: 500,
      message: error.message || "Internal Server Error while creating podcast",
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
      audio: audio[0]?.link as string,
      script,
    }
  } catch (error: any) {
    logError("An error occured while generating podcast audio", error)
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

    if (!result || !result.url) {
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
  } catch (error: any) {
    logError("An error occured", error)
    return {
      status: 500,
      message: error.message || "Oops! Something went wrong.",
    }
  }
}

export const onGetRecentPodcasts = async () => {
  try {
    const podcasts = await prisma.podcast.findMany({
      take: 5,
      select: {
        id: true,
        title: true,
        thumbnail: true,
        description: true,
        listeners: true,
        author: true,
        authorImage: true,
        authorId: true,
        transcript: true,
        audio: true,
        audioDuration: true,
        createdAt: true,
        voice: true,
      },
      orderBy: { createdAt: "asc" },
    })

    if (!podcasts || !podcasts.length) {
      return { status: 400, message: "Failed to fetch recent podcasts" }
    }

    return { status: 200, data: podcasts }
  } catch (error: any) {
    logError("An error occured while fetching recent podcasts", error)
    return {
      status: 500,
      message: error.message || "Oops! Something went wrong.",
    }
  }
}

export const onGetTrendingPodcasts = async () => {
  try {
    const podcasts = await prisma.podcast.findMany({
      take: 10,
      select: {
        id: true,
        title: true,
        thumbnail: true,
        description: true,
        listeners: true,
        author: true,
        authorImage: true,
        authorId: true,
        transcript: true,
        audio: true,
        audioDuration: true,
        createdAt: true,
        voice: true,
      },
      orderBy: { listeners: "desc" },
    })

    if (!podcasts || !podcasts.length) {
      return { status: 400, message: "Failed to fetch trending podcasts" }
    }

    return { status: 200, data: podcasts }
  } catch (error: any) {
    logError("An error occured while fetching trending podcasts", error)
    return {
      status: 500,
      message: error.message || "Oops! Something went wrong.",
    }
  }
}

export const onGetPodcastDetails = async (id: string) => {
  if (!id) {
    return { status: 400, message: "Podcast ID is required" }
  }

  try {
    const podcast = await prisma.podcast.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        thumbnail: true,
        description: true,
        listeners: true,
        author: true,
        authorImage: true,
        authorId: true,
        transcript: true,
        audio: true,
        audioDuration: true,
        createdAt: true,
        voice: true,
      },
    })

    if (!podcast?.id) {
      return { status: 404, message: "Podcast not found" }
    }

    return { status: 200, data: podcast }
  } catch (error: any) {
    logError("An error occured while fetching podcast details", error)
    return {
      status: 500,
      message:
        error.message || "Internal Server Error while fetching podcast details",
    }
  }
}
