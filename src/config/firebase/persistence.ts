import { enableMultiTabIndexedDbPersistence } from 'firebase/firestore';
import { db } from './init';

export async function enableOfflinePersistence() {
  try {
    await enableMultiTabIndexedDbPersistence(db);
    console.log('Offline persistence enabled');
  } catch (error: any) {
    if (error?.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled in one tab at a time
      console.warn('Multiple tabs open, persistence enabled in another tab');
    } else if (error?.code === 'unimplemented') {
      console.warn('Browser does not support persistence');
    } else {
      throw error;
    }
  }
}