import { useMemo } from 'react';
import type { Restaurant } from '../../../types/restaurant';

export function useRestaurantFiltering(
  restaurants: Restaurant[], 
  selectedChain: string | null
) {
  return useMemo(() => {
    if (!selectedChain) return restaurants;
    
    return restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(selectedChain.toLowerCase())
    );
  }, [restaurants, selectedChain]);
}