// import React, { useEffect, useRef, useState } from 'react';
// import YouTube from 'react-youtube';
// import { usePlayer } from '../../hooks/usePlayer';
// import { motion, AnimatePresence } from 'framer-motion';
// import { cn } from '../../utils/cn';

// export const YouTubePlayer = () => {
//   const { 
//     youtubeVideoId, 
//     isPlaying, 
//     volume, 
//     isMuted, 
//     seekTime, 
//     clearSeek,
//     setProgress,
//     setDuration,
//     playerMode,
//     next
//   } = usePlayer();
  
//   const playerRef = useRef(null);
//   const [isReady, setIsReady] = useState(false);
//   const progressInterval = useRef(null);

//   // Sync play/pause
//   useEffect(() => {
//     if (isReady && playerRef.current) {
//       if (isPlaying) {
//         playerRef.current.playVideo();
//       } else {
//         playerRef.current.pauseVideo();
//       }
//     }
//   }, [isPlaying, isReady]);

//   // Sync volume
//   useEffect(() => {
//     if (isReady && playerRef.current) {
//       if (isMuted) {
//         playerRef.current.mute();
//       } else {
//         playerRef.current.unMute();
//         playerRef.current.setVolume(volume * 100);
//       }
//     }
//   }, [volume, isMuted, isReady]);

//   // Sync seeking
//   useEffect(() => {
//     if (isReady && playerRef.current && seekTime !== null && seekTime !== undefined && seekTime > 0) {
//       playerRef.current.seekTo(seekTime, true);
//       clearSeek();
//     }
//   }, [seekTime, isReady, clearSeek]);

//   // Track progress
//   useEffect(() => {
//     if (isReady && isPlaying) {
//       progressInterval.current = setInterval(async () => {
//         if (playerRef.current) {
//           const currentTime = await playerRef.current.getCurrentTime();
//           if (currentTime !== undefined) {
//             setProgress(currentTime);
//           }
//         }
//       }, 1000);
//     } else {
//       if (progressInterval.current) {
//         clearInterval(progressInterval.current);
//       }
//     }
//     return () => {
//       if (progressInterval.current) {
//         clearInterval(progressInterval.current);
//       }
//     };
//   }, [isReady, isPlaying, setProgress]);

//   const onReady = (event) => {
//     playerRef.current = event.target;
//     setIsReady(true);
    
//     // Set initial duration
//     setDuration(event.target.getDuration());
    
//     // Apply initial volume & play state
//     event.target.setVolume(isMuted ? 0 : volume * 100);
//     if (isPlaying) {
//       event.target.playVideo();
//     }
//   };

//   const onStateChange = (event) => {
//     // YT.PlayerState.ENDED == 0
//     if (event.data === 0) {
//       next();
//     }
//     // Update duration once playback starts, just in case it wasn't available on ready
//     if (event.data === 1 && playerRef.current) {
//       setDuration(playerRef.current.getDuration());
//     }
//   };

//   const opts = {
//     height: '100%',
//     width: '100%',
//     playerVars: {
//       autoplay: 1,
//       controls: 0, // Using 0 for both to prevent iframe remounting and allow seamless visual transitions while our UI controls everything
//       showinfo: 0,
//       rel: 0,
//       iv_load_policy: 3,
//       modestbranding: 1,
//       enablejsapi: 1,
//       disablekb: 1,
//       fs: 0,
//       playsinline: 1
//     },
//   };

//   if (!youtubeVideoId) return null;

//   return (
//     <AnimatePresence mode="wait">
//       <motion.div
//         key="youtube-player"
//         layout
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ 
//           opacity: playerMode === 'video' ? 1 : 0,
//           scale: playerMode === 'video' ? 1 : 0.95,
//         }}
//         exit={{ opacity: 0, scale: 0.95 }}
//         transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
//         className={cn(
//           "w-full h-full transition-all duration-500",
//           playerMode === 'music' 
//             ? "absolute opacity-0 pointer-events-none w-[1px] h-[1px] -z-10" 
//             : "relative aspect-video rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 z-10"
//         )}
//       >
//         <YouTube
//           videoId={youtubeVideoId}
//           opts={opts}
//           onReady={onReady}
//           onStateChange={onStateChange}
//           className="w-full h-full pointer-events-none" // Disable clicking iframe so our custom controls remain source of truth
//           iframeClassName="w-full h-full object-cover"
//         />
//       </motion.div>
//     </AnimatePresence>
//   );
// };

