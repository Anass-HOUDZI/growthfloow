
import React from 'react';
import { PremiumCategoryCard } from '../categories/PremiumCategoryCard';
import { ModernCard } from '../ui/modern-card';
import { Zap, Sparkles, TrendingUp, Search, MousePointer, Target, Users, BarChart3 } from 'lucide-react';

interface PremiumToolCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onCategoryClick?: (categoryId: string) => void;
}

const premiumCategories = [
  { 
    id: 'all', 
    name: 'Tous les outils', 
    icon: Sparkles,
    gradient: 'from-slate-500 to-slate-700',
    description: 'Explorez tous nos outils growth marketing',
    toolCount: 50,
    isPopular: true
  },
  { 
    id: 'growth', 
    name: 'Growth & Strategy', 
    icon: TrendingUp,
    gradient: 'from-emerald-500 to-teal-600',
    description: 'Optimisez votre croissance avec des stratégies data-driven',
    toolCount: 12
  },
  { 
    id: 'seo', 
    name: 'SEO & Content', 
    icon: Search,
    gradient: 'from-blue-500 to-cyan-600',
    description: 'Boostez votre visibilité organique et créez du contenu optimisé',
    toolCount: 10
  },
  { 
    id: 'landing', 
    name: 'Landing Pages', 
    icon: MousePointer,
    gradient: 'from-purple-500 to-violet-600',
    description: 'Créez des pages de conversion haute performance',
    toolCount: 8,
    isPopular: true
  },
  { 
    id: 'outbound', 
    name: 'Outbound & ABM', 
    icon: Target,
    gradient: 'from-orange-500 to-red-600',
    description: 'Développez vos ventes avec des stratégies outbound ciblées',
    toolCount: 8
  },
  { 
    id: 'paid', 
    name: 'Paid Marketing', 
    icon: BarChart3,
    gradient: 'from-pink-500 to-rose-600',
    description: 'Optimisez vos campagnes publicitaires pour un ROI maximal',
    toolCount: 6
  },
  { 
    id: 'cmo', 
    name: 'CMO & Leadership', 
    icon: Users,
    gradient: 'from-indigo-500 to-blue-600',
    description: 'Outils stratégiques pour dirigeants marketing',
    toolCount: 6
  }
];

export const PremiumToolCategories: React.FC<PremiumToolCategoriesProps> = ({
  selectedCategory,
  onCategoryChange,
  onCategoryClick
}) => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-primary/5">
      <div className="max-w-7xl mx-auto">
        {/* En-tête Premium */}
        <div className="text-center mb-16">
          <ModernCard 
            variant="glassmorphism" 
            className="inline-flex items-center space-x-3 mb-8 px-6 py-3"
            shine
          >
            <Zap className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-primary font-semibold text-lg">
              Catégories Premium
            </span>
          </ModernCard>
          
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6 leading-tight">
            Choisissez votre domaine
            <br />
            <span className="text-primary font-bold">
              d'expertise
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Explorez nos outils spécialisés conçus pour chaque aspect du marketing digital moderne
          </p>
        </div>
        
        {/* Grille Premium */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {premiumCategories.map((category) => (
            <PremiumCategoryCard
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
