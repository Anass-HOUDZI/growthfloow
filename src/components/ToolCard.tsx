
import React from 'react';
import { Star, Zap, Clock, ArrowRight, Eye } from 'lucide-react';
import { TouchOptimized } from './ui/TouchOptimized';
import { useResponsive } from '../hooks/useResponsive';

interface ToolCardProps {
  tool: any;
  isFavorite: boolean;
  onSelect: () => void;
  onToggleFavorite: () => void;
  isRecent?: boolean;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  isFavorite,
  onSelect,
  onToggleFavorite,
  isRecent = false,
}) => {
  const { isMobile, isTouch } = useResponsive();
  
  const categoryColors = {
    growth: 'from-green-400/90 to-teal-400/90',
    seo: 'from-blue-400/90 to-cyan-400/90',
    landing: 'from-purple-400/90 to-violet-400/90',
    outbound: 'from-orange-400/90 to-red-400/90',
    paid: 'from-pink-400/90 to-rose-400/90',
    cmo: 'from-indigo-400/90 to-blue-500/90'
  };

  const Icon = tool.icon;

  return (
    <div className={`group relative bg-white rounded-2xl border border-slate-200 
      hover:border-blue-400 transition-all duration-300 
      hover:shadow-xl hover:shadow-indigo-200/40 shadow-md 
      overflow-hidden mx-auto w-full h-full flex flex-col
      ${!isTouch ? 'hover:scale-[1.02] hover:-translate-y-1' : ''}
      ${isMobile ? 'min-h-[180px]' : 'min-h-[220px]'}
      `}
    >
      {/* Badges et favoris */}
      <div className="absolute top-3 left-0 right-0 z-10 flex justify-between items-start px-3">
        {isRecent && (
          <div className="flex items-center space-x-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
            <Clock className="w-3 h-3" />
            <span>Récent</span>
          </div>
        )}
        
        <div className={isRecent ? '' : 'ml-auto'}>
          <TouchOptimized
            onTap={onToggleFavorite}
            className={`p-2 rounded-full bg-white/90 hover:bg-blue-50 transition-colors 
              ${isTouch ? 'min-w-[44px] min-h-[44px]' : ''} 
              group-hover:scale-110 flex items-center justify-center shadow-md`}
            aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'text-yellow-500 fill-current' : 'text-slate-400'}`} />
          </TouchOptimized>
        </div>
      </div>

      {/* Contenu principal */}
      <div className={`p-6 pt-12 flex flex-col h-full ${isMobile ? 'p-4 pt-10' : ''}`}>
        {/* Header avec icône et titre */}
        <div className="flex items-start mb-4">
          <div className={`${isMobile ? 'w-12 h-12' : 'w-14 h-14'} rounded-xl bg-gradient-to-br ${categoryColors[tool.category]} flex items-center justify-center shadow-lg flex-shrink-0`}>
            <Icon className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-white`} />
          </div>
          <div className="flex-1 ml-4">
            <h3 className={`font-bold ${isMobile ? 'text-base' : 'text-lg'} text-slate-800 group-hover:text-blue-700 transition-colors leading-tight`}>
              {tool.name}
            </h3>
            <p className="text-xs text-slate-500 capitalize font-medium mt-1">{tool.category}</p>
          </div>
        </div>

        {/* Description */}
        <p className={`${isMobile ? 'text-sm' : 'text-sm'} text-slate-600 leading-relaxed mb-4 flex-1 ${isMobile ? 'line-clamp-3' : 'line-clamp-2'}`}>
          {tool.description}
        </p>

        {/* Métriques et badges */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1 text-xs text-slate-500">
            <Zap className="w-3 h-3" />
            <span>Instant</span>
          </div>
          {tool.isPremium && (
            <div className="px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-400 text-white text-xs font-semibold rounded-full shadow-sm">
              Premium
            </div>
          )}
        </div>

        {/* Bouton CTA - Toujours cliquable */}
        <TouchOptimized
          onTap={onSelect}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold py-3 px-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg group-hover:scale-105 mt-auto active:scale-95"
          aria-label={`Découvrir l'outil ${tool.name}`}
        >
          <Eye className="w-4 h-4" />
          <span>Découvrir</span>
          <ArrowRight className="w-4 h-4" />
        </TouchOptimized>
      </div>

      {/* Indicateur de progression */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-200 to-transparent group-hover:via-blue-400 transition-colors" />
    </div>
  );
};