import React, { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import { usePlayer } from '../../hooks/usePlayer';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

export const YouTubePlayer = () => {
  const { 
    youtubeVideoId, 
    isPlaying, 
    volume, 
    isMuted, 
    seekTime, 
    clearSeek,
    setProgress,
    setDuration,
    playerMode,
    next
  } = usePlayer();
  
  const playerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const progressInterval = useRef(null);
  const pendingPlay = useRef(false);

  // Sync play/pause — with safety check
  useEffect(() => {
    if (!isReady || !playerRef.current) return

    try {
      if (isPlaying) {
        playerRef.current.playVideo()
      } else {
        playerRef.current.pauseVideo()
      }
    } catch (err) {
      console.warn('YouTube player not ready yet:', err)
    }
  }, [isPlaying, isReady])

  // Sync volume
  useEffect(() => {
    if (!isReady || !playerRef.current) return

    try {
      if (isMuted) {
        playerRef.current.mute()
      } else {
        playerRef.current.unMute()
        playerRef.current.setVolume(volume * 100)
      }
    } catch (err) {
      console.warn('Volume sync error:', err)
    }
  }, [volume, isMuted, isReady])

  // Sync seeking
  useEffect(() => {
    if (!isReady || !playerRef.current) return
    if (seekTime === null || seekTime === undefined || seekTime <= 0) return

    try {
      playerRef.current.seekTo(seekTime, true)
      clearSeek()
    } catch (err) {
      console.warn('Seek error:', err)
    }
  }, [seekTime, isReady, clearSeek])

  // Track progress
  useEffect(() => {
    if (isReady && isPlaying && playerRef.current) {
      progressInterval.current = setInterval(() => {
        try {
          const currentTime = playerRef.current?.getCurrentTime()
          if (currentTime !== undefined && currentTime !== null) {
            setProgress(currentTime)
          }
        } catch (err) {
          // silently ignore
        }
      }, 1000)
    } else {
      clearInterval(progressInterval.current)
    }

    return () => clearInterval(progressInterval.current)
  }, [isReady, isPlaying, setProgress])

  // Reset ready state when video changes
  useEffect(() => {
    setIsReady(false)
  }, [youtubeVideoId])

  const onReady = (event) => {
    try {
      playerRef.current = event.target

      // Small delay to ensure iframe is fully loaded
      setTimeout(() => {
        try {
          setIsReady(true)
          const duration = event.target.getDuration()
          if (duration) setDuration(duration)
          event.target.setVolume(isMuted ? 0 : volume * 100)
          if (isPlaying) {
            event.target.playVideo()
          }
        } catch (err) {
          console.warn('onReady delayed error:', err)
        }
      }, 500)
    } catch (err) {
      console.warn('onReady error:', err)
    }
  }

  const onStateChange = (event) => {
    try {
      // ENDED
      if (event.data === 0) {
        next()
      }
      // PLAYING
      if (event.data === 1 && playerRef.current) {
        const duration = playerRef.current.getDuration()
        if (duration) setDuration(duration)
      }
    } catch (err) {
      console.warn('onStateChange error:', err)
    }
  }

  const onError = (event) => {
    console.warn('YouTube player error:', event.data)
    // Auto skip to next on error
    next()
  }

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: playerMode === 'video' ? 1 : 0,
      showinfo: 0,
      rel: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      enablejsapi: 1,
      disablekb: playerMode === 'video' ? 0 : 1,
      fs: playerMode === 'video' ? 1 : 0,
      playsinline: 1,
      origin: window.location.origin,
    },
  }

  if (!youtubeVideoId) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`youtube-${youtubeVideoId}`}
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: playerMode === 'video' ? 1 : 0,
          scale: playerMode === 'video' ? 1 : 0.95,
        }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'transition-all duration-500',
          playerMode === 'music'
            ? 'fixed bottom-0 left-0 w-px h-px opacity-0 pointer-events-none -z-10 overflow-hidden'
            : 'relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 z-10'
        )}
      >
        <YouTube
          key={youtubeVideoId}
          videoId={youtubeVideoId}
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
          onError={onError}
          className="w-full h-full"
          iframeClassName="w-full h-full"
        />
      </motion.div>
    </AnimatePresence>
  )
}
