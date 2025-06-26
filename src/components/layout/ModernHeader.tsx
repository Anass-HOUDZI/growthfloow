
import React from 'react';
import { HeaderLogo } from './Header/HeaderLogo';
import { Breadcrumb } from './Header/Breadcrumb';
import { HeaderBadges } from './Header/HeaderBadges';

interface ModernHeaderProps {
  currentTool?: {
    name: string;
    category: string;
  };
}

export const ModernHeader: React.FC<ModernHeaderProps> = ({ currentTool }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/75">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <HeaderLogo />
          </div>

          <Breadcrumb currentTool={currentTool} />

          <HeaderBadges />
        </div>
      </div>
    </header>
  );
};
