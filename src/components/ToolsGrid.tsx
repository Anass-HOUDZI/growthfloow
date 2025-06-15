
import React from 'react';
import { ToolCard } from './ToolCard';
import { toolsData } from '../data/toolsData';
import { useResponsive } from '../hooks/useResponsive';

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
  
  const filteredTools = toolsData.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const recentToolsData = toolsData.filter(tool => recentTools.includes(tool.id));

  const getGridColumns = () => {
    if (isMobile) return 'grid-cols-1 sm:grid-cols-2';
    if (isTablet) return 'grid-cols-2 md:grid-cols-3';
    return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
  };

  return (
    <div className="space-y-10 flex flex-col items-center w-full">
      {recentTools.length > 0 && searchTerm === '' && selectedCategory === 'all' && (
        <div className="w-full max-w-6xl flex flex-col items-center">
          <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-slate-800 mb-4 text-center`}>
            Récemment utilisés
          </h3>
          <div className={`grid ${getGridColumns()} gap-4 md:gap-6 justify-center w-full ${isMobile ? 'px-2' : ''}`}>
            {recentToolsData.map(tool => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFavorite={favorites.includes(tool.id)}
                onSelect={() => onToolSelect(tool)}
                onToggleFavorite={() => onToggleFavorite(tool.id)}
                isRecent={true}
              />
            ))}
          </div>
        </div>
      )}

      <div className="w-full max-w-6xl flex flex-col items-center">
        <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-slate-800 mb-4 text-center`}>
          {selectedCategory === 'all' ? 'Tous les outils' : 
           selectedCategory === 'growth' ? 'Growth Marketing & Strategy' :
           selectedCategory === 'seo' ? 'SEO & Content' :
           selectedCategory === 'landing' ? 'Site Web & Landing Pages' :
           selectedCategory === 'outbound' ? 'Outbound & ABM' :
           selectedCategory === 'paid' ? 'Paid Marketing' :
           'CMO & Leadership'
          } ({filteredTools.length})
        </h3>
        <div className={`grid ${getGridColumns()} gap-4 md:gap-6 justify-center w-full ${isMobile ? 'px-2' : ''}`}>
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
      </div>
    </div>
  );
};
