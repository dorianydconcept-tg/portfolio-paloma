"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "@/data/projects";
import styles from "./ProjectGallery.module.css";

gsap.registerPlugin(ScrollTrigger);

interface ProjectGalleryProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectGallery({ project, onClose }: ProjectGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });

    // Horizontal scroll
    const track = trackRef.current;
    if (!track) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: () => `+=${totalScroll}`,
      pin: true,
      scrub: 1,
      animation: gsap.to(track, { x: -totalScroll, ease: "none" }),
    });

    return () => { st.kill(); };
  }, []);

  return (
    <div ref={containerRef} className={styles.gallery}>
      <button className={styles.close} onClick={onClose}>
        Retour
      </button>
      <div ref={trackRef} className={styles.track}>
        {/* Title slide */}
        <div className={styles.slide}>
          <div className={styles.titleSlide}>
            <h2 className={styles.projectTitle}>{project.title}</h2>
            <span className={styles.projectMeta}>
              {project.tag} · {project.category} · {project.year}
            </span>
          </div>
        </div>

        {/* Image slides */}
        {project.images.map((img, i) => (
          <div key={i} className={styles.slide}>
            <img src={img} alt={`${project.title} ${i + 1}`} className={styles.slideImage} />
          </div>
        ))}

        {/* Description slide */}
        <div className={styles.slide}>
          <div className={styles.descSlide}>
            <p className={styles.description}>{project.description}</p>
            <p className={styles.role}><strong>Rôle :</strong> {project.role}</p>
            {project.tools.length > 0 && (
              <p className={styles.tools}><strong>Outils :</strong> {project.tools.join(", ")}</p>
            )}
            {project.behanceUrl && (
              <a href={project.behanceUrl} target="_blank" rel="noopener noreferrer" className={styles.behanceLink}>
                Voir sur Behance
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
