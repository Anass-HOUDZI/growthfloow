
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  id: string;
  name: string;
  icon: LucideIcon;
  isSelected: boolean;
  onSelect: (id: string) => void;
  gradient: string;
  bgGradient: string;
  textColor: string;
  selectedBg: string;
  selectedText: string;
  selectedRing: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  name,
  icon: Icon,
  isSelected,
  onSelect,
  gradient,
  bgGradient,
  textColor,
  selectedBg,
  selectedText,
  selectedRing
}) => {
  const handleClick = () => {
    try {
      onSelect(id);
      console.log('Catégorie sélectionnée:', name);
    } catch (error) {
      console.error('Erreur lors de la sélection de catégorie:', error);
    }
  };

  const getToolCount = (categoryId: string): number => {
    const counts: Record<string, number> = {
      'all': 50,
      'growth': 6,
      'seo': 4,
      'landing': 8,
      'paid': 6,
      'outbound': 8,
      'cmo': 4
    };
    return counts[categoryId] || 0;
  };

  return (
    <button
      onClick={handleClick}
      className={`group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-[180px] ${
        isSelected 
          ? `${selectedBg} ring-2 ${selectedRing} shadow-lg scale-105 border-2 border-current` 
          : `bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg shadow-slate-200/50`
      }`}
      aria-pressed={isSelected}
      role="tab"
      aria-label={`Sélectionner la catégorie ${name}`}
    >
      {/* Background Pattern Subtle */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
        <div className={`w-full h-full bg-gradient-to-br ${gradient} rounded-full transform translate-x-6 -translate-y-6`} />
      </div>
      
      {/* Icon avec Design Flat */}
      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 transition-all duration-300 ${
        isSelected 
          ? `bg-gradient-to-br ${gradient} text-white shadow-md` 
          : `${bgGradient} ${textColor} group-hover:bg-gradient-to-br group-hover:${gradient} group-hover:text-white group-hover:shadow-md`
      }`}>
        <Icon className="w-7 h-7" />
      </div>
      
      {/* Content avec Espacement Amélioré */}
      <div className="space-y-4">
        <h3 className={`font-bold text-lg leading-tight transition-colors ${
          isSelected 
            ? selectedText 
            : 'text-slate-800 group-hover:text-slate-900'
        }`}>
          {name}
        </h3>
        
        {/* Badge avec Style Plus Doux */}
        <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
          isSelected 
            ? `${textColor} bg-white/80 shadow-sm` 
            : 'text-slate-600 bg-slate-100 group-hover:bg-white/80 group-hover:shadow-sm'
        }`}>
          {getToolCount(id)} outil{getToolCount(id) > 1 ? 's' : ''}
        </div>
      </div>
      
      {/* Subtle Hover Effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br ${gradient} rounded-2xl`} />
    </button>
  );
};
