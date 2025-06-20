
import { useCallback } from 'react';
import { useResponsive } from './useResponsive';

export interface InteractionOptions {
  onTap?: () => void;
  onLongPress?: () => void;
  hapticFeedback?: boolean;
  delay?: number;
}

export const useInteractions = () => {
  const { isTouch } = useResponsive();

  const createTouchHandler = useCallback((options: InteractionOptions) => {
    if (!options.onTap && !options.onLongPress) return {};

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Feedback haptique si supporté
      if (options.hapticFeedback && 'vibrate' in navigator) {
        navigator.vibrate(10);
      }
      
      options.onTap?.();
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      if (options.onLongPress) {
        const timeout = setTimeout(() => {
          if (options.hapticFeedback && 'vibrate' in navigator) {
            navigator.vibrate(50);
          }
          options.onLongPress?.();
        }, options.delay || 500);

        const handleTouchEnd = () => {
          clearTimeout(timeout);
          document.removeEventListener('touchend', handleTouchEnd);
        };

        document.addEventListener('touchend', handleTouchEnd);
      }
    };

    return {
      onClick: handleClick,
      onTouchStart: isTouch ? handleTouchStart : undefined,
      style: {
        cursor: 'pointer',
        userSelect: 'none' as const,
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation'
      }
    };
  }, [isTouch]);

  const createAccessibleHandler = useCallback((options: InteractionOptions & { label?: string }) => {
    return {
      ...createTouchHandler(options),
      role: 'button',
      tabIndex: 0,
      'aria-label': options.label,
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          options.onTap?.();
        }
      }
    };
  }, [createTouchHandler]);

  return {
    createTouchHandler,
    createAccessibleHandler,
    isTouch
  };
};
