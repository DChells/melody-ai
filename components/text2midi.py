# This is for future use when Finetuned model to turn the text from it into the midi file
from music21 import stream, tempo, note, chord, instrument, meter, bar
import re


lines = output_str.split('\n')
midi_obj = stream.Stream()

bpm_line = lines.pop(0)
bpm = float(bpm_line.split('=')[-1].rstrip('>'))
midi_obj.append(tempo.MetronomeMark(number=bpm))
time_sig = meter.TimeSignature('4/4')
midi_obj.insert(0, time_sig)

pattern = r"^(Note|Chord): ((?:\w#\d\s?)+)? (\d+(?:\.\d+)?) (\d+(?:\.\d+)?) ([\w\s]+)"

part_instr_name = None
part = None
parts = []  


for line in lines:
    match = re.match(pattern, line)
    if match:
        element_type, pitch_data, offset, duration, instr_name = match.groups()
        # print(f'Match groups: {match.groups()}')  
        if pitch_data is not None:  # For Notes and Chords
            pitch_data = pitch_data.strip().split()
        offset = float(offset)
        duration = float(duration)

        if instr_name != part_instr_name:
            part_instr_name = instr_name
            if part is not None:  
                parts.append(part)
            part = stream.Part()
            try:
                part.insert(0, instrument.fromString(instr_name))
            except instrument.InstrumentException:
                part.insert(0, instrument.Sampler())
        
        if element_type == "Note":
            new_note = note.Note(pitch_data[0], quarterLength=duration)
            part.insert(offset, new_note)
        elif element_type == "Chord":
            new_chord = chord.Chord(pitch_data, quarterLength=duration)
            part.insert(offset, new_chord)

if part is not None:
    parts.append(part)

for part in parts:
    # print(part.getInstrument())
    midi_obj.append(part)

midi_obj.write("midi", "reconstructed.mid")