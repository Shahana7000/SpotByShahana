import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { usePlayer } from '../../hooks/usePlayer';

export const MusicVisualizer = ({ audioRef }) => {
  const containerRef = useRef(null);
  const wavesurferRef = useRef(null);
  const { currentTrack, isPlaying } = usePlayer();

  useEffect(() => {
    if (!containerRef.current || !audioRef?.current || !currentTrack) return;

    if (!wavesurferRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: containerRef.current,
        waveColor: 'rgba(255, 255, 255, 0.2)',
        progressColor: '#157395',
        cursorColor: 'transparent',
        barWidth: 2,
        barGap: 2,
        barRadius: 2,
        height: 60,
        normalize: true,
        media: audioRef.current,
        interact: false,
      });
    }

    return () => {
      // Cleanup
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
    };
  }, [audioRef, currentTrack]);

  if (!currentTrack) return null;

  return (
    <div className="w-full px-6 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
      <div ref={containerRef} className="w-full max-w-2xl h-[60px]" />
    </div>
  );
};
