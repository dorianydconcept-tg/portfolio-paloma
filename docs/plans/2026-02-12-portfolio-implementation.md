# Portfolio — Plan d'implémentation

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Construire un portfolio créatif/expérimental avec splash diaporama, hero plein écran, navigation par onglets verticaux, et layout désordre pour les projets.

**Architecture:** Single page Next.js 14 (App Router). La TabBar verticale est persistante dans le layout. Le contenu change via state React avec transitions GSAP. L'entrée du site est un tunnel en 3 étapes : Splash → Hero → Portfolio.

**Tech Stack:** Next.js 14, GSAP + ScrollTrigger, Framer Motion, Tailwind CSS, TypeScript

---

## Diagramme de dépendances

```
Task 1 (Setup projet)
  ├── Task 2 (Données projets + styles globaux)
  │     ├── Task 5 (Work - layout désordre)     ─── Task 7 (ProjectGallery)
  │     ├── Task 6 (Home)
  │     ├── Task 8 (About)
  │     └── Task 9 (Contact)
  ├── Task 3 (TabBar)
  └── Task 4 (Splash + Hero)

Task 3 + Task 4 + Task 5/6/7/8/9 ──► Task 10 (Assemblage layout.tsx + page.tsx)
Task 10 ──► Task 11 (Animations GSAP globales)
Task 11 ──► Task 12 (Responsive mobile)
```

## Groupes parallèles

| Phase | Tâches parallélisables | Bloqué par |
|-------|----------------------|------------|
| **Phase 1** | Task 1 | — |
| **Phase 2** | Task 2, Task 3, Task 4 | Task 1 |
| **Phase 3** | Task 5, Task 6, Task 8, Task 9 | Task 2 |
| **Phase 4** | Task 7 | Task 5 |
| **Phase 5** | Task 10 | Task 3, 4, 5, 6, 7, 8, 9 |
| **Phase 6** | Task 11 | Task 10 |
| **Phase 7** | Task 12 | Task 11 |

---

## Task 1 : Setup du projet Next.js

**Bloque :** Task 2, 3, 4
**Bloqué par :** —

**Files:**
- Create: `package.json`, `tailwind.config.ts`, `tsconfig.json`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`

**Step 1 : Initialiser le projet**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
```

**Step 2 : Installer les dépendances**

```bash
npm install gsap @gsap/react framer-motion
```

**Step 3 : Configurer la police Aileron**

Télécharger Aileron (Regular, Medium, Bold) et placer dans `public/fonts/`. Créer les `@font-face` dans `app/globals.css` :

```css
@font-face {
  font-family: 'Aileron';
  src: url('/fonts/Aileron-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: 'Aileron';
  src: url('/fonts/Aileron-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
}
@font-face {
  font-family: 'Aileron';
  src: url('/fonts/Aileron-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}
```

**Step 4 : Configurer Tailwind avec les couleurs du projet**

