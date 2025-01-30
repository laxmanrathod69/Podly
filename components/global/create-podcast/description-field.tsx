import { UseFormReturn } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form"
import { Textarea } from "../../ui/textarea"
import { PodcastFormValues } from "@/hooks/podcast/schema"

interface DescFieldProps {
  form: UseFormReturn<PodcastFormValues>
}

export const DescriptionField = ({ form }: DescFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="podcastDescription"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2.5">
          <FormLabel className="text-16 font-bold text-white-1">
            Podcast Description
          </FormLabel>
          <FormControl>
            <Textarea
              className="input-class focus-visible:ring-offset-orange-1"
              placeholder="Write a short podcast description"
              {...field}
            />
          </FormControl>
          <FormMessage className="text-red-600" />
        </FormItem>
      )}
    />
  )
}
