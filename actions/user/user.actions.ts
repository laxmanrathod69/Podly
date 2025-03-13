"use server"

import prisma from "@/lib/prisma"
import { errorHandle, errorResponse } from "../db-error-handle"

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
      return errorResponse(404, "No podcasters found")
    }

    return { status: 200, data: topPodcasters, message: "Podcasters found" }
  } catch (error) {
    return errorHandle(error)
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
      return errorResponse(404, "No podcasters found")
    }

    return { status: 200, data: popularPodcasters, message: "Podcasters found" }
  } catch (error) {
    return errorHandle(error)
  }
}

export const onGetUser = async (id: string) => {
  if (!id) return errorResponse(400, "User ID is required.")

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
      return errorResponse(404, "User not found")
    }

    return { status: 200, data: user, message: "User found" }
  } catch (error) {
    return errorHandle(error)
  }
}
