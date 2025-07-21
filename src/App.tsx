import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import ToolPage from "./pages/ToolPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
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
    appleMobileWebAppTitle.setAttribute('content', 'OpenToolsAI');
    document.head.appendChild(appleMobileWebAppTitle);

  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/tool/:toolId" element={<ToolPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;