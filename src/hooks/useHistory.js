import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { getPlayHistory, addToHistory as apiAddToHistory, clearHistory as apiClearHistory } from '../services/historyService';

export const useHistory = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
    if (!user) {
      setHistory([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await getPlayHistory(user.id);
      setHistory(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const addToHistory = async (track) => {
    if (!user) return;
    try {
      await apiAddToHistory(user.id, track.id);
      setHistory(prev => [{ ...track, played_at: new Date().toISOString() }, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  const clearHistory = async () => {
    if (!user) return;
    try {
      await apiClearHistory(user.id);
      setHistory([]);
    } catch (err) {
      console.error(err);
    }
  };

  return { history, loading, addToHistory, clearHistory, refetch: fetchHistory };
};
