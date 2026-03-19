import React from 'react';
import { useTracks } from '../../hooks/useTracks';
import { TrackList } from './TrackList';

export const TrackListContainer = ({ limit }) => {
  const { tracks, loading, error } = useTracks();

  if (error) {
    return (
      <div className="p-8 rounded-2xl bg-destructive/5 border border-destructive/20 backdrop-blur-md flex flex-col items-center justify-center text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
          <span className="text-destructive text-xl font-bold">!</span>
        </div>
        <div>
          <h3 className="text-white font-semibold">Connection Issue</h3>
          <p className="text-destructive/80 text-sm max-w-[250px]">{error}</p>
        </div>
      </div>
    );
  }

  const displayedTracks = limit ? tracks.slice(0, limit) : tracks;

  return <TrackList tracks={displayedTracks} loading={loading} />;
};
