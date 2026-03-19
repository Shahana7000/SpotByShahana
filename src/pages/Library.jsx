import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatedPage } from '../components/common/AnimatedPage';
import { usePlaylists } from '../hooks/usePlaylists';
import { useLiked } from '../hooks/useLiked';
import { PlaylistCard } from '../components/playlist/PlaylistCard';
import { TrackList } from '../components/music/TrackList';
import { GlassButton } from '../components/common/GlassButton';
import { Plus, Heart } from 'lucide-react';
import { CreatePlaylistModal } from '../components/playlist/CreatePlaylistModal';

export const Library = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname.includes('liked') ? 'liked' : 'playlists');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (location.pathname.includes('liked')) {
      setActiveTab('liked');
    } else {
      setActiveTab('playlists');
    }
  }, [location.pathname]);
  const { playlists, loading: playlistsLoading } = usePlaylists();
  const { likedTracks, loading: likedLoading } = useLiked();
  const navigate = useNavigate();

  return (
    <AnimatedPage className="p-4 md:p-8 max-w-[1400px] mx-auto min-h-full">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">Your Library</h1>
          <div className="flex items-center gap-3">
            <TabButton active={activeTab === 'playlists'} onClick={() => setActiveTab('playlists')}>
              Playlists
            </TabButton>
            <TabButton active={activeTab === 'liked'} onClick={() => setActiveTab('liked')}>
              Liked Songs
            </TabButton>
          </div>
        </div>
        
        {activeTab === 'playlists' && (
          <GlassButton onClick={() => setIsModalOpen(true)} className="rounded-full shrink-0">
            <Plus size={18} className="mr-2" />
            Create Playlist
          </GlassButton>
        )}
      </header>

      {activeTab === 'playlists' ? (
        playlistsLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="aspect-square bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : playlists.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {/* Special Liked Songs Card in the playlist grid */}
            <div 
              onClick={() => setActiveTab('liked')}
              className="aspect-square bg-gradient-to-br from-primary via-blue-600 to-violet-800 rounded-xl p-4 flex flex-col justify-end cursor-pointer hover:scale-[1.02] transition-transform shadow-lg group relative overflow-hidden"
            >
              <Heart size={64} className="absolute right-[-10px] bottom-[-10px] text-white/20 group-hover:scale-110 transition-transform" fill="currentColor" />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-1">Liked Songs</h3>
                <p className="text-white/80 font-medium">{likedTracks.length} liked songs</p>
              </div>
            </div>
            
            {playlists.map(playlist => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        ) : (
          <div className="text-center p-12 max-w-md mx-auto">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Create your first playlist</h3>
            <p className="text-muted-foreground mb-6">It's easy, we'll help you.</p>
            <GlassButton onClick={() => setIsModalOpen(true)}>Create playlist</GlassButton>
          </div>
        )
      ) : (
        <div className="bg-white/5 rounded-2xl p-4 md:p-6 backdrop-blur-xl border border-white/5">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-violet-600 rounded-lg flex items-center justify-center shadow-lg">
              <Heart size={32} className="text-white" fill="white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Liked Songs</h2>
              <p className="text-muted-foreground">{likedTracks.length} songs</p>
            </div>
          </div>
          <TrackList tracks={likedTracks} loading={likedLoading} emptyMessage="You haven't liked any songs yet." />
        </div>
      )}

      <CreatePlaylistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </AnimatedPage>
  );
};

const TabButton = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
      active 
        ? 'bg-white text-black shadow-md' 
        : 'bg-white/10 text-white hover:bg-white/20 border border-transparent'
    }`}
  >
    {children}
  </button>
);
