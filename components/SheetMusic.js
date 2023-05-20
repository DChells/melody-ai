import React, { useRef, useEffect } from 'react';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';
// import '../../node_modules/opensheetmusicdisplay/build/opensheetmusicdisplay.min.css';

const SheetMusic = ({xml}) => {
  const containerRef = useRef();

  useEffect(() => {
    if (!containerRef.current || !xml) return;

    const osmd = new OpenSheetMusicDisplay(containerRef.current);
    const loadMusicXML = async () => {
      try {
        await osmd.load(xml);
        osmd.render();
      } catch (error) {
        console.error('Failed to load or display the music sheet:', error);
      }
    };
    loadMusicXML();
  }, [containerRef, xml]);

  return (
    <div ref={containerRef} style={{width: "100%", height: "100%"}} />
  );
};

export default SheetMusic;
