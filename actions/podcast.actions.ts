"use server"

import prisma from "@/lib/prisma"
import { generateTextPrompt, generateThumbnailPrompt } from "@/lib/prompt"
import { cleanScript } from "@/lib/utils"
import { google } from "@ai-sdk/google"
import { generateText } from "ai"

const handleError = (message: string, error: any) => {
  console.error(`${message}: ${JSON.stringify(error)}`)
  return {
    status: 500,
    message: error.message || "Internal Server Error",
  }
}

const fetchFromPrisma = async (query: any, errorMessage: string) => {
  try {
    const result = await query
    if (!result) {
      return { status: 400, message: errorMessage }
    }
    return { status: 200, data: result }
  } catch (error: any) {
    return handleError(errorMessage, error)
  }
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
    return handleError("Error creating podcast", error)
  }
}

export const onGeneratePodcastContent = async (topic: string) => {
  if (!topic) {
    return { status: 400, message: "Topic is required" }
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
      return {
        status: 400,
        message: "Failed to generate podcast script",
      }
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
      return {
        status: 400,
        message: "Failed to generate podcast audio",
      }
    }

    return {
      status: 200,
      message: "Podcast audio generated successfully",
      audio: audio.result.audio_url as string,
      script,
    }
  } catch (error: any) {
    return handleError(
      "An error occurred while generating podcast audio",
      error,
    )
  }
}

export const onGeneratePodcastThumbnail = async (prompt: string) => {
  if (!prompt) {
    return {
      status: 400,
      message: "Prompt is required",
    }
  }

  const url = "https://chatgpt-42.p.rapidapi.com/texttoimage3"
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY!,
      "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: generateThumbnailPrompt(prompt),
      width: 1080,
      height: 1080,
      steps: 1,
    }),
  }

  try {
    const response = await fetch(url, options)
    const data = await response.json()

    if (!data?.generated_image) {
      return {
        status: 400,
        message: "Failed to generate podcast thumbnail",
      }
    }

    return {
      status: 200,
      message: "Podcast thumbnail generated successfully",
      thumbnail: data.generated_image as string,
    }
  } catch (error: any) {
    return handleError(
      "An error occurred while generating podcast thumbnail",
      error,
    )
  }
}

export const onGetRecentPodcasts = async () => {
  return fetchFromPrisma(
    prisma.podcast.findMany({
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
    }),
    "Failed to fetch recent podcasts",
  )
}

export const onGetTrendingPodcasts = async () => {
  return fetchFromPrisma(
    prisma.podcast.findMany({
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
    }),
    "Failed to fetch trending podcasts",
  )
}

export const onGetPodcastDetails = async (id: string) => {
  if (!id) {
    return { status: 400, message: "Podcast ID is required" }
  }

  return fetchFromPrisma(
    prisma.podcast.findUnique({
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
    }),
    "Failed to fetch podcast details",
  )
}
