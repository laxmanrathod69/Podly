import { Prisma } from "@prisma/client"

export const errorResponse = (
  status: number,
  message: string,
  data: any = null,
) => ({ status, data, message })

export const errorHandle = (error: any) => {
  // Log the error to the server
  console.error("Database error:", JSON.stringify(error, null, 2))

  // If it's a known Prisma issue, return a more specific error
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return errorResponse(500, "Database query failed, please try again later.")
  }

  // Catch all unexpected errors and log them
  return errorResponse(500, error?.message || "Internal Server Error")
}
