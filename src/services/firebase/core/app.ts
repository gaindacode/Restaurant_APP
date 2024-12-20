import { initializeApp } from 'firebase/app';
import { FIREBASE_CONFIG } from '../../../config/firebase/config';

// Initialize Firebase app instance
export const app = initializeApp(FIREBASE_CONFIG);