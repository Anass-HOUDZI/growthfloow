
import React from 'react';
import { TrendingUp, Search, Palette, Megaphone, BarChart3, Users } from 'lucide-react';

const categories = [
  { id: 'all', name: 'Tous les outils', icon: null, count: 50 },
  { id: 'growth', name: 'Growth & Strategy', icon: TrendingUp, count: 12 },
  { id: 'seo', name: 'SEO & Content', icon: Search, count: 10 },
  { id: 'landing', name: 'Landing Pages', icon: Palette, count: 8 },
  { id: 'outbound', name: 'Outbound & ABM', icon: Megaphone, count: 8 },
  { id: 'paid', name: 'Paid Marketing', icon: BarChart3, count: 6 },
  { id: 'cmo', name: 'CMO & Leadership', icon: Users, count: 6 },
];

interface ToolCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  compact?: boolean; // nouvelle prop pour affichage compact
}

export const ToolCategories: React.FC<ToolCategoriesProps> = ({
  selectedCategory,
  onCategoryChange,
  compact = false,
}) => {
  return (
    <div className={`w-full flex justify-center mb-6 transition-all duration-200`}>
      <div className={`flex flex-wrap gap-2 md:gap-3 justify-center`}>
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`
                group relative flex flex-col items-center justify-center
                ${compact ? 'min-w-[78px] px-3 py-2 md:min-w-[110px] md:px-4 md:py-3' : 'min-w-[120px] px-6 py-5'}
                rounded-2xl outline-none
                transition-all duration-200 
                ${isSelected
                  ? 'shadow-lg shadow-blue-500/15 bg-gradient-to-br from-blue-500/80 to-purple-500/85 text-white scale-105 ring-2 ring-blue-400'
                  : 'bg-white/95 hover:bg-slate-50 border border-slate-200 hover:border-blue-200 text-slate-700 hover:text-blue-700 shadow-md'
                }
                hover:scale-105 hover:-translate-y-0.5 cursor-pointer
                `}
              style={{
                boxShadow: isSelected
                  ? undefined
                  : '0 2px 10px 0 rgba(32,52,89,0.04)'
              }}
            >
              {Icon && (
                <div className={`
                  mb-1 flex items-center justify-center rounded-full 
                  ${isSelected ? 'bg-white/15' : 'bg-slate-100'}
                  ${compact ? 'w-7 h-7 md:w-9 md:h-9' : 'w-11 h-11'}
                  text-xl
                  transition-colors duration-200
                  group-hover:bg-blue-100
                `}>
                  <Icon className={`${compact ? 'w-4 h-4 md:w-5 md:h-5' : 'w-7 h-7'}`} />
                </div>
              )}

              <span className={`font-semibold text-xs md:text-base leading-tight mb-0`}>
                {category.name}
              </span>
              <span className={`
                px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide
                ${isSelected 
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-100 text-slate-600'
                }
                transition-colors
              `}>
                {category.count}
              </span>
              {isSelected && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-blue-400 via-blue-600 to-purple-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
