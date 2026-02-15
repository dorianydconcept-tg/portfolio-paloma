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
      <div className={styles.videoSide}>
        <video
          className={styles.avatar}
          src="/videos/paloma-avatar.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <div className={styles.textSide}>
        <h2 className={styles.title}>À propos</h2>
        <p className={styles.bio}>
          Designer d&apos;espace &amp; d&apos;exp&eacute;rience, je con&ccedil;ois des environnements o&ugrave; l&apos;esth&eacute;tique rencontre l&apos;usage. Mon approche hybride, au croisement de l&apos;architecture int&eacute;rieure, du marchandisage visuel et de l&apos;UX Design, me permet de cr&eacute;er des lieux centr&eacute;s sur l&apos;utilisateur. De la ma&icirc;trise technique sur Revit et AutoCAD au suivi de chantier, j&apos;accompagne les projets de la conception &agrave; la r&eacute;alisation.
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
