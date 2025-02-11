"use client"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import GenerateThumbnail from "@/components/global/create-podcast/generate-podcast-thumbnail"
import { Loader2 } from "lucide-react"
import { useSelectVoiceType } from "@/hooks/ai-voices"
import { SelectAiVoice } from "@/components/global/create-podcast/select-ai-voice-field"
import { TitleField } from "@/components/global/create-podcast/title-field"
import { DescriptionField } from "@/components/global/create-podcast/description-field"
import { toast } from "sonner"
import { podcastFormSchema, PodcastFormValues } from "@/hooks/podcast/schema"
import { z } from "zod"
import { GeneratePodcastContent } from "@/components/global/create-podcast/generate-podcast-content"
import { useCreatePodcast } from "@/hooks/podcast/create-podcast/intex"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { onAuthenticatedUser } from "@/actions/auth.actions"

const CreatePodcast = () => {
  const [userId, setUserId] = useState<string>("")
  const [userImage, setUserImage] = useState<string | null>("")
  const [audio, setAudio] = useState<string | null>("")
  const [audioDuration, setAudioDuration] = useState<number>(0)
  const [thumbnail, setThumbnail] = useState<string>("")
  const [imagePrompt, setImagePrompt] = useState<string | null>("")
  const [transcript, setTranscript] = useState<string>("")
  const [views, setViews] = useState<number>(0)

  const {
    currentVoice,
    setCurrentVoice,
    voiceId,
    voicePrompt,
    setVoicePrompt,
    voiceStyle,
  } = useSelectVoiceType()

  const { createPodcast, isCreating } = useCreatePodcast()

  const form = useForm<PodcastFormValues>({
    resolver: zodResolver(podcastFormSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: "",
    },
  })

  const onSubmit = (data: z.infer<typeof podcastFormSchema>) => {
    if (
      !data.podcastTitle ||
      !data.podcastDescription ||
      !audio ||
      !currentVoice
    ) {
      return toast.error("Error", { description: "Missing required fields" })
    }

    if (!isCreating) {
      createPodcast({
        title: data.podcastTitle,
        description: data.podcastDescription,
        voice: currentVoice,
        audio,
        thumbnail,
        voiceId,
        voiceStyle,
        authorId: userId,
        authorImage: userImage,
        transcript,
        imagePrompt,
        audioDuration,
        views,
      })

      form.reset()
      setAudio("")
      setThumbnail("")
      setImagePrompt("")
      setTranscript("")
    }
  }

  useEffect(() => {
    const getUserDetails = async () => {
      const user = await onAuthenticatedUser()
      if (user.status === 200) {
        setUserId(user.id!)
        setUserImage(user?.image ?? null)
      }
    }
    getUserDetails()
  }, [])

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-20 font-bold text-white-1">Create Podcast</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12 flex flex-col w-full"
        >
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <TitleField form={form} />
            <SelectAiVoice
              currentVoice={currentVoice}
              setCurrentVoice={setCurrentVoice}
            />
            <DescriptionField form={form} />
          </div>

          <div className="flex flex-col pt-10">
            <GeneratePodcastContent
              audio={audio}
              setAudio={setAudio}
              setAudioDuration={setAudioDuration}
              setTranscript={setTranscript}
              voicePrompt={voicePrompt}
              setVoicePrompt={setVoicePrompt}
            />

            <GenerateThumbnail
              thumbnail={thumbnail}
              setThumbnail={setThumbnail}
              imagePrompt={imagePrompt}
              setImagePrompt={setImagePrompt}
            />

            <div className="mt-10 w-full">
              <Button
                type="submit"
                disabled={isCreating}
                className={cn(
                  "text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1 hover:border border-orange-1",
                  isCreating && "cursor-not-allowed",
                )}
              >
                {isCreating ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-2" />
                    Submitting..
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
  )
}

export default CreatePodcast
