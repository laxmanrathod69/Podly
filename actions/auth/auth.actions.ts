"use server"

import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { errorHandle, errorResponse } from "../db-error-handle"

export const onAuthenticatedUser = async () => {
  try {
    const clerk = await currentUser()
    if (!clerk) return errorResponse(401, "Unauthorized")

    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerk.id,
      },
      select: {
        id: true,
        name: true,
        podcast: true,
        monthlyListeners: true,
        createdAt: true,
      },
    })

    if (!user?.id) errorResponse(404, "User not found")

    return {
      status: 200,
      data: { ...user, image: clerk?.imageUrl },
      message: "User found",
    }
  } catch (error) {
    return errorHandle(error)
  }
}

export const onSignUpUser = async (user: {
  name: string
  clerkId: string
  image: string | undefined
}) => {
  if (!user.name || !user.clerkId) return errorResponse(400, "Invalid data")
  try {
    const createdUser = await prisma.user.create({
      data: { ...user, monthlyListeners: 0 },
      select: { id: true },
    })

    if (!createdUser?.id) {
      return errorResponse(400, "User could not be created")
    }
    return {
      status: 200,
      id: createdUser.id,
      message: "User created",
    }
  } catch (error) {
    return errorHandle(error)
  }
}

export const onSignInUser = async (clerkId: string) => {
  if (!clerkId) return errorResponse(400, "Invalid data")
  try {
    const loggedInUser = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true },
    })

    if (!loggedInUser?.id) {
      return errorResponse(404, "User not found")
    }

    return {
      status: 200,
      id: loggedInUser.id,
      message: "User authenticated",
    }
  } catch (error) {
    return errorHandle(error)
  }
}
