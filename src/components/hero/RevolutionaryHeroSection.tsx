
import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Shield, Globe, TrendingUp, ArrowDown, Search, CheckCircle } from 'lucide-react';
import { StatsCounter } from '../ui/stats-counter';
import { ModernCard } from '../ui/modern-card';
import { useResponsive } from '../../hooks/useResponsive';

interface RevolutionaryHeroSectionProps {
  onScrollToTools: () => void;
}

const searchPlaceholders = [
  "Rechercher un outil growth...",
  "Analyseur de funnel...",
  "Optimiseur SEO...",
  "Générateur de leads...",
];

export const RevolutionaryHeroSection: React.FC<RevolutionaryHeroSectionProps> = ({ onScrollToTools }) => {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Background Pattern Animé */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000" />
        
        {/* Mesh Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5 animate-gradient" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge Premium */}
        <ModernCard 
          variant="glassmorphism" 
          className="inline-flex items-center space-x-3 mb-8 px-6 py-3"
          shine
        >
          <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
          <span className="text-blue-700 font-semibold text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            OpenToolsAI Growth Suite Premium
          </span>
          <Sparkles className="w-5 h-5 text-purple-600 animate-pulse animation-delay-2000" />
        </ModernCard>
        
        {/* Titre Animé */}
        <h1 className={`${isMobile ? 'text-4xl' : 'text-6xl md:text-7xl'} font-black mb-8 tracking-tight leading-tight`}>
          <span className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient bg-size-400">
            Growth Marketing
          </span>
          <br />
          <span className="inline-block text-slate-800 mt-2">
            Nouvelle <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">Génération</span>
          </span>
        </h1>
        
        {/* Description Premium */}
        <p className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} text-slate-600 max-w-4xl mx-auto mb-12 leading-relaxed font-medium`}>
          <StatsCounter end={50} suffix="+" startDelay={500} className="text-blue-600 font-bold" /> outils professionnels de growth marketing, 
          <span className="text-emerald-600 font-semibold"> 100% gratuits</span> et 
          <span className="text-purple-600 font-semibold"> privacy-first</span>
        </p>

        {/* Barre de Recherche Glassmorphism */}
        <ModernCard 
          variant="glassmorphism" 
          className="max-w-2xl mx-auto mb-12 p-2"
          hover="shine"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={searchPlaceholders[currentPlaceholder]}
              className="w-full pl-12 pr-4 py-4 bg-transparent text-slate-800 placeholder-slate-400 border-0 outline-none text-lg font-medium transition-all duration-300 focus:placeholder-transparent"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <kbd className="px-2 py-1 text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-300 rounded">
                ⌘K
              </kbd>
            </div>
          </div>
        </ModernCard>
        
        {/* Statistiques Dynamiques */}
        <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'items-center justify-center space-x-8'} mb-12`}>
          <ModernCard variant="glassmorphism" className="flex items-center space-x-3 px-6 py-4" hover="float">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
            <span className="font-semibold text-emerald-700">
              <StatsCounter end={100} suffix="%" startDelay={800} /> gratuit
            </span>
          </ModernCard>
          
          <ModernCard variant="glassmorphism" className="flex items-center space-x-3 px-6 py-4" hover="float">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-700">Privacy by design</span>
          </ModernCard>
          
          {!isMobile && (
            <>
              <ModernCard variant="glassmorphism" className="flex items-center space-x-3 px-6 py-4" hover="float">
                <TrendingUp className="w-5 h-5 text-violet-600" />
                <span className="font-semibold text-violet-700">
                  <StatsCounter end={50} startDelay={1200} /> outils
                </span>
              </ModernCard>
              
              <ModernCard variant="glassmorphism" className="flex items-center space-x-3 px-6 py-4" hover="float">
                <Globe className="w-5 h-5 text-amber-600" />
                <span className="font-semibold text-amber-700">Client-side</span>
              </ModernCard>
            </>
          )}
        </div>

        {/* CTA Premium */}
        <div className="flex flex-col items-center space-y-6">
          <button 
            onClick={handleScrollClick}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-12 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 animate-gradient bg-size-400"
            aria-label="Découvrir les outils disponibles"
          >
            <span className="relative z-10 flex items-center space-x-3">
              <Zap className="w-6 h-6 group-hover:animate-pulse" />
              <span>Découvrir les outils</span>
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </span>
            
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </button>
          
          {/* Indicateur de scroll premium */}
          <div className="animate-bounce">
            <ModernCard variant="glassmorphism" className="w-8 h-12 rounded-full flex items-center justify-center">
              <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full animate-pulse" />
            </ModernCard>
          </div>
        </div>
      </div>
    </section>
  );
};
