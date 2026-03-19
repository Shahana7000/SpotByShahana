import React from 'react';
import { usePlayer } from '../../hooks/usePlayer';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import { cn } from '../../utils/cn';

export const QueuePanel = () => {
  const { isQueueOpen, toggleQueue, queue, currentIndex, playTrack } = usePlayer();

  return (
    <AnimatePresence>
      {isQueueOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 bottom-[90px] w-80 bg-card/95 backdrop-blur-3xl border-l border-white/5 z-40 shadow-2xl flex flex-col"
        >
          <div className="p-4 flex items-center justify-between border-b border-white/5">
            <h3 className="font-bold">Queue</h3>
            <button onClick={toggleQueue} className="text-muted-foreground hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {queue.map((track, index) => {
              const isCurrent = index === currentIndex;
              return (
                <div 
                  key={`${track.id}-${index}`}
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-lg group hover:bg-white/5 cursor-pointer transition-colors",
                    isCurrent && "bg-white/10"
                  )}
                  onDoubleClick={() => playTrack(track, queue)} // Start from this point
                >
                  <div className="relative w-10 h-10 rounded shrink-0 overflow-hidden bg-white/10">
                    <img src={track.album?.cover_url || '/assets/default-cover.png'} alt={track.title} className="w-full h-full object-cover" />
                    {!isCurrent && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play size={16} className="text-white" fill="white" />
                      </div>
                    )}
                    {isCurrent && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className={cn("text-sm truncate font-medium", isCurrent ? "text-primary" : "text-white")}>
                      {track.title}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">{track.artist?.name}</span>
                  </div>
                </div>
              );
            })}
            {queue.length === 0 && (
              <div className="p-4 text-center text-muted-foreground text-sm">
                Next up is empty
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
