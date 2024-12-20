import { PlacesError, PlacesSearchOptions, PlacesSearchResult } from './types';
import { initializeGoogleMaps } from '../maps/GoogleMapsLoader';

class PlacesClient {
  private static instance: PlacesClient | null = null;
  private service: google.maps.places.PlacesService | null = null;
  private element: HTMLDivElement;

  private constructor() {
    this.element = document.createElement('div');
  }

  public static async getInstance(): Promise<PlacesClient> {
    if (!this.instance) {
      await initializeGoogleMaps();
      this.instance = new PlacesClient();
    }
    return this.instance;
  }

  private getService(): google.maps.places.PlacesService {
    if (!this.service) {
      this.service = new google.maps.places.PlacesService(this.element);
    }
    return this.service;
  }

  public async searchNearby(options: PlacesSearchOptions): Promise<PlacesSearchResult[]> {
    return new Promise((resolve, reject) => {
      const request: google.maps.places.PlaceSearchRequest = {
        location: options.location,
        radius: options.radius,
        type: 'restaurant',
        keyword: options.keyword
      };

      this.getService().nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          resolve(results);
        } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          resolve([]);
        } else {
          const error = new Error(`Places API error: ${status}`) as PlacesError;
          error.status = status;
          reject(error);
        }
      });
    });
  }
}

// Export the function to get the singleton instance
export async function getPlacesClient(): Promise<PlacesClient> {
  return PlacesClient.getInstance();
}