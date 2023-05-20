import React, { useState } from 'react';
import playMidi  from '/components/midiplayer';
import styles from './midi.module.css';
import Link from 'next/link';

const MyPage = () => {
  const [title, setTitle] = useState('');
  const [generatedMidi, setGeneratedMidi] = useState('');
  const exampleMidi = './midi/.38 Special-Caught Up In You.mid';

  const handlePlayMidi = () => {
    playMidi(exampleMidi);
  };

  const handleRefresh = () => {
    setTitle('');
    setGeneratedMidi('');
  }

  return (
    <div className={styles.container}>
      <Link href="/" passHref>
        <button className={styles.backButton}>Back to main page</button>
      </Link>
      <h1 className={styles.title}>Play MIDI</h1>
      <p className={styles.description}>
        Enter a song title and play a MIDI file based on the title.
      </p>
      <input
        className={styles.input}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter song title"
      />
      <div>
        <button className={styles.button} onClick={handlePlayMidi}>Play MIDI</button>
        <button className={styles.button} onClick={handleRefresh}>Refresh</button>
      </div>
      <h2>Example</h2>
      <button className={styles.button}>Play Example MIDI (WIP)</button>
      <a className={styles.downloadLink} href="./midi/.38 Special-Caught Up In You.mid" download>Download MIDI Example</a>
      <h2>Generated Song: {title}</h2>
      {title && (
        <>
          <button className={styles.button} onClick={() => handlePlayMidi(title)}>Play MIDI</button>
          <a className={styles.downloadLink} href={`./midi/${title}.mid`} download>Download MIDI</a>
        </>
      )}

    </div>
  );
}

export default MyPage;
