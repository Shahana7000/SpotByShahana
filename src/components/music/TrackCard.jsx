import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { usePlayer } from '../../hooks/usePlayer';
import { cardVariants } from '../../utils/variants';

export const TrackCard = React.memo(({ track, queueContext = [] }) => {
  const { playTrack } = usePlayer();

  return (
    <motion.div variants={cardVariants} whileHover={{ y: -8 }}>
      <GlassCard 
        hoverEffect 
        className="p-4 flex flex-col gap-4 group h-full"
        onClick={() => playTrack(track, queueContext)}
      >
        <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-white/5 shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
          <img 
            src={track.album?.cover_url || '/assets/default-cover.png'} 
            alt={track.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(21,115,149,0.6)] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <Play size={24} className="text-white ml-1" fill="currentColor" />
            </div>
          </div>
        </div>

        <div className="flex flex-col min-w-0">
          <h4 className="font-semibold text-white truncate text-base mb-1">{track.title}</h4>
          <p className="text-sm text-muted-foreground truncate">{track.artist?.name}</p>
        </div>
      </GlassCard>
    </motion.div>
  );
});

TrackCard.displayName = 'TrackCard';
