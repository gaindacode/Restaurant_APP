import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function useAuthRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectAfterLogin = useCallback(() => {
    const intendedPath = location.state?.from?.pathname || '/';
    navigate(intendedPath, { replace: true });
  }, [location, navigate]);

  const redirectToLogin = useCallback((message?: string) => {
    navigate('/login', { 
      replace: true,
      state: { 
        from: location,
        message 
      }
    });
  }, [location, navigate]);

  return { redirectAfterLogin, redirectToLogin };
}