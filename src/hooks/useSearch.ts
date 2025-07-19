import { useState, useMemo } from 'react';
import { toolsData } from '../data/toolsData';

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Auto-complétion basée sur les noms et descriptions des outils
  const autoComplete = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) {
      return [];
    }

    const matches = new Set<string>();
    const term = searchTerm.toLowerCase();

    toolsData.forEach(tool => {
      // Ajouter le nom de l'outil s'il correspond
      if (tool.name.toLowerCase().includes(term)) {
        matches.add(tool.name);
      }

      // Ajouter des mots-clés de la description
      const words = tool.description.toLowerCase().split(' ');
      words.forEach(word => {
        if (word.length > 3 && word.includes(term)) {
          matches.add(word);
        }
      });

      // Ajouter la catégorie si elle correspond
      if (tool.category.toLowerCase().includes(term)) {
        matches.add(tool.category);
      }
    });

    return Array.from(matches).slice(0, 5);
  }, [searchTerm]);

  // Filtrer les outils basé sur la recherche
  const filteredTools = useMemo(() => {
    if (!searchTerm) {
      return toolsData;
    }

    const term = searchTerm.toLowerCase();
    return toolsData.filter(tool => 
      tool.name.toLowerCase().includes(term) ||
      tool.description.toLowerCase().includes(term) ||
      tool.category.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // Mettre à jour les suggestions
  const updateSuggestions = (term: string) => {
    setSearchTerm(term);
    setSuggestions(autoComplete);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
  };

  return {
    searchTerm,
    suggestions,
    filteredTools,
    updateSuggestions,
    clearSearch,
    setSearchTerm
  };
};