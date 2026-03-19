BEGIN;

-- ==========================================
-- 1. CLEAN UP (Optional: Uncomment to clear existing data)
-- ==========================================
-- TRUNCATE public.play_history, public.liked_tracks, public.playlist_tracks, public.playlists, public.tracks, public.albums, public.artists CASCADE;

-- ==========================================
-- 2. INSERT ARTISTS (8 Artists)
-- ==========================================
INSERT INTO public.artists (id, name, bio, image_url, verified, created_at) VALUES
('a1000000-0000-0000-0000-000000000001', 'Arijit Singh', 'The voice of a generation, known for his soulful Bollywood playback singing.', 'https://picsum.photos/seed/arijit/300/300', true, now()),
('a1000000-0000-0000-0000-000000000002', 'The Weeknd', 'Canadian singer-songwriter known for his sonic versatility and dark lyrical themes.', 'https://picsum.photos/seed/weeknd/300/300', true, now()),
('a1000000-0000-0000-0000-000000000003', 'Dua Lipa', 'British-Albanian singer known for her signature disco-pop sound.', 'https://picsum.photos/seed/dua/300/300', true, now()),
('a1000000-0000-0000-0000-000000000004', 'Prateek Kuhad', 'Independent Indian singer-songwriter known for his intimate indie-folk music.', 'https://picsum.photos/seed/prateek/300/300', true, now()),
('a1000000-0000-0000-0000-000000000005', 'Badshah', 'Indian rapper and producer, a leading figure in the Indian commercial hip-hop scene.', 'https://picsum.photos/seed/badshah/300/300', true, now()),
('a1000000-0000-0000-0000-000000000006', 'Taylor Swift', 'American singer-songwriter whose discography spans genres and narrative songwriting.', 'https://picsum.photos/seed/taylor/300/300', true, now()),
('a1000000-0000-0000-0000-000000000007', 'Ritviz', 'Indian electronic musician known for his unique fusion of Hindustani classical and hip-hop.', 'https://picsum.photos/seed/ritviz/300/300', true, now()),
('a1000000-0000-0000-0000-000000000008', 'Local Train', 'Indian Hindi rock band known for their powerful live performances and anthemic songs.', 'https://picsum.photos/seed/localtrain/300/300', false, now());

-- ==========================================
-- 3. INSERT ALBUMS (12 Albums)
-- ==========================================
INSERT INTO public.albums (id, title, artist_id, cover_url, release_date, genre, created_at) VALUES
('b1000000-0000-0000-0000-000000000001', 'Soulful Nights', 'a1000000-0000-0000-0000-000000000001', 'https://picsum.photos/seed/soulful/400/400', '2023-05-15', 'Bollywood', now()),
('b1000000-0000-0000-0000-000000000002', 'After Hours', 'a1000000-0000-0000-0000-000000000002', 'https://picsum.photos/seed/afterhours/400/400', '2020-03-20', 'Electronic', now()),
('b1000000-0000-0000-0000-000000000003', 'Future Nostalgia', 'a1000000-0000-0000-0000-000000000003', 'https://picsum.photos/seed/future/400/400', '2020-03-27', 'Pop', now()),
('b1000000-0000-0000-0000-000000000004', 'cold/mess', 'a1000000-0000-0000-0000-000000000004', 'https://picsum.photos/seed/coldmess/400/400', '2018-07-13', 'Indie', now()),
('b1000000-0000-0000-0000-000000000005', 'The Power of Dreams', 'a1000000-0000-0000-0000-000000000005', 'https://picsum.photos/seed/dreams/400/400', '2021-08-07', 'Hip-Hop', now()),
('b1000000-0000-0000-0000-000000000006', 'Midnights', 'a1000000-0000-0000-0000-000000000006', 'https://picsum.photos/seed/midnights/400/400', '2022-10-21', 'Pop', now()),
('b1000000-0000-0000-0000-000000000007', 'Ved', 'a1000000-0000-0000-0000-000000000007', 'https://picsum.photos/seed/ved/400/400', '2019-12-01', 'Electronic', now()),
('b1000000-0000-0000-0000-000000000008', 'Aalas Ka Pedh', 'a1000000-0000-0000-0000-000000000008', 'https://picsum.photos/seed/aalas/400/400', '2015-09-17', 'Rock', now()),
('b1000000-0000-0000-0000-000000000009', 'Lover', 'a1000000-0000-0000-0000-000000000006', 'https://picsum.photos/seed/lover/400/400', '2019-08-23', 'Pop', now()),
('b1000000-0000-0000-0000-000000000010', 'Dawn FM', 'a1000000-0000-0000-0000-000000000002', 'https://picsum.photos/seed/dawn/400/400', '2022-01-07', 'Electronic', now()),
('b1000000-0000-0000-0000-000000000011', 'Dev', 'a1000000-0000-0000-0000-000000000007', 'https://picsum.photos/seed/dev/400/400', '2021-04-10', 'Electronic', now()),
('b1000000-0000-0000-0000-000000000012', 'Vultures', 'a1000000-0000-0000-0000-000000000008', 'https://picsum.photos/seed/vultures/400/400', '2024-02-10', 'Rock', now());

