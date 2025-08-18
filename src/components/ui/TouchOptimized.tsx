import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface TouchOptimizedProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  touchTarget?: 'small' | 'medium' | 'large';
  ripple?: boolean;
  onTap?: () => void;
}

export const TouchOptimized = forwardRef<HTMLDivElement, TouchOptimizedProps>(
  ({ children, touchTarget = 'medium', ripple = false, onTap, className, ...props }, ref) => {
    const touchSizes = {
      small: 'min-h-[44px] min-w-[44px] p-2',
      medium: 'min-h-[48px] min-w-[48px] p-3',
      large: 'min-h-[56px] min-w-[56px] p-4'
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex items-center justify-center',
          'transition-all duration-200 ease-out',
          'touch:active:scale-95 touch:select-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          touchSizes[touchTarget],
          ripple && 'overflow-hidden',
          onTap && 'cursor-pointer',
          className
        )}
        onClick={onTap}
        {...props}
      >
        {children}
        {ripple && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="touch:active:animate-ripple absolute inset-0 bg-white/20 rounded-full scale-0" />
          </div>
        )}
      </div>
    );
  }
);

TouchOptimized.displayName = 'TouchOptimized';