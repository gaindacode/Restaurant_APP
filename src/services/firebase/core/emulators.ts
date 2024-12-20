import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { auth, db } from './initialize';
import { FIREBASE_EMULATOR_PORTS } from '../../../config/firebase/options';

export async function connectEmulators() {
  try {
    // Connect to Auth emulator
    connectAuthEmulator(
      auth, 
      `http://127.0.0.1:${FIREBASE_EMULATOR_PORTS.auth}`, 
      { disableWarnings: true }
    );
    
    // Connect to Firestore emulator
    connectFirestoreEmulator(
      db, 
      '127.0.0.1', 
      FIREBASE_EMULATOR_PORTS.firestore
    );
    
    console.log('Connected to Firebase emulators');
    return { success: true };
  } catch (error) {
    console.error('Failed to connect to emulators:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to connect to emulators' 
    };
  }
}