Dans `tailwind.config.ts` :

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        peach: "#ffc9b9",
        green: {
          main: "#4c956c",
          dark: "#2c6e49",
        },
      },
      fontFamily: {
        aileron: ["Aileron", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

**Step 5 : Vérifier que ça tourne**

```bash
npm run dev
```

Expected: Le serveur démarre sur localhost:3000 sans erreur.

**Step 6 : Commit**

```bash
git init && git add -A && git commit -m "chore: init Next.js 14 project with Tailwind, GSAP, Aileron font"
```

---

## Task 2 : Données projets + Styles globaux

**Bloque :** Task 5, 6, 8, 9
**Bloqué par :** Task 1

**Files:**
- Create: `data/projects.ts`
- Create: `public/images/projects/` (images placeholder)
- Modify: `app/globals.css`

**Step 1 : Créer le fichier de données projets**

```ts
// data/projects.ts
export interface Project {
  id: string;
  title: string;
  tag: "Client" | "Perso";
  category: string;
  thumbnail: string;
  images: string[];
  description: string;
  role: string;
  tools: string[];
  year: number;
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Projet Example 1",
    tag: "Client",
    category: "Web",
    thumbnail: "/images/projects/placeholder-1.jpg",
    images: [
      "/images/projects/placeholder-1.jpg",
      "/images/projects/placeholder-1b.jpg",
    ],
    description: "Description du projet.",
    role: "Design & Développement",
    tools: ["Figma", "Next.js", "GSAP"],
    year: 2025,
  },
  {
    id: "project-2",
    title: "Projet Example 2",
    tag: "Perso",
    category: "Expérimental",
    thumbnail: "/images/projects/placeholder-2.jpg",
    images: [
      "/images/projects/placeholder-2.jpg",
      "/images/projects/placeholder-2b.jpg",
    ],
    description: "Description du projet.",
    role: "Direction artistique & Dev",
    tools: ["Blender", "Three.js"],
    year: 2024,
  },
  {
    id: "project-3",
    title: "Projet Example 3",
    tag: "Client",
    category: "Branding",
    thumbnail: "/images/projects/placeholder-3.jpg",
    images: [
      "/images/projects/placeholder-3.jpg",
      "/images/projects/placeholder-3b.jpg",
    ],
    description: "Description du projet.",
    role: "Design",
    tools: ["Illustrator", "Photoshop"],
    year: 2024,
  },
];

export const featuredProjectIds = ["project-1", "project-2"];
```

**Step 2 : Créer des images placeholder**

Placer des images placeholder (600x400 minimum) dans `public/images/projects/`.

**Step 3 : Ajouter les styles globaux de base**

Dans `app/globals.css`, ajouter :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Font faces Aileron (déjà ajoutées Task 1) */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  font-family: 'Aileron', sans-serif;
  background-color: #ffffff;
  color: #2c6e49;
  overflow-x: hidden;
}

::selection {
  background-color: #ffc9b9;
  color: #2c6e49;
}
```

**Step 4 : Commit**

```bash
git add data/ public/images/ app/globals.css && git commit -m "feat: add project data model, placeholder images, global styles"
```

---

## Task 3 : Composant TabBar (onglets verticaux)

**Bloque :** Task 10
**Bloqué par :** Task 1

**Files:**
- Create: `components/TabBar/TabBar.tsx`
- Create: `components/TabBar/TabBar.module.css`

**Step 1 : Créer le composant TabBar**

```tsx
// components/TabBar/TabBar.tsx
"use client";

import styles from "./TabBar.module.css";

const tabs = ["HOME", "WORK", "ABOUT", "CONTACT"] as const;
export type TabName = (typeof tabs)[number];

interface TabBarProps {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
  visible: boolean;
}

export default function TabBar({ activeTab, onTabChange, visible }: TabBarProps) {
  if (!visible) return null;

  return (
    <nav className={styles.tabBar}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
          onClick={() => onTabChange(tab)}
        >
          <span className={styles.label}>{tab}</span>
        </button>
      ))}
    </nav>
  );
}
```

**Step 2 : Créer les styles**

```css
/* components/TabBar/TabBar.module.css */
.tabBar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 60px;
  display: flex;
  flex-direction: column;
  z-index: 50;
  background: transparent;
}

.tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  background: transparent;
  transition: background-color 0.3s ease;
}

.tab:hover {
  background-color: rgba(76, 149, 108, 0.1);
}

.label {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  font-family: 'Aileron', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: #2c6e49;
  text-transform: uppercase;
}

.active {
  background-color: #4c956c;
}

.active .label {
  color: #ffffff;
}
```

**Step 3 : Commit**

```bash
git add components/TabBar/ && git commit -m "feat: add vertical TabBar component with active state"
```

---

## Task 4 : Composants Splash + Hero

**Bloque :** Task 10
**Bloqué par :** Task 1

**Files:**
- Create: `components/Splash/Splash.tsx`
- Create: `components/Splash/Splash.module.css`
- Create: `components/Hero/Hero.tsx`
- Create: `components/Hero/Hero.module.css`

**Step 1 : Créer le composant Splash (diaporama)**

```tsx
// components/Splash/Splash.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./Splash.module.css";

interface SplashProps {
  images: string[];
  onEnter: () => void;
}

