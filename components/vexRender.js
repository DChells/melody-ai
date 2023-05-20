import React, { useEffect, useRef } from "react";
import Vex from "vexflow";

const VF = Vex.Flow;

const MusicSheet = ({ notes, darkMode }) => {
  const divRef = useRef();

  useEffect(() => {
    const notesPerMeasure = 4;
    const measureCount = Math.ceil(notes.length / notesPerMeasure);
    const staveWidth = 250;
    const rendererWidth = 10 + measureCount * staveWidth;
    divRef.current.innerHTML = '';

    const renderer = new VF.Renderer(divRef.current, VF.Renderer.Backends.SVG);
    renderer.resize('100%', 200);
    const context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    let startX = 10;

    for (let measure = 0; measure < measureCount; measure++) {
      const stave = new VF.Stave(startX, 40, staveWidth);
      stave.addClef("treble").addTimeSignature("4/4");
      stave.setContext(context).draw();

      startX += staveWidth;

      const measureNotes = notes.slice(measure * notesPerMeasure, (measure + 1) * notesPerMeasure);

      if (measureNotes && measureNotes.length > 0) {
        const vexNotes = measureNotes.map(
          (note) => {
            const staveNote = new VF.StaveNote({
              keys: [note.name],
              duration: note.duration,
            });

            // Set the fill style of the note heads
            staveNote.setStyle({ fillStyle: darkMode ? 'white' : 'black' });

            return staveNote;
          }
        );
        
        VF.Formatter.FormatAndDraw(context, stave, vexNotes);
      }
    }
  }, [notes, darkMode]);
  

  return <div ref={divRef} />;
}

export default MusicSheet;
