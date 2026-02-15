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

        <div className={styles.links}>
          <a href="https://www.behance.net/palomanuel" target="_blank" rel="noopener noreferrer">Behance</a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
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
