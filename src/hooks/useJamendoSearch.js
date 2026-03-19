import { useState, useCallback } from 'react'
import { searchTracks, searchArtists, searchAlbums } from '../services/jamendoService'

export const useJamendoSearch = () => {
  const [results, setResults] = useState({
    tracks: [],
    artists: [],
    albums: []
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const search = useCallback(async (query) => {
    if (!query.trim()) return
    
    try {
      setLoading(true)
      setError(null)
      
      const [tracks, artists, albums] = await Promise.all([
        searchTracks(query),
        searchArtists(query),
        searchAlbums(query)
      ])
      
      setResults({ tracks, artists, albums })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const clear = useCallback(() => {
    setResults({ tracks: [], artists: [], albums: [] })
  }, [])

  return { results, loading, error, search, clear }
}