import { useState, useEffect, useCallback } from 'react';
import { getArtists } from '../services/artistService';

export const useArtists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArtists = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getArtists();
      setArtists(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  return { artists, loading, error, refetch: fetchArtists };
};
