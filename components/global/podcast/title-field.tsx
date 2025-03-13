"use client"

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
        <FormItem className="flex flex-col gap-[.20rem]">
          <div className="flex items-center justify-start gap-1">
            <FormLabel className="text-16 font-bold text-white-1">
              Title
            </FormLabel>
            <p className="text-red-500 text-sm">*</p>
          </div>
          <FormControl>
            <Input
              className="input-class focus-visible:ring-offset-orange-1"
              placeholder="The AI War"
              {...field}
            />
          </FormControl>
          <FormMessage className="text-red-600 text-xs" />
        </FormItem>
      )}
    />
  )
}