-- ==========================================
-- 4. INSERT TRACKS (30 Tracks)
-- ==========================================
INSERT INTO public.tracks (id, title, artist_id, album_id, audio_url, video_url, cover_url, duration, play_count, created_at) VALUES
(gen_random_uuid(), 'Tum Hi Ho', 'a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', NULL, 'https://picsum.photos/seed/t1/300/300', 262, 9542000, now()),
(gen_random_uuid(), 'Blinding Lights', 'a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000002', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', 'https://www.w3schools.com/html/mov_bbb.mp4', 'https://picsum.photos/seed/t2/300/300', 200, 84210000, now()),
(gen_random_uuid(), 'Levitating', 'a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000003', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', 'https://www.w3schools.com/html/movie.mp4', 'https://picsum.photos/seed/t3/300/300', 203, 7521000, now()),
(gen_random_uuid(), 'cold/mess', 'a1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000004', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', NULL, 'https://picsum.photos/seed/t4/300/300', 241, 4521000, now()),
(gen_random_uuid(), 'Genda Phool', 'a1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000005', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'https://picsum.photos/seed/t5/300/300', 170, 6521000, now()),
(gen_random_uuid(), 'Anti-Hero', 'a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000006', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 'https://picsum.photos/seed/t6/300/300', 200, 9521000, now()),
(gen_random_uuid(), 'Udd Gaye', 'a1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000007', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'https://picsum.photos/seed/t7/300/300', 180, 5521000, now()),
(gen_random_uuid(), 'Choo Lo', 'a1000000-0000-0000-0000-000000000008', 'b1000000-0000-0000-0000-000000000008', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', 'https://picsum.photos/seed/t8/300/300', 234, 4521000, now()),
(gen_random_uuid(), 'Kesariya', 'a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', NULL, 'https://picsum.photos/seed/t9/300/300', 268, 8521000, now()),
(gen_random_uuid(), 'Save Your Tears', 'a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000002', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', 'https://www.w3schools.com/html/mov_bbb.mp4', 'https://picsum.photos/seed/t10/300/300', 215, 75210000, now()),
(gen_random_uuid(), 'Physical', 'a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000003', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', 'https://www.w3schools.com/html/movie.mp4', 'https://picsum.photos/seed/t11/300/300', 193, 3521000, now()),
(gen_random_uuid(), 'Kasoor', 'a1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000004', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', NULL, 'https://picsum.photos/seed/t12/300/300', 194, 2521000, now()),
(gen_random_uuid(), 'Paagal', 'a1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000005', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', NULL, 'https://picsum.photos/seed/t13/300/300', 188, 5521000, now()),
(gen_random_uuid(), 'Bejeweled', 'a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000006', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'https://picsum.photos/seed/t14/300/300', 194, 1521000, now()),
(gen_random_uuid(), 'Sage', 'a1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000007', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', NULL, 'https://picsum.photos/seed/t15/300/300', 211, 3521000, now()),
(gen_random_uuid(), 'Dil Mere', 'a1000000-0000-0000-0000-000000000008', 'b1000000-0000-0000-0000-000000000008', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', NULL, 'https://picsum.photos/seed/t16/300/300', 260, 2521000, now()),
(gen_random_uuid(), 'Cruel Summer', 'a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000009', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', NULL, 'https://picsum.photos/seed/t17/300/300', 178, 95210000, now()),
(gen_random_uuid(), 'Lover', 'a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000009', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 'https://picsum.photos/seed/t18/300/300', 221, 6521000, now()),
(gen_random_uuid(), 'Gasoline', 'a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000010', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', NULL, 'https://picsum.photos/seed/t19/300/300', 212, 1252100, now()),
(gen_random_uuid(), 'Liggi', 'a1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000011', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'https://picsum.photos/seed/t20/300/300', 185, 8521000, now()),
(gen_random_uuid(), 'Khudi', 'a1000000-0000-0000-0000-000000000008', 'b1000000-0000-0000-0000-000000000012', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', NULL, 'https://picsum.photos/seed/t21/300/300', 255, 1521000, now()),
(gen_random_uuid(), 'Agar Tum Saath Ho', 'a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', NULL, 'https://picsum.photos/seed/t22/300/300', 281, 7521000, now()),
(gen_random_uuid(), 'Starboy', 'a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000002', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', 'https://picsum.photos/seed/t23/300/300', 230, 95210000, now()),
(gen_random_uuid(), 'Don''t Start Now', 'a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000003', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', NULL, 'https://picsum.photos/seed/t24/300/300', 183, 6521000, now()),
(gen_random_uuid(), 'Thandi Hawa', 'a1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000011', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', NULL, 'https://picsum.photos/seed/t25/300/300', 205, 3521000, now()),
(gen_random_uuid(), '100000 Hours', 'a1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000004', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', NULL, 'https://picsum.photos/seed/t26/300/300', 190, 1521000, now()),
(gen_random_uuid(), 'Blank Space', 'a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000009', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', 'https://www.w3schools.com/html/mov_bbb.mp4', 'https://picsum.photos/seed/t27/300/300', 231, 8521000, now()),
(gen_random_uuid(), 'The Hills', 'a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000002', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', NULL, 'https://picsum.photos/seed/t28/300/300', 242, 5521000, now()),
(gen_random_uuid(), 'Levitating (Remix)', 'a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000003', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', NULL, 'https://picsum.photos/seed/t29/300/300', 203, 1521000, now()),
(gen_random_uuid(), 'Mockingbird', 'a1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000005', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', NULL, 'https://picsum.photos/seed/t30/300/300', 250, 4521000, now());

-- ==========================================
-- 5. INSERT PLAYLISTS (5 Playlists)
-- ==========================================
-- Note: inserting a test profile first to ensure FK works if profiles table has RLS/FKs
INSERT INTO public.profiles (id, username, full_name, avatar_url, created_at)
VALUES ('00000000-0000-0000-0000-000000000001', 'testuser', 'Shahana Test', 'https://picsum.photos/seed/avatar1/200/200', now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.playlists (id, user_id, title, cover_url, is_public, created_at) VALUES
('p1000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Morning Vibes', 'https://picsum.photos/seed/p1/400/400', true, now()),
('p1000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Late Night Drive', 'https://picsum.photos/seed/p2/400/400', true, now()),
('p1000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'Workout Hits', 'https://picsum.photos/seed/p3/400/400', true, now()),
('p1000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', 'Chill Mode', 'https://picsum.photos/seed/p4/400/400', true, now()),
('p1000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001', 'Bollywood Classics', 'https://picsum.photos/seed/p5/400/400', true, now());

-- ==========================================
-- 6. INSERT PLAYLIST TRACKS
-- ==========================================
INSERT INTO public.playlist_tracks (id, playlist_id, track_id, position, added_at)
SELECT gen_random_uuid(), 'p1000000-0000-0000-0000-000000000001', id, rank() OVER (ORDER BY id), now()
FROM public.tracks LIMIT 8;

INSERT INTO public.playlist_tracks (id, playlist_id, track_id, position, added_at)
SELECT gen_random_uuid(), 'p1000000-0000-0000-0000-000000000002', id, rank() OVER (ORDER BY id), now()
FROM public.tracks OFFSET 8 LIMIT 7;

INSERT INTO public.playlist_tracks (id, playlist_id, track_id, position, added_at)
SELECT gen_random_uuid(), 'p1000000-0000-0000-0000-000000000003', id, rank() OVER (ORDER BY id), now()
FROM public.tracks OFFSET 15 LIMIT 6;

INSERT INTO public.playlist_tracks (id, playlist_id, track_id, position, added_at)
SELECT gen_random_uuid(), 'p1000000-0000-0000-0000-000000000004', id, rank() OVER (ORDER BY id), now()
FROM public.tracks OFFSET 21 LIMIT 5;

INSERT INTO public.playlist_tracks (id, playlist_id, track_id, position, added_at)
SELECT gen_random_uuid(), 'p1000000-0000-0000-0000-000000000005', id, rank() OVER (ORDER BY id), now()
FROM public.tracks OFFSET 0 LIMIT 8;

COMMIT;
