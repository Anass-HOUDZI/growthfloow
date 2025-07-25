import React from 'react';
import { 
  TrendingUp, 
  Search, 
  MousePointer, 
  Target, 
  Users, 
  BarChart3,
  Sparkles
} from 'lucide-react';

interface HorizontalCategoryBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onCategoryClick?: (categoryId: string) => void;
}

const categories = [
  { 
    id: 'all', 
    name: 'Tous les outils', 
    icon: Sparkles,
    description: 'Explorez tous nos outils growth marketing',
    toolCount: 50,
    color: 'blue'
  },
  { 
    id: 'growth', 
    name: 'Growth & Strategy', 
    icon: TrendingUp,
    description: 'Optimisez votre croissance avec des stratégies data-driven',
    toolCount: 12,
    color: 'green'
  },
  { 
    id: 'seo', 
    name: 'SEO & Content', 
    icon: Search,
    description: 'Boostez votre visibilité organique et créez du contenu optimisé',
    toolCount: 10,
    color: 'blue'
  },
  { 
    id: 'landing', 
    name: 'Landing Pages', 
    icon: MousePointer,
    description: 'Créez des pages de conversion haute performance',
    toolCount: 8,
    color: 'orange'
  },
  { 
    id: 'outbound', 
    name: 'Outbound & ABM', 
    icon: Target,
    description: 'Développez vos ventes avec des stratégies outbound ciblées',
    toolCount: 8,
    color: 'red'
  },
  { 
    id: 'paid', 
    name: 'Paid Marketing', 
    icon: BarChart3,
    description: 'Optimisez vos campagnes publicitaires pour un ROI maximal',
    toolCount: 6,
    color: 'purple'
  },
  { 
    id: 'cmo', 
    name: 'CMO & Leadership', 
    icon: Users,
    description: 'Outils stratégiques pour dirigeants marketing',
    toolCount: 6,
    color: 'indigo'
  }
];

const getColorClasses = (color: string, isSelected: boolean) => {
  const colors = {
    blue: isSelected 
      ? 'bg-blue-50 border-blue-500 text-blue-700' 
      : 'bg-white border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300',
    green: isSelected 
      ? 'bg-green-50 border-green-500 text-green-700' 
      : 'bg-white border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300',
    orange: isSelected 
      ? 'bg-orange-50 border-orange-500 text-orange-700' 
      : 'bg-white border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300',
    red: isSelected 
      ? 'bg-red-50 border-red-500 text-red-700' 
      : 'bg-white border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300',
    purple: isSelected 
      ? 'bg-purple-50 border-purple-500 text-purple-700' 
      : 'bg-white border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300',
    indigo: isSelected 
      ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
      : 'bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300'
  };
  return colors[color] || colors.blue;
};

export const HorizontalCategoryBar: React.FC<HorizontalCategoryBarProps> = ({
  selectedCategory,
  onCategoryChange,
  onCategoryClick
}) => {
  return (
    <section className="py-12 px-4 bg-gradient-to-br from-slate-50 to-primary/5">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">
            Choisissez votre domaine
            <br />
            <span className="text-primary font-bold">
              d'expertise
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explorez nos outils spécialisés conçus pour chaque aspect du marketing digital moderne
          </p>
        </div>
        
        {/* Barres horizontales */}
        <div className="space-y-3">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id;
            const Icon = category.icon;
            
            return (
              <button
                key={category.id}
                onClick={() => {
                  onCategoryChange(category.id);
                  if (onCategoryClick) {
                    onCategoryClick(category.id);
                  }
                }}
                className={`
                  w-full p-6 rounded-xl border-3 shadow-sm transition-all duration-300
                  flex items-center justify-between group
                  ${getColorClasses(category.color, isSelected)}
                  ${isSelected ? 'shadow-lg scale-105' : 'hover:shadow-md hover:scale-102'}
                `}
              >
                <div className="flex items-center space-x-4">
                  <div className={`
                    p-3 rounded-lg border-2
                    ${isSelected 
                      ? `bg-${category.color}-100 border-${category.color}-300` 
                      : `bg-${category.color}-50 border-${category.color}-200`
                    }
                  `}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className="text-left">
                    <h3 className="text-lg font-bold mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm opacity-75">
                      {category.description}
                    </p>
                  </div>
                </div>
                
                <div className={`
                  px-4 py-2 rounded-full border-2 font-bold text-sm
                  ${isSelected 
                    ? `bg-${category.color}-100 border-${category.color}-300` 
                    : `bg-${category.color}-50 border-${category.color}-200`
                  }
                `}>
                  {category.toolCount} outils
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};