
import React, { useState, useCallback, useRef } from 'react';
import { ModernHeader } from '../components/layout/ModernHeader';
import { ModernToolCategories } from '../components/layout/ModernToolCategories';
import { ToolsGrid } from '../components/ToolsGrid';
import { ToolModal } from '../components/ToolModal';
import { ConnectionStatus } from '../components/ConnectionStatus';
import { useFavorites } from '../hooks/useFavorites';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useResponsive } from '../hooks/useResponsive';
import { Footer } from "../components/layout/Footer";
import { Sparkles, Zap, Shield, Globe, TrendingUp, ArrowDown } from 'lucide-react';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTool, setSelectedTool] = useState(null);
  const { favorites, toggleFavorite } = useFavorites();
  const [recentTools, setRecentTools] = useLocalStorage('recentTools', []);
  const { isMobile } = useResponsive();
  const toolsRef = useRef<HTMLElement>(null);

  const handleToolSelect = useCallback((tool) => {
    console.log('Tool selected:', tool.name);
    setSelectedTool(tool);
    const updated = [tool.id, ...recentTools.filter(id => id !== tool.id)].slice(0, 5);
    setRecentTools(updated);
  }, [recentTools, setRecentTools]);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handleToggleFavorite = useCallback((toolId: string) => {
    toggleFavorite(toolId);
  }, [toggleFavorite]);

  const handleCloseModal = useCallback(() => {
    setSelectedTool(null);
  }, []);

  const scrollToTools = () => {
    toolsRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 flex flex-col">
      <ConnectionStatus />
      
      {/* Navigation */}
      <ModernHeader />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 w-full">
          {/* Hero Section avec marges réduites */}
          <section className={`relative overflow-hidden ${isMobile ? 'py-8 px-4' : 'py-12 px-8'}`}>
            {/* Background animé plus doux */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-purple-500/3 to-indigo-500/3" />
              <div className="absolute top-0 left-1/4 sm:w-80 sm:h-80 w-56 h-56 bg-blue-300/8 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
              <div className="absolute top-0 right-1/4 sm:w-80 sm:h-80 w-56 h-56 bg-purple-300/8 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
              <div className="absolute bottom-0 left-1/3 sm:w-80 sm:h-80 w-56 h-56 bg-indigo-300/8 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
            </div>
            
            <div className="relative max-w-6xl mx-auto text-center">
              {/* Badge animé amélioré */}
              <div className="inline-flex items-center space-x-2 mb-6 px-5 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-full shadow-sm">
                <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
                <span className="text-blue-700 font-semibold text-sm sm:text-base">OpenToolsAI Growth Suite</span>
                <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
              </div>
              
              <h1 className={`${isMobile ? 'text-3xl' : 'text-5xl md:text-6xl'} font-black mb-6 tracking-tight leading-tight`}>
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Growth Marketing
                </span>
                <br />
                <span className="text-slate-800">
                  Nouvelle Génération
                </span>
              </h1>
              
              <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} text-slate-600 max-w-4xl mx-auto mb-8 leading-relaxed font-medium px-4`}>
                50 outils professionnels de growth marketing, <span className="text-blue-600 font-semibold">100% gratuits</span> et <span className="text-purple-600 font-semibold">privacy-first</span>
              </p>
              
              {/* Stats rapides avec design plus doux */}
              <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'items-center justify-center space-x-6'} mb-8`}>
                <div className="flex items-center justify-center space-x-3 sm:space-x-4 text-xs sm:text-sm">
                  <div className="flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-3 sm:px-4 py-2 rounded-full border border-emerald-200/50 shadow-sm">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="font-semibold">100% gratuit</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 px-3 sm:px-4 py-2 rounded-full border border-blue-200/50 shadow-sm">
                    <Shield className="w-4 h-4" />
                    <span className="font-semibold">Privacy by design</span>
                  </div>
                </div>
                
                {!isMobile && (
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2 text-violet-600 bg-violet-50 px-4 py-2 rounded-full border border-violet-200/50 shadow-sm">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-semibold">50 outils</span>
                    </div>
                    <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-full border border-amber-200/50 shadow-sm">
                      <Globe className="w-4 h-4" />
                      <span className="font-semibold">Client-side</span>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Section avec Animation - Centré et Fonctionnel */}
              <div className="flex flex-col items-center justify-center space-y-4">
                <button 
                  onClick={scrollToTools}
                  className="group bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Zap className="w-5 h-5 group-hover:animate-pulse" />
                  <span>Découvrir les outils</span>
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </button>
                
                {/* Indicateur de scroll subtil */}
                <div className="animate-bounce mt-6">
                  <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Section Catégories et Outils */}
          <section ref={toolsRef} className={`${isMobile ? 'px-4 pb-8' : 'px-8 pb-16'}`}>
            <div className="max-w-7xl mx-auto">
              <ModernToolCategories 
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                compact={!isMobile}
              />
              
              <div className="mt-12 mb-16">
                <ToolsGrid 
                  selectedCategory={selectedCategory}
                  searchTerm=""
                  favorites={favorites}
                  onToolSelect={handleToolSelect}
                  onToggleFavorite={handleToggleFavorite}
                  recentTools={recentTools}
                />
              </div>
            </div>
          </section>
        </main>

        {/* Modal d'outil */}
        {selectedTool && (
          <ToolModal 
            tool={selectedTool}
            onClose={handleCloseModal}
            isFavorite={favorites.includes(selectedTool.id)}
            onToggleFavorite={() => toggleFavorite(selectedTool.id)}
          />
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
