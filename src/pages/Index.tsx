
import React, { useState, useCallback } from 'react';
import { ModernHeader } from '../components/layout/ModernHeader';
import { ModernToolCategories } from '../components/layout/ModernToolCategories';
import { ToolsGrid } from '../components/ToolsGrid';
import { ToolModal } from '../components/ToolModal';
import { ConnectionStatus } from '../components/ConnectionStatus';
import { useFavorites } from '../hooks/useFavorites';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useResponsive } from '../hooks/useResponsive';
import { Footer } from "../components/layout/Footer";
import { Sparkles, Zap, Shield, Globe, Star, TrendingUp } from 'lucide-react';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTool, setSelectedTool] = useState(null);
  const { favorites, toggleFavorite } = useFavorites();
  const [recentTools, setRecentTools] = useLocalStorage('recentTools', []);
  const { isMobile } = useResponsive();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex flex-col">
      <ConnectionStatus />
      
      {/* Navigation */}
      <ModernHeader />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 w-full">
          {/* Hero Section Modernisée */}
          <section className={`relative overflow-hidden ${isMobile ? 'py-12 px-4' : 'py-20 px-8'}`}>
            {/* Background animé */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5" />
              <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
              <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
              <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
            </div>
            
            <div className="relative max-w-6xl mx-auto text-center">
              {/* Badge animé */}
              <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-full">
                <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
                <span className="text-blue-700 font-semibold">OpenToolsAI Growth Suite</span>
                <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
              </div>
              
              <h1 className={`${isMobile ? 'text-4xl' : 'text-5xl md:text-7xl'} font-black mb-6 tracking-tight leading-tight`}>
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Growth Marketing
                </span>
                <br />
                <span className="text-slate-800">
                  Nouvelle Génération
                </span>
              </h1>
              
              <p className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} text-slate-600 max-w-4xl mx-auto mb-8 leading-relaxed font-medium`}>
                50 outils professionnels de growth marketing, <span className="text-blue-600 font-semibold">100% gratuits</span> et <span className="text-purple-600 font-semibold">privacy-first</span>
              </p>
              
              {/* Stats rapides */}
              <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'items-center justify-center space-x-8'} mb-8`}>
                <div className="flex items-center justify-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-4 py-2 rounded-full border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-semibold">100% gratuit</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
                    <Shield className="w-4 h-4" />
                    <span className="font-semibold">Privacy by design</span>
                  </div>
                </div>
                
                {!isMobile && (
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2 text-purple-600 bg-purple-50 px-4 py-2 rounded-full border border-purple-200">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-semibold">50 outils</span>
                    </div>
                    <div className="flex items-center space-x-2 text-orange-600 bg-orange-50 px-4 py-2 rounded-full border border-orange-200">
                      <Globe className="w-4 h-4" />
                      <span className="font-semibold">Client-side</span>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Section */}
              <div className="flex items-center justify-center space-x-4">
                <button 
                  onClick={() => handleCategoryChange('growth')}
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                >
                  <Zap className="w-5 h-5 group-hover:animate-pulse" />
                  <span>Découvrir les outils</span>
                </button>
                
                {!isMobile && (
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">{favorites.length} favoris</span>
                  </div>
                )}
              </div>
            </div>
          </section>
          
          {/* Section Catégories et Outils */}
          <section className={`${isMobile ? 'px-4 pb-8' : 'px-8 pb-16'}`}>
            <div className="max-w-7xl mx-auto">
              <ModernToolCategories 
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                compact={!isMobile}
              />
              
              <div className="mt-16 mb-16">
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
