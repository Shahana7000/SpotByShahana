const CLIENT_ID = import.meta.env.VITE_JAMENDO_CLIENT_ID
const BASE_URL = 'https://api.jamendo.com/v3.0'

// =============================================
// FORMAT HELPERS
// =============================================
const formatTrack = (track) => ({
  id: track.id,
  title: track.name,
  artist: track.artist_name,
  artist_id: track.artist_id,
  album: track.album_name,
  album_id: track.album_id,
  audio_url: track.audio,
  cover_url: track.image,
  duration: track.duration,
  release_date: track.releasedate,
  share_url: track.shareurl,
  video_url: null,
})

const formatAlbum = (album) => ({
  id: album.id,
  title: album.name,
  artist: album.artist_name,
  artist_id: album.artist_id,
  cover_url: album.image,
  release_date: album.releasedate,
})

const formatArtist = (artist) => ({
  id: artist.id,
  name: artist.name,
  image_url: artist.image,
  website: artist.website,
})

// =============================================
// TRACKS
// =============================================
export const getTrendingTracks = async (limit = 20) => {
  const res = await fetch(
    `${BASE_URL}/tracks/?client_id=${CLIENT_ID}&format=json&limit=${limit}&boost=popularity_total&audioformat=mp32`
  )
  const data = await res.json()
  return data.results.map(formatTrack)
}

export const searchTracks = async (query, limit = 20) => {
  const res = await fetch(
    `${BASE_URL}/tracks/?client_id=${CLIENT_ID}&format=json&limit=${limit}&search=${query}&audioformat=mp32`
  )
  const data = await res.json()
  return data.results.map(formatTrack)
}

export const getTracksByGenre = async (genre, limit = 20) => {
  const res = await fetch(
    `${BASE_URL}/tracks/?client_id=${CLIENT_ID}&format=json&limit=${limit}&tags=${genre}&audioformat=mp32`
  )
  const data = await res.json()
  return data.results.map(formatTrack)
}

export const getArtistTracks = async (artistId, limit = 20) => {
  const res = await fetch(
    `${BASE_URL}/tracks/?client_id=${CLIENT_ID}&format=json&limit=${limit}&artist_id=${artistId}&audioformat=mp32`
  )
  const data = await res.json()
  return data.results.map(formatTrack)
}

export const getAlbumTracks = async (albumId) => {
  const res = await fetch(
    `${BASE_URL}/tracks/?client_id=${CLIENT_ID}&format=json&limit=50&album_id=${albumId}&audioformat=mp32`
  )
  const data = await res.json()
  return data.results.map(formatTrack)
}

// =============================================
// ALBUMS
// =============================================
export const getPopularAlbums = async (limit = 20) => {
  const res = await fetch(
    `${BASE_URL}/albums/?client_id=${CLIENT_ID}&format=json&limit=${limit}&boost=popularity_total`
  )
  const data = await res.json()
  return data.results.map(formatAlbum)
}

export const searchAlbums = async (query, limit = 20) => {
  const res = await fetch(
    `${BASE_URL}/albums/?client_id=${CLIENT_ID}&format=json&limit=${limit}&namesearch=${query}`
  )
  const data = await res.json()
  return data.results.map(formatAlbum)
}

export const getAlbumById = async (albumId) => {
  const res = await fetch(
    `${BASE_URL}/albums/?client_id=${CLIENT_ID}&format=json&id=${albumId}`
  )
  const data = await res.json()
  return data.results.map(formatAlbum)[0]
}

// =============================================
// ARTISTS
// =============================================
export const getPopularArtists = async (limit = 20) => {
  const res = await fetch(
    `${BASE_URL}/artists/?client_id=${CLIENT_ID}&format=json&limit=${limit}&boost=popularity_total`
  )
  const data = await res.json()
  return data.results.map(formatArtist)
}

export const searchArtists = async (query, limit = 20) => {
  const res = await fetch(
    `${BASE_URL}/artists/?client_id=${CLIENT_ID}&format=json&limit=${limit}&namesearch=${query}`
  )
  const data = await res.json()
  return data.results.map(formatArtist)
}

export const getArtistById = async (artistId) => {
  const res = await fetch(
    `${BASE_URL}/artists/?client_id=${CLIENT_ID}&format=json&id=${artistId}`
  )
  const data = await res.json()
  return data.results.map(formatArtist)[0]
}

// =============================================
// SEARCH ALL
// =============================================
export const searchAll = async (query) => {
  const [tracks, albums, artists] = await Promise.all([
    searchTracks(query),
    searchAlbums(query),
    searchArtists(query),
  ])
  return { tracks, albums, artists }
}