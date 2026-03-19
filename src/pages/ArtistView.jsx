import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Loader2, ArrowLeft } from 'lucide-react';
import { supabase } from '../services/supabase';
import { AnimatedPage } from '../components/common/AnimatedPage';
import { TrackList } from '../components/music/TrackList';
import { AlbumCard } from '../components/music/AlbumCard';
import { usePlayer } from '../hooks/usePlayer';
import { formatNumber } from '../utils/formatTime';

export const ArtistView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { playTrack } = usePlayer();
  const [artist, setArtist] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        setLoading(true);
        // Artist details
        const { data: aData, error: aError } = await supabase
          .from('artists')
          .select('*')
          .eq('id', id)
          .single();
          
        if (aError) throw aError;
        setArtist(aData);

        // Top tracks
        const { data: tData, error: tError } = await supabase
          .from('tracks')
          .select('*, albums(id, title, cover_url), artists(id, name)')
          .eq('artist_id', id)
          .order('play_count', { ascending: false })
          .limit(5);

        if (tError) throw tError;
        setTopTracks(tData);

        // Albums
        const { data: alData, error: alError } = await supabase
          .from('albums')
          .select('*, artists(id, name)')
          .eq('artist_id', id)
          .order('release_date', { ascending: false });
          
        if (alError) throw alError;
        setAlbums(alData);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArtistData();
  }, [id]);

  if (loading) return <div className="p-12 flex justify-center"><Loader2 size={40} className="animate-spin text-primary" /></div>;
  if (!artist) return <div className="p-12 text-center text-muted-foreground">Artist not found</div>;

  const handlePlayAll = () => {
    if (topTracks.length > 0) {
      playTrack(topTracks[0], topTracks);
    }
  };

  return (
    <AnimatedPage className="pb-24">
      {/* Immersive Header */}
      <div className="relative h-[300px] md:h-[400px] mb-8 overflow-hidden group">
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 md:left-8 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white/70 hover:text-white transition-colors z-20 hover:scale-105">
          <ArrowLeft size={20} />
        </button>

        <div className="absolute inset-0 z-0">
           <img 
               src={artist.image_url || '/assets/default-cover.png'} 
               alt={artist.name} 
               className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 p-4 md:p-8 z-10 w-full flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm font-bold text-blue-400">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Verified Artist
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-2 shadow-black drop-shadow-2xl">
                {artist.name}
            </h1>
            <p className="text-lg text-white/80 font-medium">
                {formatNumber(artist.monthly_listeners || 0)} monthly listeners
            </p>
        </div>
      </div>

      <div className="px-4 md:px-8 max-w-7xl mx-auto space-y-12">
        <div className="flex items-center gap-6">
          <button 
            onClick={handlePlayAll}
            className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(21,115,149,0.5)] hover:scale-105 transition-transform"
            disabled={topTracks.length === 0}
          >
            <Play size={24} className="ml-1" fill="currentColor" />
          </button>
          
          <button className="px-6 py-1.5 rounded-full border border-white/20 text-white font-bold tracking-widest text-sm hover:border-white transition-colors">
            FOLLOW
          </button>
        </div>

        {topTracks.length > 0 && (
            <section>
                <h2 className="text-2xl font-bold text-white mb-6">Popular</h2>
                <div className="bg-white/5 rounded-2xl p-4">
                  <TrackList tracks={topTracks} loading={false} />
                </div>
            </section>
        )}

        {albums.length > 0 && (
            <section>
                <h2 className="text-2xl font-bold text-white mb-6">Discography</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                    {albums.map(album => (
                        <AlbumCard key={album.id} album={album} />
                    ))}
                </div>
            </section>
        )}
      </div>
    </AnimatedPage>
  );
};
