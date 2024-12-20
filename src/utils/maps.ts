// Singleton instance to track loading state
let loadingPromise: Promise<void> | null = null;

export function loadGoogleMapsScript(): Promise<void> {
  // If the API is already loaded, return immediately
  if (window.google?.maps) {
    return Promise.resolve();
  }

  // If we're already loading the API, return the existing promise
  if (loadingPromise) {
    return loadingPromise;
  }

  // Create a new loading promise
  loadingPromise = new Promise<void>((resolve, reject) => {
    try {
      // Create script element
      const script = document.createElement('script');
      const callbackName = '_googleMapsCallback';

      // Set callback function
      window[callbackName] = () => {
        if (script.parentNode) script.parentNode.removeChild(script);
        delete window[callbackName];
        resolve();
      };

      // Configure script
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places&callback=${callbackName}`;
      script.async = true;
      script.defer = true;
      script.onerror = (error) => {
        reject(error);
        loadingPromise = null; // Reset the loading promise on error
      };

      // Append script to document
      document.head.appendChild(script);
    } catch (error) {
      reject(error);
      loadingPromise = null; // Reset the loading promise on error
    }
  });

  return loadingPromise;
}