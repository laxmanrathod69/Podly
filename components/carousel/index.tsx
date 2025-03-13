"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { useTopPodcasters } from "@/hooks/user/top-podcasters"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { Button } from "../ui/button"

// WIP: add skeleton if carousel is loading
export const PodcastersCarousel = () => {
  const [carouselAPI, setCarouselAPI] = useState<CarouselApi | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const { topPodcasters, isLoading } = useTopPodcasters()

  if (!topPodcasters?.length) return null
  const router = useRouter()

  const onSelect = useCallback(() => {
    if (!carouselAPI) return

    setSelectedIndex(carouselAPI.selectedScrollSnap())
  }, [carouselAPI])

  const scrollTo = (index: number) => {
    if (!carouselAPI) return

    carouselAPI.scrollTo(index)
  }

  useEffect(() => {
    if (!carouselAPI) return

    onSelect()

    setScrollSnaps(carouselAPI.scrollSnapList())

    carouselAPI.on("select", onSelect)
  }, [carouselAPI, onSelect])

  return (
    <section className="flex w-full flex-col gap-4 transition-all hover:brightness-125 duration-200 ease-in">
      <Carousel
        setApi={setCarouselAPI}
        className="w-full rounded-xl overflow-hidden shadow-xl"
      >
        <CarouselContent>
          {topPodcasters.map((user: User) => (
            <CarouselItem
              key={user.id}
              className="carousel_box"
              onClick={() => router.push(`/user/${user.id}`)}
            >
              <Image
                src={user.image || "/icons/profile.svg"}
                alt={user.name}
                width={251}
                height={251}
                className="absolute size-full rounded-xl border-none object-cover"
              />
              <div className="glassmorphism-black relative z-10 flex flex-col rounded-b-xl p-4">
                <h2 className="text-14 font-semibold text-white-1 truncate">
                  {user?.podcast?.[0]?.title ?? ""}
                </h2>
                <p className="text-12 font-normal text-white-2">{user.name}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center mt-4 space-x-2">
        {scrollSnaps.map((_, index) => (
          <Button
            variant="outline"
            key={index}
            onClick={() => scrollTo(index)}
            size="icon"
            className={`w-2 h-2 rounded-full ${
              selectedIndex === index ? "bg-gray-300" : "bg-primary"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
