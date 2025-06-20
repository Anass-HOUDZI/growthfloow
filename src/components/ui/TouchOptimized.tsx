
import React, { useState, useRef, useCallback } from 'react';
import { useResponsive } from '../../hooks/useResponsive';

interface TouchOptimizedProps {
  children: React.ReactNode;
  onTap?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  ripple?: boolean;
  className?: string;
  role?: string;
  tabIndex?: number;
  'aria-label'?: string;
}

export const TouchOptimized: React.FC<TouchOptimizedProps> = ({
  children,
  onTap,
  onLongPress,
  disabled = false,
  ripple = true,
  className = '',
  role = 'button',
  tabIndex = 0,
  'aria-label': ariaLabel
}) => {
  const { isTouch } = useResponsive();
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const longPressTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rippleCounterRef = useRef(0);

  const createRipple = useCallback((x: number, y: number) => {
    if (!ripple) return;
    
    const id = rippleCounterRef.current++;
    setRipples(prev => [...prev, { id, x, y }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
  }, [ripple]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (disabled) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    // Create ripple for mouse clicks
    if (!isTouch && ripple) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createRipple(x, y);
    }
    
    onTap?.();
  }, [disabled, isTouch, ripple, createRipple, onTap]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (disabled) return;

    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };

    // Create ripple for touch
    if (ripple) {
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      createRipple(x, y);
    }

    // Long press detection
    if (onLongPress) {
      longPressTimeoutRef.current = setTimeout(() => {
        onLongPress();
      }, 500);
    }
  }, [disabled, ripple, createRipple, onLongPress]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (disabled || !touchStartRef.current) return;

    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
    }

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Tap detection
    if (distance < 10 && deltaTime < 500) {
      e.preventDefault();
      e.stopPropagation();
      onTap?.();
    }

    touchStartRef.current = null;
  }, [disabled, onTap]);

  const handleTouchCancel = useCallback(() => {
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
    }
    touchStartRef.current = null;
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onTap?.();
    }
  }, [disabled, onTap]);

  return (
    <div
      className={`relative overflow-hidden cursor-pointer select-none ${className} ${
        disabled ? 'pointer-events-none opacity-50' : ''
      }`}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      onKeyDown={handleKeyDown}
      role={role}
      tabIndex={disabled ? -1 : tabIndex}
      aria-label={ariaLabel}
      style={{
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none',
        touchAction: 'manipulation'
      }}
    >
      {children}
      
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute pointer-events-none animate-ping rounded-full bg-white/30"
          style={{
            left: ripple.x - 20,
            top: ripple.y - 20,
            width: 40,
            height: 40,
            animationDuration: '600ms'
          }}
        />
      ))}
    </div>
  );
};
