import { useState, useEffect } from 'react';
import { collection, query, getDocs, where, GeoPoint } from 'firebase/firestore';
import { db } from '../../../config/firebase.config';
import type { Restaurant } from '../types';

const RADIUS_KM = 5; // Search radius in kilometers

export function useRestaurants(center: { lat: number; lng: number }) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        setLoading(true);
        setError(null);

        // Create a GeoPoint for the center
        const centerPoint = new GeoPoint(center.lat, center.lng);

        // Query restaurants within radius
        const restaurantsRef = collection(db, 'restaurants');
        const q = query(
          restaurantsRef,
          where('location', '>=', centerPoint),
          // Add additional query constraints as needed
        );

        const snapshot = await getDocs(q);
        const results = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Restaurant[];

        setRestaurants(results);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
        setError('Failed to load restaurants');
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurants();
  }, [center.lat, center.lng]);

  return { restaurants, loading, error };
}