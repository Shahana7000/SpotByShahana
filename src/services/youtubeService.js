const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
const BASE_URL = 'https://www.googleapis.com/youtube/v3'

// Music video search
export const searchMusicVideo = async (trackTitle, artistName) => {
  const query = `${trackTitle} ${artistName} official music video`
  const res = await fetch(
    `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&videoCategoryId=10&maxResults=1&key=${API_KEY}`
  )
  const data = await res.json()
  
  if (!data.items || data.items.length === 0) return null
  
  const video = data.items[0]
  return {
    video_id: video.id.videoId,
    title: video.snippet.title,
    thumbnail: video.snippet.thumbnails.high.url,
    channel: video.snippet.channelTitle,
    embed_url: `https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&controls=1`,
    watch_url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
  }
}

// Search multiple videos
export const searchVideos = async (query, limit = 10) => {
  const res = await fetch(
    `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&videoCategoryId=10&maxResults=${limit}&key=${API_KEY}`
  )
  const data = await res.json()
  
  if (!data.items) return []
  
  return data.items.map(video => ({
    video_id: video.id.videoId,
    title: video.snippet.title,
    thumbnail: video.snippet.thumbnails.high.url,
    channel: video.snippet.channelTitle,
    embed_url: `https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&controls=1`,
    watch_url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
  }))
}

// Get video details
export const getVideoDetails = async (videoId) => {
  const res = await fetch(
    `${BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`
  )
  const data = await res.json()
  
  if (!data.items || data.items.length === 0) return null
  
  const video = data.items[0]
  return {
    video_id: video.id,
    title: video.snippet.title,
    description: video.snippet.description,
    thumbnail: video.snippet.thumbnails.high.url,
    channel: video.snippet.channelTitle,
    duration: video.contentDetails.duration,
    views: video.statistics.viewCount,
    embed_url: `https://www.youtube.com/embed/${video.id}?autoplay=1&controls=1`,
  }
}