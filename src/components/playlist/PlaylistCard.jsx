import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../common/GlassCard';
import { cardVariants } from '../../utils/variants';

export const PlaylistCard = React.memo(({ playlist }) => {
  const navigate = useNavigate();

  return (
    <motion.div variants={cardVariants} whileHover={{ y: -8 }}>
      <GlassCard 
        hoverEffect 
        className="p-4 flex flex-col gap-4 group h-full"
        onClick={() => navigate(`/playlist/${playlist.id}`)}
      >
        <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-white/5 shadow-[0_8px_24px_rgba(0,0,0,0.4)] flex items-center justify-center">
          {/* We might not have a cover for playlists initially, placeholder looks nice */}
          <div className="grid grid-cols-2 grid-rows-2 w-full h-full opacity-50">
            <div className="bg-primary/20" />
            <div className="bg-secondary/40" />
            <div className="bg-accent/30" />
            <div className="bg-primary/40" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="flex flex-col min-w-0">
          <h4 className="font-semibold text-white truncate text-base mb-1">{playlist.title}</h4>
          <p className="text-sm text-muted-foreground truncate">
            {playlist.is_public ? 'Public Playlist' : 'Private Playlist'}
          </p>
        </div>
      </GlassCard>
    </motion.div>
  );
});

PlaylistCard.displayName = 'PlaylistCard';
