import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorFallback } from '../ui/ErrorFallback';
import { Footer } from "./Footer";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col">
        <AppHeader />
        
        <main className="flex-1 p-6 overflow-auto">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<LoadingSpinner />}>
              {children}
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </div>
  );
};
