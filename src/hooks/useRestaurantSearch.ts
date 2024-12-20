import { useState, useCallback } from 'react';
import { searchRestaurants } from '../services/restaurants/searchService';
import type { Restaurant } from '../types/restaurant';

export function useRestaurantSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string, location: google.maps.LatLngLiteral) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await searchRestaurants(query, location);
      setSearchResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search restaurants');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    search,
    searchResults,
    loading,
    error
  };
}