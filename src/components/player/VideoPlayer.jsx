import React, { useRef, useEffect } from 'react';
import { usePlayer } from '../../hooks/usePlayer';
import { motion, AnimatePresence } from 'framer-motion';

export const VideoPlayer = () => {
  const videoRef = useRef(null);
  const { currentTrack, isPlaying, volume, isMuted, playerMode, setProgress, setDuration, next } = usePlayer();

  useEffect(() => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.play().catch(console.error);
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleTimeUpdate = () => {
    if (videoRef.current) setProgress(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  if (!currentTrack || playerMode !== 'video' || !currentTrack.video_url) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative group"
      >
        <video
          ref={videoRef}
          src={currentTrack.video_url}
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={next}
          playsInline
        />
        {/* We can overlay more specific video controls here if we want, but PlayerBar already controls it */}
      </motion.div>
    </AnimatePresence>
  );
};
