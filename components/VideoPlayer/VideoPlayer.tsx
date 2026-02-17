"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./VideoPlayer.module.css";

interface VideoPlayerProps {
  src: string;
  className?: string;
}

export default function VideoPlayer({ src, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPlay, setShowPlay] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = video.play();
    if (tryPlay !== undefined) {
      tryPlay.catch(() => {
        setShowPlay(true);
      });
    }
  }, []);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play();
    setShowPlay(false);
  };

  return (
    <div className={styles.wrapper}>
      <video
        ref={videoRef}
        className={className}
        src={src}
        loop
        muted
        playsInline
      />
      {showPlay && (
        <button className={styles.playButton} onClick={handlePlay} aria-label="Lancer la vidéo">
          <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}
    </div>
  );
}
