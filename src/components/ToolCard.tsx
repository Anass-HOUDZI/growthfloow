
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
  isRecent = false,
}) => {
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
    <div className="group relative bg-white rounded-2xl border border-slate-200 
      hover:border-blue-400 transition-all duration-200 
      hover:shadow-xl hover:shadow-indigo-200/40 shadow-md 
      overflow-hidden mx-auto w-full
      hover:scale-[1.04] hover:-translate-y-1
      cursor-pointer
      ">
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
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-blue-50 transition-colors group-hover:scale-110"
      >
        <Star className={`w-4 h-4 ${isFavorite ? 'text-yellow-500 fill-current' : 'text-slate-400'}`} />
      </button>

      <div
        className="p-6 pt-7 cursor-pointer flex flex-col h-full"
        onClick={onSelect}
      >
        <div className="flex items-center mb-3">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${categoryColors[tool.category]} flex items-center justify-center shadow-md`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 ml-3">
            <h3 className="font-semibold text-lg text-slate-800 group-hover:text-blue-700 transition-colors">
              {tool.name}
            </h3>
            <p className="text-xs text-slate-500 capitalize">{tool.category}</p>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">
          {tool.description}
        </p>

        <div className="flex items-center justify-between pt-2">
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
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-200 to-transparent group-hover:via-blue-300 transition-colors" />
    </div>
  );
};
