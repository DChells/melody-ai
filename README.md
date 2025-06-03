# Melody AI
Variation of AI tools to aid in creating music.

# Class Info
Made For CPSC-458 by Daniel Chelling 

# Netlify Link
https://lovely-sunshine-ac0e9d.netlify.app/

# Known Issues
- Netlify Doesn't Work Perfectly Due to OpenAI key getting clipped sometimes
- Only using basic Instruction Tuned model so results are subpar
- Finetuned model still in works and hasn't been processed yet
 - Local LLaMA integration is a basic placeholder

# To-do
- Replace Instruction Tuned model with the Finetuned Model
- Update the Midi Piano Roll Editor with functionality
- Finish Audio Playback of Midi Maker
 - Improve local model inference

# Used APIs and Libraries
- OPENAI
- VexFlow
- midi-player-js
- music21

## Configuration
The Vexflow generator supports two models:

1. **OpenAI GPT** – supply your OpenAI API key directly on the page.
2. **Local LLaMA** – a placeholder Python script (`components/local_llama.py`) that should be replaced with real inference.

Set your API key in the text field or store it in `localStorage` under `openaiKey`.

The generator sends a detailed prompt so the model replies with a comma-separated
list of `note/octave duration` pairs (e.g. `c/4 q`). VexFlow then renders these
notes into sheet music.
