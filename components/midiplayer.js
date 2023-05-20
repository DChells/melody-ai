import React, { useEffect } from 'react';
import MidiPlayer from 'midi-player-js';

const playMidi = ({ midiFileUrl }) => {
  useEffect(() => {
    const player = new MidiPlayer.Player();

    fetch(midiFileUrl)
      .then((response) => response.arrayBuffer())
      .then((data) => {
        player.loadDataUri(`data:audio/midi;base64,${arrayBufferToBase64(data)}`);
        player.play();
      });
  }, [midiFileUrl]);

  return null;
};

const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

export default playMidi;
