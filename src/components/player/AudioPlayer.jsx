import React, { useRef, useEffect } from 'react';
import { usePlayer } from '../../hooks/usePlayer';

export const AudioPlayer = ({ setAudioRef }) => {
  const audioRef = useRef(null);
  const { 
    currentTrack, 
    isPlaying, 
    volume, 
    isMuted, 
    setProgress, 
    setDuration, 
    next 
  } = usePlayer();

  useEffect(() => {
    if (audioRef.current) {
      setAudioRef(audioRef);
    }
  }, [setAudioRef]);

  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleTimeUpdate = () => {
    if (audioRef.current) setProgress(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  if (!currentTrack || !currentTrack.audio_url) return null;

  return (
    <audio
      ref={audioRef}
      src={currentTrack.audio_url}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
      onEnded={next}
      className="hidden"
    />
  );
};
