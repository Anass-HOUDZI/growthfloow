
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { ModernCard } from '../ui/modern-card';
import { Badge } from '../ui/badge';

interface PremiumCategoryCardProps {
  id: string;
  name: string;
  icon: LucideIcon;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onCategoryClick?: (id: string) => void;
  gradient: string;
  description?: string;
  toolCount: number;
  isPopular?: boolean;
}

export const PremiumCategoryCard: React.FC<PremiumCategoryCardProps> = ({
  id,
  name,
  icon: Icon,
  isSelected,
  onSelect,
  onCategoryClick,
  gradient,
  description,
  toolCount,
  isPopular = false
}) => {
  const handleClick = (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      
      if (onCategoryClick && id !== 'all') {
        onCategoryClick(id);
      } else {
        onSelect(id);
      }
    } catch (error) {
      if (import.meta.env.MODE === 'development') {
        console.error('[PremiumCategoryCard] Erreur lors de la sélection:', error);
      }
    }
  };

  return (
    <ModernCard
      variant={isSelected ? "premium" : "glassmorphism"}
      hover="transform3d"
      shine={!isSelected}
      className={`group cursor-pointer min-h-[220px] p-0 transition-all duration-500 transform-gpu ${
        isSelected 
          ? `bg-gradient-to-br ${gradient} text-white scale-105 shadow-2xl ring-2 ring-white/30` 
          : 'hover:scale-105 hover:-translate-y-2 hover:shadow-2xl'
      }`}
      onClick={handleClick}
      aria-pressed={isSelected}
      role="button"
      aria-label={`${onCategoryClick && id !== 'all' ? 'Voir les outils de' : 'Sélectionner la catégorie'} ${name}`}
    >
      {/* Background Image avec Overlay */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-${isSelected ? '100' : '10'} transition-opacity duration-500`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* Badges */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
        {isPopular && (
          <Badge variant="secondary" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 font-semibold">
            ⭐ Populaire
          </Badge>
        )}
        <Badge 
          variant={isSelected ? "outline" : "secondary"} 
          className={`ml-auto ${isSelected ? 'border-white/30 text-white' : 'bg-white/90 text-slate-700'}`}
        >
          {toolCount} outil{toolCount > 1 ? 's' : ''}
        </Badge>
      </div>

      {/* Contenu Principal */}
      <div className="relative z-10 p-6 pt-16 h-full flex flex-col">
        {/* Icône avec Animation 3D */}
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 ${
          isSelected 
            ? 'bg-white/20 text-white shadow-lg' 
            : 'bg-white/10 text-slate-600 group-hover:bg-white/80 group-hover:text-slate-800 group-hover:shadow-xl'
        }`}>
          <Icon className="w-8 h-8" />
        </div>
        
        {/* Titre et Description */}
        <div className="flex-1">
          <h3 className={`font-bold text-xl leading-tight mb-3 transition-colors ${
            isSelected 
              ? 'text-white' 
              : 'text-slate-800 group-hover:text-slate-900'
          }`}>
            {name}
          </h3>
          
          {description && (
            <p className={`text-sm leading-relaxed ${
              isSelected 
                ? 'text-white/80' 
                : 'text-slate-600 group-hover:text-slate-700'
            }`}>
              {description}
            </p>
          )}
        </div>

        {/* Indicateur de progression */}
        <div className="mt-6">
          <div className={`h-1 rounded-full transition-all duration-500 ${
            isSelected 
              ? 'bg-white/30' 
              : 'bg-primary/20 group-hover:bg-primary/40'
          }`}>
            <div className={`h-full rounded-full transition-all duration-700 ${
              isSelected 
                ? 'bg-white w-full' 
                : 'bg-primary w-0 group-hover:w-full'
            }`} />
          </div>
        </div>
      </div>

      {/* Effet de particules au hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
              animationDelay: `${i * 200}ms`
            }}
          />
        ))}
      </div>
    </ModernCard>
  );
};
