
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface StatsCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  startDelay?: number;
}

export const StatsCounter: React.FC<StatsCounterProps> = ({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
  className,
  startDelay = 0
}) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true);
      
      const startTime = Date.now();
      const startValue = 0;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease-out animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (end - startValue) * easeOut);
        
        setCount(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    }, startDelay);

    return () => clearTimeout(timer);
  }, [end, duration, startDelay]);

  return (
    <span className={cn(
      "font-bold tabular-nums transition-all duration-300",
      hasStarted && "animate-in slide-in-from-bottom-2",
      className
    )}>
      {prefix}{count}{suffix}
    </span>
  );
};
