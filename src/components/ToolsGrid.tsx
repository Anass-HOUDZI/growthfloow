
import React, { useMemo } from 'react';
import { ToolCard } from './ToolCard';
import { toolsData } from '../data/toolsData';
import { useResponsive } from '../hooks/useResponsive';
import { Clock, Grid3X3 } from 'lucide-react';

interface ToolsGridProps {
  selectedCategory: string;
  searchTerm: string;
  favorites: string[];
  onToolSelect: (tool: any) => void;
  onToggleFavorite: (toolId: string) => void;
  recentTools: string[];
}

export const ToolsGrid: React.FC<ToolsGridProps> = ({
  selectedCategory,
  searchTerm,
  favorites,
  onToolSelect,
  onToggleFavorite,
  recentTools
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

  const recentToolsData = useMemo(() => {
    return toolsData.filter(tool => recentTools.includes(tool.id));
  }, [recentTools]);

  const getGridColumns = () => {
    if (isMobile) return 'grid-cols-1 sm:grid-cols-2';
    if (isTablet) return 'grid-cols-2 md:grid-cols-3';
    return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
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

  return (
    <div className="space-y-12 flex flex-col items-center w-full max-w-7xl mx-auto">
      {/* Section Outils Récents */}
      {recentTools.length > 0 && searchTerm === '' && selectedCategory === 'all' && (
        <section className="w-full">
          <div className="mb-6 text-center">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-slate-800`}>
                Récemment utilisés
              </h2>
            </div>
            <p className="text-slate-600 text-sm">
              Vos derniers outils consultés pour continuer votre travail
            </p>
          </div>
          
          <div className={`grid ${getGridColumns()} gap-6 justify-center w-full ${isMobile ? 'px-2' : 'px-4'}`}>
            {recentToolsData.map(tool => (
              <ToolCard
                key={`recent-${tool.id}`}
                tool={tool}
                isFavorite={favorites.includes(tool.id)}
                onSelect={() => onToolSelect(tool)}
                onToggleFavorite={() => onToggleFavorite(tool.id)}
                isRecent={true}
              />
            ))}
          </div>
        </section>
      )}

      {/* Section Outils Principaux */}
      <section className="w-full">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Grid3X3 className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-slate-800`}>
              {getCategoryTitle(selectedCategory)}
            </h2>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-slate-600 text-sm">
              {filteredTools.length} outil{filteredTools.length > 1 ? 's' : ''} disponible{filteredTools.length > 1 ? 's' : ''}
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
        </div>
        
        <div className={`grid ${getGridColumns()} gap-6 justify-center w-full ${isMobile ? 'px-2' : 'px-4'}`}>
          {filteredTools.map(tool => (
            <ToolCard
              key={tool.id}
              tool={tool}
              isFavorite={favorites.includes(tool.id)}
              onSelect={() => onToolSelect(tool)}
              onToggleFavorite={() => onToggleFavorite(tool.id)}
            />
          ))}
        </div>

        {/* Message si aucun outil trouvé */}
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Grid3X3 className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-600 mb-2">
              Aucun outil trouvé
            </h3>
            <p className="text-slate-500 text-sm">
              Essayez de modifier vos critères de recherche ou sélectionnez une autre catégorie.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
