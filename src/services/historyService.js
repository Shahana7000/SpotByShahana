import { supabase } from './supabase';

export const getPlayHistory = async (userId) => {
  const { data, error } = await supabase
    .from('play_history')
    .select('track:tracks(*, artist:artists(*), album:albums(*)), played_at')
    .eq('user_id', userId)
    .order('played_at', { ascending: false })
    .limit(50);

  if (error) throw error;
  // Make the structure flat like a standard track list, but keeping played_at
  return data.map(h => ({ ...h.track, played_at: h.played_at }));
};

export const addToHistory = async (userId, trackId) => {
  const { error } = await supabase
    .from('play_history')
    .insert({ user_id: userId, track_id: trackId });

  if (error) throw error;
};

export const clearHistory = async (userId) => {
  const { error } = await supabase
    .from('play_history')
    .delete()
    .eq('user_id', userId);

  if (error) throw error;
};
