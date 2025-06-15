
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
}

export const ToolCategories: React.FC<ToolCategoriesProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="w-full flex justify-center mb-10">
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`
                group relative flex flex-col items-center justify-center min-w-[120px] px-6 py-5 rounded-2xl outline-none
                transition-all duration-200 
                ${isSelected
                  ? 'shadow-lg shadow-blue-500/15 bg-gradient-to-br from-blue-500/90 to-purple-500/85 text-white scale-105 ring-2 ring-blue-400'
                  : 'bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-200 text-slate-700 hover:text-blue-700 shadow-md'
                }
                hover:scale-105 hover:-translate-y-1 cursor-pointer
              `}
              style={{
                boxShadow: isSelected
                  ? undefined
                  : '0 2px 10px 0 rgba(32,52,89,0.04)'
              }}
            >
              {Icon && (
                <div className={`
                  mb-2 flex items-center justify-center rounded-full 
                  ${isSelected ? 'bg-white/20' : 'bg-slate-100'}
                  w-11 h-11 text-xl
                  transition-colors duration-200
                  group-hover:bg-blue-100
                `}>
                  <Icon className="w-7 h-7" />
                </div>
              )}

              <span className={`font-semibold text-base leading-tight mb-1`}>
                {category.name}
              </span>
              <span className={`
                px-3 py-1 rounded-full text-xs font-semibold tracking-wide
                ${isSelected 
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-100 text-slate-600'
                }
                transition-colors
              `}>
                {category.count}
              </span>
              {isSelected && (
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-5 h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-purple-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
