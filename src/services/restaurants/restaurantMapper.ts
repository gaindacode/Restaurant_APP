import { SUPPORTED_RESTAURANTS } from '../../config/constants';
import type { Restaurant } from '../../types/restaurant';
import type { PlacesSearchResult } from './types';

export function mapPlaceToRestaurant(place: PlacesSearchResult): Restaurant | null {
  if (!place.geometry?.location) return null;

  const brand = SUPPORTED_RESTAURANTS.find(
    b => place.name?.toLowerCase().includes(b.name.toLowerCase())
  );

  if (!brand) return null;

  return {
    id: place.place_id || `temp-${Date.now()}`,
    name: place.name || brand.name,
    location: {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      address: place.vicinity || 'Address unavailable'
    },
    brand: brand.name,
    logo: brand.logo,
    cashbackRate: brand.cashbackRate,
    rating: place.rating || 0,
    userRatingsTotal: place.user_ratings_total || 0
  };
}