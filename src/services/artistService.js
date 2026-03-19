import { supabase } from './supabase';

export const getArtists = async () => {
  const { data, error } = await supabase
    .from('artists')
    .select('*')
    .order('name', { ascending: true });

  if (error) throw error;
  return data;
};

export const getArtistById = async (id) => {
  const { data, error } = await supabase
    .from('artists')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const getArtistTopTracks = async (artistId) => {
  const { data, error } = await supabase
    .from('tracks')
    .select('*, album:albums(title, cover_url)')
    .eq('artist_id', artistId)
    // Order by theoretically top tracks or plays
    .limit(5);

  if (error) throw error;
  return data;
};
