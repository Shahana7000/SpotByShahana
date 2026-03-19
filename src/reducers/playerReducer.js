export const initialState = {
  currentTrack: null,
  queue: [],
  currentIndex: 0,
  isPlaying: false,
  volume: 0.8,
  isMuted: false,
  progress: 0,
  duration: 0,
  isShuffled: false,
  repeatMode: 'off', // 'off' | 'one' | 'all'
  playerMode: 'music', // 'music' | 'video'
  isQueueOpen: false,
  isFullScreen: false,
};

export const playerReducer = (state, action) => {
  switch (action.type) {
    case 'PLAY_TRACK':
      const newQueue = action.payload.queue || [action.payload.track];
      // Find index if track is in queue, otherwise 0
      const index = newQueue.findIndex(t => t.id === action.payload.track.id);
      return {
        ...state,
        currentTrack: action.payload.track,
        queue: newQueue,
        currentIndex: index >= 0 ? index : 0,
        isPlaying: true,
      };
    case 'PAUSE':
      return { ...state, isPlaying: false };
    case 'RESUME':
      return { ...state, isPlaying: true };
    case 'NEXT': {
      if (state.queue.length === 0) return state;
      let nextIndex = state.currentIndex + 1;
      if (nextIndex >= state.queue.length) {
        if (state.repeatMode === 'all') {
          nextIndex = 0;
        } else {
          return { ...state, isPlaying: false, progress: 0 };
        }
      }
      return {
        ...state,
        currentIndex: nextIndex,
        currentTrack: state.queue[nextIndex],
        isPlaying: true,
      };
    }
    case 'PREVIOUS': {
      if (state.progress > 3) {
        return { ...state, progress: 0 }; // Just restart if past 3 seconds
      }
      if (state.queue.length === 0) return state;
      let prevIndex = state.currentIndex - 1;
      if (prevIndex < 0) {
        if (state.repeatMode === 'all') {
          prevIndex = state.queue.length - 1;
        } else {
          prevIndex = 0;
          return { ...state, progress: 0, isPlaying: false };
        }
      }
      return {
        ...state,
        currentIndex: prevIndex,
        currentTrack: state.queue[prevIndex],
        isPlaying: true,
      };
    }
    case 'SET_QUEUE':
      return { ...state, queue: action.payload };
    case 'SET_VOLUME':
      return { ...state, volume: action.payload, isMuted: action.payload === 0 };
    case 'TOGGLE_MUTE':
      return { ...state, isMuted: !state.isMuted };
    case 'SET_PROGRESS':
      return { ...state, progress: action.payload };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'TOGGLE_SHUFFLE':
      // Basic shuffle toggle logic. Real shuffle would reorder the queue.
      return { ...state, isShuffled: !state.isShuffled };
    case 'TOGGLE_REPEAT': {
      const modes = ['off', 'all', 'one'];
      const nextMode = modes[(modes.indexOf(state.repeatMode) + 1) % modes.length];
      return { ...state, repeatMode: nextMode };
    }
    case 'TOGGLE_MODE':
      return { ...state, playerMode: state.playerMode === 'music' ? 'video' : 'music' };
    case 'TOGGLE_QUEUE':
      return { ...state, isQueueOpen: !state.isQueueOpen };
    case 'TOGGLE_FULLSCREEN':
      return { ...state, isFullScreen: !state.isFullScreen };
    case 'ADD_TO_QUEUE':
      return { ...state, queue: [...state.queue, action.payload] };
    case 'REMOVE_FROM_QUEUE': {
      const filteredQueue = state.queue.filter((_, i) => i !== action.payload);
      let newIndex = state.currentIndex;
      if (action.payload < state.currentIndex) newIndex--;
      else if (action.payload === state.currentIndex) {
        // Current track removed
        if (filteredQueue.length === 0) {
          return { ...state, queue: [], currentTrack: null, isPlaying: false, currentIndex: 0 };
        }
        newIndex = Math.min(state.currentIndex, filteredQueue.length - 1);
        return {
          ...state,
          queue: filteredQueue,
          currentIndex: newIndex,
          currentTrack: filteredQueue[newIndex]
        };
      }
      return { ...state, queue: filteredQueue, currentIndex: newIndex };
    }
    case 'CLEAR_QUEUE':
      return { ...state, queue: [], currentTrack: null, isPlaying: false, currentIndex: 0 };
    default:
      return state;
  }
};
