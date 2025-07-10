
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { CardClean } from '../ui/card-clean';

interface CleanCategoryCardProps {
  id: string;
  name: string;
  icon: LucideIcon;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onCategoryClick?: (id: string) => void;
  description?: string;
  toolCount: number;
  isPopular?: boolean;
}

const categoryColors = {
  'all': { bg: 'bg-slate-100', text: 'text-slate-700', accent: 'hsl(var(--neutral-600))' },
  'growth': { bg: 'bg-green-100', text: 'text-green-700', accent: 'hsl(var(--green-primary))' },
  'seo': { bg: 'bg-blue-100', text: 'text-blue-700', accent: 'hsl(var(--blue-primary))' },
  'landing': { bg: 'bg-orange-100', text: 'text-orange-700', accent: 'hsl(var(--orange-primary))' },
  'outbound': { bg: 'bg-red-100', text: 'text-red-700', accent: 'hsl(221 83% 53%)' },
  'paid': { bg: 'bg-pink-100', text: 'text-pink-700', accent: 'hsl(330 81% 60%)' },
  'cmo': { bg: 'bg-indigo-100', text: 'text-indigo-700', accent: 'hsl(239 84% 67%)' }
};

export const CleanCategoryCard: React.FC<CleanCategoryCardProps> = ({
  id,
  name,
  icon: Icon,
  isSelected,
  onSelect,
  onCategoryClick,
  description,
  toolCount,
  isPopular = false
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (onCategoryClick && id !== 'all') {
      onCategoryClick(id);
    } else {
      onSelect(id);
    }
  };

  const colors = categoryColors[id] || categoryColors['all'];

  return (
    <CardClean
      variant={isSelected ? "selected" : "default"}
      size="category"
      hover="lift"
      className="cursor-pointer group"
      onClick={handleClick}
      role="button"
      aria-pressed={isSelected}
    >
      {/* Badge populaire */}
      {isPopular && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">
            ⭐ Populaire
          </span>
        </div>
      )}

      {/* Icône */}
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4 ${colors.bg} border-2 border-transparent group-hover:border-current transition-colors`}>
        <Icon className={`w-8 h-8 ${colors.text}`} />
      </div>
      
      {/* Contenu */}
      <div className="space-y-3">
        <h3 className={`font-bold text-lg leading-tight ${isSelected ? 'text-blue-700' : 'text-slate-800'}`}>
          {name}
        </h3>
        
        {description && (
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
        
        {/* Badge nombre d'outils */}
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border-2 ${
            isSelected 
              ? 'bg-blue-50 text-blue-700 border-blue-200' 
              : 'bg-slate-50 text-slate-600 border-slate-200'
          }`}>
            {toolCount} outil{toolCount > 1 ? 's' : ''}
          </span>
          
          {/* Indicateur de sélection */}
          {isSelected && (
            <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-sm" />
          )}
        </div>
      </div>
    </CardClean>
  );
};
