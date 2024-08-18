import { useState } from "react";
import { GeneratePodcastProps } from "@/types";

export const useGeneratePodcast = ({
  setAudio,
  voiceType,
  voicePrompt,
  setAudioStorageId,
}: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePodcast = async () => {
    setIsGenerating(true);

    setAudio("");

    if (!voicePrompt) {
      // TODO; show error message
      return setIsGenerating(false);
    }

    try {
      // FIX: Call API to generate podcast
      //   const response = await getPodcastAudio({
      //     voice: voiceType,
      //     input: voicePrompt,
      //   });
    } catch (error) {
      console.error(`Error generating podcast: ${error}`);
      // TODO: show error message
      setIsGenerating(false);
    }
  };

  return { isGenerating, generatePodcast };
};
