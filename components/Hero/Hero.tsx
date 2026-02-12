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

  // Handle scroll event
  useEffect(() => {
    if (!visible || hasScrolled) return;

    const handleWheel = () => {
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

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [visible, hasScrolled, onScrollDown]);

  if (!visible) return null;

  return (
    <div ref={heroRef} className={styles.hero}>
      <h1 className={styles.name}>Paloma DELACROIX</h1>
      <p className={styles.subtitle}>Designer & Développeuse créative</p>
      <div className={styles.scrollIndicator}>
        <span>Scroll</span>
        <div className={styles.line}></div>
      </div>
    </div>
  );
}
