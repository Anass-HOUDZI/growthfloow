
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
    <section className="py-20 px-6 bg-gradient-to-br from-hsl(var(--neutral-50)) to-hsl(var(--blue-bg))/30">
      <div className="max-w-7xl mx-auto">
        {/* En-tête avec espacement amélioré */}
        <div className="text-center mb-20 space-y-10">
          <CardClean 
            variant="primary"
            className="inline-flex items-center space-x-4 px-10 py-5 border-3 border-hsl(var(--blue-primary))"
          >
            <Zap className="w-6 h-6 text-hsl(var(--blue-primary))" />
            <span className="text-hsl(var(--blue-primary)) font-black text-xl">
              OpenToolsAI Growth Suite Premium
            </span>
          </CardClean>
          
          <div className="space-y-8">
            <h2 className="text-5xl md:text-6xl font-black text-hsl(var(--neutral-900)) leading-tight">
              Choisissez votre domaine
              <br />
              <span className="text-hsl(var(--blue-primary))">
                d'expertise
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-hsl(var(--neutral-600)) max-w-4xl mx-auto leading-relaxed font-medium">
              Explorez nos outils spécialisés conçus pour chaque aspect du marketing digital moderne
            </p>
          </div>
        </div>
        
        {/* Grille avec espacement uniforme et centrage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
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
