"use server"

import prisma from "@/lib/prisma"
import { errorHandle, errorResponse } from "../db-error-handle"

export const onSearch = async (query: string) => {
  if (!query) return errorResponse(400, "Query parameter is required.")

  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            podcast: {
              some: {
                OR: [
                  {
                    title: {
                      contains: query,
                      mode: "insensitive",
                    },
                  },
                  {
                    description: {
                      contains: query,
                      mode: "insensitive",
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      take: 10,
    })

    if (users.length === 0) {
      return errorResponse(404, "Users not found")
    }

    return { status: 200, data: users, message: "Users found" }
  } catch (error) {
    return errorHandle(error)
  }
}
