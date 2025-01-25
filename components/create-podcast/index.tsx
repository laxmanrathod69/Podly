import { useVoiceCategories } from "@/hooks/use-voice-categories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { useSelectVoiceType } from "@/hooks/create-podcast";

export const SelectAiVoice = () => {
  const { currentVoice, setCurrentVoice } = useSelectVoiceType();

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
            src={`/voices/${useVoiceCategories.find(({ name }) => name === currentVoice)}.mp3`}
            autoPlay
            className="hidden"
          /> // FIX: Audio is not playing
        )}
      </Select>
    </div>
  );
};
