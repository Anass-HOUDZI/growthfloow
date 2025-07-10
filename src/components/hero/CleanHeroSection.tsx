
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
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-hsl(var(--blue-bg))/40 to-hsl(var(--green-bg))/30 px-6">
      {/* Background pattern épuré */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-hsl(var(--blue-primary))/20 rounded-full mix-blend-multiply filter blur-xl" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-hsl(var(--green-primary))/20 rounded-full mix-blend-multiply filter blur-xl" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-hsl(var(--orange-primary))/20 rounded-full mix-blend-multiply filter blur-xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center space-y-16">
        {/* Badge Premium avec bordures et marges améliorées */}
        <div className="flex justify-center mb-16">
          <CardClean 
            variant="primary"
            className="inline-flex items-center space-x-6 px-12 py-6 border-3 border-hsl(var(--blue-primary)) shadow-xl"
          >
            <Zap className="w-7 h-7 text-hsl(var(--blue-primary))" />
            <span className="text-hsl(var(--blue-primary)) font-black text-xl">
              OpenToolsAI Growth Suite Premium
            </span>
            <Zap className="w-7 h-7 text-hsl(var(--orange-primary))" />
          </CardClean>
        </div>
        
        {/* Titre avec contraste amélioré */}
        <div className="space-y-8">
          <h1 className={`${isMobile ? 'text-4xl' : 'text-6xl md:text-7xl'} font-black leading-tight tracking-tight`}>
            <span className="text-hsl(var(--neutral-900))">
              Growth Marketing
            </span>
            <br />
            <span className="text-hsl(var(--blue-primary))">
              Nouvelle Génération
            </span>
          </h1>
          
          <p className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} text-hsl(var(--neutral-600)) max-w-4xl mx-auto leading-relaxed font-semibold`}>
            <span className="text-hsl(var(--blue-primary)) font-black">50+ outils</span> professionnels de growth marketing, 
            <span className="text-hsl(var(--green-primary)) font-black"> 100% gratuits</span> et 
            <span className="text-hsl(var(--orange-primary)) font-black"> privacy-first</span>
          </p>
        </div>

        {/* Barre de recherche avec bordures améliorées */}
        <div className="max-w-2xl mx-auto">
          <CardClean 
            variant="default"
            className="p-3 border-3 border-hsl(var(--neutral-300)) shadow-lg"
          >
            <div className="relative">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-hsl(var(--neutral-500)) w-6 h-6" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={searchPlaceholders[currentPlaceholder]}
                className="w-full pl-14 pr-20 py-5 bg-transparent text-hsl(var(--neutral-800)) placeholder-hsl(var(--neutral-500)) border-0 outline-none text-lg font-semibold"
              />
              <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
                <kbd className="px-4 py-2 text-sm font-bold text-hsl(var(--neutral-600)) bg-hsl(var(--neutral-100)) border-2 border-hsl(var(--neutral-300)) rounded-lg shadow-sm">
                  ⌘K
                </kbd>
              </div>
            </div>
          </CardClean>
        </div>
        
        {/* Statistiques avec bordures et espacement améliorés */}
        <div className={`flex ${isMobile ? 'flex-col space-y-6' : 'items-center justify-center space-x-8'}`}>
          <CardClean 
            variant="success"
            className="flex items-center space-x-4 px-8 py-4 border-3 border-hsl(var(--green-primary))/30"
          >
            <CheckCircle className="w-6 h-6 text-hsl(var(--green-primary))" />
            <span className="font-black text-hsl(var(--green-primary)) text-lg">100% gratuit</span>
          </CardClean>
          
          <CardClean 
            variant="primary"
            className="flex items-center space-x-4 px-8 py-4 border-3 border-hsl(var(--blue-primary))/30"
          >
            <Shield className="w-6 h-6 text-hsl(var(--blue-primary))" />
            <span className="font-black text-hsl(var(--blue-primary)) text-lg">Privacy by design</span>
          </CardClean>
          
          {!isMobile && (
            <>
              <CardClean 
                variant="warning"
                className="flex items-center space-x-4 px-8 py-4 border-3 border-hsl(var(--orange-primary))/30"
              >
                <TrendingUp className="w-6 h-6 text-hsl(var(--orange-primary))" />
                <span className="font-black text-hsl(var(--orange-primary)) text-lg">50+ outils</span>
              </CardClean>
              
              <CardClean 
                variant="default"
                className="flex items-center space-x-4 px-8 py-4 border-3 border-hsl(var(--neutral-300))"
              >
                <Globe className="w-6 h-6 text-hsl(var(--neutral-600))" />
                <span className="font-black text-hsl(var(--neutral-700)) text-lg">Client-side</span>
              </CardClean>
            </>
          )}
        </div>

        {/* CTA avec design épuré et bordures */}
        <div className="space-y-10">
          <ButtonClean 
            variant="primary"
            size="lg"
            onClick={handleScrollClick}
            className="text-xl px-16 py-6 shadow-2xl hover:shadow-2xl border-3 border-hsl(var(--blue-dark))"
          >
            <Zap className="w-7 h-7" />
            <span>Découvrir les outils</span>
            <ArrowDown className="w-6 h-6" />
          </ButtonClean>
          
          {/* Indicateur de scroll épuré */}
          <div className="flex justify-center">
            <CardClean className="w-10 h-16 rounded-full border-3 border-hsl(var(--neutral-300)) flex items-center justify-center shadow-md">
              <div className="w-2 h-6 bg-hsl(var(--blue-primary)) rounded-full animate-pulse" />
            </CardClean>
          </div>
        </div>
      </div>
    </section>
  );
};
