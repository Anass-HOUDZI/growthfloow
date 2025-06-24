
import React from 'react';
import { 
  TrendingUp, 
  Target, 
  Search, 
  MousePointer, 
  Users, 
  BarChart3,
  Sparkles,
  Filter
} from 'lucide-react';
import { TouchOptimized } from '../ui/TouchOptimized';
import { useResponsive } from '../../hooks/useResponsive';

interface ModernToolCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  compact?: boolean;
}

const categories = [
  { 
    id: 'all', 
    name: 'Tous les outils', 
    icon: Sparkles, 
    color: 'from-gray-500 to-gray-600',
    bgColor: 'from-gray-50 to-gray-100',
    borderColor: 'border-gray-400',
    count: 50 
  },
  { 
    id: 'growth', 
    name: 'Growth Marketing', 
    icon: TrendingUp, 
    color: 'from-blue-500 to-blue-600',
    bgColor: 'from-blue-50 to-blue-100',
    borderColor: 'border-blue-500',
    count: 6 
  },
  { 
    id: 'seo', 
    name: 'SEO & Contenu', 
    icon: Search, 
    color: 'from-green-500 to-green-600',
    bgColor: 'from-green-50 to-green-100',
    borderColor: 'border-green-500',
    count: 4 
  },
  { 
    id: 'landing', 
    name: 'Landing Pages', 
    icon: MousePointer, 
    color: 'from-purple-500 to-purple-600',
    bgColor: 'from-purple-50 to-purple-100',
    borderColor: 'border-purple-500',
    count: 8 
  },
  { 
    id: 'paid', 
    name: 'Publicité Payante', 
    icon: Target, 
    color: 'from-red-500 to-red-600',
    bgColor: 'from-red-50 to-red-100',
    borderColor: 'border-red-500',
    count: 6 
  },
  { 
    id: 'outbound', 
    name: 'Outbound Sales', 
    icon: Users, 
    color: 'from-orange-500 to-orange-600',
    bgColor: 'from-orange-50 to-orange-100',
    borderColor: 'border-orange-500',
    count: 8 
  },
  { 
    id: 'cmo', 
    name: 'CMO Tools', 
    icon: BarChart3, 
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'from-indigo-50 to-indigo-100',
    borderColor: 'border-indigo-500',
    count: 18 
  }
];

export const ModernToolCategories: React.FC<ModernToolCategoriesProps> = ({
  selectedCategory,
  onCategoryChange,
  compact = false
}) => {
  const { isMobile } = useResponsive();

  return (
    <div className="w-full">
      {/* Header avec filtre */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Filter className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Catégories d'outils</h2>
            <p className="text-sm text-slate-600">Choisissez votre domaine d'expertise</p>
          </div>
        </div>
        
        {!isMobile && (
          <div className="text-sm text-slate-500">
            {categories.find(cat => cat.id === selectedCategory)?.count || 0} outils disponibles
          </div>
        )}
      </div>

      {/* Grille de catégories */}
      {isMobile ? (
        // Version mobile : carrousel horizontal
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-3 px-1">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              
              return (
                <TouchOptimized
                  key={category.id}
                  onTap={() => onCategoryChange(category.id)}
                  className={`flex-shrink-0 p-4 rounded-2xl border-2 transition-all duration-300 min-w-[140px] ${
                    isSelected
                      ? `bg-gradient-to-br ${category.bgColor} ${category.borderColor} shadow-lg transform scale-105`
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                      isSelected ? `bg-gradient-to-br ${category.color}` : 'bg-slate-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-slate-600'}`} />
                    </div>
                    <h3 className={`font-medium text-sm mb-1 ${
                      isSelected ? 'text-slate-800' : 'text-slate-700'
                    }`}>
                      {category.name}
                    </h3>
                    <p className={`text-xs ${
                      isSelected ? 'text-slate-600' : 'text-slate-500'
                    }`}>
                      {category.count} outils
                    </p>
                  </div>
                </TouchOptimized>
              );
            })}
          </div>
        </div>
      ) : (
        // Version desktop : grille responsive
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`group p-6 rounded-2xl border-2 transition-all duration-300 hover:transform hover:scale-105 ${
                  isSelected
                    ? `bg-gradient-to-br ${category.bgColor} ${category.borderColor} shadow-lg`
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-lg'
                }`}
              >
                <div className="text-center">
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isSelected ? `bg-gradient-to-br ${category.color} shadow-lg` : 'bg-slate-100 group-hover:bg-slate-200'
                  }`}>
                    <Icon className={`w-7 h-7 transition-all duration-300 ${
                      isSelected ? 'text-white' : 'text-slate-600 group-hover:text-slate-700'
                    }`} />
                  </div>
                  <h3 className={`font-semibold text-sm mb-2 transition-colors ${
                    isSelected ? 'text-slate-800' : 'text-slate-700 group-hover:text-slate-800'
                  }`}>
                    {category.name}
                  </h3>
                  <p className={`text-xs transition-colors ${
                    isSelected ? 'text-slate-600' : 'text-slate-500 group-hover:text-slate-600'
                  }`}>
                    {category.count} outils
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
