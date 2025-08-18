import React from 'react';
import { Star, Zap, Clock, ArrowRight, Eye } from 'lucide-react';
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
      transition-all duration-300 shadow-md overflow-hidden 
      mx-auto w-full h-full flex flex-col min-h-touch-target-large
      interactive-hover interactive-press
      ${isMobile ? 'min-h-[160px]' : 'min-h-[200px]'}
      `}
    >
      {/* Badges et favoris */}
      <div className="absolute top-2 sm:top-3 left-0 right-0 z-10 flex justify-between items-start px-2 sm:px-3">
        {isRecent && (
          <div className="flex items-center space-x-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
            <Clock className="w-3 h-3" />
            <span>Récent</span>
          </div>
        )}
        
        <div className={isRecent ? '' : 'ml-auto'}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className={`btn-touch p-2 rounded-full bg-white/90 hover:bg-blue-50 
              transition-colors shadow-md flex items-center justify-center
              ${isTouch ? 'min-w-touch-target min-h-touch-target' : 'min-w-[36px] min-h-[36px]'}`}
            aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'text-yellow-500 fill-current' : 'text-slate-400'}`} />
          </button>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="touch-spacing pt-8 sm:pt-12 flex flex-col h-full">
        {/* Header avec icône et titre */}
        <div className="flex items-start mb-3 sm:mb-4">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl 
            bg-gradient-to-br ${categoryColors[tool.category]} 
            flex items-center justify-center shadow-lg flex-shrink-0`}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
          </div>
          <div className="flex-1 ml-3 sm:ml-4">
            <h3 className="font-bold text-sm sm:text-base lg:text-lg text-slate-800 
              group-hover:text-blue-700 transition-colors leading-tight">
              {tool.name}
            </h3>
            <p className="text-xs text-slate-500 capitalize font-medium mt-1">{tool.category}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed flex-1 mb-4">
          {tool.description}
        </p>

        {/* Bouton d'action */}
        <button
          onClick={onSelect}
          className={`w-full btn-touch flex items-center justify-center space-x-2 
            bg-gradient-to-r from-blue-600 to-indigo-600 text-white 
            rounded-xl font-semibold transition-all duration-200
            hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg
            text-xs sm:text-sm py-2 sm:py-3`}
        >
          <span>Utiliser</span>
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
};