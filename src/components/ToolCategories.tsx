
import React from 'react';
import { TrendingUp, Search, Palette, Megaphone, BarChart3, Users } from 'lucide-react';
import { TouchOptimized } from './ui/TouchOptimized';
import { useResponsive } from '../hooks/useResponsive';

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
  compact?: boolean;
}

export const ToolCategories: React.FC<ToolCategoriesProps> = ({
  selectedCategory,
  onCategoryChange,
  compact = false,
}) => {
  const { isMobile, isTablet } = useResponsive();

  const getButtonSize = () => {
    if (isMobile) return 'min-w-[70px] px-2 py-2';
    if (isTablet) return 'min-w-[90px] px-3 py-2';
    return compact ? 'min-w-[78px] px-3 py-2 md:min-w-[110px] md:px-4 md:py-3' : 'min-w-[120px] px-6 py-5';
  };

  const getIconSize = () => {
    if (isMobile) return 'w-6 h-6';
    return compact ? 'w-4 h-4 md:w-5 md:h-5' : 'w-7 h-7';
  };

  const getIconContainerSize = () => {
    if (isMobile) return 'w-8 h-8';
    return compact ? 'w-7 h-7 md:w-9 md:h-9' : 'w-11 h-11';
  };

  return (
    <div className="w-full flex justify-center mb-6 transition-all duration-200">
      <div className={`flex ${isMobile ? 'flex-wrap gap-2' : 'flex-wrap gap-2 md:gap-3'} justify-center max-w-full overflow-x-auto`}>
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          return (
            <div
              key={category.id}
              style={{
                boxShadow: isSelected
                  ? undefined
                  : '0 2px 10px 0 rgba(32,52,89,0.04)'
              }}
            >
              <TouchOptimized
                onTap={() => onCategoryChange(category.id)}
                className={`
                  group relative flex flex-col items-center justify-center
                  ${getButtonSize()}
                  rounded-2xl outline-none
                  transition-all duration-200 
                  ${isSelected
                    ? 'shadow-lg shadow-blue-500/15 bg-gradient-to-br from-blue-500/80 to-purple-500/85 text-white scale-105 ring-2 ring-blue-400'
                    : 'bg-white/95 hover:bg-slate-50 border border-slate-200 hover:border-blue-200 text-slate-700 hover:text-blue-700 shadow-md'
                  }
                  ${!isMobile ? 'hover:scale-105 hover:-translate-y-0.5' : 'active:scale-95'}
                  cursor-pointer
                  `}
              >
                {Icon && (
                  <div className={`
                    mb-1 flex items-center justify-center rounded-full 
                    ${isSelected ? 'bg-white/15' : 'bg-slate-100'}
                    ${getIconContainerSize()}
                    transition-colors duration-200
                    group-hover:bg-blue-100
                  `}>
                    <Icon className={getIconSize()} />
                  </div>
                )}

                <span className={`font-semibold ${isMobile ? 'text-xs' : 'text-xs md:text-base'} leading-tight mb-0 text-center`}>
                  {isMobile && category.name.length > 8 
                    ? category.name.split(' ')[0] + (category.name.split(' ')[1] ? '...' : '')
                    : category.name
                  }
                </span>
                <span className={`
                  px-2 py-0.5 rounded-full ${isMobile ? 'text-xs' : 'text-xs'} font-semibold tracking-wide
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
              </TouchOptimized>
            </div>
          );
        })}
      </div>
    </div>
  );
};
