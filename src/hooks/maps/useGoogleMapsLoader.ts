import { useState, useEffect } from 'react';
import { initializeGoogleMaps } from '../../services/maps/GoogleMapsLoader';

export function useGoogleMapsLoader() {
  const [state, setState] = useState<{
    isLoaded: boolean;
    error: Error | null;
  }>({
    isLoaded: !!window.google?.maps,
    error: null
  });

  useEffect(() => {
    if (state.isLoaded) return;

    let mounted = true;

    initializeGoogleMaps()
      .then(() => {
        if (mounted) {
          setState({ isLoaded: true, error: null });
        }
      })
      .catch((error) => {
        if (mounted) {
          console.error('Failed to load Google Maps:', error);
          setState({ 
            isLoaded: false, 
            error: error instanceof Error ? error : new Error('Failed to load Google Maps')
          });
        }
      });

    return () => {
      mounted = false;
    };
  }, []); // Empty dependency array as we only want to load once

  return state;
}