import Link from 'next/link';
import React from 'react';
import styles from './index.module.css'; 

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎵 Melody AI! 🎶</h1>
      <p>
        A variation of AI tools to aid in creating music. Here, you can find
        links to each tool:
      </p>
      <ul className={styles.list}>
        <li className={styles['list-item']}>
          <Link href="/vex">🎼 Vexflow Generator</Link>
          <p>Generate Sheet Music Based Off A Song Name.</p>
        </li>
        <li className={styles['list-item']}>
          <Link href="/midi">🎹 Midi Maker</Link>
          <p>Generate A Midi File Based Off a song name.</p>
        </li>
        <li className={styles['list-item']}>
          <Link href="/editor">🎇 Midi Piano Editor</Link>
          <p>Autocomplete Midi Song with AI.</p>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;

