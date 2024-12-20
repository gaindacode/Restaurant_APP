export interface Restaurant {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  logo?: string;
  cashbackRate: number;
  rating?: number;
  userRatingsTotal?: number;
}

export interface RestaurantSearchFilters {
  cuisine?: string;
  priceRange?: string;
  rating?: number;
  cashbackMin?: number;
}