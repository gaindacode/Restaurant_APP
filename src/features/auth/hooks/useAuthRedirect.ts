import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function useAuthRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectToHome = useCallback(() => {
    const from = (location.state as any)?.from?.pathname || '/';
    navigate(from, { replace: true });
  }, [location, navigate]);

  const redirectToLogin = useCallback((message?: string) => {
    navigate('/login', { 
      replace: true,
      state: message ? { message } : undefined
    });
  }, [navigate]);

  return { redirectToHome, redirectToLogin };
}