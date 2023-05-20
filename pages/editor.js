import React from 'react';
import styles from './vex.module.css';
import Link from 'next/link';

const EditorPage = () => {
  return (
    <div className={`${styles.container} ${styles['light-mode']}`}>
    <Link href="/" passHref>
        <button className={styles.backButton}>Back to Main Page</button>
    </Link>
      <h1 className={styles.title}>MIDI Piano Roll Editor</h1>
      <h2 className={styles.subtitle}>This is still a work in progress.</h2>
      <div className={styles.sheetContainer}>
        <div className={styles.controls}>
          <button className={styles.button}>Play</button>
          <button className={styles.button}>Stop</button>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
