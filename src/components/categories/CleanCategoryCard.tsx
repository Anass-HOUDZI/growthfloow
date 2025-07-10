
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
  'all': { 
    bg: 'bg-hsl(var(--neutral-100))', 
    text: 'text-hsl(var(--neutral-700))', 
    variant: 'default' as const,
    selectedBg: 'bg-hsl(var(--neutral-bg))'
  },
  'growth': { 
    bg: 'bg-hsl(var(--green-bg))', 
    text: 'text-hsl(var(--green-primary))', 
    variant: 'success' as const,
    selectedBg: 'bg-hsl(var(--green-bg))'
  },
  'seo': { 
    bg: 'bg-hsl(var(--blue-bg))', 
    text: 'text-hsl(var(--blue-primary))', 
    variant: 'primary' as const,
    selectedBg: 'bg-hsl(var(--blue-bg))'
  },
  'landing': { 
    bg: 'bg-hsl(var(--orange-bg))', 
    text: 'text-hsl(var(--orange-primary))', 
    variant: 'warning' as const,
    selectedBg: 'bg-hsl(var(--orange-bg))'
  },
  'outbound': { 
    bg: 'bg-hsl(var(--green-bg))', 
    text: 'text-hsl(var(--green-primary))', 
    variant: 'success' as const,
    selectedBg: 'bg-hsl(var(--green-bg))'
  },
  'paid': { 
    bg: 'bg-hsl(var(--orange-bg))', 
    text: 'text-hsl(var(--orange-primary))', 
    variant: 'warning' as const,
    selectedBg: 'bg-hsl(var(--orange-bg))'
  },
  'cmo': { 
    bg: 'bg-hsl(var(--blue-bg))', 
    text: 'text-hsl(var(--blue-primary))', 
    variant: 'primary' as const,
    selectedBg: 'bg-hsl(var(--blue-bg))'
  }
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
      variant={isSelected ? "selected" : colors.variant}
      size="category"
      hover="lift"
      className="cursor-pointer group w-full max-w-[280px]"
      onClick={handleClick}
      role="button"
      aria-pressed={isSelected}
    >
      {/* Badge populaire avec bordure */}
      {isPopular && (
        <div className="absolute top-6 right-6">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-hsl(var(--orange-primary)) to-hsl(var(--orange-light)) text-white border-2 border-hsl(var(--orange-dark)) shadow-md">
            ⭐ Populaire
          </span>
        </div>
      )}

      {/* Icône avec bordure améliorée */}
      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 border-3 transition-all duration-200 ${colors.bg} ${colors.text} ${
        isSelected 
          ? 'border-current shadow-lg' 
          : 'border-transparent group-hover:border-current group-hover:shadow-md'
      }`}>
        <Icon className="w-10 h-10" />
      </div>
      
      {/* Contenu avec espacement amélioré */}
      <div className="space-y-4">
        <h3 className={`font-black text-xl leading-tight ${
          isSelected 
            ? 'text-hsl(var(--blue-primary))' 
            : 'text-hsl(var(--neutral-800)) group-hover:text-hsl(var(--neutral-900))'
        }`}>
          {name}
        </h3>
        
        {description && (
          <p className="text-sm text-hsl(var(--neutral-600)) leading-relaxed line-clamp-2 font-medium">
            {description}
          </p>
        )}
        
        {/* Badge nombre d'outils avec bordure */}
        <div className="flex items-center justify-between pt-2">
          <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold border-2 shadow-sm ${
            isSelected 
              ? 'bg-white text-hsl(var(--blue-primary)) border-hsl(var(--blue-primary))' 
              : 'bg-hsl(var(--neutral-50)) text-hsl(var(--neutral-700)) border-hsl(var(--neutral-300))'
          }`}>
            {toolCount} outil{toolCount > 1 ? 's' : ''}
          </span>
          
          {/* Indicateur de sélection amélioré */}
          {isSelected && (
            <div className="w-4 h-4 bg-hsl(var(--blue-primary)) rounded-full border-3 border-white shadow-lg" />
          )}
        </div>
      </div>
    </CardClean>
  );
};
