
export interface ToolModule {
  id: string;
  name: string;
  category: ToolCategory;
  component: React.ComponentType;
  config: ToolConfig;
  apis: APIIntegration[];
  algorithms: Algorithm[];
  dependencies?: string[];
}

export type ToolCategory = 'growth' | 'seo' | 'landing' | 'outbound' | 'paid' | 'executive';

export interface ToolConfig {
  version: string;
  description: string;
  features: string[];
  pricing: 'free' | 'premium';
  complexity: 'simple' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
}

export interface APIIntegration {
  name: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  authentication: AuthMethod;
  rateLimit: RateLimiter;
  fallback?: string;
}

export interface AuthMethod {
  type: 'none' | 'api_key' | 'oauth' | 'bearer';
  key?: string;
  storage: 'memory' | 'secure'; // Removed localStorage/sessionStorage for security
}

export interface RateLimiter {
  requests: number;
  window: number; // in milliseconds
  strategy: 'sliding' | 'fixed';
}

export interface Algorithm {
  name: string;
  function: (...args: any[]) => any;
  dependencies: string[];
  complexity: 'O(1)' | 'O(n)' | 'O(n²)' | 'O(log n)';
}

export interface AnalysisResult {
  id: string;
  toolId: string;
  timestamp: Date;
  data: any;
  metadata: {
    duration: number;
    apiCalls: number;
    accuracy?: number;
  };
}
