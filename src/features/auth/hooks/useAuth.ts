import { useState, useCallback } from 'react';
import { signIn, signUp } from '../services/auth';
import { useAuthRedirect } from '../../../hooks/auth/useAuthRedirect';
import { handleFirebaseError } from '../../../utils/error-handling';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { redirectAfterLogin, redirectToLogin } = useAuthRedirect();

  const handleSignIn = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      await signIn(email, password);
      redirectAfterLogin();
    } catch (err) {
      setError(handleFirebaseError(err).message);
    } finally {
      setLoading(false);
    }
  }, [redirectAfterLogin]);

  const handleSignUp = useCallback(async (
    email: string, 
    password: string, 
    displayName: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      await signUp(email, password, displayName);
      redirectToLogin('Account created successfully! Please sign in.');
    } catch (err) {
      setError(handleFirebaseError(err).message);
    } finally {
      setLoading(false);
    }
  }, [redirectToLogin]);

  return {
    loading,
    error,
    handleSignIn,
    handleSignUp,
    setError
  };
}