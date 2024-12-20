import { ENV } from '../../config/env.config';

let isLoading = false;
let isLoaded = false;
let loadError: Error | null = null;
let loadPromise: Promise<void> | null = null;

export function initializeGoogleMaps(): Promise<void> {
  if (isLoaded) return Promise.resolve();
  if (loadPromise) return loadPromise;
  if (loadError) return Promise.reject(loadError);

  if (!ENV.GOOGLE_MAPS_API_KEY) {
    loadError = new Error('Google Maps API key is not configured');
    return Promise.reject(loadError);
  }

  isLoading = true;

  loadPromise = new Promise<void>((resolve, reject) => {
    try {
      const script = document.createElement('script');
      const callback = '__googleMapsCallback';

      window[callback] = () => {
        isLoaded = true;
        isLoading = false;
        delete window[callback];
        resolve();
      };

      script.src = `https://maps.googleapis.com/maps/api/js?key=${ENV.GOOGLE_MAPS_API_KEY}&libraries=places&callback=${callback}`;
      script.async = true;
      script.onerror = () => {
        loadError = new Error('Failed to load Google Maps API');
        isLoading = false;
        reject(loadError);
      };

      document.head.appendChild(script);
    } catch (error) {
      loadError = error instanceof Error ? error : new Error('Unknown error loading Google Maps API');
      isLoading = false;
      reject(loadError);
    }
  });

  return loadPromise;
}