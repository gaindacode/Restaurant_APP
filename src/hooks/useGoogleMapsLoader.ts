import { useState, useEffect } from 'react';
import { loadGoogleMapsScript } from '../utils/maps';

export function useGoogleMapsLoader() {
  const [state, setState] = useState<{
    isLoaded: boolean;
    error: Error | null;
  }>({
    isLoaded: !!window.google?.maps,
    error: null
  });

  useEffect(() => {
    // If already loaded, don't try to load again
    if (state.isLoaded) return;

    loadGoogleMapsScript()
      .then(() => {
        setState({ isLoaded: true, error: null });
      })
      .catch((error) => {
        console.error('Failed to load Google Maps:', error);
        setState({ isLoaded: false, error });
      });
  }, []); // Empty dependency array as we only want to load once

  return state;
}