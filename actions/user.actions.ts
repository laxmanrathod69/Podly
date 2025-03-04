"use server"

import prisma from "@/lib/prisma"
import { handleError } from "./error-log"

export const onGetTopPodcasters = async () => {
  try {
    const topPodcasters = await prisma.user.findMany({
      take: 6,
      where: {
        podcast: { some: {} }, // Only users with at least one podcast
      },
      select: {
        id: true,
        name: true,
        image: true,
        podcast: true,
        monthlyListeners: true,
        createdAt: true,
      },
      orderBy: {
        podcast: { _count: "desc" },
      },
    })

    if (topPodcasters.length === 0) {
      return { status: 404, data: null, message: "No podcasters found" }
    }

    return { status: 200, data: topPodcasters, message: "Podcasters found" }
  } catch (error: any) {
    return handleError("Error occurred while fetching top podcasters", error)
  }
}

export const onGetPopularPodcasters = async () => {
  try {
    const popularPodcasters = await prisma.user.findMany({
      take: 10,
      where: {
        podcast: { some: {} },
      },
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

    if (popularPodcasters.length === 0) {
      return { status: 404, data: null, message: "No podcasters found" }
    }

    return { status: 200, data: popularPodcasters, message: "Podcasters found" }
  } catch (error: any) {
    return handleError(
      "Error occurred while fetching populaer-podcasters",
      error,
    )
  }
}

export const onGetUser = async (id: string) => {
  if (!id) return { status: 400, message: "User id is required" }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        image: true,
        podcast: true,
        monthlyListeners: true,
        createdAt: true,
      },
    })

    if (!user?.id) {
      return { status: 404, data: null, message: "User not found" }
    }

    return { status: 200, data: user, message: "User found" }
  } catch (error: any) {
    return handleError("Error occurred while fetching user", error)
  }
}
