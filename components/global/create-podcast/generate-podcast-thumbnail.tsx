"use client"

import { useRef, useState } from "react"
import { Button } from "../../ui/button"
import { cn } from "@/lib/utils"
import { Label } from "../../ui/label"
import { Textarea } from "../../ui/textarea"
import { Loader, Loader2 } from "lucide-react"
import { Input } from "../../ui/input"
import Image from "next/image"
import { toast } from "sonner"
import { useGeneratePodcastThumbnail } from "@/hooks/podcast/generate-podcast-thumbnail"
import { ThumbnailGenerateProps } from "@/types/indexx"

const GenerateThumbnail = ({
  thumbnail,
  setThumbnail,
  imagePrompt,
  setImagePrompt,
}: ThumbnailGenerateProps) => {
  const [isAiThumbnail, setIsAiThumbnail] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const imageRef = useRef<HTMLInputElement>(null)

  const { thumbnail_url, isPending, generateThumbnail } =
    useGeneratePodcastThumbnail()

  if (thumbnail_url) setThumbnail(thumbnail_url)

  const handleUploadedImage = async (blob: Blob, fileName: string) => {
    const file = new File([blob], fileName, { type: "image/png" })
    setThumbnail(URL.createObjectURL(file))
    setIsLoading(false)
  }

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const files = e.target.files
      if (!files) {
        setIsLoading(false)
        return toast("Error", { description: "No file selected" })
      }
      const file = files[0]
      const blob = await file.arrayBuffer().then((ab) => new Blob([ab]))

      handleUploadedImage(blob, file.name)
    } catch (error) {
      console.error(`An error occured: ${error}`)
      toast("Error", { description: "Something went wrong" })
    }
  }

  return (
    <>
      <div className="generate_thumbnail">
        <Button
          type="button"
          onClick={() => setIsAiThumbnail(true)}
          className={cn("", { "bg-black-6": isAiThumbnail })}
        >
          Use AI to generate thumbnail
        </Button>
        <Button
          type="button"
          onClick={() => setIsAiThumbnail(false)}
          className={cn("", { "bg-black-6": !isAiThumbnail })}
        >
          Upload custom image
        </Button>
      </div>
      {isAiThumbnail ? (
        <div className="flex flex-col gap-5">
          <div className="mt-5 flex flex-col gap-2.5">
            <Label className="text-16 font-bold text-white-1">
              Enter ttitle, description, topics or keywords to generate
              thumbnail.
            </Label>
            <Textarea
              className="input-class font-light focus-visible:ring-offset-orange-1"
              placeholder="Your answer here..."
              rows={5}
              value={imagePrompt ?? undefined}
              onChange={(e) => setImagePrompt(e.target.value)}
            />
          </div>
          <div className="w-full max-w-[200px]">
            <Button
              type="submit"
              className="text-16 bg-orange-1 py-4 font-bold text-white-1 hover:bg-orange-600 transition-all ease-in-out duration-200"
              disabled={isPending || !imagePrompt || !!thumbnail}
              onClick={(e) => {
                e.preventDefault()
                !isPending && generateThumbnail(imagePrompt!)
              }}
            >
              {isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" />
                  Generating..
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="image_div" onClick={() => imageRef?.current?.click()}>
          <Input
            type="file"
            ref={imageRef}
            className="hidden"
            disabled={isLoading}
            onChange={(e) => uploadImage(e)}
          />
          {!isLoading ? (
            <Image
              src="/icons/upload-image.svg"
              alt="upload"
              width={40}
              height={40}
            />
          ) : (
            <div className="text-16 flex-center font-medium text-white-1">
              <Loader size={20} className="animate-spin mr-2" />
              Uploading..
            </div>
          )}
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-12 font-bold text-orange-1">Click to upload</h2>
            <p className="text-12 font-normal text-gray-1">
              SVG, PNG, JPG, or GIF (max. 1080x1080px)
            </p>
          </div>
        </div>
      )}
      {thumbnail && (
        <div className="flex-center w-full">
          <Image
            src={thumbnail}
            alt="thumbnail"
            width={200}
            height={200}
            className="mt-5"
          />
        </div>
      )}
    </>
  )
}

export default GenerateThumbnail
