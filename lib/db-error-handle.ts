import { Prisma } from "@prisma/client"

export const errorResponse = <T = null>(
  status: number,
  message: string,
  data: T = null as T,
) => ({ status, message, data })

export const errorHandle = (error: unknown) => {
  // Log the error to the server
  console.error("Database error:", error)

  // If it's a known Prisma issue, return a more specific error
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return errorResponse(
      500,
      `Database query failed, please try again later.: ${error.message}`,
    )
  }

  // Catch all unexpected errors and log them
  return errorResponse(
    500,
    error instanceof Error ? error.message : "Internal Server Error",
  )
}
