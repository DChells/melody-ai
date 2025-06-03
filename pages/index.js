import Link from 'next/link';
import React from 'react';
import styles from './index.module.css'; 

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎵 Melody AI! 🎶</h1>
      <p className={styles.intro}>
        Melody AI is a small collection of tools that generate musical ideas. Choose a tool below to get started.
      </p>
      <ul className={styles.list}>
        <li className={styles['list-item']}>
          <Link href="/vex">🎼 Vexflow Generator</Link>
          <p>Creates a simple sheet music snippet from a song title using either OpenAI or a local LLaMA model.</p>
        </li>
        <li className={styles['list-item']}>
          <Link href="/midi">🎹 Midi Maker</Link>
          <p>Download example MIDI files and experiment with playback.</p>
        </li>
        <li className={styles['list-item']}>
          <Link href="/editor">🎇 Midi Piano Editor</Link>
          <p>An experimental piano roll editor (work in progress).</p>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;

