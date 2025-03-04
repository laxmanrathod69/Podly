export const handleApiResponse = (response: APIResponse | undefined) => {
  if (response?.status === 200) {
    return response.data as Podcast[]
  }
  return []
}

export const handleSingleApiResponse = (
  response: Extract<APIResponse, { data?: Podcast }> | undefined,
) => {
  if (response?.status === 200) {
    return response.data as Podcast
  }
  return null
}
