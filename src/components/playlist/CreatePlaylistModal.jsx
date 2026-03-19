import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { GlassInput } from '../common/GlassInput';
import { GlassButton } from '../common/GlassButton';
import { usePlaylists } from '../../hooks/usePlaylists';
import { scaleIn } from '../../utils/variants';
import { toast } from 'sonner';

export const CreatePlaylistModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const { createPlaylist } = usePlaylists();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    try {
      setLoading(true);
      await createPlaylist(title.trim(), isPublic);
      toast.success('Playlist created');
      setTitle('');
      setIsPublic(false);
      onClose();
    } catch (error) {
      toast.error(error.message || 'Failed to create playlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            variants={scaleIn}
            initial="initial"
            animate="animate"
            exit="initial"
            className="relative w-full max-w-md z-10"
          >
            <GlassCard className="p-6 md:p-8 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight">Create Playlist</h2>
                <button onClick={onClose} className="text-muted-foreground hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium text-muted-foreground">Name</label>
                  <GlassInput
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="New Playlist"
                    autoFocus
                    required
                  />
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-muted-foreground">Make Public</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={isPublic}
                      onChange={(e) => setIsPublic(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-white/5"></div>
                  </label>
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <GlassButton type="button" variant="ghost" onClick={onClose}>Cancel</GlassButton>
                  <GlassButton type="submit" disabled={!title.trim() || loading} className="min-w-[100px]">
                    {loading ? <Loader2 size={18} className="animate-spin" /> : 'Create'}
                  </GlassButton>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
