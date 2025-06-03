import React, { useState, useEffect } from "react";
import MusicSheet from "/components/vexRender";
import { Configuration, OpenAIApi } from 'openai';
import styles from './vex.module.css';
import Link from 'next/link';

// Detailed instructions sent to the language model so it returns
// notes in a format VexFlow can parse.
const BASE_PROMPT = `
You are Melody AI, an assistant that converts short song descriptions into
simple musical notation for the VexFlow library. When the user provides a song
title, respond only with a comma-separated list of note and duration pairs in
the form "c/4 q". Use the durations w (whole), h (half), q (quarter) or 8, 16,
etc. Do not include any additional commentary or formatting. Make sure each
measure adds up to 4/4 time. Example: c/4 q, d/4 q, e/4 q, f/4 q.`;

let openai = null;

// mock GPT-3 output
const mockGpt3Output = "c/4 h, d/4 q, e/4 q, f/4 q, g/4 q, a/4 q, b/4 q, c/5 q, c#/4 q, d#/4 q, f#/4 q, g#/4 q, a#/4 q, b/4 q, c#/5 q, d/5 q, e/5 q, f/5 q, g/5 q, a/5 q, b/5 q, c/6 q, c/4 h, d/4 h, e/4 h, f/4 h, g/4 h, a/4 h, b/4 h, c/5 h";  // change this as per your needs

const MyPage = () => {
  const [notes, setNotes] = useState([]);
  const [exampleNotes, setExample] = useState([]);
  const [title, setTitle] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('openai');
  const [notesString, setNotesString] = useState('');
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    const storedKey = localStorage.getItem('openaiKey');
    if (storedKey) setApiKey(storedKey);
  }, []);

  const handleDarkModeToggle = () => {
    localStorage.setItem('darkMode', (!darkMode).toString());
    setDarkMode(!darkMode);
  };

  const handleSubmit = async () => {
    try {
      if (model === 'openai') {
        if (!apiKey) {
          setError('Please provide an OpenAI API key');
          return;
        }
        const configuration = new Configuration({ apiKey });
        openai = new OpenAIApi(configuration);
      }

      let gpt3Output = '';

      if (model === 'openai') {
        const completion = await openai.createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: BASE_PROMPT },
            { role: 'user', content: title },
          ],
        });

        const message = completion.data.choices[0].message;
        gpt3Output = message.content;
      } else {
        const response = await fetch('/api/llama', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: `${BASE_PROMPT}\n${title}` })
        });
        const data = await response.json();
        gpt3Output = data.result;
      }
      console.log(gpt3Output);

      setNotesString(gpt3Output);
      const gpt3Notes = gpt3Output.split(',').map(note => {
        const [name, duration] = note.trim().split(' ');
        return { name, duration };
      }).filter(note => {
        const noteRegex = /^[a-gA-G](?:b|#)?\/[0-9]$/;
        const durationRegex = /^(w|h|q|8|16|32|64)(d?)(r?)$/;
        return noteRegex.test(note.name) && durationRegex.test(note.duration);
      });

      console.log(gpt3Notes);
      setNotes(gpt3Notes);
      setError(null);

    } catch (error) {
      setError(`Error: ${error.message}. Please press the refresh button and input a new name.`);
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const gpt3Notes = mockGpt3Output.split(',').map(note => {
      const [name, duration] = note.trim().split(' ');
      return { name, duration };
    });
    setExample(gpt3Notes);
  }, []);

  const handleRefresh = () => {
    setNotes([]);
    setTitle('');
    setNotesString('');
    setError(null);
  }

  useEffect(() => {
    const parsed = notesString.split(',').map(note => {
      const [name, duration] = note.trim().split(' ');
      return { name, duration };
    }).filter(note => note.name && note.duration);
    if (parsed.length) {
      setNotes(parsed);
    }
  }, [notesString]);

  return (
    <div className={`${styles.container} ${darkMode ? styles['dark-mode'] : styles['light-mode']}`}>
      <Link href="/" passHref>
        <button className={styles.backButton}>Back to main page</button>
      </Link>
      <button className={styles['theme-switcher']} onClick={handleDarkModeToggle}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
      <h1 className={styles.title}>Generate Music Sheet</h1>
      <p className={styles.description}>
        Enter a song title and generate a music sheet with notes based on the selected model.
      </p>
      <div className={styles.row}>
        <select value={model} onChange={(e) => setModel(e.target.value)} className={styles.select}>
          <option value="openai">OpenAI</option>
          <option value="llama">Local LLaMA</option>
        </select>
        <input
          className={styles.input}
          type="text"
          value={apiKey}
          onChange={(e) => { setApiKey(e.target.value); localStorage.setItem('openaiKey', e.target.value); }}
          placeholder="OpenAI API Key"
        />
      </div>
      <input
      className={styles.input}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter song title"
      />
      <div>
        <button className={styles.button} onClick={handleSubmit}>Generate</button>
        <button className={styles.button} onClick={handleRefresh}>Refresh</button>
      </div>
      <textarea
        className={styles.textarea}
        value={notesString}
        onChange={(e) => setNotesString(e.target.value)}
        placeholder="Edit notes here"
      />
      <div className={styles.row}>
        <button className={styles.button} onClick={() => setZoom(Math.min(2, zoom + 0.1))}>Zoom In</button>
        <button className={styles.button} onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>Zoom Out</button>
      </div>
      <h2>Example</h2>
      <MusicSheet notes={exampleNotes} zoom={zoom} darkMode={darkMode} />
      <h2>Generated Song: {title}</h2>
      {error && (
        <div className="error">
        {error}
        <button onClick={() => setError(null)}>Try again</button>
        </div>
      )}
      <MusicSheet notes={notes} zoom={zoom} darkMode={darkMode} />
    </div>
  );
}

export default MyPage;
