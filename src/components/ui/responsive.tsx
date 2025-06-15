
import React from 'react';
import { useIsMobile } from '../hooks/use-mobile';

export interface ResponsiveProps {
  children: React.ReactNode;
  mobile?: React.ReactNode;
  tablet?: React.ReactNode;
  desktop?: React.ReactNode;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
}

export const Responsive: React.FC<ResponsiveProps> = ({
  children,
  mobile,
  tablet,
  desktop,
  hideOnMobile = false,
  hideOnTablet = false,
  hideOnDesktop = false
}) => {
  const isMobile = useIsMobile();

  return (
    <>
      {/* Mobile View */}
      <div className={`block sm:hidden ${hideOnMobile ? 'hidden' : ''}`}>
        {mobile || children}
      </div>

      {/* Tablet View */}
      <div className={`hidden sm:block lg:hidden ${hideOnTablet ? 'hidden' : ''}`}>
        {tablet || children}
      </div>

      {/* Desktop View */}
      <div className={`hidden lg:block ${hideOnDesktop ? 'hidden' : ''}`}>
        {desktop || children}
      </div>
    </>
  );
};
