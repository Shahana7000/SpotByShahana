import React from 'react';
import { usePlayer } from '../../hooks/usePlayer';
import { formatTime } from '../../utils/formatTime';

export const ProgressBar = () => {
  const { progress, duration, setProgress } = usePlayer();

  const handleDrag = (e) => {
    if (duration === 0) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const newProgress = (x / rect.width) * duration;
    setProgress(newProgress);
  };

  return (
    <div className="flex items-center gap-2 w-full max-w-[600px] text-xs text-muted-foreground font-medium">
      <span className="w-10 text-right">{formatTime(progress)}</span>
      
      <div 
        className="h-1.5 flex-1 bg-white/10 rounded-full cursor-pointer relative overflow-hidden group flex items-center"
        onClick={handleDrag}
      >
        <div 
          className="h-full bg-white group-hover:bg-primary transition-colors w-full rounded-full absolute left-0"
          style={{ transform: `translateX(${(progress / (duration || 1)) * 100 - 100}%)` }}
        />
      </div>
      
      <span className="w-10">{formatTime(duration)}</span>
    </div>
  );
};
