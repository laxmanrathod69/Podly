"use client"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { SelectAiVoice } from "@/components/global/podcast/select-ai-voice-field"
import { TitleField } from "@/components/global/podcast/title-field"
import { DescriptionField } from "@/components/global/podcast/description-field"
import { podcastFormSchema, PodcastFormValues } from "@/hooks/podcast/schema"
import { z } from "zod"
import { GeneratePodcastContent } from "@/components/global/podcast/generate-content"
import { useCreatePodcast } from "@/hooks/podcast/create/intex"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCurrentUser } from "@/hooks/auth"
import GenerateThumbnail from "@/components/global/podcast/generate-thumbnail"
import { Toast } from "@/components/global/toast"

const CreatePodcast = () => {
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined)
  const [duration, setDuration] = useState<string>("")
  const [imageUrl, setImageUrl] = useState<string | undefined>("")
  const [imagePrompt, setImagePrompt] = useState<string | null>(null)
  const [transcript, setTranscript] = useState<string>("")
  const [listeners, setListeners] = useState<number>(2000)
  const [currentVoice, setCurrentVoice] = useState<string>("")
  const [voicePrompt, setVoicePrompt] = useState<string>("")

  const { user, isLoading } = useCurrentUser()
  const { createPodcast, isPending } = useCreatePodcast()

  const form = useForm<PodcastFormValues>({
    resolver: zodResolver(podcastFormSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: "",
    },
  })

  if (!user?.id) return null

  const onSubmit = (data: z.infer<typeof podcastFormSchema>) => {
    if (
      !data.podcastTitle ||
      !data.podcastDescription ||
      !audioUrl ||
      !currentVoice
    ) {
      return <Toast type="error" message="Please fill all the fields" />
    }

    if (!isPending) {
      createPodcast({
        title: data.podcastTitle,
        description: data.podcastDescription,
        voice: currentVoice,
        audio: audioUrl,
        imageUrl: imageUrl || "/images/default-podcast-banner.jpg",
        transcript,
        user_id: user.id,
        duration,
        listeners,
      })

      form.reset()
      setAudioUrl("")
      setDuration("")
      setImageUrl("")
      setImagePrompt("")
      setTranscript("")
      setCurrentVoice("")
      setVoicePrompt("")
    }
  }

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
              setAudioUrl={setAudioUrl}
              setDuration={setDuration}
              setTranscript={setTranscript}
              voicePrompt={voicePrompt}
              setVoicePrompt={setVoicePrompt}
            />

            <GenerateThumbnail
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
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
                Submit & Publish Podcast
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  )
}

export default CreatePodcast
