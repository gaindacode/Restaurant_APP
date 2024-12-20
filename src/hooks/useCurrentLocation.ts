import { useState, useEffect } from 'react';

interface LocationState {
  coords: [number, number] | null;
  error: string | null;
  loading: boolean;
}

export function useCurrentLocation() {
  const [state, setState] = useState<LocationState>({
    coords: null,
    error: null,
    loading: true
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: "Geolocation is not supported by your browser",
        loading: false
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          coords: [position.coords.latitude, position.coords.longitude],
          error: null,
          loading: false
        });
      },
      (error) => {
        setState({
          coords: null,
          error: error.message,
          loading: false
        });
      }
    );
  }, []);

  return state;
}