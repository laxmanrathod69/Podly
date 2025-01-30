import { Dispatch, SetStateAction } from "react"
import { useVoiceCategories } from "@/hooks/ai-voices/use-voice-categories"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select"
import { Label } from "../../ui/label"

interface SelectAiVoiceProps {
  setCurrentVoice: Dispatch<SetStateAction<string>>
  currentVoice: string
}

export const SelectAiVoice = ({
  currentVoice,
  setCurrentVoice,
}: SelectAiVoiceProps) => {
  return (
    <div className="flex flex-col gap-2.5">
      <Label className="text-16 font-bold text-white-1">Select AI Voice</Label>

      <Select onValueChange={(value) => setCurrentVoice(value)}>
        <SelectTrigger className="text-16 w-full border-none bg-black-1 focus-visible:ring-offset-orange-1 text-gray-1">
          <SelectValue
            className="placeholder:text-gray-1"
            placeholder="Select AI Voice"
          />
        </SelectTrigger>
        <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1">
          {useVoiceCategories.map(({ name, voiceId }) => (
            <SelectItem
              key={voiceId}
              value={name}
              className="capitalize focus:bg-orange-1"
            >
              {name}
            </SelectItem>
          ))}
        </SelectContent>
        {currentVoice && (
          <audio
            src={`/voices/${currentVoice}.mp3`}
            autoPlay
            className="hidden"
          />
        )}
      </Select>
    </div>
  )
}
