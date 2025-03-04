export const handleError = (message: string, error: any) => {
  console.error(`${message}: ${JSON.stringify(error)}`)
  return {
    status: 500,
    message: (error.message as string) || "Internal Server Error",
  }
}
