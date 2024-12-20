import { useState, useCallback } from 'react';
import { searchRestaurants } from '../api/restaurantApi';
import type { Restaurant } from '../types';

export function useRestaurantSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string, location: { lat: number; lng: number }) => {
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

  const filterRestaurants = useCallback((restaurants: Restaurant[]) => {
    if (!searchQuery.trim()) return restaurants;
    return searchResults.length > 0 ? searchResults : restaurants;
  }, [searchQuery, searchResults]);

  return {
    searchQuery,
    setSearchQuery,
    search,
    searchResults,
    loading,
    error,
    filterRestaurants
  };
}