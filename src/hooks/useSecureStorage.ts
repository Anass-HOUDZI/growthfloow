import { useState, useEffect, useCallback } from 'react';
import { encryptData, decryptData } from '../utils/security';
import { logger } from '../utils/logger';

export const useSecureStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;
      
      // Decrypt the data
      const decrypted = decryptData(item);
      return decrypted ? JSON.parse(decrypted) : initialValue;
    } catch (error) {
      logger.reportError(error as Error, { context: 'useSecureStorage_read', key });
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        // Encrypt before storing
        const encrypted = encryptData(JSON.stringify(valueToStore));
        window.localStorage.setItem(key, encrypted);
      }
    } catch (error) {
      logger.reportError(error as Error, { context: 'useSecureStorage_write', key });
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      logger.reportError(error as Error, { context: 'useSecureStorage_remove', key });
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
};