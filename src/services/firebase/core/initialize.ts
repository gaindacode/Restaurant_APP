import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import { FIREBASE_CONFIG } from '../../../config/firebase/config';
import { FIRESTORE_OPTIONS } from '../../../config/firebase/options';

// Initialize Firebase app
const app = initializeApp(FIREBASE_CONFIG);

// Initialize Firebase services with custom options
const auth = getAuth(app);
const db = initializeFirestore(app, FIRESTORE_OPTIONS);

export { app, auth, db };