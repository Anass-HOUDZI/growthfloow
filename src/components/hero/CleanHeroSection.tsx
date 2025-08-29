
import React, { useState, useEffect } from 'react';
import { Zap, Shield, Globe, TrendingUp, ArrowDown, Search, CheckCircle } from 'lucide-react';
import { ButtonClean } from '../ui/button-clean';
import { CardClean } from '../ui/card-clean';
import { useResponsive } from '../../hooks/useResponsive';

interface CleanHeroSectionProps {
  onScrollToTools: () => void;
}

const searchPlaceholders = [
  "Rechercher un outil growth...",
  "Analyseur de funnel...",
  "Optimiseur SEO...",
  "Générateur de leads...",
];

export const CleanHeroSection: React.FC<CleanHeroSectionProps> = ({ onScrollToTools }) => {
  const { isMobile } = useResponsive();
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % searchPlaceholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollClick = () => {
    try {
      onScrollToTools();
    } catch (error) {
      if (import.meta.env.MODE === 'development') {
        console.error('[CleanHeroSection] Erreur lors du scroll:', error);
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-primary/5 to-primary/10 px-6">
      {/* Background subtil */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center space-y-12">
        {/* Titre épuré */}
        <div className="space-y-6">
          <h1 className={`${isMobile ? 'text-4xl' : 'text-6xl md:text-7xl'} font-black leading-tight tracking-tight`}>
            <span className="text-slate-900">
              Growth fluide 🚀
            </span>
            <br />
            <span className="text-primary font-bold" style={{ background: 'var(--gradient-primary)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              Résultats solides ✨
            </span>
          </h1>
          
          {/* Description */}
          <div className={`${isMobile ? 'text-lg' : 'text-xl'} text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium`}>
            La boîte à outils growth marketing complète pour entrepreneurs, marketeurs et agences digitales.{' '}
            <br /><br />
            <strong>Optimisation SEO | Création de landing pages | Analyse de performance | Email marketing | Analytics et bien plus !</strong>
          </div>
        </div>

        
        {/* Statistiques épurées */}
        <div className={`grid ${isMobile ? 'grid-cols-2 gap-3' : 'grid-cols-4 gap-4'} max-w-4xl mx-auto`}>
          <CardClean className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-50 border-2 border-green-200">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span className="font-bold text-green-700 text-sm">100% gratuit</span>
          </CardClean>
          
          <CardClean className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-50 border-2 border-blue-200">
            <Shield className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span className="font-bold text-blue-700 text-sm">Privacy by design</span>
          </CardClean>
          
          <CardClean className="flex items-center justify-center space-x-2 px-4 py-3 bg-orange-50 border-2 border-orange-200">
            <TrendingUp className="w-4 h-4 text-orange-600 flex-shrink-0" />
            <span className="font-bold text-orange-700 text-sm">50+ outils</span>
          </CardClean>
          
          <CardClean className="flex items-center justify-center space-x-2 px-4 py-3 bg-slate-50 border-2 border-slate-200">
            <Globe className="w-4 h-4 text-slate-600 flex-shrink-0" />
            <span className="font-bold text-slate-700 text-sm">Client-side</span>
          </CardClean>
        </div>

        {/* CTA épuré responsive sans animation */}
        <div className="pt-8">
          <button
            onClick={handleScrollClick}
            className={`
              inline-flex items-center space-x-3 
              ${isMobile ? 'px-8 py-4 text-lg' : 'px-12 py-6 text-xl'} 
              font-black text-white 
              border-3 border-primary-dark rounded-xl shadow-xl
              hover:shadow-2xl hover:opacity-90
              transition-all duration-200
            `}
            style={{ background: 'var(--gradient-primary)' }}
          >
            <Zap className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
            <span>Découvrir les outils</span>
            <ArrowDown className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
          </button>
        </div>
      </div>
    </section>
  );
};
