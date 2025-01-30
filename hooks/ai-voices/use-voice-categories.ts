export const useVoiceCategories = [
  { name: "Natalie", voiceId: "en-US-natalie", style: "Promo" },
  { name: "Amara", voiceId: "en-US-amara", style: "Conversational" },
  { name: "Jualia", voiceId: "en-US-julia", style: "Narration" },
  { name: "Zion", voiceId: "en-US-zion", style: "Promo" },
  { name: "Ken", voiceId: "en-US-ken", style: "Conversational" },
  { name: "Riley", voiceId: "en-US-riley", style: "Conversational" },
]

export const useVoiceDetails = (voiceName: string | "") => {
  const voiceId = useVoiceCategories.find(
    ({ name }) => name === voiceName,
  )?.voiceId
  const voiceStyle = useVoiceCategories.find(
    ({ name }) => name === voiceName,
  )?.style
  return { voiceId, voiceStyle }
}
