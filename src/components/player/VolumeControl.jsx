import React from 'react';
import { usePlayer } from '../../hooks/usePlayer';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';
import { cn } from '../../utils/cn';

export const VolumeControl = () => {
  const { volume, setVolume, isMuted, toggleMute } = usePlayer();

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX size={20} />;
    if (volume < 0.5) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };

  const handleDrag = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setVolume(x / rect.width);
  };

  return (
    <div className="flex items-center gap-2 max-w-[120px] w-full group">
      <button 
        onClick={toggleMute}
        className="text-muted-foreground hover:text-white transition-colors"
      >
        {getVolumeIcon()}
      </button>
      
      <div 
        className="h-1.5 flex-1 bg-white/10 rounded-full cursor-pointer relative overflow-hidden flex items-center"
        onClick={handleDrag}
        onDrag={handleDrag}
      >
        <div 
          className="h-full bg-white group-hover:bg-primary transition-colors w-full rounded-full absolute left-0"
          style={{ transform: `translateX(${(isMuted ? 0 : volume) * 100 - 100}%)` }}
        />
      </div>
    </div>
  );
};
