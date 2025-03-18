"use client"

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
        <FormItem className="flex flex-col gap-1">
          <div className="flex items-center justify-start gap-1">
            <FormLabel className="text-16 font-bold text-white-1">
              Podcast Description
            </FormLabel>
            <p className="text-red-500 text-sm">*</p>
          </div>
          <FormControl>
            <Textarea
              className="input-class focus-visible:ring-offset-orange-1"
              placeholder="Write a short podcast description"
              rows={4}
              {...field}
            />
          </FormControl>
          <FormMessage className="text-red-600 text-xs" />
        </FormItem>
      )}
    />
  )
}
