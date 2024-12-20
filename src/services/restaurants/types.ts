import type { Restaurant } from '../../types/restaurant';

export interface PlacesSearchOptions {
  location: {
    lat: number;
    lng: number;
  };
  radius?: number;
  keyword?: string;
}

export interface PlacesError extends Error {
  code?: string;
  status?: google.maps.places.PlacesServiceStatus;
}

export type PlacesSearchResult = google.maps.places.PlaceResult;