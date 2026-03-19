import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Loader2, ArrowLeft } from 'lucide-react';
import { supabase } from '../services/supabase';
import { AnimatedPage } from '../components/common/AnimatedPage';
import { TrackList } from '../components/music/TrackList';
import { usePlayer } from '../hooks/usePlayer';

export const AlbumView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { playTrack } = usePlayer();
  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        setLoading(true);
        const { data: aData, error: aError } = await supabase
          .from('albums')
          .select('*, artists(id, name)')
          .eq('id', id)
          .single();
          
        if (aError) throw aError;
        setAlbum(aData);

        const { data: tData, error: tError } = await supabase
          .from('tracks')
          .select('*, albums(id, title, cover_url), artists(id, name)')
          .eq('album_id', id)
          .order('created_at', { ascending: true }); // Assuming sort order

        if (tError) throw tError;
        setTracks(tData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbum();
  }, [id]);

  if (loading) return <div className="p-12 flex justify-center"><Loader2 size={40} className="animate-spin text-primary" /></div>;
  if (!album) return <div className="p-12 text-center text-muted-foreground">Album not found</div>;

  const handlePlayAll = () => {
    if (tracks.length > 0) {
      playTrack(tracks[0], tracks);
    }
  };

  return (
    <AnimatedPage className="pb-24">
      <div className="relative pt-20 pb-8 px-4 md:px-8 bg-gradient-to-b from-[#157395]/40 to-background flex flex-col md:flex-row items-end gap-6 mb-8 overflow-hidden group">
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 md:left-8 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white/70 hover:text-white transition-colors z-10 hover:scale-105">
          <ArrowLeft size={20} />
        </button>

        {album.cover_url && (
            <div className="absolute inset-0 opacity-20 blur-[100px] pointer-events-none" style={{ backgroundImage: `url(${album.cover_url})`, backgroundSize: 'cover' }} />
        )}
        
        <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 shadow-[0_16px_40px_rgba(0,0,0,0.6)] rounded-xl overflow-hidden bg-white/5 z-10 transition-transform duration-500 group-hover:scale-[1.02]">
           <img src={album.cover_url || '/assets/default-cover.png'} alt={album.title} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col gap-2 z-10 w-full text-left md:mb-2">
          <span className="text-sm font-bold uppercase tracking-widest text-white/80">
            Album
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-2 line-clamp-2">
            {album.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-white/90">
             {/* If we had an artist image we could put a small circle here */}
            <span className="font-bold hover:underline cursor-pointer" onClick={() => navigate(`/artist/${album.artist_id}`)}>{album.artists?.name}</span>
            <span>•</span>
            <span>{new Date(album.release_date).getFullYear()}</span>
            <span>•</span>
            <span>{tracks.length} songs</span>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-6 mb-8">
          <button 
            onClick={handlePlayAll}
            className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(21,115,149,0.5)] hover:scale-105 transition-transform"
            disabled={tracks.length === 0}
          >
            <Play size={24} className="ml-1" fill="currentColor" />
          </button>
        </div>

        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-4 border border-white/5">
            <div className="flex items-center gap-4 px-4 py-2 border-b border-white/10 mb-2 text-sm text-muted-foreground uppercase tracking-wider font-semibold">
                <div className="w-8 text-center text-lg leading-none">#</div>
                <div className="w-10">Title</div>
                <div className="flex-1 min-w-0 pr-4"></div>
                <div className="w-12 text-right lg:pr-6">Duration</div>
            </div>
          <TrackList tracks={tracks} loading={false} />
        </div>
      </div>
    </AnimatedPage>
  );
};
