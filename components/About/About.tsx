"use client";

import styles from "./About.module.css";

const skills = [
  { name: "Architecture d'intérieur", size: "large" },
  { name: "Modélisation 3D", size: "large" },
  { name: "Figma", size: "medium" },
  { name: "Photoshop", size: "medium" },
  { name: "UI/UX Design", size: "large" },
  { name: "Canva", size: "small" },
  { name: "Illustrator", size: "small" },
  { name: "Concept Board", size: "medium" },
  { name: "Direction artistique", size: "medium" },
];

export default function About() {
  return (
    <div className={styles.about}>
      <div className={styles.photoSide}>
        <div className={styles.photoPlaceholder}>
          <span>Photo</span>
        </div>
      </div>

      <div className={styles.textSide}>
        <h2 className={styles.title}>À propos</h2>
        <p className={styles.bio}>
          Designer et développeuse créative basée à Toulouse,
          je crée des expériences digitales qui allient esthétique
          et technique. Mon approche hybride me permet de maîtriser
          un projet de la conception à la mise en ligne.
        </p>

        <div className={styles.skills}>
          {skills.map((skill) => (
            <span
              key={skill.name}
              className={`${styles.skill} ${styles[skill.size as keyof typeof styles]}`}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
