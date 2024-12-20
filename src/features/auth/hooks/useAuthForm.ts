import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../services/auth';
import { useNetworkStatus } from '../../../hooks/useNetworkStatus';
import { handleFirebaseError } from '../../../utils/error-handling';

export function useAuthForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const isOnline = useNetworkStatus();

  const handleSignIn = useCallback(async (email: string, password: string) => {
    if (!isOnline) {
      setError('Cannot sign in while offline');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await signIn(email, password);
      navigate('/', { replace: true });
    } catch (err) {
      const error = handleFirebaseError(err);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [isOnline, navigate]);

  const handleSignUp = useCallback(async (
    email: string, 
    password: string, 
    displayName: string
  ) => {
    if (!isOnline) {
      setError('Cannot create account while offline');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await signUp(email, password, displayName);
      navigate('/login', { 
        replace: true,
        state: { message: 'Account created successfully! Please sign in.' }
      });
    } catch (err) {
      const error = handleFirebaseError(err);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [isOnline, navigate]);

  return {
    loading,
    error,
    handleSignIn,
    handleSignUp,
    setError
  };
}