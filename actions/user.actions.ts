"use server"

import prisma from "@/lib/prisma"
import { handleError } from "./error-log"

export const onGetTopPodcasters = async () => {
  try {
    const topPodcasters = await prisma.user.findMany({
      take: 4,
      select: {
        id: true,
        name: true,
        image: true,
        podcast: true,
        monthlyListeners: true,
        createdAt: true,
      },
      orderBy: { podcast: { _count: "desc" } },
    })

    if (!topPodcasters?.length) {
      return { status: 404, message: "No podcasters found" }
    }

    return { status: 200, data: topPodcasters }
  } catch (error: any) {
    return handleError("Error occurred while fetching top podcasters", error)
  }
}

export const onGetPopularPodcasters = async () => {
  try {
    const popularPodcasters = await prisma.user.findMany({
      take: 4,
      select: {
        id: true,
        name: true,
        image: true,
        podcast: true,
        monthlyListeners: true,
        createdAt: true,
      },
      orderBy: { monthlyListeners: "desc" },
    })

    if (!popularPodcasters?.length) {
      return { status: 404, message: "No podcasters found" }
    }

    return { status: 200, data: popularPodcasters }
  } catch (error: any) {
    return handleError(
      "Error occurred while fetching populaer-podcasters",
      error,
    )
  }
}
