import React, { useState, useEffect } from "react";
import MusicSheet from "/components/vexRender";
import { Configuration, OpenAIApi } from 'openai';
import styles from './vex.module.css';
import Link from 'next/link';

const apiKey = "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";
const configuration = new Configuration({
    apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

// mock GPT-3 output
const mockGpt3Output = "c/4 h, d/4 q, e/4 q, f/4 q, g/4 q, a/4 q, b/4 q, c/5 q, c#/4 q, d#/4 q, f#/4 q, g#/4 q, a#/4 q, b/4 q, c#/5 q, d/5 q, e/5 q, f/5 q, g/5 q, a/5 q, b/5 q, c/6 q, c/4 h, d/4 h, e/4 h, f/4 h, g/4 h, a/4 h, b/4 h, c/5 h";  // change this as per your needs

const MyPage = () => {
  const [notes, setNotes] = useState([]);
  const [exampleNotes, setExample] = useState([]);
  const [title, setTitle] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
  }, []);

  const handleDarkModeToggle = () => {
    localStorage.setItem('darkMode', (!darkMode).toString());
    setDarkMode(!darkMode);
  };

  const handleSubmit = async () => {
    try {
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a music generation machine using vexflow. The user will give you a song title and you have to give the information needed to fill out a music sheet properly. Here is the form you are supposed to reply with and only this form nothing else is allowed no extra text Do not deviate from the form. Show me a list of them similar to this but using all the different notes and durations seperated by a comma with nothing else:          : c/4 q, d/4 q, e/4 q, f/4 q, g/4 q, a/4 q, b/4 q, c/5 q, c#/4 q, d#/4 q, f#/4 q, g#/4 q, a#/4 q, b/4 q, c#/5 q, d/5 q, e/5 q, f/5 q, g/5 q, a/5 q, b/5 q, c/6 q, c/4 h, d/4 h, e/4 h, f/4 h, g/4 h, a/4 h, b/4 h, c/5 h' },
          { role: 'user', content: title },
        ],
      });

      const message = completion.data.choices[0].message;
      const gpt3Output = message.content;
      console.log(gpt3Output);

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
    setError(null);
  }

  return (
    <div className={`${styles.container} ${darkMode ? styles['dark-mode'] : styles['light-mode']}`}>
      <Link href="/" passHref>
        <button className={styles.backButton}>Back to main page</button>
      </Link>
      <button className={styles['theme-switcher']} onClick={handleDarkModeToggle}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
      <h1 className={styles.title}>Generate Music Sheet</h1>
      <p className={styles.description}>
        Enter a song title and generate a music sheet with notes based on the GPT-3 output.
      </p>
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
      <h2>Example</h2>
      <MusicSheet notes={exampleNotes} />
      <h2>Generated Song: {title}</h2>
      {error && (
        <div className="error">
        {error}
        <button onClick={() => setError(null)}>Try again</button>
        </div>
      )}
      <MusicSheet notes={notes} />
    </div>
  );
}

export default MyPage;
