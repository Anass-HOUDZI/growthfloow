
import React from 'react';

export const HeaderBadges: React.FC = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="hidden lg:flex items-center space-x-3 text-xs">
        <div className="flex items-center space-x-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-200 shadow-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="font-medium">100% Gratuit</span>
        </div>
        <div className="flex items-center space-x-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200 shadow-sm">
          <div className="w-2 h-2 bg-blue-500 rounded-full" />
          <span className="font-medium">50 Outils</span>
        </div>
      </div>
    </div>
  );
};
