import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../config/firebase/config';
import { getUserProfile } from '../services/userProfile';
import { useNetworkStatus } from '../../../hooks/useNetworkStatus';
import { handleFirebaseError } from '../../../utils/error-handling';
import type { UserProfile } from '../types';

interface AuthContextState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  isOffline: boolean;
}

const AuthContext = createContext<AuthContextState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthContextState>({
    user: null,
    loading: true,
    error: null,
    isOffline: false
  });
  
  const isOnline = useNetworkStatus();

  useEffect(() => {
    setState(prev => ({ ...prev, isOffline: !isOnline }));
  }, [isOnline]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const profile = await getUserProfile(firebaseUser.uid);
          setState(prev => ({ 
            ...prev, 
            user: profile,
            loading: false,
            error: null
          }));
        } else {
          setState(prev => ({ 
            ...prev, 
            user: null,
            loading: false,
            error: null
          }));
        }
      } catch (err) {
        const error = handleFirebaseError(err);
        setState(prev => ({
          ...prev,
          error: error.message,
          loading: false
        }));
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}