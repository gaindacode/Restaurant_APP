import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { auth, db } from './init';
import { isDevelopment } from '../../utils/environment';

export function initializeEmulators() {
  if (!isDevelopment()) return;

  try {
    // Connect to Auth emulator
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
    
    // Connect to Firestore emulator
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
    
    console.log('Connected to Firebase emulators');
  } catch (error) {
    console.error('Failed to connect to emulators:', error);
  }
}