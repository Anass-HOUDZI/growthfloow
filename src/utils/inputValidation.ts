import { sanitizeInput } from './security';

/**
 * Validation rules for different input types
 */
export const validators = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  url: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
  
  number: (value: string): boolean => {
    return !isNaN(Number(value)) && isFinite(Number(value));
  },
  
  alphanumeric: (value: string): boolean => {
    return /^[a-zA-Z0-9\s]*$/.test(value);
  },
  
  linkedin: (url: string): boolean => {
    return /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/.test(url);
  },
  
  keyword: (keyword: string): boolean => {
    // Keywords should be alphanumeric with spaces, hyphens, and underscores
    return /^[a-zA-Z0-9\s\-_]{1,100}$/.test(keyword);
  },
  
  domain: (domain: string): boolean => {
    return /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(domain);
  }
};

/**
 * Sanitize and validate input with specific rules
 */
export const validateAndSanitize = (
  input: string,
  type: keyof typeof validators,
  maxLength = 1000
): { isValid: boolean; sanitized: string; error?: string } => {
  // First sanitize the input
  const sanitized = sanitizeInput(input, maxLength);
  
  if (!sanitized) {
    return {
      isValid: false,
      sanitized: '',
      error: 'Input is required'
    };
  }
  
  // Then validate based on type
  const isValid = validators[type](sanitized);
  
  return {
    isValid,
    sanitized,
    error: isValid ? undefined : `Invalid ${type} format`
  };
};

/**
 * Rate limiting for form submissions
 */
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts = 5;
  private readonly windowMs = 60000; // 1 minute
  
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    
    // Remove old attempts outside the window
    const recentAttempts = attempts.filter(time => now - time < this.windowMs);
    
    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    // Add current attempt
    recentAttempts.push(now);
    this.attempts.set(identifier, recentAttempts);
    
    return true;
  }
  
  getRemainingTime(identifier: string): number {
    const attempts = this.attempts.get(identifier) || [];
    if (attempts.length === 0) return 0;
    
    const oldestAttempt = Math.min(...attempts);
    const timeLeft = this.windowMs - (Date.now() - oldestAttempt);
    
    return Math.max(0, timeLeft);
  }
}

export const rateLimiter = new RateLimiter();