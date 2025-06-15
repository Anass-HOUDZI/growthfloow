
import React, { useState, useRef, useEffect } from 'react';
import { useResponsive } from '../../hooks/useResponsive';

interface TouchOptimizedProps {
  children: React.ReactNode;
  onTap?: () => void;
  onLongPress?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  disabled?: boolean;
  ripple?: boolean;
  className?: string;
}

export const TouchOptimized: React.FC<TouchOptimizedProps> = ({
  children,
  onTap,
  onLongPress,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  disabled = false,
  ripple = true,
  className = ''
}) => {
  const { isTouch } = useResponsive();
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const longPressTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rippleCounterRef = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;

    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };

    // Ripple effect
    if (ripple && isTouch) {
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      const id = rippleCounterRef.current++;
      
      setRipples(prev => [...prev, { id, x, y }]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
    }

    // Long press detection
    if (onLongPress) {
      longPressTimeoutRef.current = setTimeout(() => {
        onLongPress();
      }, 500);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
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
    if (distance < 10 && deltaTime < 500 && onTap) {
      onTap();
    }
    // Swipe detection
    else if (distance > 50 && deltaTime < 300) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0 && onSwipeRight) onSwipeRight();
        else if (deltaX < 0 && onSwipeLeft) onSwipeLeft();
      } else {
        // Vertical swipe
        if (deltaY > 0 && onSwipeDown) onSwipeDown();
        else if (deltaY < 0 && onSwipeUp) onSwipeUp();
      }
    }

    touchStartRef.current = null;
  };

  const handleTouchCancel = () => {
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
    }
    touchStartRef.current = null;
  };

  return (
    <div
      className={`relative overflow-hidden ${className} ${
        isTouch ? 'touch-manipulation' : ''
      } ${disabled ? 'pointer-events-none opacity-50' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      style={{
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none'
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
