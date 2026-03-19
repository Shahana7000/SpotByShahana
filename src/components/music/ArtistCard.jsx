import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../common/GlassCard';
import { cardVariants } from '../../utils/variants';

export const ArtistCard = React.memo(({ artist }) => {
  const navigate = useNavigate();

  return (
    <motion.div variants={cardVariants} whileHover={{ y: -8 }}>
      <GlassCard 
        hoverEffect 
        className="p-4 flex flex-col items-center gap-4 group h-full text-center"
        onClick={() => navigate(`/artist/${artist.id}`)}
      >
        <div className="relative w-full aspect-square rounded-full overflow-hidden bg-white/5 shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
          <img 
            src={artist.image_url || '/assets/default-cover.png'} 
            alt={artist.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col min-w-0 w-full mt-2">
          <h4 className="font-semibold text-white truncate text-base mb-1">{artist.name}</h4>
          <p className="text-sm text-muted-foreground truncate px-2 rounded-full border border-white/10 bg-white/5 max-w-max mx-auto">Artist</p>
        </div>
      </GlassCard>
    </motion.div>
  );
});

ArtistCard.displayName = 'ArtistCard';
