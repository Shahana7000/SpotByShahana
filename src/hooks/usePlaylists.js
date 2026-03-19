import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { getUserPlaylists, createPlaylist as apiCreate, deletePlaylist as apiDelete, getPlaylistTracks } from '../services/playlistService';

export const usePlaylists = () => {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlaylists = useCallback(async () => {
    if (!user) {
      setPlaylists([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await getUserPlaylists(user.id);
      setPlaylists(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  const createPlaylist = async (title, isPublic = false) => {
    if (!user) return;
    try {
      const newPlaylist = await apiCreate(user.id, title, isPublic);
      setPlaylists(prev => [newPlaylist, ...prev]);
      return newPlaylist;
    } catch (err) {
      throw err;
    }
  };

  const deletePlaylist = async (id) => {
    try {
      await apiDelete(id);
      setPlaylists(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      throw err;
    }
  };

  return { playlists, loading, error, refetch: fetchPlaylists, createPlaylist, deletePlaylist };
};
