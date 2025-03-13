"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "../../ui/button"
import { Label } from "../../ui/label"
import { Textarea } from "../../ui/textarea"
import { Loader, Loader2 } from "lucide-react"
import { Input } from "../../ui/input"
import Image from "next/image"
import { ThumbnailGenerateProps } from "@/types/indexx"
import { useGenerateThumbnail } from "@/hooks/podcast/generate-podcast-thumbnail"
import { Toast } from "../toast"

const GenerateThumbnail = ({
  imageUrl,
  setImageUrl,
  imagePrompt,
  setImagePrompt,
}: ThumbnailGenerateProps) => {
  const [isAiThumbnail, setIsAiThumbnail] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const imageRef = useRef<HTMLInputElement>(null)
  const { image_url, isPending, generateThumbnail } = useGenerateThumbnail()

  useEffect(() => {
    if (image_url) {
      setImageUrl(image_url)
    }
  }, [image_url])

  const handleUploadedImage = (blob: Blob, fileName: string) => {
    const file = new File([blob], fileName, { type: "image/png" })
    setImageUrl(URL.createObjectURL(file))
    setIsLoading(false)
  }

  // WIP: Issues with AI imageUrl generation
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const files = e.target.files
      if (!files) {
        setIsLoading(false)
        return <Toast type="error" message="No file selected" />
      }
      const file = files[0]
      const blob = await file.arrayBuffer().then((ab) => new Blob([ab]))

      handleUploadedImage(blob, file.name)
    } catch (error) {
      console.error(`An error occured: ${error}`)
      return <Toast type="error" message="Something went wrong" />
    }
  }

  return (
    <>
      <div className="generate_image">
        <Button
          type="button"
          onClick={() => setIsAiThumbnail(true)}
          className={`bg-transparent hover:bg-black-5/30 ${isAiThumbnail && "bg-black-6"}`}
        >
          Use AI to generate imageUrl
        </Button>
        <Button
          type="button"
          onClick={() => setIsAiThumbnail(false)}
          className={`bg-transparent hover:bg-black-5/30 ${!isAiThumbnail && "bg-black-6"}`}
        >
          Upload custom image
        </Button>
      </div>
      {isAiThumbnail ? (
        <div className="flex flex-col gap-5">
          <div className="mt-5 flex flex-col gap-2.5">
            <Label className="text-16 font-bold text-white-1">
              Enter ttitle, description, topics or keywords to generate
              imageUrl.
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
              disabled={isPending || !imagePrompt}
              onClick={(e) => {
                e.preventDefault()
                if (!isPending) {
                  generateThumbnail(imagePrompt!)
                }
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
            ref={imageRef}
            type="file"
            className="hidden"
            disabled={isLoading}
            onChange={uploadImage}
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
      {imageUrl && (
        <div className="flex-center w-full">
          <Image
            src={imageUrl}
            alt="imageUrl"
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
