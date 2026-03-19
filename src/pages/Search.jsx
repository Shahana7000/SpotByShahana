import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X, Loader2 } from 'lucide-react';
import { AnimatedPage } from '../components/common/AnimatedPage';
import { GlassInput } from '../components/common/GlassInput';
import { useSearch } from '../hooks/useSearch';
import { TrackList } from '../components/music/TrackList';

export const Search = () => {
  const { query, setQuery, results, isSearching, error } = useSearch();
  const inputRef = useRef(null);

  // Auto focus on mount logic inside component
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <AnimatedPage className="p-4 md:p-8 max-w-[1200px] mx-auto min-h-full flex flex-col">
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl pb-6 pt-2 -mx-4 px-4 md:-mx-8 md:px-8">
        <div className="relative max-w-2xl mx-auto">
          <SearchIcon size={24} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            placeholder="What do you want to listen to?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-14 pl-14 pr-12 bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/10 rounded-full text-white placeholder:text-muted-foreground outline-none transition-all shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-lg"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 mt-6">
        {isSearching ? (
          <div className="flex flex-col items-center justify-center p-12 text-muted-foreground">
            <Loader2 size={40} className="animate-spin mb-4 text-primary" />
            <p>Searching SpotBY...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-destructive bg-destructive/10 rounded-2xl border border-destructive/20 max-w-2xl mx-auto">
            <h3 className="font-bold mb-2">Search Failed</h3>
            <p>{error}</p>
          </div>
        ) : query && results.length === 0 ? (
          <div className="text-center p-12">
            <h3 className="text-2xl font-bold text-white mb-2">No results found for "{query}"</h3>
            <p className="text-muted-foreground">Please make sure your words are spelled correctly or use less or different keywords.</p>
          </div>
        ) : query && results.length > 0 ? (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white px-2">Top Results</h3>
            <TrackList tracks={results} loading={false} />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 opacity-60 pointer-events-none mt-8">
            {/* Visual placeholders for 'Browse all' categories when empty query */}
            {[
              { color: 'bg-rose-600', label: 'Podcasts' },
              { color: 'bg-emerald-600', label: 'Made For You' },
              { color: 'bg-violet-600', label: 'New Releases' },
              { color: 'bg-blue-600', label: 'Pop' },
              { color: 'bg-amber-600', label: 'Hip-Hop' },
              { color: 'bg-fuchsia-600', label: 'Workout' },
              { color: 'bg-orange-600', label: 'Rock' },
              { color: 'bg-teal-600', label: 'Mood' },
            ].map((cat, i) => (
              <div key={i} className={`aspect-square rounded-xl p-4 overflow-hidden relative shadow-lg ${cat.color}`}>
                <h3 className="text-xl font-bold text-white">{cat.label}</h3>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-black/20 rounded-full rotate-12 blur-sm" />
              </div>
            ))}
          </div>
        )}
      </div>
    </AnimatedPage>
  );
};
