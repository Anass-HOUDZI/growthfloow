import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  size = 'md', 
  text = 'Chargement...', 
  className,
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center">
          <Loader2 className={cn("animate-spin text-blue-600 mx-auto mb-4", sizeClasses[size])} />
          <p className={cn("text-slate-600 font-medium", textSizeClasses[size])}>{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <div className="text-center">
        <Loader2 className={cn("animate-spin text-blue-600 mx-auto mb-2", sizeClasses[size])} />
        <p className={cn("text-slate-600 font-medium", textSizeClasses[size])}>{text}</p>
      </div>
    </div>
  );
};

export { LoadingState };