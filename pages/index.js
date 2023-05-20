import Link from 'next/link';
import React from 'react';
import styles from './index.module.css'; 

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Melody AI!</h1>
      <p>
        This is the landing page for your Next.js project. Here, you can find
        links to other pages:
      </p>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <Link href="/vex">Vexflow Generator</Link>
          <p>This is the main page of your app.</p>
        </li>
        <li className={styles.listItem}>
          <Link href="/midi">Midi Maker</Link>
          <p>This is a page with information about your app.</p>
        </li>
        <li className={styles.listItem}>
          <Link href="/editor">Midi Piano Editor</Link>
          <p>This is a page with information about your app.</p>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;

