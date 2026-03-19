import React, { useRef, useEffect, useState } from 'react';
import { usePlayer } from '../../hooks/usePlayer';
import { motion, AnimatePresence } from 'framer-motion';
import { searchMusicVideo } from '../../services/youtubeService';

export const VideoPlayer = () => {
  const videoRef = useRef(null);
  const iframeRef = useRef(null);
  const { currentTrack, isPlaying, volume, isMuted, playerMode, setProgress, setDuration, next } = usePlayer();
  const [youtubeVideo, setYoutubeVideo] = useState(null)
  const [loadingYoutube, setLoadingYoutube] = useState(false)
  const [videoMode, setVideoMode] = useState('direct') // 'direct' | 'youtube'

  // Decide video mode when track changes
  useEffect(() => {
    if (!currentTrack || playerMode !== 'video') return

    if (currentTrack.video_url) {
      // Direct video available
      setVideoMode('direct')
      setYoutubeVideo(null)
    } else {
      // Search YouTube for music video
      setVideoMode('youtube')
      fetchYoutubeVideo()
    }
  }, [currentTrack, playerMode])

  const fetchYoutubeVideo = async () => {
    if (!currentTrack) return
    try {
      setLoadingYoutube(true)
      const video = await searchMusicVideo(
        currentTrack.title,
        currentTrack.artist
      )
      setYoutubeVideo(video)
    } catch (err) {
      console.error('YouTube search error:', err)
      setYoutubeVideo(null)
    } finally {
      setLoadingYoutube(false)
    }
  }

  // Direct video controls
  useEffect(() => {
    if (!videoRef.current || videoMode !== 'direct') return
    if (isPlaying) {
      videoRef.current.play().catch(console.error)
    } else {
      videoRef.current.pause()
    }
  }, [isPlaying, currentTrack, videoMode])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const handleTimeUpdate = () => {
    if (videoRef.current) setProgress(videoRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration)
  }

  // Dont render if not in video mode
  if (!currentTrack || playerMode !== 'video') return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentTrack.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative group"
      >

        {/* Direct Video */}
        {videoMode === 'direct' && currentTrack.video_url && (
          <video
            ref={videoRef}
            src={currentTrack.video_url}
            className="w-full h-full object-contain"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={next}
            playsInline
          />
        )}

        {/* YouTube Video */}
        {videoMode === 'youtube' && (
          <>
            {loadingYoutube ? (
              // Loading state
              <div className="w-full h-full flex flex-col items-center justify-center bg-black/80 gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full"
                />
                <p className="text-white/50 text-sm">
                  Finding music video...
                </p>
              </div>
            ) : youtubeVideo ? (
              // YouTube iframe
              <iframe
                ref={iframeRef}
                src={`${youtubeVideo.embed_url}&mute=${isMuted ? 1 : 0}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={youtubeVideo.title}
              />
            ) : (
              // No video found
              <div className="w-full h-full flex flex-col items-center justify-center bg-black/80 gap-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                  <span className="text-3xl">🎵</span>
                </div>
                <div className="text-center">
                  <p className="text-white/70 font-medium">
                    No video available
                  </p>
                  <p className="text-white/30 text-sm mt-1">
                    {currentTrack.title} — {currentTrack.artist}
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Track info overlay — bottom left */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <p className="text-white text-xs font-medium truncate max-w-[200px]">
            {currentTrack.title}
          </p>
          <p className="text-white/60 text-xs truncate max-w-[200px]">
            {currentTrack.artist}
          </p>
        </motion.div>

        {/* YouTube badge */}
        {videoMode === 'youtube' && youtubeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-3 right-3 bg-red-600 px-2 py-1 rounded text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            YouTube
          </motion.div>
        )}

      </motion.div>
    </AnimatePresence>
  )
}
