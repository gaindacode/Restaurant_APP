import { initializeFirestore } from 'firebase/firestore';
import { app } from './app';

// Initialize Firestore with production settings
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
  cacheSizeBytes: 40000000 // 40 MB
});