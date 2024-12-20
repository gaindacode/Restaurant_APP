import { useState, useEffect } from 'react';
import { initializeMapKit } from '../services/mapkit.service';

export function useMapKit() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (window.mapkit) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js';
    script.async = true;

    script.onload = async () => {
      try {
        await initializeMapKit();
        setIsLoaded(true);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize MapKit'));
      }
    };

    script.onerror = () => {
      setError(new Error('Failed to load MapKit JS'));
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return { isLoaded, error };
}