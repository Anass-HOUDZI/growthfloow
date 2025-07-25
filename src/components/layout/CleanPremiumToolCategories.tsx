
import React from 'react';
import { CleanCategoryCard } from '../categories/CleanCategoryCard';
import { CardClean } from '../ui/card-clean';
import { Zap, TrendingUp, Search, MousePointer, Target, Users, BarChart3 } from 'lucide-react';

interface CleanPremiumToolCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onCategoryClick?: (categoryId: string) => void;
}

const categories = [
  { 
    id: 'all', 
    name: 'Tous les outils', 
    icon: Zap,
    description: 'Explorez tous nos outils growth marketing professionnels',
    toolCount: 50,
    isPopular: true
  },
  { 
    id: 'growth', 
    name: 'Growth & Strategy', 
    icon: TrendingUp,
    description: 'Optimisez votre croissance avec des stratégies data-driven',
    toolCount: 12
  },
  { 
    id: 'seo', 
    name: 'SEO & Content', 
    icon: Search,
    description: 'Boostez votre visibilité organique et créez du contenu optimisé',
    toolCount: 10
  },
  { 
    id: 'landing', 
    name: 'Landing Pages', 
    icon: MousePointer,
    description: 'Créez des pages de conversion haute performance',
    toolCount: 8,
    isPopular: true
  },
  { 
    id: 'outbound', 
    name: 'Outbound & ABM', 
    icon: Target,
    description: 'Développez vos ventes avec des stratégies outbound ciblées',
    toolCount: 8
  },
  { 
    id: 'paid', 
    name: 'Paid Marketing', 
    icon: BarChart3,
    description: 'Optimisez vos campagnes publicitaires pour un ROI maximal',
    toolCount: 6
  },
  { 
    id: 'cmo', 
    name: 'CMO & Leadership', 
    icon: Users,
    description: 'Outils stratégiques pour dirigeants marketing',
    toolCount: 6
  }
];

export const CleanPremiumToolCategories: React.FC<CleanPremiumToolCategoriesProps> = ({
  selectedCategory,
  onCategoryChange,
  onCategoryClick
}) => {
  return (
    <section className="py-16 px-6 bg-gradient-to-br from-slate-50 to-primary/5">
      <div className="max-w-7xl mx-auto">
        {/* En-tête épuré avec plus de marges */}
        <div className="text-center mb-16 space-y-8">
          <CardClean className="inline-flex items-center space-x-3 px-8 py-4 bg-white border-2 border-blue-200">
            <Zap className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg" style={{ background: 'var(--gradient-primary)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              Fluidifiez votre croissance
            </span>
          </CardClean>
          
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              Choisissez votre domaine
              <br />
              <span className="text-primary">
                d'expertise
              </span>
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Explorez nos outils spécialisés conçus pour chaque aspect du marketing digital moderne
            </p>
          </div>
        </div>
        
        {/* Grille épurée avec espacement uniforme */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {categories.map((category) => (
            <CleanCategoryCard
              key={category.id}
              {...category}
              isSelected={selectedCategory === category.id}
              onSelect={onCategoryChange}
              onCategoryClick={onCategoryClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
