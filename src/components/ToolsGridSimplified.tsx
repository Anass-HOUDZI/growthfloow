import React, { useMemo } from 'react';
import { ToolCard } from './ToolCard';
import { toolsData } from '../data/toolsData';
import { useResponsive } from '../hooks/useResponsive';
import { Grid3X3, Search } from 'lucide-react';

interface ToolsGridSimplifiedProps {
  selectedCategory: string;
  searchTerm: string;
  favorites: string[];
  onToolSelect: (tool: any) => void;
  onToggleFavorite: (toolId: string) => void;
}

export const ToolsGridSimplified: React.FC<ToolsGridSimplifiedProps> = ({
  selectedCategory,
  searchTerm,
  favorites,
  onToolSelect,
  onToggleFavorite
}) => {
  const { isMobile, isTablet } = useResponsive();
  
  const filteredTools = useMemo(() => {
    return toolsData.filter(tool => {
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const getGridColumns = () => {
    if (isMobile) return 'grid-cols-1 sm:grid-cols-2';
    if (isTablet) return 'grid-cols-2 md:grid-cols-3';
    return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3';
  };

  const getCategoryTitle = (category: string) => {
    const titles = {
      all: 'Tous les outils',
      growth: 'Growth Marketing & Strategy',
      seo: 'SEO & Content',
      landing: 'Site Web & Landing Pages',
      outbound: 'Outbound & ABM',
      paid: 'Paid Marketing',
      cmo: 'CMO & Leadership'
    };
    return titles[category] || 'Outils';
  };

  const isSearchActive = searchTerm.length > 0;

  return (
    <div className="space-y-8 flex flex-col items-center w-full max-w-7xl mx-auto">
      {/* En-tête avec compteur d'outils */}
      <section className="w-full">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4 mt-4">
            <div className={`p-3 rounded-xl ${isSearchActive ? 'bg-green-100' : 'bg-blue-100'}`}>
              {isSearchActive ? (
                <Search className="w-6 h-6 text-green-600" />
              ) : (
                <Grid3X3 className="w-6 h-6 text-blue-600" />
              )}
            </div>
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-black text-slate-900 dark:text-white`}>
              {isSearchActive ? `Résultats pour "${searchTerm}"` : getCategoryTitle(selectedCategory)}
            </h2>
          </div>
          
          <div className="flex items-center justify-center space-x-3">
            <div className={`px-4 py-2 rounded-full ${
              filteredTools.length > 0 
                ? 'bg-green-100 text-green-700 border-2 border-green-200' 
                : 'bg-red-100 text-red-700 border-2 border-red-200'
            }`}>
              <span className="font-bold text-sm">
                {filteredTools.length} outil{filteredTools.length !== 1 ? 's' : ''} 
                {filteredTools.length > 0 ? ' disponible' : ' trouvé'}{filteredTools.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            {filteredTools.length > 0 && (
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            )}
          </div>
        </div>
        
        {/* Grille d'outils ultra-responsive */}
        <div className={`grid ${getGridColumns()} gap-6 justify-center w-full px-4`}>
          {filteredTools.map(tool => (
            <div key={tool.id} className="flex justify-center">
              <ToolCard
                tool={tool}
                isFavorite={favorites.includes(tool.id)}
                onSelect={() => onToolSelect(tool)}
                onToggleFavorite={() => onToggleFavorite(tool.id)}
                
              />
            </div>
          ))}
        </div>

        {/* Message si aucun outil trouvé */}
        {filteredTools.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-slate-400 dark:text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-600 dark:text-slate-300 mb-3">
              {isSearchActive ? 'Aucun résultat trouvé' : 'Aucun outil disponible'}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              {isSearchActive 
                ? `Aucun outil ne correspond à "${searchTerm}". Essayez avec d'autres mots-clés.`
                : 'Essayez de sélectionner une autre catégorie ou utilisez la recherche.'
              }
            </p>
            {isSearchActive && (
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Voir tous les outils
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
};