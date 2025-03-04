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
import { podcastFormSchema, PodcastFormValues } from "@/hooks/podcast/schema"
import { z } from "zod"
import { GeneratePodcastContent } from "@/components/global/create-podcast/generate-podcast-content"
import { useCreatePodcast } from "@/hooks/podcast/create-podcast/intex"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { onAuthenticatedUser } from "@/actions/auth.actions"
import { useErrorToast2 } from "@/hooks/toasts"

const CreatePodcast = () => {
  const [user, setUser] = useState<User | null>(null)
  const [audio, setAudio] = useState<string | null>(null)
  const [thumbnail, setThumbnail] = useState<string | undefined>("")
  const [imagePrompt, setImagePrompt] = useState<string | null>(null)
  const [transcript, setTranscript] = useState<string>("")
  const [audioDuration, setAudioDuration] = useState<string>("")
  const [listeners, setListeners] = useState<number>(2000)

  const { currentVoice, setCurrentVoice, voicePrompt, setVoicePrompt } =
    useSelectVoiceType()

  const { createPodcast, isPending } = useCreatePodcast()

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
      return useErrorToast2("Missing required fields")
    }

    if (!isPending) {
      createPodcast({
        title: data.podcastTitle,
        description: data.podcastDescription,
        voice: currentVoice,
        audio,
        thumbnail: thumbnail || "/images/default-podcast-banner.jpg",
        transcript,
        user_id: user?.id!,
        audioDuration,
        listeners,
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
      const { user } = await onAuthenticatedUser()
      setUser((user as User) ?? null)
    }
    getUserDetails()

    return () => {
      setUser(null)
    }
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
                disabled={isPending}
                className={cn(
                  "text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1 hover:border border-orange-1",
                  isPending && "cursor-not-allowed",
                )}
              >
                {isPending ? (
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
