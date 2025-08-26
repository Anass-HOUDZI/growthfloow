import { useLocation, Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from 'react-error-boundary';
import { LoadingState } from '../components/ui/loading-state';
import { ErrorFallback } from '../components/ui/ErrorFallback';

// Lazy load Footer
const Footer = lazy(() => import("../components/layout/Footer").then(module => ({
  default: module.Footer
})));

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-100">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-slate-900">404</h1>
          <p className="text-xl text-slate-600 mb-6">Oops! Page non trouvée</p>
          <p className="text-sm text-slate-500 mb-8">
            La page "{location.pathname}" n'existe pas.
          </p>
          <Link 
            to="/" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingState text="Chargement du footer..." />}>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default NotFound;
