import { enableMultiTabIndexedDbPersistence } from 'firebase/firestore';
import { db } from './initialize';
import type { PersistenceResult } from './types';

export async function setupPersistence(): Promise<PersistenceResult> {
  try {
    await enableMultiTabIndexedDbPersistence(db);
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('failed-precondition')) {
        return {
          success: false,
          error: 'Multiple tabs open, persistence enabled in another tab'
        };
      }
      if (error.message.includes('unimplemented')) {
        return {
          success: false,
          error: 'Browser does not support offline persistence'
        };
      }
    }
    return {
      success: false,
      error: 'Failed to enable offline persistence'
    };
  }
}