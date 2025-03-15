"use client"

import { Label } from "../../ui/label"
import { Textarea } from "../../ui/textarea"
import { Button } from "../../ui/button"
import { GeneratePodcastContentProps } from "@/types/indexx"
import { useGenerateContent } from "@/hooks/podcast/generate-podcast-content"
import { useEffect } from "react"
import { formatTime } from "@/lib/formatTime"
import { Loader } from "../loader"

export const GeneratePodcastContent = (props: GeneratePodcastContentProps) => {
  const { generateContent, isPending, data } = useGenerateContent()

  useEffect(() => {
    if (data) {
      props.setAudioUrl(data?.audioUrl as string)
      props.setTranscript(data.script as string)
    }
  }, [data, props.setTranscript, props.setAudioUrl])

  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-start gap-1">
          <Label className="text-16 font-bold text-white-1">
            AI Prompt to generate Podcast
          </Label>
          <p className="text-red-500 text-sm">*</p>
        </div>
        <Textarea
          className="input-class focus-visible:ring-offset-orange-1"
          placeholder="Enter title, topics, or keywords"
          rows={4}
          value={props.voicePrompt}
          onChange={(e) => props.setVoicePrompt(e.target.value)}
        />
      </div>
      <div className="mt-5 w-full max-w-[200px]">
        <Button
          type="button"
          disabled={isPending || !props.voicePrompt}
          className="text-16 bg-orange-1 py-4 font-bold text-white-1 hover:bg-orange-600 transition-all ease-in-out duration-200"
          onClick={(e) => {
            e.preventDefault()
            if (!isPending) {
              generateContent(props.voicePrompt)
            }
          }}
        >
          <Loader isLoading={isPending} variant="spin">
            Generate
          </Loader>
        </Button>
      </div>
      {data?.audioUrl && (
        <audio
          src={data?.audioUrl}
          controls
          className="mt-5"
          onLoadedMetadata={(e) =>
            props.setDuration(formatTime(e.currentTarget.duration))
          }
        />
      )}
    </div>
  )
}
