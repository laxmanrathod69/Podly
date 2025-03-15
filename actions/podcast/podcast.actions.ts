"use server"

import prisma from "@/lib/prisma"
import { generateTextPrompt } from "@/lib/prompt"
import { cleanScript } from "@/lib/utils"
import { google } from "@ai-sdk/google"
import { generateText } from "ai"
import { createClient } from "pexels"
import { errorHandle, errorResponse } from "../../lib/db-error-handle"

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
        imageUrl: data.imageUrl!,
        user: { connect: { id: data.user_id } },
        transcript: data.transcript,
        duration: data.duration,
        listeners: data.listeners,
      },
    })

    if (!podcast?.id) {
      return errorResponse(400, "Failed to create podcast")
    }

    return {
      status: 201,
      data: podcast,
      message: "Podcast created successfully",
    }
  } catch (error) {
    return errorHandle(error)
  }
}

export const onGenerateContent = async (topic: string) => {
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
      data: {
        audioUrl: audio.result.audio_url as string,
        script,
      },
      message: "Podcast audio generated successfully",
    }
  } catch (error) {
    return errorHandle(error)
  }
}

export const onGenerateThumbnail = async (query: string | undefined) => {
  if (!query) {
    return errorResponse(400, "Query is required")
  }

  const client = createClient(process.env.UNSPLASH_API_KEY!)

  try {
    const data = await client.photos.search({ query, per_page: 1 })

    if ("error" in data || !data.photos.length) {
      return errorResponse(400, "Failed to generate imageUrl")
    }

    return {
      status: 200,
      data: data.photos[0].src.original,
      message: "Podcast imageUrl is ready!",
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
        imageUrl: true,
        user: true,
        user_id: true,
        transcript: true,
        duration: true,
        listeners: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    "Podcast fetched successfully",
    "Failed to fetch recent podcasts",
  )
}

export const onGetTrendingPodcasts = async () => {
  return fetchFromPrisma(
    prisma.podcast.findMany({
      take: 12,
      where: {
        listeners: { gt: 100 },
      },
      select: {
        id: true,
        title: true,
        description: true,
        voice: true,
        audio: true,
        imageUrl: true,
        user: true,
        user_id: true,
        transcript: true,
        duration: true,
        listeners: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    "Podcast fetched successfully",
    "Failed to fetch trending podcasts",
  )
}

export const onGetPopularPodcasts = async () => {
  return fetchFromPrisma(
    prisma.podcast.findMany({
      take: 12,
      where: {
        listeners: { gt: 150 },
      },
      select: {
        id: true,
        title: true,
        description: true,
        voice: true,
        audio: true,
        imageUrl: true,
        user: true,
        user_id: true,
        transcript: true,
        duration: true,
        listeners: true,
      },
      orderBy: { createdAt: "asc" },
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
        imageUrl: true,
        user: true,
        user_id: true,
        transcript: true,
        duration: true,
        listeners: true,
      },
    }),
    "Podcast fetched successfully",
    "Failed to fetch podcast details",
  )
}
