
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
      console.log('Scroll vers les outils déclenché');
    } catch (error) {
      console.error('Erreur lors du scroll:', error);
    }
  };

  return (
    <section className="relative min-h-screen-safe flex items-center justify-center bg-gradient-to-br from-white via-primary/5 to-primary/10 px-4 sm:px-6 lg:px-8">
      {/* Background subtil */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl" />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl" />
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto text-center space-y-8 sm:space-y-12">
        {/* Titre épuré */}
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight">
            <span className="text-slate-900">
              Growth fluide 🚀
            </span>
            <br />
            <span className="text-primary font-bold" style={{ background: 'var(--gradient-primary)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              Résultats solides ✨
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium px-4">
            Optimisez vos campagnes, analysez vos performances, automatisez vos processus sans débourser un centime. Le growth marketing démocratisé : professionnel, accessible et respectueux.
          </p>
        </div>

        
        {/* Statistiques épurées */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto px-4">
          <CardClean className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 p-3 sm:p-4 bg-green-50 border-2 border-green-200 min-h-touch-target">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
            <span className="font-bold text-green-700 text-xs sm:text-sm text-center sm:text-left">100% gratuit</span>
          </CardClean>
          
          <CardClean className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 p-3 sm:p-4 bg-blue-50 border-2 border-blue-200 min-h-touch-target">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
            <span className="font-bold text-blue-700 text-xs sm:text-sm text-center sm:text-left">Privacy by design</span>
          </CardClean>
          
          <CardClean className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 p-3 sm:p-4 bg-orange-50 border-2 border-orange-200 min-h-touch-target">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0" />
            <span className="font-bold text-orange-700 text-xs sm:text-sm text-center sm:text-left">50+ outils</span>
          </CardClean>
          
          <CardClean className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 p-3 sm:p-4 bg-slate-50 border-2 border-slate-200 min-h-touch-target">
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 flex-shrink-0" />
            <span className="font-bold text-slate-700 text-xs sm:text-sm text-center sm:text-left">Client-side</span>
          </CardClean>
        </div>

        {/* CTA épuré responsive */}
        <div className="pt-6 sm:pt-8 px-4">
          <button
            onClick={handleScrollClick}
            className="
              inline-flex items-center justify-center space-x-2 sm:space-x-3 
              px-6 py-3 sm:px-8 sm:py-4 lg:px-12 lg:py-6 
              text-base sm:text-lg lg:text-xl 
              font-black text-white 
              border-3 border-primary-dark rounded-xl 
              shadow-xl hover:shadow-2xl 
              touch:active:scale-95 transition-all duration-200
              min-h-touch-target min-w-[160px] sm:min-w-[200px]
            "
            style={{ background: 'var(--gradient-primary)' }}
          >
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            <span>Découvrir les outils</span>
            <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
