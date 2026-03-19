import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AnimatedPage } from '../components/common/AnimatedPage';
import { useAuth } from '../hooks/useAuth';
import { SkeletonLoader } from '../components/common/SkeletonLoader';
import { AlbumCard } from '../components/music/AlbumCard';
import { ArtistCard } from '../components/music/ArtistCard';
import { TrackCard } from '../components/music/TrackCard';
import { 
  getTrendingTracks, 
  getPopularAlbums, 
  getPopularArtists 
} from '../services/jamendoService';

export const Home = () => {
  const { user } = useAuth();
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [tracksLoading, setTracksLoading] = useState(true);
  const [albumsLoading, setAlbumsLoading] = useState(true);
  const [artistsLoading, setArtistsLoading] = useState(true);

  // Trending Tracks
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setTracksLoading(true)
        const data = await getTrendingTracks(5)
        setTracks(data)
      } catch (err) {
        console.error('Tracks error:', err)
      } finally {
        setTracksLoading(false)
      }
    }
    fetchTracks()
  }, [])

  // Popular Albums
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setAlbumsLoading(true)
        const data = await getPopularAlbums(6)
        setAlbums(data)
      } catch (err) {
        console.error('Albums error:', err)
      } finally {
        setAlbumsLoading(false)
      }
    }
    fetchAlbums()
  }, [])

  // Featured Artists
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setArtistsLoading(true)
        const data = await getPopularArtists(6)
        setArtists(data)
      } catch (err) {
        console.error('Artists error:', err)
      } finally {
        setArtistsLoading(false)
      }
    }
    fetchArtists()
  }, [])

  return (
    <AnimatedPage className="p-4 md:p-8 space-y-12 max-w-[1400px] mx-auto">
      <header className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold tracking-tight text-white"
        >
          Good {getGreeting()}{user?.user_metadata?.full_name 
            ? `, ${user.user_metadata.full_name.split(' ')[0]}` 
            : user?.user_metadata?.name 
            ? `, ${user.user_metadata.name.split(' ')[0]}` 
            : ''}
        </motion.h1>
      </header>

      {/* Trending Tracks */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Trending Now</h2>
        {tracksLoading ? (
          <SkeletonLoader type="list" count={5} />
        ) : tracks.length === 0 ? (
          <p className="text-white/50">No tracks found</p>
        ) : (
          <div className="space-y-2">
            {tracks.map((track, index) => (
              <TrackCard key={track.id} track={track} index={index} />
            ))}
          </div>
        )}
      </section>

      {/* Popular Albums */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Popular Albums</h2>
        {albumsLoading ? (
          <SkeletonLoader type="grid" count={6} />
        ) : albums.length === 0 ? (
          <p className="text-white/50">No albums found</p>
        ) : (
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
            initial="initial"
            animate="animate"
            variants={{
              animate: { transition: { staggerChildren: 0.07 } }
            }}
          >
            {albums.map(album => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </motion.div>
        )}
      </section>

      {/* Featured Artists */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Featured Artists</h2>
        {artistsLoading ? (
          <SkeletonLoader type="grid" count={6} />
        ) : artists.length === 0 ? (
          <p className="text-white/50">No artists found</p>
        ) : (
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
            initial="initial"
            animate="animate"
            variants={{
              animate: { transition: { staggerChildren: 0.07 } }
            }}
          >
            {artists.map(artist => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </motion.div>
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
