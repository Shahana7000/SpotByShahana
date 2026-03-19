import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { AnimatedPage } from '../components/common/AnimatedPage';
import { useAuth } from '../hooks/useAuth';
import { TrackListContainer } from '../components/music/TrackListContainer';
import { SkeletonLoader } from '../components/common/SkeletonLoader';
import { AlbumCard } from '../components/music/AlbumCard';
import { ArtistCard } from '../components/music/ArtistCard';
import { useAlbums } from '../hooks/useAlbums';
import { useArtists } from '../hooks/useArtists';

export const Home = () => {
  const { user } = useAuth();
  const { albums, loading: albumsLoading } = useAlbums();
  const { artists, loading: artistsLoading } = useArtists();

  return (
    <AnimatedPage className="p-4 md:p-8 space-y-12 max-w-[1400px] mx-auto">
      <header className="mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold tracking-tight text-white"
        >
          Good {getGreeting()}{user?.user_metadata?.name ? `, ${user.user_metadata.name.split(' ')[0]}` : ''}
        </motion.h1>
      </header>

      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Trending Now</h2>
        <Suspense fallback={<SkeletonLoader type="list" count={5} />}>
          <TrackListContainer limit={5} />
        </Suspense>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Popular Albums</h2>
        {albumsLoading ? (
          <SkeletonLoader type="grid" count={4} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {albums.slice(0, 6).map(album => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Featured Artists</h2>
        {artistsLoading ? (
          <div className="flex gap-4 overflow-hidden"><SkeletonLoader type="grid" count={6} /></div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {artists.slice(0, 6).map(artist => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        )}
      </section>
    </AnimatedPage>
  );
};

const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) return 'Morning';
  if (currentHour < 18) return 'Afternoon';
  return 'Evening';
};
