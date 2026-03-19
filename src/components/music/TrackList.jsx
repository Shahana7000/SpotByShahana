import React from 'react';
import { TrackRow } from './TrackRow';

export const TrackList = ({ tracks, loading, emptyMessage = "No tracks found" }) => {
  if (loading) {
    return (
      <div className="flex flex-col space-y-2 w-full mt-4">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="flex items-center gap-4 px-4 py-2 w-full">
            <div className="w-8 h-8 rounded shrink-0 bg-white/5 animate-pulse" />
            <div className="w-10 h-10 rounded shrink-0 bg-white/5 animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-white/5 rounded w-1/3 animate-pulse" />
              <div className="h-3 bg-white/5 rounded w-1/4 animate-pulse" />
            </div>
            <div className="hidden md:block flex-1">
              <div className="h-4 bg-white/5 rounded w-1/2 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!tracks || tracks.length === 0) {
    return <div className="p-8 text-center text-muted-foreground w-full">{emptyMessage}</div>;
  }

  return (
    <div className="flex flex-col w-full">
      {tracks.map((track, index) => (
        <TrackRow key={track.id} track={track} index={index} queueContext={tracks} />
      ))}
    </div>
  );
};