export default function Splash({ images, onEnter }: SplashProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(imageRef.current, {
        opacity: 0,
        duration: 0.6,
        onComplete: () => {
          setCurrentIndex((prev) => (prev + 1) % images.length);
          gsap.to(imageRef.current, { opacity: 1, duration: 0.6 });
        },
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleEnter = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: onEnter,
    });
  };

  return (
    <div ref={containerRef} className={styles.splash} onClick={handleEnter}>
      <img
        ref={imageRef}
        src={images[currentIndex]}
        alt=""
        className={styles.image}
      />
      <button className={styles.enter} onClick={handleEnter}>
        Entrer
      </button>
    </div>
  );
}
```

**Step 2 : Styles Splash**

```css
/* components/Splash/Splash.module.css */
.splash {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  cursor: pointer;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.enter {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Aileron', sans-serif;
  font-weight: 300;
  font-size: 1rem;
  color: #ffffff;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 0.75rem 2rem;
  cursor: pointer;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition: border-color 0.3s;
}

.enter:hover {
  border-color: #ffffff;
}
```

**Step 3 : Créer le composant Hero**

```tsx
// components/Hero/Hero.tsx
"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import styles from "./Hero.module.css";

interface HeroProps {
  visible: boolean;
  onScrollDown: () => void;
}

export default function Hero({ visible, onScrollDown }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible && heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) return;

    const handleWheel = () => {
      gsap.to(heroRef.current, {
        opacity: 0,
        y: -100,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: onScrollDown,
      });
    };

    window.addEventListener("wheel", handleWheel, { once: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [visible, onScrollDown]);

  if (!visible) return null;

  return (
    <div ref={heroRef} className={styles.hero}>
      <h1 className={styles.name}>Dorian Bouvet</h1>
      <p className={styles.subtitle}>Designer & Développeur créatif</p>
      <div className={styles.scrollIndicator}>
        <span>Scroll</span>
        <div className={styles.line} />
      </div>
    </div>
  );
}
```

**Step 4 : Styles Hero**

```css
/* components/Hero/Hero.module.css */
.hero {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
}

.name {
  font-family: 'Aileron', sans-serif;
  font-weight: 700;
  font-size: clamp(3rem, 8vw, 8rem);
  color: #2c6e49;
  letter-spacing: -0.02em;
}

.subtitle {
  font-family: 'Aileron', sans-serif;
  font-weight: 400;
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: #4c956c;
  margin-top: 1rem;
}

.scrollIndicator {
  position: absolute;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #ffc9b9;
  font-family: 'Aileron', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.line {
  width: 1px;
  height: 40px;
  background: #ffc9b9;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scaleY(1); opacity: 1; }
  50% { transform: scaleY(0.5); opacity: 0.5; }
}
```

**Step 5 : Commit**

```bash
git add components/Splash/ components/Hero/ && git commit -m "feat: add Splash diaporama and Hero fullscreen components"
```

---

## Task 5 : Composant Work (layout désordre)

**Bloque :** Task 7, Task 10
**Bloqué par :** Task 2

**Files:**
- Create: `components/Work/Work.tsx`
- Create: `components/Work/Work.module.css`

**Step 1 : Créer le composant Work**

```tsx
// components/Work/Work.tsx
"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { projects, Project } from "@/data/projects";
import styles from "./Work.module.css";

// Positions pré-définies pour l'effet désordre
const positions = [
  { top: "5%", left: "10%", rotate: -3, width: "35%" },
  { top: "15%", left: "55%", rotate: 2, width: "30%" },
  { top: "45%", left: "5%", rotate: 1, width: "28%" },
  { top: "40%", left: "50%", rotate: -2, width: "38%" },
  { top: "70%", left: "25%", rotate: 3, width: "32%" },
];

interface WorkProps {
  onProjectClick: (project: Project) => void;
}

export default function Work({ onProjectClick }: WorkProps) {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    itemsRef.current.forEach((item) => {
      if (!item) return;

      item.addEventListener("mouseenter", () => {
        gsap.to(item, { scale: 1.05, zIndex: 10, boxShadow: "0 20px 60px rgba(0,0,0,0.15)", duration: 0.3 });
        itemsRef.current.forEach((other) => {
          if (other && other !== item) {
            gsap.to(other, { opacity: 0.4, duration: 0.3 });
          }
        });
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(item, { scale: 1, zIndex: 1, boxShadow: "none", duration: 0.3 });
        itemsRef.current.forEach((other) => {
          if (other) gsap.to(other, { opacity: 1, duration: 0.3 });
        });
      });
    });
  }, []);

  return (
    <div className={styles.work}>
      {projects.map((project, i) => {
        const pos = positions[i % positions.length];
        return (
          <div
            key={project.id}
            ref={(el) => { itemsRef.current[i] = el; }}
            className={styles.item}
            style={{
              top: pos.top,
              left: pos.left,
              width: pos.width,
              transform: `rotate(${pos.rotate}deg)`,
            }}
            onClick={() => onProjectClick(project)}
          >
            <img src={project.thumbnail} alt={project.title} className={styles.thumbnail} />
            <div className={styles.info}>
              <h3 className={styles.title}>{project.title}</h3>
              <span className={styles.tag}>{project.tag} · {project.category}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

**Step 2 : Styles Work**

```css
/* components/Work/Work.module.css */
.work {
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
}

.item {
  position: absolute;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.thumbnail {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 4px;
}

.info {
  margin-top: 0.75rem;
}

.title {
  font-family: 'Aileron', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: #2c6e49;
}

.tag {
  font-family: 'Aileron', sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  color: #4c956c;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

**Step 3 : Commit**

```bash
git add components/Work/ && git commit -m "feat: add Work component with disorder layout and hover effects"
```

---

## Task 6 : Composant Home

**Bloque :** Task 10
**Bloqué par :** Task 2

**Files:**
- Create: `components/Home/Home.tsx`
- Create: `components/Home/Home.module.css`

**Step 1 : Créer le composant Home**

```tsx
// components/Home/Home.tsx
"use client";

import { projects, featuredProjectIds, Project } from "@/data/projects";
import styles from "./Home.module.css";

const featured = projects.filter((p) => featuredProjectIds.includes(p.id));

interface HomeProps {
  onProjectClick: (project: Project) => void;
}

export default function Home({ onProjectClick }: HomeProps) {
  return (
    <div className={styles.home}>
      <h2 className={styles.headline}>
        Créer des expériences<br />
        qui <em>marquent</em>.
      </h2>

      <div className={styles.featured}>
        {featured.map((project, i) => (
          <div
            key={project.id}
            className={`${styles.card} ${i % 2 === 0 ? styles.cardLeft : styles.cardRight}`}
            onClick={() => onProjectClick(project)}
          >
            <img src={project.thumbnail} alt={project.title} className={styles.cardImage} />
            <span className={styles.cardTitle}>{project.title}</span>
          </div>
        ))}
      </div>

      <div className={styles.links}>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://dribbble.com/" target="_blank" rel="noopener noreferrer">Dribbble</a>
      </div>
    </div>
  );
}
```

**Step 2 : Styles Home**

```css
/* components/Home/Home.module.css */
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem 3rem;
  position: relative;
}

.headline {
  font-family: 'Aileron', sans-serif;
  font-weight: 700;
  font-size: clamp(2rem, 5vw, 4rem);
  color: #2c6e49;
  line-height: 1.1;
  margin-bottom: 3rem;
}

.headline em {
  color: #ffc9b9;
  font-style: normal;
}

.featured {
  display: flex;
  gap: 2rem;
  position: relative;
}

.card {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: scale(1.03);
}

.cardLeft {
  transform: rotate(-2deg);
}

.cardRight {
  transform: rotate(1.5deg);
  margin-top: 3rem;
}

.cardImage {
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

.cardTitle {
  display: block;
  margin-top: 0.5rem;
  font-family: 'Aileron', sans-serif;
  font-weight: 700;
  color: #2c6e49;
}

.links {
  display: flex;
  gap: 1.5rem;
  margin-top: 3rem;
}

.links a {
  font-family: 'Aileron', sans-serif;
  font-weight: 600;
  color: #4c956c;
  text-decoration: none;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color 0.3s;
}

.links a:hover {
  color: #2c6e49;
}
```

**Step 3 : Commit**

```bash
git add components/Home/ && git commit -m "feat: add Home component with headline, featured projects, social links"
```

---

## Task 7 : Composant ProjectGallery (galerie horizontale)

**Bloque :** Task 10
**Bloqué par :** Task 5

**Files:**
- Create: `components/ProjectGallery/ProjectGallery.tsx`
- Create: `components/ProjectGallery/ProjectGallery.module.css`

**Step 1 : Créer le composant ProjectGallery**

```tsx
// components/ProjectGallery/ProjectGallery.tsx
"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
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
    // Apparition
    gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });

    // Scroll horizontal
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
        {/* Titre du projet */}
        <div className={styles.slide}>
          <div className={styles.titleSlide}>
            <h2 className={styles.projectTitle}>{project.title}</h2>
            <span className={styles.projectMeta}>
              {project.tag} · {project.category} · {project.year}
            </span>
          </div>
        </div>

        {/* Images et texte */}
        {project.images.map((img, i) => (
          <div key={i} className={styles.slide}>
            <img src={img} alt={`${project.title} ${i + 1}`} className={styles.slideImage} />
          </div>
        ))}

        {/* Slide de description */}
        <div className={styles.slide}>
          <div className={styles.descSlide}>
            <p className={styles.description}>{project.description}</p>
            <p className={styles.role}><strong>Rôle :</strong> {project.role}</p>
            <p className={styles.tools}><strong>Outils :</strong> {project.tools.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Step 2 : Styles ProjectGallery**

```css
/* components/ProjectGallery/ProjectGallery.module.css */
.gallery {
  position: fixed;
  inset: 0;
  z-index: 80;
  background: #ffffff;
  overflow: hidden;
}

.close {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 81;
  font-family: 'Aileron', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  color: #2c6e49;
  background: none;
  border: 1px solid #2c6e49;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: background-color 0.3s, color 0.3s;
}

.close:hover {
  background: #2c6e49;
  color: #ffffff;
}

.track {
  display: flex;
  height: 100vh;
  will-change: transform;
}

.slide {
  min-width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
}

.slideImage {
  max-width: 80%;
  max-height: 80vh;
  object-fit: contain;
}

.titleSlide {
  text-align: center;
}

.projectTitle {
  font-family: 'Aileron', sans-serif;
  font-weight: 700;
  font-size: clamp(2rem, 5vw, 5rem);
  color: #2c6e49;
}

.projectMeta {
  font-family: 'Aileron', sans-serif;
  font-weight: 500;
  font-size: 1rem;
  color: #4c956c;
  margin-top: 1rem;
  display: block;
}

.descSlide {
  max-width: 600px;
}

.description {
  font-family: 'Aileron', sans-serif;
  font-size: 1.125rem;
  color: #2c6e49;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.role,
.tools {
  font-family: 'Aileron', sans-serif;
  font-size: 0.95rem;
  color: #4c956c;
  margin-bottom: 0.5rem;
}
```

**Step 3 : Commit**

```bash
git add components/ProjectGallery/ && git commit -m "feat: add ProjectGallery with horizontal scroll via GSAP ScrollTrigger"
```

---

## Task 8 : Composant About

**Bloque :** Task 10
**Bloqué par :** Task 2

**Files:**
- Create: `components/About/About.tsx`
- Create: `components/About/About.module.css`

**Step 1 : Créer le composant About**

```tsx
// components/About/About.tsx
"use client";

import styles from "./About.module.css";

const skills = [
  { name: "React / Next.js", size: "large" },
  { name: "Figma", size: "large" },
  { name: "TypeScript", size: "medium" },
  { name: "GSAP", size: "medium" },
  { name: "UI/UX Design", size: "large" },
  { name: "Tailwind", size: "small" },
  { name: "Illustrator", size: "small" },
  { name: "Three.js", size: "small" },
  { name: "Motion Design", size: "medium" },
];

export default function About() {
  return (
    <div className={styles.about}>
      <div className={styles.photoSide}>
        <img src="/images/profile.jpg" alt="Dorian Bouvet" className={styles.photo} />
      </div>

      <div className={styles.textSide}>
        <h2 className={styles.title}>À propos</h2>
        <p className={styles.bio}>
          Designer et développeur créatif, je crée des expériences
          digitales qui allient esthétique et technique. Mon approche
          hybride me permet de maîtriser un projet de la conception
          à la mise en ligne.
        </p>

        <div className={styles.skills}>
          {skills.map((skill) => (
            <span
              key={skill.name}
              className={`${styles.skill} ${styles[skill.size]}`}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Step 2 : Styles About**

```css
/* components/About/About.module.css */
.about {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 4rem 3rem;
  gap: 4rem;
}

.photoSide {
  flex: 0 0 40%;
}

.photo {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 4px;
  transform: rotate(-2deg);
}

.textSide {
  flex: 1;
}

.title {
  font-family: 'Aileron', sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  color: #2c6e49;
  margin-bottom: 1.5rem;
}

.bio {
  font-family: 'Aileron', sans-serif;
  font-weight: 400;
  font-size: 1.125rem;
  color: #2c6e49;
  line-height: 1.7;
  max-width: 500px;
  margin-bottom: 2.5rem;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.skill {
  font-family: 'Aileron', sans-serif;
  font-weight: 600;
  color: #4c956c;
  background: rgba(255, 201, 185, 0.2);
  padding: 0.4rem 1rem;
  border-radius: 2px;
}

.large {
  font-size: 1.25rem;
}

.medium {
  font-size: 1rem;
}

.small {
  font-size: 0.8rem;
}
```

**Step 3 : Commit**

```bash
git add components/About/ && git commit -m "feat: add About component with asymmetric layout and organic skills"
```

---

## Task 9 : Composant Contact

**Bloque :** Task 10
**Bloqué par :** Task 2

**Files:**
- Create: `components/Contact/Contact.tsx`
- Create: `components/Contact/Contact.module.css`

**Step 1 : Créer le composant Contact**

```tsx
// components/Contact/Contact.tsx
"use client";

import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <div className={styles.contact}>
      <p className={styles.headline}>Un projet en tête ?<br />Parlons-en.</p>
      <a href="mailto:dorian@example.com" className={styles.email}>
        dorian@example.com
      </a>
      <div className={styles.socials}>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://dribbble.com/" target="_blank" rel="noopener noreferrer">Dribbble</a>
      </div>
    </div>
  );
}
```

**Step 2 : Styles Contact**

```css
/* components/Contact/Contact.module.css */
.contact {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 3rem;
  text-align: center;
}

.headline {
  font-family: 'Aileron', sans-serif;
  font-weight: 400;
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  color: #4c956c;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.email {
  font-family: 'Aileron', sans-serif;
  font-weight: 700;
  font-size: clamp(1.5rem, 4vw, 3rem);
  color: #2c6e49;
  text-decoration: none;
  transition: color 0.3s;
}

.email:hover {
  color: #ffc9b9;
}

.socials {
  display: flex;
  gap: 2rem;
  margin-top: 3rem;
}

.socials a {
  font-family: 'Aileron', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  color: #4c956c;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color 0.3s;
}

.socials a:hover {
  color: #2c6e49;
}
```

**Step 3 : Commit**

```bash
git add components/Contact/ && git commit -m "feat: add Contact component with email, social links"
```

---

## Task 10 : Assemblage — layout.tsx + page.tsx

**Bloque :** Task 11
**Bloqué par :** Task 3, 4, 5, 6, 7, 8, 9

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`

**Step 1 : Écrire le layout.tsx**

Le layout contient la TabBar persistante. Le contenu est un enfant.

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dorian Bouvet — Portfolio",
  description: "Designer & Développeur créatif",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
```

**Step 2 : Écrire le page.tsx — orchestrateur principal**

```tsx
// app/page.tsx
"use client";

import { useState, useCallback } from "react";
import Splash from "@/components/Splash/Splash";
import Hero from "@/components/Hero/Hero";
import TabBar, { TabName } from "@/components/TabBar/TabBar";
import Home from "@/components/Home/Home";
import Work from "@/components/Work/Work";
import About from "@/components/About/About";
import Contact from "@/components/Contact/Contact";
import ProjectGallery from "@/components/ProjectGallery/ProjectGallery";
import { projects, Project } from "@/data/projects";

type Phase = "splash" | "hero" | "portfolio";

export default function Page() {
  const [phase, setPhase] = useState<Phase>("splash");
  const [activeTab, setActiveTab] = useState<TabName>("HOME");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const splashImages = projects.map((p) => p.thumbnail);

  const handleEnter = useCallback(() => setPhase("hero"), []);
  const handleScrollDown = useCallback(() => setPhase("portfolio"), []);
  const handleProjectClick = useCallback((project: Project) => setSelectedProject(project), []);
  const handleCloseProject = useCallback(() => setSelectedProject(null), []);

  return (
    <>
      {phase === "splash" && (
        <Splash images={splashImages} onEnter={handleEnter} />
      )}

      {phase === "hero" && (
        <Hero visible={true} onScrollDown={handleScrollDown} />
      )}

      {phase === "portfolio" && (
        <>
          <TabBar activeTab={activeTab} onTabChange={setActiveTab} visible={true} />

          <main style={{ marginLeft: 60 }}>
            {activeTab === "HOME" && <Home onProjectClick={handleProjectClick} />}
            {activeTab === "WORK" && <Work onProjectClick={handleProjectClick} />}
            {activeTab === "ABOUT" && <About />}
            {activeTab === "CONTACT" && <Contact />}
          </main>

          {selectedProject && (
            <ProjectGallery project={selectedProject} onClose={handleCloseProject} />
          )}
        </>
      )}
    </>
  );
}
```

**Step 3 : Tester**

```bash
npm run dev
```

Expected: Le tunnel Splash → Hero → Portfolio fonctionne. Les onglets switchent le contenu. Clic sur un projet ouvre la galerie.

**Step 4 : Commit**

```bash
git add app/layout.tsx app/page.tsx && git commit -m "feat: assemble all components into main page with phase management"
```

---

## Task 11 : Animations GSAP globales (transitions entre onglets)

**Bloque :** Task 12
**Bloqué par :** Task 10

**Files:**
- Modify: `app/page.tsx` — ajouter les transitions GSAP entre onglets

**Step 1 : Ajouter les transitions de contenu**

Envelopper le contenu de chaque onglet dans un `<div ref>` et utiliser GSAP pour animer l'entrée/sortie lors du changement d'onglet. Animation : fade + léger slide vertical (y: 20 → 0, opacity: 0 → 1) à l'entrée, durée 0.4s.

**Step 2 : Ajouter un parallaxe léger au scroll dans Work**

Dans `components/Work/Work.tsx`, ajouter un effet parallaxe au mouvement de la souris : les éléments bougent légèrement en réponse au curseur (via `mousemove` + GSAP).

**Step 3 : Tester toutes les transitions**

```bash
npm run dev
```

Expected: Transitions fluides entre onglets. Effet parallaxe dans Work.

**Step 4 : Commit**

```bash
git add -A && git commit -m "feat: add GSAP transitions between tabs and parallax in Work"
```

---

## Task 12 : Responsive mobile

**Bloque :** —
**Bloqué par :** Task 11

**Files:**
- Modify: `components/TabBar/TabBar.module.css` — bottom tabs mobile
- Modify: `components/Work/Work.module.css` — layout adapté
- Modify: `components/About/About.module.css` — stack vertical
- Modify: `components/ProjectGallery/ProjectGallery.module.css` — swipe mobile

**Step 1 : TabBar mobile**

Ajouter media query `@media (max-width: 768px)` : la barre passe en bottom, horizontale, texte non-roté.

**Step 2 : Work mobile**

Les éléments du layout désordre passent en colonne simple, positions relatives, pas de rotation.

**Step 3 : About mobile**

Photo + texte en colonne (stack vertical).

**Step 4 : ProjectGallery mobile**

Remplacer le scroll horizontal GSAP par un overflow-x natif (swipe tactile).

**Step 5 : Tester**

```bash
npm run dev
```

Tester sur différentes tailles d'écran (devtools responsive).

**Step 6 : Commit**

```bash
git add -A && git commit -m "feat: add responsive mobile layout for all components"
```

---
