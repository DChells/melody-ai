import React from "react";
import WebMidi from "webmidi";

// Load and parse a MIDI file
export function loadMidiFile(filename, callback) {
  fetch(filename)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => {
      const midiFile = new WebMidi.WebMidi(arrayBuffer);
      callback(midiFile);
    });
}

// Function to handle MIDI messages from connected devices (placeholder)
function onMIDIMessage(message) {
  console.log("MIDI message:", message);
}

// MIDIManager component, which sets up the `onMIDIMessage` event handler
function MIDIManager() {
    React.useEffect(() => {
      if (navigator.requestMIDIAccess) {
        navigator
          .requestMIDIAccess()
          .then((access) => {
            const input = access.inputs.values().next().value;
            if (input) {
              input.onmidimessage = onMIDIMessage;
              return () => {
                input.onmidimessage = null;
              };
            }
          })
          .catch((error) => {
            console.log("ERROR:", error);
          });
      } else {
        console.log("MIDI not supported");
      }
    }, []);
  
    return null;
  }
  
  export default MIDIManager;