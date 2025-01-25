"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import GeneratePodcast from "@/components/GeneratePodcast";
import GenerateThumbnail from "@/components/GenerateThumbnail";
import { Loader } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useVoiceDetails } from "@/hooks/use-voice-categories";
import { useSelectVoiceType } from "@/hooks/create-podcast";
import { useFormValidation } from "@/hooks/create-podcast/form-validation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { z } from "zod";
import { SelectAiVoice } from "@/components/create-podcast";
import { TitleField } from "@/components/create-podcast/title-field";
import { DescriptionField } from "@/components/create-podcast/description-field";
import { toast } from "sonner";

const CreatePodcast = () => {
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imagePrompt, setImagePrompt] = useState<string>("");
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const {
    currentVoice,
    voiceId,
    setVoiceId,
    voicePrompt,
    setVoicePropmpt,
    voiceStyle,
    setVoiceStyle,
  } = useSelectVoiceType();

  const { form, formSchema } = useFormValidation();
  const createPodcast = useMutation(api.podcasts.createPodcast);

  useEffect(() => {
    const { voiceId: id, voiceStyle } = useVoiceDetails(currentVoice);
    setVoiceId(id!);
    setVoiceStyle(voiceStyle!);
  }, [currentVoice]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);

      if (!audioUrl || !imageUrl || !currentVoice) {
        setIsSubmitting(false);
        return toast("Error", { description: "Missing required fields" });
      }

      const podcast = await createPodcast({
        podcastTitle: data.podcastTitle,
        podcastDescription: data.podcastDescription,
        audioUrl,
        audioStorageId: audioStorageId!,
        audioDuration,
        voiceName: currentVoice,
        voiceId,
        voiceStyle,
        voicePrompt,
        imageUrl,
        imageStorageId: imageStorageId!,
        imagePrompt,
        views: 0,
      });

      // TODO: Check create podcasts
      if (podcast) {
        toast("Success", {
          description:
            "Your podcast has been created and is ready to generate.",
        });
        setIsSubmitting(false);
        router.push("/");
      }
    } catch (error: any) {
      setIsSubmitting(false);
      return toast("Error", {
        description: "An error occurred while creating podcast",
      });
    }
  };

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-20 font-bold text-white-1">Create Podcast</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12 flex flex-col w-full"
        >
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <TitleField />
            <SelectAiVoice />
            <DescriptionField />
          </div>

          <div className="flex flex-col pt-10">
            <GeneratePodcast
              audio={audioUrl}
              setAudio={setAudioUrl}
              setAudioStorageId={setAudioStorageId}
              setAudioDuration={setAudioDuration}
              voiceName={currentVoice!}
              voiceStyle={voiceStyle!}
              voicePrompt={voicePrompt}
              setVoicePrompt={setVoicePropmpt}
            />

            <GenerateThumbnail
              image={imageUrl}
              setImage={setImageUrl}
              imagePrompt={imagePrompt}
              setImagePrompt={setImagePrompt}
              setImageStorageId={setImageStorageId}
            />

            <div className="mt-10 w-full">
              <Button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1 hover:border border-orange-1",
                  isSubmitting && "cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <>
                    Submitting
                    <Loader size={20} className="animate-spin ml-2" />
                  </>
                ) : (
                  "Submit & Publish Podcast"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreatePodcast;
