import React, { useEffect, useRef } from 'react';
import { usePlayer } from '../../hooks/usePlayer';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { PlayerControls } from './PlayerControls';
import { ModeToggle } from './ModeToggle';
import { ProgressBar } from './ProgressBar';
import { VolumeControl } from './VolumeControl';
import { ListMusic, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideUp } from '../../utils/variants';
import { cn } from '../../utils/cn';

export const PlayerBar = () => {
  const { currentTrack, toggleQueue, toggleFullScreen, isPlaying } = usePlayer();
  const isMobile = useMediaQuery('(max-width: 640px)');

  if (!currentTrack) return null;

  return (
    <AnimatePresence>
      <motion.div
        variants={slideUp}
        initial="initial"
        animate="animate"
        exit="exit"
        className={cn(
          "fixed bottom-0 left-0 right-0 glass-panel z-50 rounded-none border-t border-b-0 border-x-0 !bg-[#020d12]/80 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.5)]",
          isMobile ? "bottom-16" : "" // sits above MobileNav on mobile
        )}
      >
        <div className="h-[90px] px-4 md:px-6 flex items-center justify-between">
          
          {/* Left: Track Info */}
          <div className="flex items-center gap-4 w-full max-w-[30%]">
            <div className="relative w-14 h-14 rounded-md overflow-hidden bg-white/10 shrink-0">
              <motion.img 
                src={currentTrack.album?.cover_url || '/assets/default-cover.png'} 
                alt={currentTrack.title}
                className="w-full h-full object-cover"
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
              />
            </div>
            <div className="flex flex-col overflow-hidden min-w-0">
              <span className="text-sm font-semibold truncate hover:underline cursor-pointer">
                {currentTrack.title}
              </span>
              <span className="text-xs text-muted-foreground truncate hover:underline cursor-pointer">
                {currentTrack.artist?.name}
              </span>
            </div>
          </div>

          {/* Center: Controls & Progress */}
          <div className="flex flex-col items-center gap-2 w-full max-w-[40%] flex-1">
            <PlayerControls />
            <ProgressBar />
          </div>

          {/* Right: Extra Controls */}
          <div className="flex items-center justify-end gap-4 w-full max-w-[30%]">
            {!isMobile && (
              <>
                <VolumeControl />
                <button onClick={toggleQueue} className="text-muted-foreground hover:text-white transition-colors">
                  <ListMusic size={20} />
                </button>
              </>
            )}
            <ModeToggle />
            <button onClick={toggleFullScreen} className="text-muted-foreground hover:text-white transition-colors ml-2 hidden sm:block">
              <Maximize2 size={18} />
            </button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};
