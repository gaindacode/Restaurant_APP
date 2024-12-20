import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { auth } from '../core/auth';
import { db } from '../core/firestore';
import { EMULATOR_HOST, EMULATOR_PORTS } from '../../../config/firebase/constants';

export async function connectEmulators() {
  try {
    // Connect to Auth emulator
    connectAuthEmulator(
      auth, 
      `http://${EMULATOR_HOST}:${EMULATOR_PORTS.auth}`,
      { disableWarnings: true }
    );
    
    // Connect to Firestore emulator
    connectFirestoreEmulator(
      db, 
      EMULATOR_HOST, 
      EMULATOR_PORTS.firestore
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