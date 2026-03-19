import React, { useState } from 'react';
import { PlayerBar } from './PlayerBar';
import { AudioPlayer } from './AudioPlayer';
import { VideoPlayer } from './VideoPlayer';
import { QueuePanel } from './QueuePanel';
import { usePlayer } from '../../hooks/usePlayer';
import { motion, AnimatePresence } from 'framer-motion';

export const Player = () => {
  const [audioRef, setAudioRef] = useState(null);
  const { playerMode, currentTrack, isFullScreen, toggleMode } = usePlayer();

  return (
    <>
      <AudioPlayer setAudioRef={setAudioRef} />
      
      {/* Global Player Bar */}
      <PlayerBar />
      
      {/* Floating panels */}
      <QueuePanel />

      {/* Video Overlay / Full Screen Mode */}
      <AnimatePresence>
        {(playerMode === 'video' || isFullScreen) && currentTrack && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 md:p-12 pb-32"
          >
            <div className="w-full max-w-5xl h-full flex flex-col justify-center gap-8">
              <VideoPlayer />
              {!currentTrack.video_url && playerMode === 'video' && (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center animate-pulse">
                    <span className="text-4xl text-white/20 font-bold">!</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">No Video Available</h3>
                  <p className="text-muted-foreground">This track only supports audio playback.</p>
                  <button 
                    onClick={toggleMode} 
                    className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/80 transition-colors"
                  >
                    Switch to Audio
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
