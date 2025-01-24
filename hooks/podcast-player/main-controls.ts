"use client";

import { useEffect, useRef, useState } from "react";
import { useAudio } from "@/providers/AudioProvider";

export const usePlayerControls = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const { audio } = useAudio();

  const togglePlayPause = () => {
    if (audioRef.current?.paused) {
      audioRef.current?.play();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted((prev) => !prev);
    }
  };

  const forward = () => {
    if (
      audioRef.current &&
      audioRef.current.currentTime &&
      audioRef.current.duration &&
      audioRef.current.currentTime + 5 < audioRef.current.duration
    ) {
      audioRef.current.currentTime += 5;
    }
  };

  const rewind = () => {
    if (audioRef.current && audioRef.current.currentTime - 5 > 0) {
      audioRef.current.currentTime -= 5;
    } else if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    const updateCurrentTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener("timeupdate", updateCurrentTime);

      return () => {
        audioElement.removeEventListener("timeupdate", updateCurrentTime);
      };
    }
  }, [audioRef, setCurrentTime]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audio?.audioUrl) {
      if (audioElement) {
        audioElement.play().then(() => {
          setIsPlaying(true);
        });
      }
    } else {
      audioElement?.pause();
      setIsPlaying(true);
    }
  }, [audio, audioRef, setIsPlaying]);

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded: () => void = () => {
    setIsPlaying(false);
  };

  const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = event.currentTarget;
    const clickPosition =
      event.clientX - progressBar.getBoundingClientRect().left;
    const percentageClicked = (clickPosition / progressBar.offsetWidth) * 100;
    const seekTime = (duration * percentageClicked) / 100;

    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  return {
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
  };
};
