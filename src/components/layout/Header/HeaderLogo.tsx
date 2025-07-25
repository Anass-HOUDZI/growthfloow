
import React from 'react';
import growthflowLogo from '../../../assets/growthflow-logo.png';

interface HeaderLogoProps {
  onClick?: () => void;
}

export const HeaderLogo: React.FC<HeaderLogoProps> = ({ onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Navigation par défaut vers l'accueil
      window.location.href = '/';
    }
  };

  return (
    <button 
      onClick={handleClick} 
      className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl p-2 group"
      aria-label="Retour à l'accueil"
    >
      <img 
        src={growthflowLogo} 
        alt="GrowthFlow" 
        className="h-8 w-auto object-contain"
      />
    </button>
  );
};
