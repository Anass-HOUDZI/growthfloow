import React from 'react';
import { HeaderLogo } from './Header/HeaderLogo';
import { Breadcrumb } from './Header/Breadcrumb';
import { Moon, Sun, Menu } from 'lucide-react';
import { Button } from '../ui/button';
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
  onMenuToggle?: () => void;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  currentTool,
  currentCategory,
  onLogoClick,
  onBreadcrumbNavigate,
  onMenuToggle
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/75 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/75">
      <div className="container mx-auto">
        <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
          {/* Logo et menu mobile */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden min-h-touch-target min-w-touch-target p-2"
              onClick={onMenuToggle}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <HeaderLogo onClick={onLogoClick} />
          </div>

          {/* Breadcrumb - caché sur mobile et petites tablettes */}
          <div className="hidden lg:flex flex-1 justify-center max-w-md">
            <Breadcrumb 
              currentTool={currentTool}
              currentCategory={currentCategory}
              onNavigate={onBreadcrumbNavigate}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center">
            {/* Toggle thème */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="min-h-touch-target min-w-touch-target p-2 border-2 border-gray-200 hover:border-gray-300 dark:border-gray-600"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};