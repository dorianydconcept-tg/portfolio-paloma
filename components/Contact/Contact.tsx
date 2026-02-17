"use client";

import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <div className={styles.contact}>
      <p className={styles.headline}>Un projet en tête ?<br />Parlons-en.</p>
      <a href="mailto:paloma.delacroix@myyahoo.com" className={styles.email}>
        paloma.delacroix@myyahoo.com
      </a>
      <div className={styles.socials}>
        <a href="https://www.behance.net/palomanuel" target="_blank" rel="noopener noreferrer">Behance</a>
        <a href="https://www.linkedin.com/in/paloma-delacroix/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://www.instagram.com/paloma_nuel/?hl=fr" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
    </div>
  );
}
