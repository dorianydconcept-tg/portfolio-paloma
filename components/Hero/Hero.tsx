"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import styles from "./Hero.module.css";

interface HeroProps {
  visible: boolean;
  onScrollDown: () => void;
}

export default function Hero({ visible, onScrollDown }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Entrance animation
  useEffect(() => {
    if (visible && heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
        }
      );
    }
  }, [visible]);

  // Handle scroll event (wheel + touch)
  useEffect(() => {
    if (!visible || hasScrolled) return;

    const triggerScroll = () => {
      if (heroRef.current && !hasScrolled) {
        setHasScrolled(true);
        gsap.to(heroRef.current, {
          opacity: 0,
          y: -100,
          duration: 0.6,
          onComplete: onScrollDown,
        });
      }
    };

    // Desktop: wheel event
    const handleWheel = () => triggerScroll();

    // Mobile: touch swipe up
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (deltaY > 30) triggerScroll();
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [visible, hasScrolled, onScrollDown]);

  if (!visible) return null;

  return (
    <div ref={heroRef} className={styles.hero}>
      <h1 className={styles.name}>
        <span className={styles.firstName}>Paloma</span>
        <span className={styles.lastName}>DELACROIX</span>
      </h1>
      <p className={styles.subtitle}>Designer d&apos;espaces</p>
      <div className={styles.scrollIndicator}>
        <span>Scroll</span>
        <div className={styles.line}></div>
      </div>
    </div>
  );
}
