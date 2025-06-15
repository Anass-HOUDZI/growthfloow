
import React from 'react';
import { TrendingUp, Search, Palette, Megaphone, BarChart3, Users } from 'lucide-react';

const categories = [
  { id: 'all', name: 'Tous les outils', icon: null, count: 50 },
  { id: 'growth', name: 'Growth & Strategy', icon: TrendingUp, count: 12 },
  { id: 'seo', name: 'SEO & Content', icon: Search, count: 10 },
  { id: 'landing', name: 'Landing Pages', icon: Palette, count: 8 },
  { id: 'outbound', name: 'Outbound & ABM', icon: Megaphone, count: 8 },
  { id: 'paid', name: 'Paid Marketing', icon: BarChart3, count: 6 },
  { id: 'cmo', name: 'CMO & Leadership', icon: Users, count: 6 }
];

interface ToolCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const ToolCategories: React.FC<ToolCategoriesProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`
                flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200
                ${isSelected 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
                }
              `}
            >
              {Icon && <Icon className="w-5 h-5" />}
              <span className="font-medium">{category.name}</span>
              <span className={`
                px-2 py-1 rounded-full text-xs font-medium
                ${isSelected 
                  ? 'bg-white/20 text-white' 
                  : 'bg-slate-100 text-slate-600'
                }
              `}>
                {category.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
