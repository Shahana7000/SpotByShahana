const API_KEY = import.meta.env.VITE_LASTFM_API_KEY
const BASE_URL = 'https://ws.audioscrobbler.com/2.0'

// Format helpers
const formatTrack = (track) => ({
  id: `lastfm-${track.mbid || track.name}-${track.artist?.name || track.artist}`,
  title: track.name,
  artist: track.artist?.name || track.artist,
  album: track.album?.title || '',
  cover_url: track.image?.[3]?.['#text'] || 
             track.image?.[2]?.['#text'] || 
             '/assets/default-cover.png',
  play_count: track.playcount,
  listeners: track.listeners,
  url: track.url,
  audio_url: null, // YouTube se aayega
  video_url: null, // YouTube se aayega
  source: 'lastfm'
})

const formatArtist = (artist) => ({
  id: `lastfm-artist-${artist.mbid || artist.name}`,
  name: artist.name,
  image_url: artist.image?.[3]?.['#text'] || 
             artist.image?.[2]?.['#text'] || 
             '/assets/default-cover.png',
  listeners: artist.listeners,
  url: artist.url,
  source: 'lastfm'
})

const formatAlbum = (album) => {
  const artistName = typeof album.artist === 'string' ? album.artist : album.artist?.name || 'Unknown';
  return {
    id: `lastfm-album-${encodeURIComponent(artistName)}:::${encodeURIComponent(album.name)}`,
    title: album.name,
    artist: artistName,
    cover_url: album.image?.[3]?.['#text'] || 
               album.image?.[2]?.['#text'] || 
               '/assets/default-cover.png',
    url: album.url,
    source: 'lastfm'
  };
}

// =============================================
// TRENDING / CHARTS
// =============================================

// Global trending tracks
export const getGlobalTrending = async (limit = 20) => {
  const res = await fetch(
    `${BASE_URL}/?method=chart.gettoptracks&api_key=${API_KEY}&format=json&limit=${limit}`
  )
  const data = await res.json()
  return data.tracks.track.map(formatTrack)
}

// India trending tracks
export const getIndiaTrending = async (limit = 20) => {
  const res = await fetch(
    `${BASE_URL}/?method=geo.gettoptracks&country=india&api_key=${API_KEY}&format=json&limit=${limit}`
  )
  const data = await res.json()
  return data.tracks.track.map(formatTrack)
}

// Top artists globally
export const getTopArtists = async (limit = 20) => {
  const res = await fetch(
    `${BASE_URL}/?method=chart.gettopartists&api_key=${API_KEY}&format=json&limit=${limit}`
  )
  const data = await res.json()
  return data.artists.artist.map(formatArtist)
}

// =============================================
// SEARCH
// =============================================

// Search tracks
export const searchTracks = async (query, limit = 20) => {
  const res = await fetch(
    `${BASE_URL}/?method=track.search&track=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json&limit=${limit}`
  )
  const data = await res.json()
  return data.results.trackmatches.track.map(track => ({
    id: `lastfm-${track.mbid || track.name}`,
    title: track.name,
    artist: track.artist,
    cover_url: track.image?.[3]?.['#text'] || 
               track.image?.[2]?.['#text'] || 
               '/assets/default-cover.png',
    url: track.url,
    audio_url: null,
    video_url: null,
    source: 'lastfm'
  }))
}

// Search artists
export const searchArtists = async (query, limit = 20) => {
  const res = await fetch(
    `${BASE_URL}/?method=artist.search&artist=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json&limit=${limit}`
  )
  const data = await res.json()
  return data.results.artistmatches.artist.map(formatArtist)
}

// Search albums
export const searchAlbums = async (query, limit = 20) => {
  const res = await fetch(
    `${BASE_URL}/?method=album.search&album=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json&limit=${limit}`
  )
  const data = await res.json()
  return data.results.albummatches.album.map(formatAlbum)
}

// Search all
export const searchAll = async (query) => {
  const [tracks, artists, albums] = await Promise.all([
    searchTracks(query),
    searchArtists(query),
    searchAlbums(query),
  ])
  return { tracks, artists, albums }
}

// =============================================
// ARTIST
// =============================================

// Artist info
export const getArtistInfo = async (artistName) => {
  const res = await fetch(
    `${BASE_URL}/?method=artist.getinfo&artist=${encodeURIComponent(artistName)}&api_key=${API_KEY}&format=json`
  )
  const data = await res.json()
  const artist = data.artist
  return {
    id: `lastfm-artist-${artist.name}`,
    name: artist.name,
    image_url: artist.image?.[3]?.['#text'] || '/assets/default-cover.png',
    bio: artist.bio?.summary?.replace(/<[^>]*>/g, '').slice(0, 300),
    listeners: artist.stats?.listeners,
    playcount: artist.stats?.playcount,
    similar: artist.similar?.artist?.map(a => ({
      id: `lastfm-artist-${a.name}`,
      name: a.name,
      image_url: a.image?.[3]?.['#text'] || a.image?.[2]?.['#text'] || '/assets/default-cover.png'
    })) || [],
    source: 'lastfm'
  }
}

// Artist top tracks
export const getArtistTopTracks = async (artistName, limit = 20) => {
  const res = await fetch(
    `${BASE_URL}/?method=artist.gettoptracks&artist=${encodeURIComponent(artistName)}&api_key=${API_KEY}&format=json&limit=${limit}`
  )
  const data = await res.json()
  return data.toptracks.track.map(formatTrack)
}

// Artist top albums
export const getArtistTopAlbums = async (artistName, limit = 10) => {
  const res = await fetch(
    `${BASE_URL}/?method=artist.gettopalbums&artist=${encodeURIComponent(artistName)}&api_key=${API_KEY}&format=json&limit=${limit}`
  )
  const data = await res.json()
  return data.topalbums.album.map(formatAlbum)
}

// =============================================
// ALBUM
// =============================================

// Album info + tracks
export const getAlbumInfo = async (artistName, albumName) => {
  const res = await fetch(
    `${BASE_URL}/?method=album.getinfo&artist=${encodeURIComponent(artistName)}&album=${encodeURIComponent(albumName)}&api_key=${API_KEY}&format=json`
  )
  const data = await res.json()
  const album = data.album
  return {
    id: `lastfm-album-${album.name}`,
    title: album.name,
    artist: album.artist,
    cover_url: album.image?.[3]?.['#text'] || '/assets/default-cover.png',
    tracks: album.tracks?.track?.map(track => ({
      id: `lastfm-${track.name}`,
      title: track.name,
      artist: album.artist,
      duration: track.duration,
      audio_url: null,
      video_url: null,
      source: 'lastfm'
    })) || [],
    source: 'lastfm'
  }
}

// =============================================
// GENRE / TAGS
// =============================================

// Top tracks by genre/tag
export const getTracksByGenre = async (genre, limit = 20) => {
  const res = await fetch(
    `${BASE_URL}/?method=tag.gettoptracks&tag=${encodeURIComponent(genre)}&api_key=${API_KEY}&format=json&limit=${limit}`
  )
  const data = await res.json()
  return data.tracks.track.map(formatTrack)
}

// Top artists by genre
export const getArtistsByGenre = async (genre, limit = 20) => {
  const res = await fetch(
    `${BASE_URL}/?method=tag.gettopartists&tag=${encodeURIComponent(genre)}&api_key=${API_KEY}&format=json&limit=${limit}`
  )
  const data = await res.json()
  return data.topartists.artist.map(formatArtist)
}