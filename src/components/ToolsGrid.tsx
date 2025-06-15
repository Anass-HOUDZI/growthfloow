
import React from 'react';
import { ToolCard } from './ToolCard';
import { toolsData } from '../data/toolsData';

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
  const filteredTools = toolsData.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const recentToolsData = toolsData.filter(tool => recentTools.includes(tool.id));

  return (
    <div className="space-y-8">
      {recentTools.length > 0 && searchTerm === '' && selectedCategory === 'all' && (
        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Récemment utilisés</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

      <div>
        <h3 className="text-xl font-semibold text-slate-800 mb-4">
          {selectedCategory === 'all' ? 'Tous les outils' : 
           selectedCategory === 'growth' ? 'Growth Marketing & Strategy' :
           selectedCategory === 'seo' ? 'SEO & Content' :
           selectedCategory === 'landing' ? 'Site Web & Landing Pages' :
           selectedCategory === 'outbound' ? 'Outbound & ABM' :
           selectedCategory === 'paid' ? 'Paid Marketing' :
           'CMO & Leadership'
          } ({filteredTools.length})
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
