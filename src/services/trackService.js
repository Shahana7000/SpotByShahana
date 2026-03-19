import { supabase } from './supabase';

export const getTracks = async () => {
  /* Note: Assuming 'tracks' table exists handling audio/video files */
  const { data, error } = await supabase
    .from('tracks')
    .select(`
      *,
      artist:artists(id, name, image_url),
      album:albums(id, title, cover_url)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getTrackById = async (id) => {
  const { data, error } = await supabase
    .from('tracks')
    .select('*, artist:artists(*), album:albums(*)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const searchTracks = async (query) => {
  const { data, error } = await supabase
    .from('tracks')
    .select('*, artist:artists(*), album:albums(*)')
    .ilike('title', `%${query}%`);

  if (error) throw error;
  return data;
};

export const incrementPlayCount = async (id) => {
  // Uses an RPC or an update if we have a plays column
  // This is a placeholder for actual increment logic
  return true;
};

export const getLikedTracks = async (userId) => {
  const { data, error } = await supabase
    .from('liked_tracks')
    .select('track:tracks(*, artist:artists(*), album:albums(*))')
    .eq('user_id', userId);

  if (error) throw error;
  return data.map(like => like.track);
};

export const toggleLike = async (userId, trackId, isCurrentlyLiked) => {
  if (isCurrentlyLiked) {
    const { error } = await supabase
      .from('liked_tracks')
      .delete()
      .match({ user_id: userId, track_id: trackId });
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from('liked_tracks')
      .insert({ user_id: userId, track_id: trackId });
    if (error) throw error;
  }
};
