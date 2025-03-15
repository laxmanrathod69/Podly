"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { usePodcast } from "@/context/provider"
import { formatTime } from "@/lib/formatTime"
import PauseIcon from "@/public/icons/pause-icon"
import { PlayIcon } from "@/public/icons/play-icon"
import PlayNext from "@/public/icons/play-next"
import { PlayPrev } from "@/public/icons/play-prev"
import { VolumeCross } from "@/public/icons/volume-cross"
import { VolumeLoud } from "@/public/icons/volume-loud"
import Link from "next/link"

export const Player = () => {
  const {
    currentPodcast,
    isPlaying,
    progress,
    volume,
    duration,
    currentTime,
    togglePlayPause,
    seekTo,
    skipForward,
    skipBackward,
    setVolume,
    toggleMute,
    audioRef,
  } = usePodcast()

  if (!currentPodcast) return null

  return (
    <Card className="fixed h-20 bottom-0 left-0 right-0 p-4 glassmorphism-black border-t rounded-t-3xl rounded-b-none border-none z-50">
      <div className="flex items-center justify-between gap-4">
        <audio
          src={currentPodcast.audio || undefined}
          ref={audioRef}
          className="hidden"
        />
        <div className="flex items-center space-x-3 flex-shrink-0 w-64">
          <Link href={`/podcast/${currentPodcast.id}`}>
            <img
              src={currentPodcast.imageUrl}
              alt={currentPodcast.title}
              className="h-14 w-14 rounded-md object-cover shadow-2xl"
            />
          </Link>
          <div className="truncate flex flex-col gap-0 justify-end">
            <p className="font-medium text-sm text-white-1 truncate">
              {currentPodcast.title}
            </p>
            <Link
              href={`/user/${currentPodcast.user_id} `}
              className="text-xs text-muted-foreground truncate hover:underline"
            >
              {currentPodcast.user?.name}
            </Link>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-grow max-w-xl justify-center items-center gap-3">
          <p className="text-xs text-muted-foreground">
            {formatTime(currentTime)}
          </p>
          <Slider
            value={[progress * 100]}
            onValueChange={(value) => seekTo(value[0] / 100)}
            min={0}
            max={100}
            className="flex-grow cursor-pointer"
          />
          <p className="text-xs text-muted-foreground">
            {formatTime(duration || 0)}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => skipBackward(10)}
            className="rounded-full p-5 text-white-1/80 transition-all duration-75 ease-in hover:scale-105"
          >
            <PlayPrev />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlayPause}
            className="rounded-full p-5 text-white-1/80 transition-all duration-75 ease-in hover:scale-105"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => skipForward(10)}
            className="rounded-full p-5 text-white-1/80 transition-all duration-75 ease-in hover:scale-105"
          >
            <PlayNext />
          </Button>
        </div>

        {/* Volume controls */}
        <div className="flex items-center gap-2 mr-4">
          <Button
            type="button"
            onClick={toggleMute}
            className="bg-transparent hover:bg-transparent shadow-none p-0"
          >
            {volume === 0 ? <VolumeCross /> : <VolumeLoud />}
          </Button>
          <Slider
            value={[volume * 100]}
            onValueChange={([newVolume]) => setVolume(newVolume / 100)}
            max={100}
            step={1}
            className="w-24 cursor-pointer"
          />
        </div>
      </div>
    </Card>
  )
}
