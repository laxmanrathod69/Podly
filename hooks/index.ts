import { useState } from "react";
import { GeneratePodcastProps } from "@/types";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";

import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useToast } from "@/components/ui/use-toast";

export const useGeneratePodcast = ({
  setAudio,
  voiceType,
  voicePrompt,
  setAudioStorageId,
}: GeneratePodcastProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const getPodcastAudio = useAction(api.openai.generateAudioAction);

  const getAudioUrl = useMutation(api.podcasts.getUrl);

  const generatePodcast = async () => {
    setIsGenerating(true);
    setAudio("");

    if (!voicePrompt) {
      toast({ title: "Please provide a voice type to generate a podcast" });
      return setIsGenerating(false);
    }

    try {
      const response = await getPodcastAudio({
        voice: voiceType,
        input: voicePrompt,
      });

      const blob = new Blob([response], { type: "audio/mpeg" });
      const fileName = `podcast-${uuidv4()}.mp3`;
      const file = new File([blob], fileName, { type: "audio/mpeg " });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setAudioStorageId(storageId);
      const audioUrl = await getAudioUrl({ storageId });
      setAudio(audioUrl!);
      setIsGenerating(false);
      toast({ title: "Podcast generated successfully!" });
    } catch (err: any) {
      console.error(`Error generating podcast: ${err.message}`);
      toast({ title: "Error creating a podcast", variant: "destructive" });
      setIsGenerating(false);
    }
  };

  return { isGenerating, generatePodcast };
};
