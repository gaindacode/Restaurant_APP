import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile
} from 'firebase/auth';
import { auth } from '../../../config/firebase';
import { createUserProfile } from './userProfile';
import { handleFirebaseError } from '../../../utils/error-handling';
import type { UserProfile } from '../types';

export async function signIn(email: string, password: string) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    throw handleFirebaseError(error);
  }
}

export async function signUp(
  email: string, 
  password: string, 
  displayName: string
) {
  try {
    // Create Firebase auth user
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile with display name
    await updateProfile(user, { displayName });
    
    // Create user profile in Firestore
    await createUserProfile(user.uid, {
      email,
      displayName,
      cashbackBalance: 0,
      monthlyEarnings: 0
    });

    return user;
  } catch (error) {
    throw handleFirebaseError(error);
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw handleFirebaseError(error);
  }
}