import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Loader2, ArrowLeft } from 'lucide-react';
import { supabase } from '../services/supabase';
import { AnimatedPage } from '../components/common/AnimatedPage';
import { TrackList } from '../components/music/TrackList';
import { usePlayer } from '../hooks/usePlayer';
import { formatNumber } from '../utils/formatTime';

export const PlaylistView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { playTrack } = usePlayer();
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        setLoading(true);
        // Get playlist details
        const { data: pData, error: pError } = await supabase
          .from('playlists')
          .select('*, profiles(name)')
          .eq('id', id)
          .single();
          
        if (pError) throw pError;
        setPlaylist(pData);

        // Get playlist tracks
        const { data: ptData, error: ptError } = await supabase
          .from('playlist_tracks')
          .select('tracks(*, albums(id, title, cover_url), artists(id, name))')
          .eq('playlist_id', id)
          .order('position', { ascending: true });

        if (ptError) throw ptError;
        setTracks(ptData.map(pt => pt.tracks));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylist();
  }, [id]);

  if (loading) return <div className="p-12 flex justify-center"><Loader2 size={40} className="animate-spin text-primary" /></div>;
  if (!playlist) return <div className="p-12 text-center text-muted-foreground">Playlist not found</div>;

  const handlePlayAll = () => {
    if (tracks.length > 0) {
      playTrack(tracks[0], tracks);
    }
  };

  return (
    <AnimatedPage className="pb-24">
      {/* Header Banner */}
      <div className="relative pt-20 pb-8 px-4 md:px-8 bg-gradient-to-b from-[#157395]/40 to-background flex flex-col md:flex-row items-end gap-6 mb-8 group overflow-hidden">
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 md:left-8 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white/70 hover:text-white transition-colors z-10 hover:scale-105">
          <ArrowLeft size={20} />
        </button>
        
        <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 shadow-[0_16px_40px_rgba(0,0,0,0.6)] rounded-xl overflow-hidden bg-white/5 flex items-center justify-center">
            {/* If playlists had covers */}
            <div className="grid grid-cols-2 grid-rows-2 w-full h-full opacity-60">
              <div className="bg-primary/30" />
              <div className="bg-blue-600/30" />
              <div className="bg-violet-600/30" />
              <div className="bg-primary/50" />
            </div>
            <Music size={64} className="absolute text-white/20" />
        </div>

        <div className="flex flex-col gap-2 z-10 w-full">
          <span className="text-sm font-bold uppercase tracking-widest text-white/80">
            {playlist.is_public ? 'Public Playlist' : 'Private Playlist'}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-2 line-clamp-2">
            {playlist.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-white/90">
            <span className="font-bold hover:underline cursor-pointer">{playlist.profiles?.name}</span>
            <span>•</span>
            <span>{formatNumber(tracks.length)} songs</span>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        {/* Action Bar */}
        <div className="flex items-center gap-6 mb-8">
          <button 
            onClick={handlePlayAll}
            className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(21,115,149,0.5)] hover:scale-105 transition-transform"
            disabled={tracks.length === 0}
          >
            <Play size={24} className="ml-1" fill="currentColor" />
          </button>
        </div>

        {/* Tracks List */}
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-4">
            <div className="flex items-center gap-4 px-4 py-2 border-b border-white/10 mb-2 text-sm text-muted-foreground uppercase tracking-wider font-semibold">
                <div className="w-8 text-center text-lg leading-none">#</div>
                <div className="w-10">Title</div>
                <div className="flex-1 min-w-0 pr-4"></div>
                <div className="hidden md:block flex-1 pr-4">Album</div>
                <div className="w-12 text-right lg:pr-6">Duration</div>
            </div>
          <TrackList tracks={tracks} loading={false} emptyMessage="No songs in this playlist yet." />
        </div>
      </div>
    </AnimatedPage>
  );
};

// Extracted Music icon because it's not imported at top
const Music = ({size, className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
    </svg>
)
