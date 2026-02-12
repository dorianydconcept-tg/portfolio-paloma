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
        Cr&eacute;er des exp&eacute;riences<br />
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
        <a href="https://www.behance.net/palomanuel" target="_blank" rel="noopener noreferrer">Behance</a>
        <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </div>
  );
}
