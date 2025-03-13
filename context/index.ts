"use client"

import { useEffect, useRef, useState } from "react"

export const globalContext = (): AudioPlayerContextType => {
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [prevVolume, setPrevVolume] = useState(0.8)
  const [isMuted, setIsMuted] = useState(false)
  const [audioDuration, setAudioDuration] = useState(0)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!currentPodcast) return

    if (!audioRef.current) {
      audioRef.current = new Audio()
    }

    const audio = audioRef.current
    audio.src = currentPodcast.audio || ""
    audio.load()

    const updateProgress = () => {
      if (!audio) return
      setCurrentTime(audio.currentTime)
      setProgress(audio.duration ? audio.currentTime / audio.duration : 0)
    }

    const handleAudioError = (e: Event) => {
      console.error("Audio Error:", e)
    }

    const handlePlayError = (err: any) => {
      console.error("Play Error:", err)
      setIsPlaying(false)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setProgress(0)
    }

    const handleCanPlay = () => {
      if (isPlaying) audio.play().catch(handlePlayError)
    }

    const handleLoadedMetadata = () => {
      setAudioDuration(audio.duration || 0)
    }

    audio.addEventListener("timeupdate", updateProgress)
    audio.addEventListener("error", handleAudioError)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)

    return () => {
      audio.pause()
      audio.removeEventListener("timeupdate", updateProgress)
      audio.removeEventListener("error", handleAudioError)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
    }
  }, [currentPodcast])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const playPodcast = async (podcast: Podcast) => {
    if (currentPodcast?.audio !== podcast.audio) {
      setProgress(0)
      setAudioDuration(0)
      audioRef.current?.pause()
    }

    setCurrentPodcast(podcast)
    setIsPlaying(true)
  }

  const togglePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((err) => {
          console.error("Failed to play audio:", err)
          setIsPlaying(false)
        })
    }
  }

  const seekTo = (time: number) => {
    if (audioRef.current) {
      const newTime = time * audioDuration
      audioRef.current.currentTime = newTime
      if (!isPlaying) setIsPlaying(true)
      setProgress(time)
    }
  }

  const skipForward = (seconds = 10) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioDuration,
        audioRef.current.currentTime + seconds,
      )
    }
  }

  const skipBackward = (seconds = 10) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        0,
        audioRef.current.currentTime - seconds,
      )
    }
  }

  const setPlayerVolume = (newVolume: number) => {
    if (!isMuted) {
      setVolume(newVolume)
    }
  }

  const toggleMute = () => {
    if (!audioRef.current) return

    if (isMuted) {
      setVolume(prevVolume)
      audioRef.current.volume = prevVolume
    } else {
      setPrevVolume(volume)
      setVolume(0)
      audioRef.current.volume = 0
    }
    setIsMuted(!isMuted)
  }

  return {
    currentPodcast,
    isPlaying,
    progress,
    volume,
    currentTime,
    duration: audioDuration,
    playPodcast,
    togglePlayPause,
    seekTo,
    skipForward,
    skipBackward,
    setVolume: setPlayerVolume,
    toggleMute,
    audioRef,
  }
}
