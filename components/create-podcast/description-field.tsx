import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useFormValidation } from "@/hooks/create-podcast/form-validation";

export const DescriptionField = () => {
  const { form } = useFormValidation();

  return (
    <FormField
      control={form.control}
      name="podcastDescription"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2.5">
          <FormLabel className="text-16 font-bold text-white-1">
            Podcast Discription
          </FormLabel>
          <FormControl>
            <Textarea
              className="input-class focus-visible:ring-offset-orange-1"
              placeholder="Write a short podcast discription"
              {...field}
            />
          </FormControl>
          <FormMessage className="text-white-1" />
        </FormItem>
      )}
    />
  );
};
