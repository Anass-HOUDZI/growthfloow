
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
import { CategoryCard } from '../categories/CategoryCard';
import { CategorySection } from '../categories/CategorySection';

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
    bgGradient: 'from-slate-50 to-slate-100',
    textColor: 'text-slate-600',
    selectedBg: 'bg-slate-100',
    selectedText: 'text-slate-700',
    selectedRing: 'ring-slate-300'
  },
  { 
    id: 'growth', 
    name: 'Growth Marketing', 
    icon: TrendingUp,
    gradient: 'from-blue-300 to-blue-400',
    bgGradient: 'from-blue-50 to-blue-100',
    textColor: 'text-blue-600',
    selectedBg: 'bg-blue-100',
    selectedText: 'text-blue-700',
    selectedRing: 'ring-blue-300'
  },
  { 
    id: 'seo', 
    name: 'SEO & Contenu', 
    icon: Search,
    gradient: 'from-emerald-300 to-emerald-400',
    bgGradient: 'from-emerald-50 to-emerald-100',
    textColor: 'text-emerald-600',
    selectedBg: 'bg-emerald-100',
    selectedText: 'text-emerald-700',
    selectedRing: 'ring-emerald-300'
  },
  { 
    id: 'landing', 
    name: 'Landing Pages', 
    icon: MousePointer,
    gradient: 'from-violet-300 to-violet-400',
    bgGradient: 'from-violet-50 to-violet-100',
    textColor: 'text-violet-600',
    selectedBg: 'bg-violet-100',
    selectedText: 'text-violet-700',
    selectedRing: 'ring-violet-300'
  },
  { 
    id: 'paid', 
    name: 'Publicité Payante', 
    icon: Target,
    gradient: 'from-rose-300 to-rose-400',
    bgGradient: 'from-rose-50 to-rose-100',
    textColor: 'text-rose-600',
    selectedBg: 'bg-rose-100',
    selectedText: 'text-rose-700',
    selectedRing: 'ring-rose-300'
  },
  { 
    id: 'outbound', 
    name: 'Outbound Sales', 
    icon: Users,
    gradient: 'from-amber-300 to-amber-400',
    bgGradient: 'from-amber-50 to-amber-100',
    textColor: 'text-amber-600',
    selectedBg: 'bg-amber-100',
    selectedText: 'text-amber-700',
    selectedRing: 'ring-amber-300'
  },
  { 
    id: 'cmo', 
    name: 'CMO Tools', 
    icon: BarChart3,
    gradient: 'from-indigo-300 to-indigo-400',
    bgGradient: 'from-indigo-50 to-indigo-100',
    textColor: 'text-indigo-600',
    selectedBg: 'bg-indigo-100',
    selectedText: 'text-indigo-700',
    selectedRing: 'ring-indigo-300'
  }
];

export const ModernToolCategories: React.FC<ModernToolCategoriesProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <CategorySection>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          {...category}
          isSelected={selectedCategory === category.id}
          onSelect={onCategoryChange}
        />
      ))}
    </CategorySection>
  );
};
