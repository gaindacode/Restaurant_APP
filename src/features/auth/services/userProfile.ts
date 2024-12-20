import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { handleFirebaseError } from '../../../utils/error-handling';
import type { UserProfile } from '../types';

export async function getUserProfile(userId: string): Promise<UserProfile> {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('User profile not found');
    }

    const data = docSnap.data();
    return {
      id: docSnap.id,
      email: data.email,
      displayName: data.displayName,
      cashbackBalance: data.cashbackBalance || 0,
      monthlyEarnings: data.monthlyEarnings || 0,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date()
    };
  } catch (error) {
    throw handleFirebaseError(error);
  }
}

export async function createUserProfile(
  userId: string, 
  data: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>
): Promise<void> {
  try {
    const docRef = doc(db, 'users', userId);
    
    const profileData = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    await setDoc(docRef, profileData);
  } catch (error) {
    throw handleFirebaseError(error);
  }
}