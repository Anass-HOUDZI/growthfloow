import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { GlobalHeader } from './GlobalHeader';
import { GlobalFooter } from './GlobalFooter';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorFallback } from '../ui/ErrorFallback';

interface AppLayoutGlobalProps {
  children: React.ReactNode;
  currentTool?: {
    name: string;
    category: string;
  };
  currentCategory?: {
    name: string;
    id: string;
  };
  onLogoClick?: () => void;
  onBreadcrumbNavigate?: (path: string) => void;
}

export const AppLayoutGlobal: React.FC<AppLayoutGlobalProps> = ({ 
  children,
  currentTool,
  currentCategory,
  onLogoClick,
  onBreadcrumbNavigate
}) => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <GlobalHeader
        currentTool={currentTool}
        currentCategory={currentCategory}
        onLogoClick={onLogoClick}
        onBreadcrumbNavigate={onBreadcrumbNavigate}
      />
      
      <main className="flex-1">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<LoadingSpinner />}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </main>
      
      <GlobalFooter />
    </div>
  );
};