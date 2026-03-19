import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Heart } from 'lucide-react';
import { cn } from '../../utils/cn';
import { formatTime } from '../../utils/formatTime';
import { usePlayer } from '../../hooks/usePlayer';
import { useLiked } from '../../hooks/useLiked';

export const TrackRow = React.memo(({ track, index, queueContext = [] }) => {
  const { currentTrack, isPlaying, playTrack, pause } = usePlayer();
  const { isLiked, toggleLike } = useLiked();

  const isCurrentTrack = currentTrack?.id === track.id;
  const isLikedTrack = isLiked(track.id);

  const handlePlayPause = (e) => {
    e.stopPropagation();
    if (isCurrentTrack) {
      isPlaying ? pause() : playTrack(track, queueContext);
    } else {
      playTrack(track, queueContext);
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    toggleLike(track);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01, x: 4 }}
      className={cn(
        "flex items-center gap-4 px-4 py-2 rounded-xl group hover:bg-white/5 cursor-pointer transition-colors w-full",
        isCurrentTrack && "bg-white/10"
      )}
      onClick={() => playTrack(track, queueContext)}
    >
      <div className="w-8 text-center text-sm text-muted-foreground font-medium flex items-center justify-center shrink-0">
        <div className="hidden group-hover:block" onClick={handlePlayPause}>
          {isCurrentTrack && isPlaying ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white ml-0.5" />}
        </div>
        <span className={cn("block group-hover:hidden", isCurrentTrack && "text-primary")}>
          {isCurrentTrack ? (
            <div className="flex gap-0.5 items-end justify-center h-4">
              <div className="w-1 h-2 bg-primary animate-pulse" style={{ animationDelay: '0s' }} />
              <div className="w-1 h-3 bg-primary animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-1 h-4 bg-primary animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          ) : (
            index + 1
          )}
        </span>
      </div>

      <div className="relative w-10 h-10 rounded shadow flex-shrink-0 overflow-hidden bg-white/5">
        <img src={track.album?.cover_url || '/assets/default-cover.png'} alt={track.title} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col flex-1 min-w-0 pr-4">
        <span className={cn("text-base truncate font-medium", isCurrentTrack ? "text-primary" : "text-white")}>
          {track.title}
        </span>
        <span className="text-sm text-muted-foreground truncate hover:underline">{track.artist?.name}</span>
      </div>

      <div className="hidden md:flex flex-1 min-w-0 pr-4 items-center">
        <span className="text-sm text-muted-foreground truncate hover:underline">{track.album?.title}</span>
      </div>

      <div className="flex items-center gap-4 shrink-0 px-2 lg:px-4">
        <motion.button 
          whileTap={{ scale: 1.4 }}
          onClick={handleLike}
          className={cn(
            "opacity-0 transition-opacity focus:opacity-100 group-hover:opacity-100",
            isLikedTrack ? "opacity-100 text-primary" : "text-muted-foreground hover:text-white"
          )}
        >
          <Heart size={18} fill={isLikedTrack ? "currentColor" : "none"} />
        </motion.button>
        <div className="text-sm text-muted-foreground w-12 text-right">
          {formatTime(track.duration)}
        </div>
      </div>
    </motion.div>
  );
});

TrackRow.displayName = 'TrackRow';
