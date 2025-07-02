
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
import { categories } from '../../utils/constants';

interface ModernToolCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onCategoryClick?: (categoryId: string) => void;
  compact?: boolean;
}


export const ModernToolCategories: React.FC<ModernToolCategoriesProps> = ({
  selectedCategory,
  onCategoryChange,
  onCategoryClick
}) => {
  return (
    <CategorySection>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          {...category}
          isSelected={selectedCategory === category.id}
          onSelect={onCategoryChange}
          onCategoryClick={onCategoryClick}
        />
      ))}
    </CategorySection>
  );
};
