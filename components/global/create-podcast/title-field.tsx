import { UseFormReturn } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form"
import { Input } from "../../ui/input"
import { PodcastFormValues } from "@/hooks/podcast/schema"

interface TitleFieldProps {
  form: UseFormReturn<PodcastFormValues>
}

export const TitleField = ({ form }: TitleFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="podcastTitle"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2.5">
          <FormLabel className="text-16 font-bold text-white-1">
            Title
          </FormLabel>
          <FormControl>
            <Input
              className="input-class focus-visible:ring-offset-orange-1"
              placeholder="The AI War"
              {...field}
            />
          </FormControl>
          <FormMessage className="text-red-600" />
        </FormItem>
      )}
    />
  )
}
