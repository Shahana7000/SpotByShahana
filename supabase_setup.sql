-- Enable Row Level Security
ALTER TABLE public.artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playlist_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.play_history ENABLE ROW LEVEL SECURITY;

-- 1. Artists, Albums, Tracks: Anyone (logged in or out) can READ (SELECT)
CREATE POLICY "Public read access for artists" ON public.artists FOR SELECT USING (true);
CREATE POLICY "Public read access for albums" ON public.albums FOR SELECT USING (true);
CREATE POLICY "Public read access for tracks" ON public.tracks FOR SELECT USING (true);

-- 2. Playlists: Users can manage their own playlists
CREATE POLICY "Users can select their own playlists" ON public.playlists FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own playlists" ON public.playlists FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own playlists" ON public.playlists FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own playlists" ON public.playlists FOR DELETE USING (auth.uid() = user_id);

-- 3. Playlist Tracks: Users can manage tracks in their playlists
-- Note: Simplified policy, assumes user only adds to their own playlists (handled by app logic)
CREATE POLICY "Users can manage their playlist tracks" ON public.playlist_tracks FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.playlists 
    WHERE public.playlists.id = public.playlist_tracks.playlist_id 
    AND public.playlists.user_id = auth.uid()
  )
);

-- 4. Likes: Users can manage their own likes
CREATE POLICY "Users can manage their own likes" ON public.likes FOR ALL USING (auth.uid() = user_id);

-- 5. Play History: Users can manage their own history
CREATE POLICY "Users can manage their own play history" ON public.play_history FOR ALL USING (auth.uid() = user_id);
