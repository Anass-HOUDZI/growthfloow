
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
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50/30 to-green-50/20 px-6">
      {/* Background subtil */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center space-y-12">
        {/* Badge Premium avec plus de marges */}
        <div className="flex justify-center mb-12">
          <CardClean className="inline-flex items-center space-x-4 px-8 py-4 bg-white border-2 border-blue-200 shadow-md">
            <Zap className="w-6 h-6 text-blue-600" />
            <span className="text-blue-700 font-bold text-lg">
              OpenToolsAI Growth Suite Premium
            </span>
            <Zap className="w-6 h-6 text-orange-500" />
          </CardClean>
        </div>
        
        {/* Titre épuré */}
        <div className="space-y-6">
          <h1 className={`${isMobile ? 'text-4xl' : 'text-6xl md:text-7xl'} font-black leading-tight tracking-tight`}>
            <span className="text-slate-900">
              Growth Marketing
            </span>
            <br />
            <span className="text-blue-600">
              Nouvelle Génération
            </span>
          </h1>
          
          <p className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium`}>
            <span className="text-blue-600 font-bold">50+ outils</span> professionnels de growth marketing, 
            <span className="text-green-600 font-bold"> 100% gratuits</span> et 
            <span className="text-orange-600 font-bold"> privacy-first</span>
          </p>
        </div>

        {/* Barre de recherche épurée */}
        <div className="max-w-2xl mx-auto">
          <CardClean className="p-2 bg-white border-2 border-slate-200 shadow-lg">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={searchPlaceholders[currentPlaceholder]}
                className="w-full pl-12 pr-16 py-4 bg-transparent text-slate-800 placeholder-slate-400 border-0 outline-none text-lg font-medium"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <kbd className="px-3 py-1 text-xs font-semibold text-slate-500 bg-slate-100 border-2 border-slate-200 rounded-md">
                  ⌘K
                </kbd>
              </div>
            </div>
          </CardClean>
        </div>
        
        {/* Statistiques épurées */}
        <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'items-center justify-center space-x-6'}`}>
          <CardClean className="flex items-center space-x-3 px-6 py-3 bg-green-50 border-2 border-green-200">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-bold text-green-700">100% gratuit</span>
          </CardClean>
          
          <CardClean className="flex items-center space-x-3 px-6 py-3 bg-blue-50 border-2 border-blue-200">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-blue-700">Privacy by design</span>
          </CardClean>
          
          {!isMobile && (
            <>
              <CardClean className="flex items-center space-x-3 px-6 py-3 bg-orange-50 border-2 border-orange-200">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <span className="font-bold text-orange-700">50+ outils</span>
              </CardClean>
              
              <CardClean className="flex items-center space-x-3 px-6 py-3 bg-slate-50 border-2 border-slate-200">
                <Globe className="w-5 h-5 text-slate-600" />
                <span className="font-bold text-slate-700">Client-side</span>
              </CardClean>
            </>
          )}
        </div>

        {/* CTA épuré avec bordure */}
        <div className="space-y-8">
          <ButtonClean 
            variant="primary"
            size="lg"
            onClick={handleScrollClick}
            className="text-lg px-12 py-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Zap className="w-6 h-6" />
            <span>Découvrir les outils</span>
            <ArrowDown className="w-5 h-5" />
          </ButtonClean>
          
          {/* Indicateur de scroll épuré */}
          <div className="flex justify-center">
            <CardClean className="w-8 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center">
              <div className="w-1 h-4 bg-blue-500 rounded-full" />
            </CardClean>
          </div>
        </div>
      </div>
    </section>
  );
};
