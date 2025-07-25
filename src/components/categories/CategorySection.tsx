
import React from 'react';
import { Zap } from 'lucide-react';

interface CategorySectionProps {
  children: React.ReactNode;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ children }) => {
  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-primary/5 border border-primary/20 rounded-full shadow-sm">
          <Zap className="w-5 h-5 text-primary" />
          <span className="text-blue-700 font-semibold">Catégories d'outils</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ background: 'var(--gradient-primary)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
          Choisissez votre domaine d'expertise
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Explorez nos outils spécialisés conçus pour chaque aspect du marketing digital
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {children}
      </div>
    </div>
  );
};
