import React from 'react';
import { motion } from 'framer-motion';
import { usePlayer } from '../../hooks/usePlayer';
import { Music, Video } from 'lucide-react';
import { cn } from '../../utils/cn';

export const ModeToggle = () => {
  const { playerMode, toggleMode } = usePlayer();

  return (
    <div 
      className="relative flex items-center bg-black/40 rounded-full p-1 cursor-pointer w-[120px] h-9 border border-white/5 shadow-inner"
      onClick={toggleMode}
    >
      <motion.div
        layoutId="mode-pill"
        className="absolute top-1 bottom-1 w-[54px] bg-primary rounded-full shadow-[0_0_10px_rgba(21,115,149,0.5)]"
        initial={false}
        animate={{
          x: playerMode === 'music' ? 0 : 56
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
      
      <div className={cn("relative z-10 flex-1 flex justify-center text-xs font-semibold transition-colors duration-200", playerMode === 'music' ? "text-white" : "text-white/50")}>
        <Music size={14} className="mr-1.5" />
      </div>
      
      <div className={cn("relative z-10 flex-1 flex justify-center text-xs font-semibold transition-colors duration-200", playerMode === 'video' ? "text-white" : "text-white/50")}>
        <Video size={14} className="mr-1.5" />
      </div>
    </div>
  );
};
