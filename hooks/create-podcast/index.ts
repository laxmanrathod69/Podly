"use client";

import { useState } from "react";

export const useSelectVoiceType = () => {
  const [currentVoice, setCurrentVoice] = useState<string>("");
  const [voiceId, setVoiceId] = useState<string>("");
  const [voiceStyle, setVoiceStyle] = useState<string>("");
  const [voicePrompt, setVoicePropmpt] = useState<string>("");

  return {
    currentVoice,
    setCurrentVoice,
    voicePrompt,
    setVoicePropmpt,
    voiceId,
    setVoiceId,
    voiceStyle,
    setVoiceStyle,
  };
};
