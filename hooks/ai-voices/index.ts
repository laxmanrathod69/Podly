"use client"

import { useEffect, useState } from "react"
import { useVoiceDetails } from "./use-voice-categories"

export const useSelectVoiceType = () => {
  const [currentVoice, setCurrentVoice] = useState<string>("")
  const [voiceId, setVoiceId] = useState<string>("")
  const [voiceStyle, setVoiceStyle] = useState<string>("")
  const [voicePrompt, setVoicePrompt] = useState<string>("")

  useEffect(() => {
    const { voiceId: id, voiceStyle: style } = useVoiceDetails(currentVoice)
    setVoiceId(id || "")
    setVoiceStyle(style || "")
  }, [currentVoice])

  return {
    currentVoice,
    setCurrentVoice,
    voicePrompt,
    setVoicePrompt,
    voiceId,
    setVoiceId,
    voiceStyle,
    setVoiceStyle,
  }
}
