import { useState, useEffect, useCallback } from 'react';
import { searchNearbyRestaurants } from '../services/restaurants/restaurantService';
import type { Restaurant } from '../types/restaurant';
import type { PlacesError } from '../services/restaurants/types';

interface Location {
  lat: number;
  lng: number;
}

export function useRestaurants(center: Location) {
  const [state, setState] = useState<{
    restaurants: Restaurant[];
    loading: boolean;
    error: string | null;
  }>({
    restaurants: [],
    loading: true,
    error: null
  });

  const fetchRestaurants = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const results = await searchNearbyRestaurants(center.lat, center.lng);
      setState({
        restaurants: results,
        loading: false,
        error: null
      });
    } catch (err) {
      const error = err as PlacesError;
      setState({
        restaurants: [],
        loading: false,
        error: error.message || 'Failed to load restaurants'
      });
    }
  }, [center.lat, center.lng]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      fetchRestaurants();
    }

    return () => {
      mounted = false;
    };
  }, [fetchRestaurants]);

  return state;
}