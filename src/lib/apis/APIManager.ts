
import { APIIntegration, RateLimiter } from '../../types/core';

interface APIResponse<T = any> {
  data: T;
  status: number;
  error?: string;
  fromCache?: boolean;
  rateLimit?: {
    remaining: number;
    reset: number;
  };
}

class APIManager {
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map();
  private rateLimiters: Map<string, { count: number; resetTime: number }> = new Map();

  async call<T>(integration: APIIntegration, params: any = {}): Promise<APIResponse<T>> {
    const cacheKey = this.generateCacheKey(integration, params);
    
    // Check cache first
    const cached = this.getFromCache<T>(cacheKey);
    if (cached) {
      return cached;
    }

    // Check rate limiting
    if (!this.checkRateLimit(integration)) {
      throw new Error(`Rate limit exceeded for ${integration.name}`);
    }

    try {
      const response = await this.makeRequest<T>(integration, params);
      
      // Cache successful responses
      if (response.status === 200) {
        this.setCache(cacheKey, response.data, 5 * 60 * 1000); // 5 minutes TTL
      }

      return response;
    } catch (error) {
      // Try fallback if available
      if (integration.fallback) {
        console.warn(`API ${integration.name} failed, trying fallback`);
        return this.handleFallback<T>(integration.fallback, params);
      }
      
      throw error;
    }
  }

  private async makeRequest<T>(integration: APIIntegration, params: any): Promise<APIResponse<T>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add authentication
    if (integration.authentication.type === 'api_key' && integration.authentication.key) {
      headers['Authorization'] = `Bearer ${integration.authentication.key}`;
    }

    const url = this.buildURL(integration.endpoint, params);
    
    const response = await fetch(url, {
      method: integration.method,
      headers,
      body: integration.method !== 'GET' ? JSON.stringify(params) : undefined,
    });

    const data = await response.json();
    
    return {
      data,
      status: response.status,
      error: response.ok ? undefined : data.message || 'API request failed'
    };
  }

  private checkRateLimit(integration: APIIntegration): boolean {
    const key = integration.name;
    const limit = integration.rateLimit;
    const now = Date.now();
    
    let limiter = this.rateLimiters.get(key);
    
    if (!limiter || now > limiter.resetTime) {
      // Reset rate limiter
      limiter = {
        count: 0,
        resetTime: now + limit.window
      };
      this.rateLimiters.set(key, limiter);
    }

    if (limiter.count >= limit.requests) {
      return false;
    }

    limiter.count++;
    return true;
  }

  private generateCacheKey(integration: APIIntegration, params: any): string {
    return `${integration.name}:${JSON.stringify(params)}`;
  }

  private getFromCache<T>(key: string): APIResponse<T> | null {
    const cached = this.cache.get(key);
    if (!cached || Date.now() > cached.timestamp + cached.ttl) {
      this.cache.delete(key);
      return null;
    }

    return {
      data: cached.data,
      status: 200,
      fromCache: true
    };
  }

  private setCache(key: string, data: any, ttl: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  private buildURL(endpoint: string, params: any): string {
    const url = new URL(endpoint);
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined) {
        url.searchParams.append(key, params[key]);
      }
    });
    return url.toString();
  }

  private async handleFallback<T>(fallbackUrl: string, params: any): Promise<APIResponse<T>> {
    // Implement fallback logic
    return {
      data: {} as T,
      status: 200,
      error: 'Fallback not implemented'
    };
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

export const apiManager = new APIManager();
