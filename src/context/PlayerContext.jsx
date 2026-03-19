import React, { createContext, useReducer, useCallback } from 'react';
import { playerReducer, initialState } from '../reducers/playerReducer';

export const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(playerReducer, initialState);

  // Memoized action creators to prevent unnecessary re-renders
  const playTrack = useCallback((track, queue = null) => {
    dispatch({ type: 'PLAY_TRACK', payload: { track, queue } });
  }, []);

  const pause = useCallback(() => dispatch({ type: 'PAUSE' }), []);
  const resume = useCallback(() => dispatch({ type: 'RESUME' }), []);
  const next = useCallback(() => dispatch({ type: 'NEXT' }), []);
  const previous = useCallback(() => dispatch({ type: 'PREVIOUS' }), []);
  const setQueue = useCallback((queue) => dispatch({ type: 'SET_QUEUE', payload: queue }), []);
  const setVolume = useCallback((volume) => dispatch({ type: 'SET_VOLUME', payload: volume }), []);
  const toggleMute = useCallback(() => dispatch({ type: 'TOGGLE_MUTE' }), []);
  const setProgress = useCallback((progress) => dispatch({ type: 'SET_PROGRESS', payload: progress }), []);
  const setDuration = useCallback((duration) => dispatch({ type: 'SET_DURATION', payload: duration }), []);
  const toggleShuffle = useCallback(() => dispatch({ type: 'TOGGLE_SHUFFLE' }), []);
  const toggleRepeat = useCallback(() => dispatch({ type: 'TOGGLE_REPEAT' }), []);
  const toggleMode = useCallback(() => dispatch({ type: 'TOGGLE_MODE' }), []);
  const toggleQueue = useCallback(() => dispatch({ type: 'TOGGLE_QUEUE' }), []);
  const toggleFullScreen = useCallback(() => dispatch({ type: 'TOGGLE_FULLSCREEN' }), []);
  const addToQueue = useCallback((track) => dispatch({ type: 'ADD_TO_QUEUE', payload: track }), []);
  const removeFromQueue = useCallback((index) => dispatch({ type: 'REMOVE_FROM_QUEUE', payload: index }), []);
  const clearQueue = useCallback(() => dispatch({ type: 'CLEAR_QUEUE' }), []);

  const value = {
    ...state,
    playTrack,
    pause,
    resume,
    next,
    previous,
    setQueue,
    setVolume,
    toggleMute,
    setProgress,
    setDuration,
    toggleShuffle,
    toggleRepeat,
    toggleMode,
    toggleQueue,
    toggleFullScreen,
    addToQueue,
    removeFromQueue,
    clearQueue
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};
