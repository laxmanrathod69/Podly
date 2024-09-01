"use client";

import { useState } from "react";
import { GeneratePodcastProps } from "@/types";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";

import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

export const useGeneratePodcast = ({
  setAudio,
  voiceType,
  voicePrompt,
  setVoicePrompt,
  setAudioStorageId,
}: GeneratePodcastProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const getPodcastAudio = useAction(api.ai.generateAudioAction);

  const getAudioUrl = useMutation(api.podcasts.getUrl);

  const generatePodcastSpeech = async (aiGeneratedText: string) => {
    try {
      const audio_url = await getPodcastAudio({
        voice: voiceType!,
        input: aiGeneratedText,
      });

      if (!audio_url) {
        throw new Error("Failed to generate audio URL");
      }

      // Fetch the audio content from the URL
      const response = await axios.get(audio_url, {
        responseType: "arraybuffer",
      });
      const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
      const fileName = `podcast-${uuidv4()}.mp3`;
      const audioFile = new File([audioBlob], fileName, { type: "audio/mpeg" });

      // Upload the audio file
      const uploaded = await startUpload([audioFile]);
      const storageId = (uploaded[0].response as any).storageId;

      setAudioStorageId(storageId);
      const audioUrl = await getAudioUrl({ storageId });
      setAudio(audioUrl!);
      toast({ title: "Your podcast is ready!" });
    } catch (err: any) {
      console.error(`Error generating podcast:`, err);
      toast({
        title: "Error creating a podcast",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const text = useAction(api.ai.generatePodcastText);

  const generatePodcast = async () => {
    setIsGenerating(true);
    setAudio("");

    if (!voicePrompt) {
      toast({
        title: "Please provide a prompt to generate podcast",
        variant: "destructive",
      });
      return setIsGenerating(false);
    }

    try {
      const aiGeneratedText = await text({ aiTitlePrompt: voicePrompt });
      setVoicePrompt(aiGeneratedText);
      toast({ title: "Podcast text generated successfully!" });
      generatePodcastSpeech(aiGeneratedText);
    } catch (err: any) {
      console.error(`Error generating podcast text: ${err.message}`);
      toast({
        title: "Error generating podcast text",
        description: err.message,
        variant: "destructive",
      });
      return setIsGenerating(false);
    } finally {
      setIsGenerating(false);
    }
  };

  return { isGenerating, generatePodcast, generatePodcastSpeech };
};
