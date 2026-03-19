import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { getLikedTracks, toggleLike as apiToggleLike } from '../services/trackService';

export const useLiked = () => {
  const { user } = useAuth();
  const [likedTracks, setLikedTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLikedTracks = useCallback(async () => {
    if (!user) {
      setLikedTracks([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await getLikedTracks(user.id);
      setLikedTracks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchLikedTracks();
  }, [fetchLikedTracks]);

  const isLiked = useCallback((trackId) => {
    return likedTracks.some(t => t.id === trackId);
  }, [likedTracks]);

  const toggleLike = async (track) => {
    if (!user) return;
    const currentlyLiked = isLiked(track.id);
    
    // Optimistic update
    if (currentlyLiked) {
      setLikedTracks(prev => prev.filter(t => t.id !== track.id));
    } else {
      setLikedTracks(prev => [track, ...prev]);
    }

    try {
      await apiToggleLike(user.id, track.id, currentlyLiked);
    } catch (err) {
      // Revert on error
      fetchLikedTracks();
      throw err;
    }
  };

  return { likedTracks, loading, error, isLiked, toggleLike, refetch: fetchLikedTracks };
};
