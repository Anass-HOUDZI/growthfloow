
import { useState, useEffect, useCallback } from 'react';
import { useSecureStorage } from './useSecureStorage';

export const useFavorites = () => {
  const [favorites, setFavorites, removeFavorites] = useSecureStorage<string[]>('opentools-favorites', []);

  const toggleFavorite = useCallback((toolId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(toolId)
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId];
      
      return newFavorites;
    });
  }, [setFavorites]);

  const addFavorite = useCallback((toolId: string) => {
    if (!favorites.includes(toolId)) {
      toggleFavorite(toolId);
    }
  }, [favorites, toggleFavorite]);

  const removeFavorite = useCallback((toolId: string) => {
    if (favorites.includes(toolId)) {
      toggleFavorite(toolId);
    }
  }, [favorites, toggleFavorite]);

  const isFavorite = useCallback((toolId: string) => {
    return favorites.includes(toolId);
  }, [favorites]);

  return {
    favorites,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    isFavorite
  };
};
