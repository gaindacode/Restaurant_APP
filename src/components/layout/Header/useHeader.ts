import { useState, useCallback } from 'react';

export function useHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  return {
    isMenuOpen,
    toggleMenu
  };
}