"use client";

import styles from "./About.module.css";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

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
        <VideoPlayer src="/videos/paloma-avatar.mp4" className={styles.avatar} />
      </div>

      <div className={styles.textSide}>
        <h2 className={styles.title}>À propos</h2>
        <p className={styles.bio}>
          Mon approche fusionne la rigueur technique de l&apos;architecture int&eacute;rieure avec la vision strat&eacute;gique du design UX. Issue du marchandisage visuel, je con&ccedil;ois des espaces fluides et esth&eacute;tiques o&ugrave; le parcours utilisateur est au c&oelig;ur de la r&eacute;flexion.
          <br /><br />
          De la mod&eacute;lisation technique &agrave; la d&eacute;coration, je transforme les concepts en environnements r&eacute;els, coh&eacute;rents et porteurs de sens.
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
