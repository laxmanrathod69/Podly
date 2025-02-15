"use client"

import Image from "next/image"
import Link from "next/link"
import { formatTime } from "@/lib/formatTime"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { usePodcastDetails } from "@/hooks/podcast-details"
import { usePodcast } from "@/contexts/podcast-context"
import { useEffect, useState } from "react"
import { usePlayerControls } from "@/hooks/podcast-player/main-controls"

const PodcastPlayer = () => {
  const { currentPodcast } = usePodcast()
  if (!currentPodcast) return null

  const { podcast } = usePodcastDetails(currentPodcast)
  if (!podcast) return null

  const {
    togglePlayPause,
    toggleMute,
    forward,
    rewind,
    handleLoadedMetadata,
    handleAudioEnded,
    audioRef,
    isPlaying,
    duration,
    isMuted,
    currentTime,
    handleSeek,
  } = usePlayerControls(podcast?.audio || undefined)

  return (
    <div
      className={cn("sticky bottom-0 left-0 flex w-full flex-col", {
        hidden: !podcast?.audio,
      })}
    >
      <section className="glassmorphism-black flex gap-6 h-[88px] items-center justify-between px-4 max-md:justify-center max-md:gap-5 md:px-12">
        <audio
          ref={audioRef}
          src={podcast?.audio || undefined}
          onEnded={handleAudioEnded}
          className="hidden"
          onLoadedMetadata={handleLoadedMetadata}
        />

        <div className="flex items-center gap-4 max-md:hidden">
          <Link href={`/podcast/${podcast.id}`}>
            <Image
              src={podcast.thumbnail || "/images/player1.png"} // TODO: add default image
              width={64}
              height={64}
              alt="player1"
              className="aspect-square rounded-xl"
            />
          </Link>
          <div className="flex flex-col">
            <h2 className="text-14 truncate font-semibold text-white-1">
              {podcast.title}
            </h2>
            <p className="text-12 font-normal text-white-2 truncate">
              {`${podcast.author.firstname} ${podcast.author.lastname}`}
            </p>
          </div>
        </div>
        <div className="flex w-[40%] flex-col md:gap-2 gap-2">
          <div className="flex items-center justify-center gap-8">
            <Image
              src={"/icons/skip-previous.svg"}
              width={20}
              height={20}
              alt="rewind"
              onClick={rewind}
              className="cursor-pointer"
            />
            <Image
              src={
                isPlaying
                  ? "/icons/pause-circle-white.svg"
                  : "/icons/play-circle-white.svg"
              }
              width={40}
              height={40}
              alt="play"
              className="cursor-pointer"
              onClick={togglePlayPause}
            />
            <Image
              src={"/icons/skip-next.svg"}
              width={20}
              height={20}
              alt="forward"
              onClick={forward}
              className="cursor-pointer"
            />
          </div>
          <div className="w-full flex items-center gap-2">
            <p className="text-white-2 text-xs">{formatTime(currentTime)}</p>
            <Progress
              value={(currentTime / duration) * 100}
              className="w-full h-1 cursor-pointer"
              max={duration}
              onClick={handleSeek}
            />
            <p className="text-xs text-white-2">{formatTime(duration)}</p>
          </div>
        </div>
        <div className="flex w-[12%] gap-4 items-center">
          <Image
            src={isMuted ? "/icons/volume-cross.svg" : "/icons/volume-loud.svg"}
            width={24}
            height={24}
            alt="mute unmute"
            onClick={toggleMute}
            className="cursor-pointer"
          />
          <Progress
            value={isMuted ? 0 : 100}
            className="w-20 h-1 cursor-pointer transition-all duration-300 ease-in-out"
          />
        </div>
      </section>
    </div>
  )
}

export default PodcastPlayer
