"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { projects, Project } from "@/data/projects";
import styles from "./Work.module.css";

// Pre-defined positions for disorder effect - 9 items to cover all projects
const positions = [
  { top: "5%", left: "10%", rotate: -3, width: "35%" },
  { top: "8%", left: "55%", rotate: 2, width: "30%" },
  { top: "35%", left: "3%", rotate: 1, width: "28%" },
  { top: "32%", left: "48%", rotate: -2, width: "38%" },
  { top: "60%", left: "20%", rotate: 3, width: "32%" },
  { top: "58%", left: "60%", rotate: -1, width: "25%" },
  { top: "75%", left: "5%", rotate: 2, width: "30%" },
  { top: "78%", left: "42%", rotate: -3, width: "33%" },
  { top: "85%", left: "68%", rotate: 1, width: "28%" },
];

interface WorkProps {
  onProjectClick: (project: Project) => void;
}

export default function Work({ onProjectClick }: WorkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Staggered entrance animation
  useEffect(() => {
    const items = itemsRef.current.filter(Boolean);
    gsap.fromTo(
      items,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      }
    );
  }, []);

  // Parallax on mouse movement (desktop only)
  useEffect(() => {
    if (window.innerWidth <= 768) return;

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const moveX = (clientX - centerX) / centerX; // -1 to 1
      const moveY = (clientY - centerY) / centerY; // -1 to 1

      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        // Each item moves differently based on index for depth effect
        const depth = (i % 3 + 1) * 5;
        gsap.to(item, {
          x: moveX * depth,
          y: moveY * depth,
          duration: 0.6,
          ease: "power2.out",
        });
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Hover effects (desktop only)
  useEffect(() => {
    if (window.innerWidth <= 768) return;

    const cleanups: (() => void)[] = [];

    itemsRef.current.forEach((item) => {
      if (!item) return;

      const handleEnter = () => {
        gsap.to(item, {
          scale: 1.05,
          zIndex: 10,
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          duration: 0.3,
        });
        itemsRef.current.forEach((other) => {
          if (other && other !== item) {
            gsap.to(other, { opacity: 0.4, duration: 0.3 });
          }
        });
      };

      const handleLeave = () => {
        gsap.to(item, {
          scale: 1,
          zIndex: 1,
          boxShadow: "none",
          duration: 0.3,
        });
        itemsRef.current.forEach((other) => {
          if (other) gsap.to(other, { opacity: 1, duration: 0.3 });
        });
      };

      item.addEventListener("mouseenter", handleEnter);
      item.addEventListener("mouseleave", handleLeave);
      cleanups.push(() => {
        item.removeEventListener("mouseenter", handleEnter);
        item.removeEventListener("mouseleave", handleLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div ref={containerRef} className={styles.work}>
      {projects.map((project, i) => {
        const pos = positions[i % positions.length];
        return (
          <div
            key={project.id}
            ref={(el) => {
              itemsRef.current[i] = el;
            }}
            className={styles.item}
            style={{
              top: pos.top,
              left: pos.left,
              width: pos.width,
              transform: `rotate(${pos.rotate}deg)`,
            }}
            onClick={() => onProjectClick(project)}
          >
            <img
              src={project.thumbnail}
              alt={project.title}
              className={styles.thumbnail}
            />
            <div className={styles.info}>
              <h3 className={styles.title}>{project.title}</h3>
              <span className={styles.tag}>
                {project.tag} · {project.category}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
