import { useState, useEffect } from 'react';
import { initializeGoogleMaps } from '../../services/maps/GoogleMapsLoader';

export function useGoogleMaps() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (window.google?.maps) {
      setIsLoaded(true);
      return;
    }

    initializeGoogleMaps()
      .then(() => {
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error('Failed to load Google Maps:', err);
        setError(err instanceof Error ? err : new Error('Failed to load Google Maps'));
      });
  }, []);

  return { isLoaded, error };
}