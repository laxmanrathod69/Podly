"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import GeneratePodcast from "@/components/GeneratePodcast";
import GenerateThumbnail from "@/components/GenerateThumbnail";
import { Loader } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useVoiceCategories, useVoiceType } from "@/hooks/use-voice-categories";

const formSchema = z.object({
  podcastTitle: z.string().min(2),
  podcastDescription: z.string().min(2),
});

const CreatePodcast = () => {
  const router = useRouter();
  const [voiceTypeName, setVoiceTypeName] = useState<string | null>(null);
  const [voiceType, setVoiceType] = useState<string | null>(null);
  const [voicePrompt, setVoicePropmpt] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [imageUrl, setImageUrl] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createPodcast = useMutation(api.podcasts.createPodcast);
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      if (!audioUrl || !imageUrl || !voiceType || !voiceTypeName) {
        toast({
          title: "Please fill out all required fields",
        });
        setIsSubmitting(false);
        throw new Error("Missing required fields");
      }
      const podcast = await createPodcast({
        podcastTitle: data.podcastTitle,
        podcastDescription: data.podcastDescription,
        audioUrl,
        audioStorageId: audioStorageId!,
        audioDuration,
        voiceType,
        voicePrompt,
        imageUrl,
        imageStorageId: imageStorageId!,
        imagePrompt,
        views: 0,
      });
      console.log(podcast);
      toast({
        title: "Podcast created!",
        description: "Your podcast has been created and is ready to generate.",
      });
      setIsSubmitting(false);
      router.push("/");
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error submitting form",
        description: error.message,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setVoiceType(useVoiceType(voiceTypeName));
  }, [voiceTypeName]);

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-20 font-bold text-white-1">Create Podcast</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12 flex flex-col w-full"
        >
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
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
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2.5">
              <Label className="text-16 font-bold text-white-1">
                Select AI Voice
              </Label>
              <Select onValueChange={(value) => setVoiceTypeName(value)}>
                <SelectTrigger
                  className={cn(
                    "text-16 w-full border-none bg-black-1 focus-visible:ring-offset-orange-1 text-gray-1"
                  )}
                >
                  <SelectValue
                    className="placeholder:text-gray-1"
                    placeholder="Select AI Voice"
                  />
                </SelectTrigger>
                <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1">
                  {useVoiceCategories.map(({ name, id }) => (
                    <SelectItem
                      key={id}
                      value={name}
                      className="capitalize focus:bg-orange-1"
                    >
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
                {voiceTypeName && (
                  <audio
                    src={`/${voiceTypeName === "Axel" ? `${voiceTypeName}.mp3` : `${voiceTypeName}.wav`}`}
                    autoPlay
                    className="hidden"
                  />
                )}
              </Select>
            </div>
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
          </div>
          <div className="flex flex-col pt-10">
            <GeneratePodcast
              audio={audioUrl}
              setAudio={setAudioUrl}
              setAudioStorageId={setAudioStorageId}
              setAudioDuration={setAudioDuration}
              voiceType={voiceType!}
              voicePrompt={voicePrompt}
              setVoicePrompt={setVoicePropmpt}
            />

            <GenerateThumbnail
              image={imageUrl}
              setImage={setImageUrl}
              imagePrompt={imagePrompt}
              setImagePrompt={setImagePrompt}
              setImageStorageId={setImageStorageId}
            />

            <div className="mt-10 w-full">
              <Button
                type="submit"
                className="text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1"
              >
                {isSubmitting ? (
                  <>
                    Submitting
                    <Loader size={20} className="animate-spin ml-2" />
                  </>
                ) : (
                  "Submit & Publish Podcast"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreatePodcast;
