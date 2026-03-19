import { supabase } from './supabase';

export const getUserPlaylists = async (userId) => {
  const { data, error } = await supabase
    .from('playlists')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const createPlaylist = async (userId, title, isPublic = false) => {
  const { data, error } = await supabase
    .from('playlists')
    .insert({ user_id: userId, title, is_public: isPublic })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getPlaylistTracks = async (playlistId) => {
  const { data, error } = await supabase
    .from('playlist_tracks')
    .select('track:tracks(*, artist:artists(*), album:albums(*))')
    .eq('playlist_id', playlistId)
    .order('position', { ascending: true });

  if (error) throw error;
  return data.map(pt => pt.track);
};

export const addTrackToPlaylist = async (playlistId, trackId, position = 0) => {
  const { error } = await supabase
    .from('playlist_tracks')
    .insert({ playlist_id: playlistId, track_id: trackId, position });

  if (error) throw error;
};

export const deletePlaylist = async (playlistId) => {
  const { error } = await supabase
    .from('playlists')
    .delete()
    .eq('id', playlistId);
    
  if (error) throw error;
};
