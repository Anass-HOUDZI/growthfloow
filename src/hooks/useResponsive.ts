
import { useState, useEffect } from 'react';

export interface BreakpointConfig {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
}

const breakpoints: BreakpointConfig = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920
};

export type BreakpointKey = keyof BreakpointConfig;
export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'large-desktop';

export interface ResponsiveState {
  width: number;
  height: number;
  breakpoint: BreakpointKey;
  deviceType: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  orientation: 'portrait' | 'landscape';
  isTouch: boolean;
}

export const useResponsive = (): ResponsiveState => {
  const [state, setState] = useState<ResponsiveState>(() => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const height = typeof window !== 'undefined' ? window.innerHeight : 768;
    
    return {
      width,
      height,
      breakpoint: getBreakpoint(width),
      deviceType: getDeviceType(width),
      isMobile: width < breakpoints.md,
      isTablet: width >= breakpoints.md && width < breakpoints.lg,
      isDesktop: width >= breakpoints.lg && width < breakpoints['2xl'],
      isLargeDesktop: width >= breakpoints['2xl'],
      orientation: height > width ? 'portrait' : 'landscape',
      isTouch: 'ontouchstart' in window
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setState({
        width,
        height,
        breakpoint: getBreakpoint(width),
        deviceType: getDeviceType(width),
        isMobile: width < breakpoints.md,
        isTablet: width >= breakpoints.md && width < breakpoints.lg,
        isDesktop: width >= breakpoints.lg && width < breakpoints['2xl'],
        isLargeDesktop: width >= breakpoints['2xl'],
        orientation: height > width ? 'portrait' : 'landscape',
        isTouch: 'ontouchstart' in window
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return state;
};

function getBreakpoint(width: number): BreakpointKey {
  if (width < breakpoints.sm) return 'xs';
  if (width < breakpoints.md) return 'sm';
  if (width < breakpoints.lg) return 'md';
  if (width < breakpoints.xl) return 'lg';
  if (width < breakpoints['2xl']) return 'xl';
  if (width < breakpoints['3xl']) return '2xl';
  return '3xl';
}

function getDeviceType(width: number): DeviceType {
  if (width < breakpoints.md) return 'mobile';
  if (width < breakpoints.lg) return 'tablet';
  if (width < breakpoints['2xl']) return 'desktop';
  return 'large-desktop';
}
