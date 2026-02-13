"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import gsap from "gsap";
import Splash from "@/components/Splash/Splash";
import Hero from "@/components/Hero/Hero";
import TabBar, { TabName } from "@/components/TabBar/TabBar";
import Home from "@/components/Home/Home";
import Work from "@/components/Work/Work";
import About from "@/components/About/About";
import Contact from "@/components/Contact/Contact";
import ProjectGallery from "@/components/ProjectGallery/ProjectGallery";
import Particles from "@/components/Particles/Particles";
import ClickSpark from "@/components/ClickSpark/ClickSpark";
import { projects, Project } from "@/data/projects";

type Phase = "splash" | "hero" | "portfolio";

export default function Page() {
  const [phase, setPhase] = useState<Phase>("splash");
  const [activeTab, setActiveTab] = useState<TabName>("HOME");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Collect all project images for the splash diaporama
  const splashImages = projects.flatMap((p) => p.images).filter((img) => img);

  const handleEnter = useCallback(() => setPhase("hero"), []);
  const handleScrollDown = useCallback(() => setPhase("portfolio"), []);
  const handleProjectClick = useCallback(
    (project: Project) => setSelectedProject(project),
    []
  );
  const handleCloseProject = useCallback(() => setSelectedProject(null), []);

  // Animate tab content on tab change
  const handleTabChange = useCallback((tab: TabName) => {
    if (!contentRef.current) {
      setActiveTab(tab);
      return;
    }
    // Fade out current content
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setActiveTab(tab);
        // Fade in new content
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
        );
      },
    });
  }, []);

  // Animate portfolio entrance
  useEffect(() => {
    if (phase === "portfolio" && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.1 }
      );
    }
  }, [phase]);

  return (
    <>
      {phase === "splash" && (
        <Splash images={splashImages} onEnter={handleEnter} />
      )}

      {phase === "hero" && (
        <Hero visible={true} onScrollDown={handleScrollDown} />
      )}

      {phase === "portfolio" && (
        <ClickSpark sparkColor="#c4712f" sparkSize={12} sparkRadius={20} sparkCount={10} duration={500}>
          <Particles
            particleCount={150}
            particleSpread={10}
            speed={0.05}
            particleColors={["#c4712f", "#f5f0eb", "#333333"]}
            moveParticlesOnHover={true}
            particleHoverFactor={1}
            alphaParticles={true}
            particleBaseSize={80}
            sizeRandomness={1.5}
            cameraDistance={25}
          />

          <TabBar
            activeTab={activeTab}
            onTabChange={handleTabChange}
            visible={true}
          />

          <main className="main-content">
            <div ref={contentRef}>
              {activeTab === "HOME" && (
                <Home onProjectClick={handleProjectClick} />
              )}
              {activeTab === "WORK" && (
                <Work onProjectClick={handleProjectClick} />
              )}
              {activeTab === "ABOUT" && <About />}
              {activeTab === "CONTACT" && <Contact />}
            </div>
          </main>

          {selectedProject && (
            <ProjectGallery
              project={selectedProject}
              onClose={handleCloseProject}
            />
          )}
        </ClickSpark>
      )}
    </>
  );
}
