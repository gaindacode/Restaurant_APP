// Environment configuration
export const ENV = {
  GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  DEFAULT_CENTER: {
    lat: 37.7749,
    lng: -122.4194
  },
  DEFAULT_ZOOM: 14,
} as const;

// Validation
if (!ENV.GOOGLE_MAPS_API_KEY) {
  throw new Error('Google Maps API key is not configured. Please add VITE_GOOGLE_MAPS_API_KEY to your .env file.');
}