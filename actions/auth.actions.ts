"use server"

import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

export const onAuthenticatedUser = async () => {
  try {
    const clerk = await currentUser()
    if (!clerk) return { status: 404 }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerk.id,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
      },
    })

    if (user)
      return {
        status: 200,
        id: user.id,
        image: clerk.imageUrl, // TODO: make it optional
        username: `${user.firstname} ${user.lastname}`,
      }

    return {
      status: 404,
      message: "User not found!",
    }
  } catch (error: any) {
    return {
      status: 400,
      message: "Oops! Something went wrong. Try again",
    }
  }
}

export const onSignUpUser = async (user: {
  firstname: string
  lastname: string
  clerkId: string
  image: string
}) => {
  try {
    const createdUser = await prisma.user.create({
      data: { ...user, monthlyListeners: 0 },
    })

    if (createdUser && createdUser.id) {
      return {
        status: 200,
        message: "User created",
        id: createdUser.id,
      }
    }

    return {
      status: 400,
      message: "User could not be created! Try again",
    }
  } catch (error: any) {
    return {
      status: 500,
      message: "Internal server error",
    }
  }
}

export const onSignInUser = async (clerkId: string) => {
  try {
    const loggedInUser = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true },
    })

    if (loggedInUser && loggedInUser.id) {
      return {
        status: 200,
        message: "User authenticated",
        id: loggedInUser.id,
      }
    }

    return {
      status: 400,
      message: "User could not be logged in! Try again",
    }
  } catch (error: any) {
    return {
      status: 500,
      message: "Oops! Something went wrong. Try again",
    }
  }
}
