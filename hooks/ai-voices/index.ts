"use client"

import { useState } from "react"

export const useSelectVoiceType = () => {
  const [currentVoice, setCurrentVoice] = useState<string>("")
  const [voicePrompt, setVoicePrompt] = useState<string>("")

  return {
    currentVoice,
    setCurrentVoice,
    voicePrompt,
    setVoicePrompt,
  }
}
