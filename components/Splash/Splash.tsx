"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import styles from "./Splash.module.css";

interface SplashProps {
  images: string[];
  onEnter: () => void;
}

export default function Splash({ images, onEnter }: SplashProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-cycling diaporama
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      if (imageRef.current) {
        // Fade out
        gsap.to(imageRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            // Change image
            setCurrentIndex((prev) => (prev + 1) % images.length);
            // Fade in
            if (imageRef.current) {
              gsap.to(imageRef.current, {
                opacity: 1,
                duration: 0.5,
              });
            }
          },
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleEnter = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: onEnter,
      });
    }
  };

  if (images.length === 0) return null;

  return (
    <div ref={containerRef} className={styles.splash}>
      <img
        ref={imageRef}
        src={images[currentIndex]}
        alt="Portfolio"
        className={styles.image}
      />
      <button onClick={handleEnter} className={styles.enter}>
        Entrer
      </button>
    </div>
  );
}
