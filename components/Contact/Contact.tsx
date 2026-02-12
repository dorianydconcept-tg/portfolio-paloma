"use client";

import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <div className={styles.contact}>
      <p className={styles.headline}>Un projet en tête ?<br />Parlons-en.</p>
      <a href="mailto:paloma.delacroix@email.com" className={styles.email}>
        paloma.delacroix@email.com
      </a>
      <div className={styles.socials}>
        <a href="https://www.behance.net/palomanuel" target="_blank" rel="noopener noreferrer">Behance</a>
        <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </div>
  );
}
