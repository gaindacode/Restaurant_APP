import { useState, useEffect } from 'react';
import { initializeGoogleMaps } from '../services/maps/GoogleMapsLoader';

export function useGooglePlaces() {
  const [state, setState] = useState<{
    isLoaded: boolean;
    error: string | null;
  }>({
    isLoaded: false,
    error: null
  });

  useEffect(() => {
    let mounted = true;

    initializeGoogleMaps()
      .then(() => {
        if (mounted) {
          setState({ isLoaded: true, error: null });
        }
      })
      .catch(err => {
        if (mounted) {
          setState({ 
            isLoaded: false, 
            error: err instanceof Error ? err.message : 'Failed to load Google Places API'
          });
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return state;
}