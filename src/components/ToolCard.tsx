
import React from 'react';
import { Star, Zap, Clock } from 'lucide-react';

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
  isRecent = false
}) => {
  const categoryColors = {
    growth: 'from-green-500 to-emerald-600',
    seo: 'from-blue-500 to-cyan-600',
    landing: 'from-purple-500 to-violet-600',
    outbound: 'from-orange-500 to-red-600',
    paid: 'from-pink-500 to-rose-600',
    cmo: 'from-indigo-500 to-blue-600'
  };

  const Icon = tool.icon;

  return (
    <div className="group relative bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-200 hover:shadow-lg hover:shadow-slate-200/50 overflow-hidden">
      {isRecent && (
        <div className="absolute top-3 left-3 z-10">
          <div className="flex items-center space-x-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
            <Clock className="w-3 h-3" />
            <span>Récent</span>
          </div>
        </div>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors group-hover:scale-110"
      >
        <Star className={`w-4 h-4 ${isFavorite ? 'text-yellow-500 fill-current' : 'text-slate-400'}`} />
      </button>

      <div 
        className="p-6 cursor-pointer"
        onClick={onSelect}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${categoryColors[tool.category]} flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">
              {tool.name}
            </h3>
            <p className="text-sm text-slate-500">{tool.category}</p>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          {tool.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-xs text-slate-500">
            <Zap className="w-3 h-3" />
            <span>Instant</span>
          </div>
          
          {tool.isPremium && (
            <div className="px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-medium rounded-full">
              Premium
            </div>
          )}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent group-hover:via-slate-300 transition-colors" />
    </div>
  );
};
