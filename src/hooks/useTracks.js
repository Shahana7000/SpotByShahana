import { useState, useEffect, useCallback } from 'react';
import { getTracks } from '../services/trackService';

export const useTracks = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTracks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTracks();
      setTracks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTracks();
  }, [fetchTracks]);

  return { tracks, loading, error, refetch: fetchTracks };
};
