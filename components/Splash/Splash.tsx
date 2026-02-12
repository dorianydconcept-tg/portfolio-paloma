"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import styles from "./Splash.module.css";

interface SplashProps {
  images: string[];
  onEnter: () => void;
}

const CYCLE_SPEED = 350; // ms entre chaque image — coupe rapide style Paul Calver

export default function Splash({ images, onEnter }: SplashProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Rapid-fire cycling — hard cuts, ordre aléatoire
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        let next;
        do {
          next = Math.floor(Math.random() * images.length);
        } while (next === prev);
        return next;
      });
    }, CYCLE_SPEED);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleEnter = useCallback(() => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: onEnter,
      });
    }
  }, [onEnter]);

  if (images.length === 0) return null;

  return (
    <div ref={containerRef} className={styles.splash} onClick={handleEnter}>
      <img
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
