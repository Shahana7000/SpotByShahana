import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylistTracks } from '../../services/playlistService';
import { TrackList } from '../music/TrackList';
import { GlassSkeletonLoader } from '../common/SkeletonLoader'; // Assuming we rename/export appropriately

export const PlaylistDetail = () => {
  const { id } = useParams();
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);
        const data = await getPlaylistTracks(id);
        setTracks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTracks();
  }, [id]);

  if (error) return <div className="p-8 text-destructive">{error}</div>;

  return (
    <div className="mt-8">
      <TrackList tracks={tracks} loading={loading} emptyMessage="This playlist is currently empty." />
    </div>
  );
};
