import { GeneratePodcastContentProps } from "@/types"
import { Label } from "../../ui/label"
import { Textarea } from "../../ui/textarea"
import { Button } from "../../ui/button"
import { Loader2 } from "lucide-react"
import { useGeneratePodcastContent } from "@/hooks/podcast/generate-podcast-content"

export const GeneratePodcastContent = (props: GeneratePodcastContentProps) => {
  const { generatePodcastContent, isGenerating, podcastContent } =
    useGeneratePodcastContent()

  if (podcastContent) {
    props.setAudio(podcastContent?.audio || "")
    props.setTranscript(podcastContent?.script || "")
  }

  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <Label className="text-16 font-bold text-white-1">
          AI Prompt to genereate Podcast
        </Label>
        <Textarea
          className="input-class focus-visible:ring-offset-orange-1"
          placeholder="Enter a Title or Topics to generate a podcast"
          rows={8}
          value={props.voicePrompt}
          onChange={(e) => props.setVoicePrompt(e.target.value)}
        />
      </div>
      <div className="mt-5 w-full max-w-[200px]">
        <Button
          type="button"
          disabled={isGenerating}
          className="text-16 bg-orange-1 py-4 font-bold text-white-1 hover:bg-orange-600 transition-all ease-in-out duration-200"
          onClick={(e) => {
            e.preventDefault()
            !isGenerating && generatePodcastContent(props.voicePrompt)
          }}
        >
          {isGenerating ? (
            <>
              <Loader2 size={16} className="animate-spin mr-2" />
              Generating..
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </div>
      {props.audio && (
        <audio
          src={props.audio}
          controls
          className="mt-5"
          onLoadedMetadata={(e) =>
            props.setAudioDuration(e.currentTarget.duration)
          }
        />
      )}
    </div>
  )
}
