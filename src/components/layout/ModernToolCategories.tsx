
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
    gradient: 'from-slate-300 to-slate-400',
    hoverGradient: 'hover:from-slate-400 hover:to-slate-500',
    bgGradient: 'from-slate-50 to-slate-100',
    textColor: 'text-slate-600',
    selectedBg: 'bg-slate-100',
    selectedText: 'text-slate-700',
    selectedRing: 'ring-slate-300',
    shadowColor: 'shadow-slate-200/50'
  },
  { 
    id: 'growth', 
    name: 'Growth Marketing', 
    icon: TrendingUp,
    gradient: 'from-blue-300 to-blue-400',
    hoverGradient: 'hover:from-blue-400 hover:to-blue-500',
    bgGradient: 'from-blue-50 to-blue-100',
    textColor: 'text-blue-600',
    selectedBg: 'bg-blue-100',
    selectedText: 'text-blue-700',
    selectedRing: 'ring-blue-300',
    shadowColor: 'shadow-blue-200/50'
  },
  { 
    id: 'seo', 
    name: 'SEO & Contenu', 
    icon: Search,
    gradient: 'from-emerald-300 to-emerald-400',
    hoverGradient: 'hover:from-emerald-400 hover:to-emerald-500',
    bgGradient: 'from-emerald-50 to-emerald-100',
    textColor: 'text-emerald-600',
    selectedBg: 'bg-emerald-100',
    selectedText: 'text-emerald-700',
    selectedRing: 'ring-emerald-300',
    shadowColor: 'shadow-emerald-200/50'
  },
  { 
    id: 'landing', 
    name: 'Landing Pages', 
    icon: MousePointer,
    gradient: 'from-violet-300 to-violet-400',
    hoverGradient: 'hover:from-violet-400 hover:to-violet-500',
    bgGradient: 'from-violet-50 to-violet-100',
    textColor: 'text-violet-600',
    selectedBg: 'bg-violet-100',
    selectedText: 'text-violet-700',
    selectedRing: 'ring-violet-300',
    shadowColor: 'shadow-violet-200/50'
  },
  { 
    id: 'paid', 
    name: 'Publicité Payante', 
    icon: Target,
    gradient: 'from-rose-300 to-rose-400',
    hoverGradient: 'hover:from-rose-400 hover:to-rose-500',
    bgGradient: 'from-rose-50 to-rose-100',
    textColor: 'text-rose-600',
    selectedBg: 'bg-rose-100',
    selectedText: 'text-rose-700',
    selectedRing: 'ring-rose-300',
    shadowColor: 'shadow-rose-200/50'
  },
  { 
    id: 'outbound', 
    name: 'Outbound Sales', 
    icon: Users,
    gradient: 'from-amber-300 to-amber-400',
    hoverGradient: 'hover:from-amber-400 hover:to-amber-500',
    bgGradient: 'from-amber-50 to-amber-100',
    textColor: 'text-amber-600',
    selectedBg: 'bg-amber-100',
    selectedText: 'text-amber-700',
    selectedRing: 'ring-amber-300',
    shadowColor: 'shadow-amber-200/50'
  },
  { 
    id: 'cmo', 
    name: 'CMO Tools', 
    icon: BarChart3,
    gradient: 'from-indigo-300 to-indigo-400',
    hoverGradient: 'hover:from-indigo-400 hover:to-indigo-500',
    bgGradient: 'from-indigo-50 to-indigo-100',
    textColor: 'text-indigo-600',
    selectedBg: 'bg-indigo-100',
    selectedText: 'text-indigo-700',
    selectedRing: 'ring-indigo-300',
    shadowColor: 'shadow-indigo-200/50'
  }
];

export const ModernToolCategories: React.FC<ModernToolCategoriesProps> = ({
  selectedCategory,
  onCategoryChange,
  compact = false
}) => {
  return (
    <div className={`${compact ? 'py-12' : 'py-20'}`}>
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-full shadow-sm">
          <Zap className="w-5 h-5 text-blue-600" />
          <span className="text-blue-700 font-semibold">Catégories d'outils</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
          Choisissez votre domaine d'expertise
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Explorez nos outils spécialisés conçus pour chaque aspect du marketing digital
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-[180px] ${
                isSelected 
                  ? `${category.selectedBg} ring-2 ${category.selectedRing} shadow-lg scale-105 border-2 border-current` 
                  : `bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg ${category.shadowColor} hover:shadow-lg`
              }`}
              aria-pressed={isSelected}
              role="tab"
            >
              {/* Background Pattern Subtle */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
                <div className={`w-full h-full bg-gradient-to-br ${category.gradient} rounded-full transform translate-x-6 -translate-y-6`} />
              </div>
              
              {/* Icon avec Design Flat */}
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 transition-all duration-300 ${
                isSelected 
                  ? `bg-gradient-to-br ${category.gradient} text-white shadow-md` 
                  : `${category.bgGradient} ${category.textColor} group-hover:bg-gradient-to-br group-hover:${category.gradient} group-hover:text-white group-hover:shadow-md`
              }`}>
                <Icon className="w-7 h-7" />
              </div>
              
              {/* Content avec Espacement Amélioré */}
              <div className="space-y-4">
                <h3 className={`font-bold text-lg leading-tight transition-colors ${
                  isSelected 
                    ? category.selectedText 
                    : 'text-slate-800 group-hover:text-slate-900'
                }`}>
                  {category.name}
                </h3>
                
                {/* Badge avec Style Plus Doux */}
                <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  isSelected 
                    ? `${category.textColor} bg-white/80 shadow-sm` 
                    : 'text-slate-600 bg-slate-100 group-hover:bg-white/80 group-hover:shadow-sm'
                }`}>
                  {category.id === 'all' ? '50 outils' : '8 outils'}
                </div>
              </div>
              
              {/* Subtle Hover Effect */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br ${category.gradient} rounded-2xl`} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
