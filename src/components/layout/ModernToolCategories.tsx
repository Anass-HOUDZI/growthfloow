
import React from 'react';
import { 
  TrendingUp, 
  Search, 
  MousePointer, 
  Target, 
  Users, 
  BarChart3,
  Sparkles,
  Zap
} from 'lucide-react';

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
    gradient: 'from-slate-600 to-slate-700',
    hoverGradient: 'hover:from-slate-700 hover:to-slate-800',
    bgGradient: 'from-slate-50 to-slate-100',
    textColor: 'text-slate-700'
  },
  { 
    id: 'growth', 
    name: 'Growth Marketing', 
    icon: TrendingUp,
    gradient: 'from-blue-600 to-blue-700',
    hoverGradient: 'hover:from-blue-700 hover:to-blue-800',
    bgGradient: 'from-blue-50 to-blue-100',
    textColor: 'text-blue-700'
  },
  { 
    id: 'seo', 
    name: 'SEO & Contenu', 
    icon: Search,
    gradient: 'from-green-600 to-green-700',
    hoverGradient: 'hover:from-green-700 hover:to-green-800',
    bgGradient: 'from-green-50 to-green-100',
    textColor: 'text-green-700'
  },
  { 
    id: 'landing', 
    name: 'Landing Pages', 
    icon: MousePointer,
    gradient: 'from-purple-600 to-purple-700',
    hoverGradient: 'hover:from-purple-700 hover:to-purple-800',
    bgGradient: 'from-purple-50 to-purple-100',
    textColor: 'text-purple-700'
  },
  { 
    id: 'paid', 
    name: 'Publicité Payante', 
    icon: Target,
    gradient: 'from-red-600 to-red-700',
    hoverGradient: 'hover:from-red-700 hover:to-red-800',
    bgGradient: 'from-red-50 to-red-100',
    textColor: 'text-red-700'
  },
  { 
    id: 'outbound', 
    name: 'Outbound Sales', 
    icon: Users,
    gradient: 'from-orange-600 to-orange-700',
    hoverGradient: 'hover:from-orange-700 hover:to-orange-800',
    bgGradient: 'from-orange-50 to-orange-100',
    textColor: 'text-orange-700'
  },
  { 
    id: 'cmo', 
    name: 'CMO Tools', 
    icon: BarChart3,
    gradient: 'from-indigo-600 to-indigo-700',
    hoverGradient: 'hover:from-indigo-700 hover:to-indigo-800',
    bgGradient: 'from-indigo-50 to-indigo-100',
    textColor: 'text-indigo-700'
  }
];

export const ModernToolCategories: React.FC<ModernToolCategoriesProps> = ({
  selectedCategory,
  onCategoryChange,
  compact = false
}) => {
  return (
    <div className={`${compact ? 'py-8' : 'py-12'}`}>
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 mb-4 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-full">
          <Zap className="w-5 h-5 text-blue-600" />
          <span className="text-blue-700 font-semibold">Catégories d'outils</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          Choisissez votre domaine d'expertise
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Explorez nos outils spécialisés conçus pour chaque aspect du marketing digital
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                isSelected 
                  ? `bg-gradient-to-br ${category.bgGradient} ring-2 ring-offset-2 ring-opacity-60 shadow-lg` 
                  : 'bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg'
              }`}
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                <div className={`w-full h-full bg-gradient-to-br ${category.gradient} rounded-full transform translate-x-6 -translate-y-6`} />
              </div>
              
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-all duration-300 ${
                isSelected 
                  ? `bg-gradient-to-br ${category.gradient} text-white shadow-lg` 
                  : `bg-gradient-to-br ${category.bgGradient} ${category.textColor} group-hover:bg-gradient-to-br group-hover:${category.gradient} group-hover:text-white`
              }`}>
                <Icon className="w-6 h-6" />
              </div>
              
              {/* Content */}
              <div>
                <h3 className={`font-bold text-lg mb-2 transition-colors ${
                  isSelected 
                    ? category.textColor 
                    : 'text-slate-800 group-hover:text-slate-900'
                }`}>
                  {category.name}
                </h3>
                
                {/* Badge avec compteur d'outils */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  isSelected 
                    ? `${category.textColor} bg-white/70` 
                    : 'text-slate-600 bg-slate-100 group-hover:bg-white/70'
                }`}>
                  {category.id === 'all' ? '50 outils' : '8 outils'}
                </div>
              </div>
              
              {/* Hover effect */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${category.gradient} mix-blend-overlay rounded-2xl`} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
