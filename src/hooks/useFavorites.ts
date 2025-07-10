
import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'opentools-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  });

  const toggleFavorite = useCallback((toolId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(toolId)
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId];
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
      } catch (error) {
        console.error('Error saving favorites:', error);
      }
      
      return newFavorites;
    });
  }, []);

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
