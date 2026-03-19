import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../common/GlassCard';
import { cardVariants } from '../../utils/variants';

export const AlbumCard = React.memo(({ album }) => {
  const navigate = useNavigate();

  return (
    <motion.div variants={cardVariants} whileHover={{ y: -8 }}>
      <GlassCard 
        hoverEffect 
        className="p-4 flex flex-col gap-4 group h-full"
        onClick={() => navigate(`/album/${album.id}`)}
      >
        <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-white/5 shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
          <img 
            src={album.cover_url || '/assets/default-cover.png'} 
            alt={album.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col min-w-0">
          <h4 className="font-semibold text-white truncate text-base mb-1">{album.title}</h4>
          <p className="text-sm text-muted-foreground truncate">
            {new Date(album.release_date).getFullYear()} • {album.artist?.name || 'Artist'}
          </p>
        </div>
      </GlassCard>
    </motion.div>
  );
});

AlbumCard.displayName = 'AlbumCard';
