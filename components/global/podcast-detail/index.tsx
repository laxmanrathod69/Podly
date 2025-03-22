"use client"

import { usePodcastDetails } from "@/hooks/podcast/podcast-details"
import { PodcastHeader } from "./podcast-header"
import { useCurrentUser } from "@/hooks/auth"
import { useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"

const PodcastDetails = ({ podcastId }: PodcastDetailProps) => {
  const { user } = useCurrentUser()
  const { podcast } = usePodcastDetails(podcastId)
  const router = useRouter()

  const isOwner = useMemo(
    () => user?.id === podcast?.user_id,
    [user?.id, podcast?.user_id],
  )

  useEffect(() => {
    if (!user) {
      router.push("/sign-in")
    }
  }, [user, router])

  if (!podcast?.id) return null // TODO: add error page

  return (
    <section className="flex w-full flex-col gap-5">
      <PodcastHeader podcast={podcast} isOwner={isOwner} />

      <div className="flex flex-col gap-4">
        <h1 className="text-white-1 text-xl font-extrabold max-md:font-bold">
          About
        </h1>
        <p className="text-white-2 text-sm font-normal max-md:text-center">
          {podcast?.description}
        </p>
      </div>

      {/* WIP: implement like and genres */}
      <div className="flex flex-col gap-4">
        <h1 className="text-white-1 text-xl font-extrabold max-md:font-bold">
          Transcription
        </h1>
        <p className="text-white-2 text-sm font-normal max-md:text-center">
          {podcast?.transcript}
        </p>
      </div>
      {/*WIP: implement similar podcasts */}
    </section>
  )
}

export default PodcastDetails
