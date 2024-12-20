import { initializeApp as initializeFirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import { FIREBASE_CONFIG } from '../../config/firebase/config';
import { FIRESTORE_SETTINGS } from '../../config/firebase/constants';
import { setupPersistence } from './persistence';

let initialized = false;

export async function initializeApp() {
  if (initialized) return;

  try {
    // Initialize Firebase app
    const app = initializeFirebaseApp(FIREBASE_CONFIG);

    // Initialize Firebase services with optimized settings
    const auth = getAuth(app);
    const db = initializeFirestore(app, FIRESTORE_SETTINGS);

    // Setup offline persistence
    await setupPersistence();

    initialized = true;

    return { app, auth, db };
  } catch (error) {
    console.error('Firebase initialization failed:', error);
    throw error;
  }
}

// Re-export Firebase instances for use in other parts of the app
export { auth, db } from './core';