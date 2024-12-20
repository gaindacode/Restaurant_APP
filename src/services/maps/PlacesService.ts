import { ENV } from '../../config/env.config';
import type { Restaurant } from '../../types/restaurant';

class PlacesServiceManager {
  private static instance: PlacesServiceManager;
  private service: google.maps.places.PlacesService | null = null;
  private map: google.maps.Map | null = null;

  private constructor() {}

  static getInstance(): PlacesServiceManager {
    if (!PlacesServiceManager.instance) {
      PlacesServiceManager.instance = new PlacesServiceManager();
    }
    return PlacesServiceManager.instance;
  }

  initializeService(map: google.maps.Map) {
    this.map = map;
    this.service = new google.maps.places.PlacesService(map);
  }

  getService(): google.maps.places.PlacesService {
    if (!this.service || !this.map) {
      // Fallback to div element if map is not available
      const element = document.createElement('div');
      this.service = new google.maps.places.PlacesService(element);
    }
    return this.service;
  }
}

export function searchNearbyPlace(
  request: google.maps.places.PlaceSearchRequest
): Promise<google.maps.places.PlaceResult[]> {
  const service = PlacesServiceManager.getInstance().getService();

  return new Promise((resolve, reject) => {
    service.nearbySearch(request, (results, status, pagination) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        resolve(results);
      } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        resolve([]);
      } else {
        const errorMessage = getPlacesErrorMessage(status);
        reject(new Error(errorMessage));
      }
    });
  });
}

function getPlacesErrorMessage(status: google.maps.places.PlacesServiceStatus): string {
  switch (status) {
    case google.maps.places.PlacesServiceStatus.INVALID_REQUEST:
      return 'Invalid request to Places API';
    case google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT:
      return 'Places API query limit exceeded';
    case google.maps.places.PlacesServiceStatus.REQUEST_DENIED:
      return 'Places API request was denied';
    case google.maps.places.PlacesServiceStatus.NOT_FOUND:
      return 'Place not found';
    default:
      return `Places API error: ${status}`;
  }
}