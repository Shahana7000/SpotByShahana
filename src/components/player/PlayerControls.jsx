import React from 'react';
import { usePlayer } from '../../hooks/usePlayer';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from 'lucide-react';
import { cn } from '../../utils/cn';

export const PlayerControls = () => {
  const { 
    isPlaying, 
    pause, 
    resume, 
    next, 
    previous, 
    isShuffled, 
    toggleShuffle, 
    repeatMode, 
    toggleRepeat,
    currentTrack 
  } = usePlayer();

  if (!currentTrack) return <div className="flex items-center justify-center gap-4 w-full max-w-[200px]" />;

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6">
      <button 
        onClick={toggleShuffle} 
        className={cn("text-muted-foreground hover:text-white transition-colors", isShuffled && "text-primary")}
      >
        <Shuffle size={18} />
      </button>
      
      <button onClick={previous} className="text-white hover:text-primary transition-colors">
        <SkipBack size={24} fill="currentColor" />
      </button>
      
      <button 
        onClick={isPlaying ? pause : resume}
        className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:scale-105 transition-transform"
      >
        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
      </button>
      
      <button onClick={next} className="text-white hover:text-primary transition-colors">
        <SkipForward size={24} fill="currentColor" />
      </button>
      
      <button 
        onClick={toggleRepeat} 
        className={cn("text-muted-foreground hover:text-white transition-colors relative", repeatMode !== 'off' && "text-primary")}
      >
        <Repeat size={18} />
        {repeatMode === 'one' && (
          <span className="absolute -top-1 -right-1 text-[8px] bg-primary rounded-full w-3 h-3 flex items-center justify-center text-white">1</span>
        )}
      </button>
    </div>
  );
};
