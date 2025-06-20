
import { useCallback } from 'react';
import { useResponsive } from './useResponsive';

export interface InteractionOptions {
  onTap?: () => void;
  onLongPress?: () => void;
  hapticFeedback?: boolean;
  delay?: number;
  preventDefault?: boolean;
  stopPropagation?: boolean;
}

export const useInteractions = () => {
  const { isTouch } = useResponsive();

  const triggerHapticFeedback = useCallback((intensity: number = 10) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(intensity);
    }
  }, []);

  const createTouchHandler = useCallback((options: InteractionOptions) => {
    if (!options.onTap && !options.onLongPress) return {};

    const handleClick = (e: React.MouseEvent) => {
      if (options.preventDefault) e.preventDefault();
      if (options.stopPropagation) e.stopPropagation();
      
      if (options.hapticFeedback) {
        triggerHapticFeedback();
      }
      
      options.onTap?.();
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      if (options.onLongPress) {
        const timeout = setTimeout(() => {
          if (options.hapticFeedback) {
            triggerHapticFeedback(50);
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
  }, [isTouch, triggerHapticFeedback]);

  const createAccessibleHandler = useCallback((options: InteractionOptions & { label?: string }) => {
    return {
      ...createTouchHandler(options),
      role: 'button',
      tabIndex: 0,
      'aria-label': options.label,
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (options.hapticFeedback) {
            triggerHapticFeedback();
          }
          options.onTap?.();
        }
      }
    };
  }, [createTouchHandler, triggerHapticFeedback]);

  return {
    createTouchHandler,
    createAccessibleHandler,
    triggerHapticFeedback,
    isTouch
  };
};
