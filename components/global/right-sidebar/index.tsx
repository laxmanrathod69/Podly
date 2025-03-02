"use client"

import Image from "next/image"
import { PodcastersCarousel } from "@/components/carousel/index"
import { useRouter } from "next/navigation"
import { usePopularPodcasters } from "@/hooks/top-podcasters"

const RightSidebar = ({ user }: { user: User }) => {
  const router = useRouter()
  const { popularPodcasters, isLoading } = usePopularPodcasters() // WIP: add skeleton if loading

  return (
    <section className="right_sidebar">
      <div
        className="glassmorphism-black rounded-full w-fit p-2 mb-5 cursor-pointer hover:scale-105"
        onClick={() => router.push(`/user/${user.id}`)}
      >
        <Image
          src={user.image!}
          alt={user.name}
          width={40}
          height={40}
          className="aspect-square rounded-full"
        />
      </div>
      <>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-semibold text-white-1">
            Fans Also Like
          </h3>
          <p className="max-md:hidden text-orange-1 text-sm cursor-pointer">
            See all
          </p>
        </div>

        <PodcastersCarousel />
      </>
      <div className="flex flex-col gap-8 pt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-white-1">
            Top Podcasters
          </h3>
          <p className="text-orange-1 text-sm cursor-pointer">See all</p>
        </div>
        <div className="flex flex-col gap-6">
          {popularPodcasters?.map((user: User) => (
            <div key={user.id} className="flex justify-between">
              <figure className="flex items-center gap-2">
                <Image
                  src={user.image!}
                  alt={user.name}
                  width={44}
                  height={44}
                  className="aspect-square rounded-lg"
                />
                <h2
                  className="text-14 font-semibold text-white-1 hover:underline cursor-pointer"
                  onClick={() => router.push(`/user/${user.id}`)}
                >
                  {user.name}
                </h2>
              </figure>
              <div className="flex items-center">
                <p className="text-12 font-normal text-white-1">
                  {user.podcast?.length} podcasts
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RightSidebar
