"use client";

import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.textSide}>
        <h2 className={styles.headline}>
          Cr&eacute;er des exp&eacute;riences<br />
          qui <em>marquent</em>.
        </h2>

        <p className={styles.subtitle}>
          De l&apos;id&eacute;e &agrave; l&apos;&eacute;motion. Mon approche fusionne strat&eacute;gie et cr&eacute;ativit&eacute; pour donner vie &agrave; des exp&eacute;riences qui marquent durablement.
          <br />
          Explorez mon univers.
        </p>

        <div className={styles.links}>
          <a href="https://www.behance.net/palomanuel" target="_blank" rel="noopener noreferrer">Behance</a>
          <a href="https://www.linkedin.com/in/paloma-delacroix/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://www.instagram.com/paloma_nuel/?hl=fr" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>

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
    </div>
  );
}
