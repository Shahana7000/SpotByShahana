import { supabase } from './supabase.js';

export const getAlbums = async () => {
  const { data, error } = await supabase
    .from('albums')
    .select('*, artist:artists(name)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getAlbumById = async (id) => {
  const { data, error } = await supabase
    .from('albums')
    .select('*, artist:artists(*)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const getTracksByAlbum = async (albumId) => {
  const { data, error } = await supabase
    .from('tracks')
    .select('*, artist:artists(*)')
    .eq('album_id', albumId)
    .order('track_number', { ascending: true });

  if (error) throw error;
  return data;
};
