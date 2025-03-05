"use server"

import prisma from "@/lib/prisma"
import { generateTextPrompt } from "@/lib/prompt"
import { cleanScript } from "@/lib/utils"
import { google } from "@ai-sdk/google"
import { generateText } from "ai"
import { createClient } from "pexels"
import { errorHandle, errorResponse } from "./db-error-handle"

const fetchFromPrisma = async (
  query: any,
  successMessage: string,
  errorMessage: string,
) => {
  try {
    const result = await query
    if (!result) {
      return errorResponse(404, errorMessage)
    }
    return { status: 200, data: result, message: successMessage }
  } catch (error) {
    return errorHandle(error)
  }
}

export const onCreatePodcast = async (data: Podcast) => {
  if (!data || Object.keys(data).length === 0) {
    return errorResponse(400, "Data is required")
  }

  try {
    const podcast = await prisma.podcast.create({
      data: {
        title: data.title,
        description: data.description,
        voice: data.voice,
        audio: data.audio,
        thumbnail: data.thumbnail!,
        user: { connect: { id: data.user_id } },
        transcript: data.transcript,
        audioDuration: data.audioDuration,
        listeners: data.listeners,
      },
      select: { id: true },
    })

    if (!podcast?.id) {
      return errorResponse(400, "Failed to create podcast")
    }

    return {
      status: 201,
      id: podcast.id,
      message: "Podcast created successfully",
    }
  } catch (error) {
    return errorHandle(error)
  }
}

export const onGeneratePodcastContent = async (topic: string) => {
  if (!topic) {
    return errorResponse(400, "Topic is required")
  }

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
      return errorResponse(400, "Failed to generate podcast content")
    }

    const encodedParams = new URLSearchParams({
      voice_code: "en-US-3",
      text: script,
      speed: "1.00",
      pitch: "1.00",
      output_type: "audio_url",
    })

    const url = "https://cloudlabs-text-to-speech.p.rapidapi.com/synthesize"
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY!,
        "x-rapidapi-host": "cloudlabs-text-to-speech.p.rapidapi.com",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: encodedParams,
    }

    const response = await fetch(url, options)
    const audio = await response.json()

    if (!audio || audio.status !== "success") {
      return errorResponse(400, "Failed to generate podcast audio")
    }

    return {
      status: 200,
      audio: audio.result.audio_url as string,
      script,
      message: "Podcast audio generated successfully",
    }
  } catch (error) {
    return errorHandle(error)
  }
}

export const onGeneratePodcastThumbnail = async (query: string) => {
  if (!query) {
    return errorResponse(400, "Query is required")
  }

  const client = createClient(process.env.UNSPLASH_API_KEY!)

  try {
    const data = await client.photos.search({ query, per_page: 1 })

    if ("error" in data || !data.photos.length) {
      return errorResponse(400, "Failed to generate thumbnail")
    }

    return {
      status: 200,
      thumbnail: data.photos[0].src.original,
      message: "Podcast thumbnail is ready!",
    }
  } catch (error) {
    return errorHandle(error)
  }
}

export const onGetRecentPodcasts = async () => {
  return fetchFromPrisma(
    prisma.podcast.findMany({
      take: 4,
      select: {
        id: true,
        title: true,
        description: true,
        voice: true,
        audio: true,
        thumbnail: true,
        user: true,
        user_id: true,
        transcript: true,
        audioDuration: true,
        listeners: true,
      },
      orderBy: { createdAt: "asc" },
    }),
    "Podcast fetched successfully",
    "Failed to fetch recent podcasts",
  )
}

export const onGetTrendingPodcasts = async () => {
  return fetchFromPrisma(
    prisma.podcast.findMany({
      take: 10,
      where: {
        listeners: { gte: 0 },
      },
      select: {
        id: true,
        title: true,
        description: true,
        voice: true,
        audio: true,
        thumbnail: true,
        user: true,
        user_id: true,
        transcript: true,
        audioDuration: true,
        listeners: true,
      },
      orderBy: { listeners: "desc" },
    }),
    "Podcast fetched successfully",
    "Failed to fetch trending podcasts",
  )
}

export const onGetPodcastDetails = async (id: string) => {
  if (!id) {
    return errorResponse(400, "Podcast ID is required")
  }

  return fetchFromPrisma(
    prisma.podcast.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        voice: true,
        audio: true,
        thumbnail: true,
        user: true,
        user_id: true,
        transcript: true,
        audioDuration: true,
        listeners: true,
      },
    }),
    "Podcast fetched successfully",
    "Failed to fetch podcast details",
  )
}
