import { useState, useEffect } from 'react';
import storageService from '../services/storageService';

/**
 * useLocalStorage — Single Responsibility (SOLID-S)
 * Generic hook: keeps a state value in sync with localStorage.
 * Components use this hook and never import storageService directly.
 */
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => storageService.get(key, initialValue));

  useEffect(() => {
    storageService.set(key, value);
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
