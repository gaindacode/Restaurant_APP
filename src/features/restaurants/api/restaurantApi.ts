import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import type { Restaurant } from '../types';

const db = getFirestore();

export async function searchRestaurants(
  searchQuery: string,
  location: { lat: number; lng: number }
): Promise<Restaurant[]> {
  const restaurantsRef = collection(db, 'restaurants');
  
  // Create a query to search restaurants
  // This is a basic implementation - you might want to add more sophisticated search logic
  const q = query(
    restaurantsRef,
    where('name', '>=', searchQuery),
    where('name', '<=', searchQuery + '\uf8ff')
  );

  try {
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Restaurant[];
  } catch (error) {
    console.error('Error searching restaurants:', error);
    throw new Error('Failed to search restaurants');
  }
}