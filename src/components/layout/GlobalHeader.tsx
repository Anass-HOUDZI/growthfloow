import React, { useState } from 'react';
import { HeaderLogo } from './Header/HeaderLogo';
import { Breadcrumb } from './Header/Breadcrumb';
import { Search, Moon, Sun, Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useTheme } from '../../hooks/useTheme';

interface GlobalHeaderProps {
  currentTool?: {
    name: string;
    category: string;
  };
  currentCategory?: {
    name: string;
    id: string;
  };
  onLogoClick?: () => void;
  onBreadcrumbNavigate?: (path: string) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onMenuToggle?: () => void;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  currentTool,
  currentCategory,
  onLogoClick,
  onBreadcrumbNavigate,
  searchValue = '',
  onSearchChange,
  onMenuToggle
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/75 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/75">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo et menu mobile */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={onMenuToggle}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <HeaderLogo onClick={onLogoClick} />
          </div>

          {/* Breadcrumb - caché sur mobile */}
          <div className="hidden md:flex flex-1 justify-center max-w-md">
            <Breadcrumb 
              currentTool={currentTool}
              currentCategory={currentCategory}
              onNavigate={onBreadcrumbNavigate}
            />
          </div>

          {/* Barre de recherche et actions */}
          <div className="flex items-center space-x-2">
            {/* Barre de recherche */}
            <div className={`relative transition-all duration-200 ${isSearchFocused ? 'w-64' : 'w-48'} hidden sm:block`}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Rechercher un outil..."
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="pl-10 pr-4 py-2 w-full border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:focus:border-blue-400"
              />
            </div>

            {/* Toggle thème */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-10 h-10 p-0 border-2 border-gray-200 hover:border-gray-300 dark:border-gray-600"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Bouton de recherche mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="sm:hidden w-10 h-10 p-0 border-2 border-gray-200"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Barre de recherche mobile */}
        <div className="sm:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Rechercher un outil..."
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border-2 border-gray-200 rounded-lg focus:border-blue-500 dark:border-gray-600"
            />
          </div>
        </div>
      </div>
    </header>
  );
};