"use client";

import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <h2 className={styles.headline}>
        Cr&eacute;er des exp&eacute;riences<br />
        qui <em>marquent</em>.
      </h2>

      <div className={styles.avatarSection}>
        <video
          className={styles.avatar}
          src="/videos/avatar-3d.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <div className={styles.links}>
        <a href="https://www.behance.net/palomanuel" target="_blank" rel="noopener noreferrer">Behance</a>
        <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </div>
  );
}
