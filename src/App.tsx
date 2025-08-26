import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { ScrollToTop } from "./components/utils/ScrollToTop";
import { LoadingState } from "./components/ui/loading-state";

// Lazy load all pages for better performance
const Index = lazy(() => import("./pages/Index"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const ToolPage = lazy(() => import("./pages/ToolPage"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(() => {
            // Service worker registered successfully
          })
          .catch(() => {
            // Service worker registration failed
          });
      });
    }

    // Add viewport meta tag for better mobile experience
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
    }

    // Add theme color meta tag
    let themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      themeColor = document.createElement('meta');
      themeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(themeColor);
    }
    themeColor.setAttribute('content', '#3b82f6');

    // Add apple mobile web app meta tags
    const appleMobileWebAppCapable = document.createElement('meta');
    appleMobileWebAppCapable.setAttribute('name', 'apple-mobile-web-app-capable');
    appleMobileWebAppCapable.setAttribute('content', 'yes');
    document.head.appendChild(appleMobileWebAppCapable);

    const appleMobileWebAppStatusBarStyle = document.createElement('meta');
    appleMobileWebAppStatusBarStyle.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
    appleMobileWebAppStatusBarStyle.setAttribute('content', 'default');
    document.head.appendChild(appleMobileWebAppStatusBarStyle);

    const appleMobileWebAppTitle = document.createElement('meta');
    appleMobileWebAppTitle.setAttribute('name', 'apple-mobile-web-app-title');
    appleMobileWebAppTitle.setAttribute('content', 'GrowthFlow');
    document.head.appendChild(appleMobileWebAppTitle);

  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<LoadingState fullScreen text="Chargement de la page..." />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/tool/:toolId" element={<ToolPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;