"use client"

import Image from "next/image"
import Link from "next/link"
import { formatTime } from "@/lib/formatTime"
import { cn } from "@/lib/utils"
import { useAudio } from "@/providers/AudioProvider"
import { Progress } from "@/components/ui/progress"
import { usePlayerControls } from "@/hooks/podcast-player/main-controls"

const PodcastPlayer = () => {
  const { audio } = useAudio()

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
  } = usePlayerControls()

  return (
    <div
      className={cn("sticky bottom-0 left-0 flex size-full flex-col", {
        hidden: !audio?.audioUrl || audio?.audioUrl === "",
      })}
    >
      <section className="glassmorphism-black flex gap-4 h-[85px] items-center justify-between px-4 max-md:justify-center max-md:gap-5 md:px-12">
        <audio
          ref={audioRef}
          src={audio?.audioUrl}
          onEnded={handleAudioEnded}
          className="hidden"
          onLoadedMetadata={handleLoadedMetadata}
        />

        <div className="flex w-[60%] items-center gap-4 max-md:hidden">
          <Link href={`/podcasts/${audio?.podcastId}`}>
            <Image
              src={audio?.imageUrl! || "/images/player1.png"}
              width={64}
              height={64}
              alt="player1"
              className="aspect-square rounded-xl"
            />
          </Link>
          <div className="flex w-[160px] flex-col">
            <h2 className="text-14 truncate font-semibold text-white-1">
              {audio?.title}
            </h2>
            <p className="text-12 font-normal text-white-2">{audio?.author}</p>
          </div>
        </div>
        <div className="flex w-full mr-52 flex-col md:gap-2 gap-2 mt-2">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-1.5 cursor-pointer">
              <Image
                src={"/icons/reverse.svg"}
                width={24}
                height={24}
                alt="rewind"
                onClick={rewind}
              />
              <h2 className="text-12 font-bold text-white-4">-5</h2>
            </div>
            <Image
              src={isPlaying ? "/icons/Pause.svg" : "/icons/Play-gray.svg"}
              width={30}
              height={30}
              alt="play"
              className="cursor-pointer"
              onClick={togglePlayPause}
            />
            <div className="flex items-center gap-1.5 cursor-pointer">
              <h2 className="text-12 font-bold text-white-4">+5</h2>
              <Image
                src={"/icons/forward.svg"}
                width={24}
                height={24}
                alt="forward"
                onClick={forward}
              />
            </div>
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
        <div className="w-1/5">
          <Image
            src={isMuted ? "/icons/unmute.svg" : "/icons/mute.svg"}
            width={24}
            height={24}
            alt="mute unmute"
            onClick={toggleMute}
            className="cursor-pointer"
          />
        </div>
      </section>
    </div>
  )
}

export default PodcastPlayer
