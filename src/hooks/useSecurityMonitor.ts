import { useEffect, useCallback, useRef } from 'react';
import { logger } from '../utils/logger';

interface SecurityEvent {
  type: 'suspicious_input' | 'rate_limit_exceeded' | 'xss_attempt' | 'csrf_attempt' | 'unusual_behavior';
  details: Record<string, any>;
  timestamp: Date;
}

interface SecurityConfig {
  enableMonitoring: boolean;
  maxFailedAttempts: number;
  suspiciousPatterns: RegExp[];
  rateLimitWindow: number;
}

const defaultConfig: SecurityConfig = {
  enableMonitoring: true,
  maxFailedAttempts: 5,
  suspiciousPatterns: [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /eval\s*\(/gi,
    /document\.(write|writeln)/gi,
    /window\.(open|location)/gi
  ],
  rateLimitWindow: 60000 // 1 minute
};

export const useSecurityMonitor = (config: Partial<SecurityConfig> = {}) => {
  const finalConfig = { ...defaultConfig, ...config };
  const attemptCount = useRef<Map<string, number>>(new Map());
  const lastAttempt = useRef<Map<string, number>>(new Map());
  
  const reportSecurityEvent = useCallback((event: SecurityEvent) => {
    if (!finalConfig.enableMonitoring) return;
    
    logger.warn('Security event detected', {
      type: event.type,
      details: event.details,
      timestamp: event.timestamp.toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
    
    // Store in local storage for analysis (encrypted)
    const existingEvents = JSON.parse(localStorage.getItem('security_events') || '[]');
    existingEvents.push({
      ...event,
      timestamp: event.timestamp.toISOString()
    });
    
    // Keep only last 100 events
    if (existingEvents.length > 100) {
      existingEvents.splice(0, existingEvents.length - 100);
    }
    
    localStorage.setItem('security_events', JSON.stringify(existingEvents));
  }, [finalConfig.enableMonitoring]);

  const validateInput = useCallback((input: string, context: string): boolean => {
    if (!finalConfig.enableMonitoring) return true;
    
    // Check for suspicious patterns
    for (const pattern of finalConfig.suspiciousPatterns) {
      if (pattern.test(input)) {
        reportSecurityEvent({
          type: 'xss_attempt',
          details: {
            context,
            inputLength: input.length,
            pattern: pattern.source,
            sanitizedInput: input.replace(/[<>'"]/g, '')
          },
          timestamp: new Date()
        });
        return false;
      }
    }
    
    return true;
  }, [finalConfig.suspiciousPatterns, reportSecurityEvent]);

  const checkRateLimit = useCallback((identifier: string): boolean => {
    if (!finalConfig.enableMonitoring) return true;
    
    const now = Date.now();
    const lastTime = lastAttempt.current.get(identifier) || 0;
    const count = attemptCount.current.get(identifier) || 0;
    
    // Reset count if window expired
    if (now - lastTime > finalConfig.rateLimitWindow) {
      attemptCount.current.set(identifier, 1);
      lastAttempt.current.set(identifier, now);
      return true;
    }
    
    // Increment count
    const newCount = count + 1;
    attemptCount.current.set(identifier, newCount);
    lastAttempt.current.set(identifier, now);
    
    if (newCount > finalConfig.maxFailedAttempts) {
      reportSecurityEvent({
        type: 'rate_limit_exceeded',
        details: {
          identifier,
          attemptCount: newCount,
          windowMs: finalConfig.rateLimitWindow,
          maxAllowed: finalConfig.maxFailedAttempts
        },
        timestamp: new Date()
      });
      return false;
    }
    
    return true;
  }, [finalConfig.maxFailedAttempts, finalConfig.rateLimitWindow, reportSecurityEvent]);

  const monitorUnusualBehavior = useCallback(() => {
    if (!finalConfig.enableMonitoring) return;
    
    // Monitor rapid clicking
    let clickCount = 0;
    const resetClickCount = () => { clickCount = 0; };
    
    const handleClick = () => {
      clickCount++;
      if (clickCount > 10) {
        reportSecurityEvent({
          type: 'unusual_behavior',
          details: {
            behavior: 'rapid_clicking',
            count: clickCount,
            timeframe: '1_second'
          },
          timestamp: new Date()
        });
        clickCount = 0;
      }
      setTimeout(resetClickCount, 1000);
    };
    
    // Monitor console access attempts
    const originalConsole = window.console;
    let consoleAccessCount = 0;
    
    Object.keys(originalConsole).forEach(method => {
      const original = originalConsole[method as keyof Console];
      if (typeof original === 'function') {
        (originalConsole as any)[method] = function(...args: any[]) {
          consoleAccessCount++;
          if (consoleAccessCount > 50) {
            reportSecurityEvent({
              type: 'unusual_behavior',
              details: {
                behavior: 'excessive_console_usage',
                count: consoleAccessCount
              },
              timestamp: new Date()
            });
            consoleAccessCount = 0;
          }
          return original.apply(this, args);
        };
      }
    });
    
    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [finalConfig.enableMonitoring, reportSecurityEvent]);

  const getSecurityReport = useCallback(() => {
    const events = JSON.parse(localStorage.getItem('security_events') || '[]');
    const now = new Date();
    const last24Hours = events.filter((event: any) => {
      const eventTime = new Date(event.timestamp);
      return now.getTime() - eventTime.getTime() < 24 * 60 * 60 * 1000;
    });
    
    const byType = last24Hours.reduce((acc: Record<string, number>, event: any) => {
      acc[event.type] = (acc[event.type] || 0) + 1;
      return acc;
    }, {});
    
    return {
      totalEvents: last24Hours.length,
      eventsByType: byType,
      riskLevel: last24Hours.length > 10 ? 'high' : last24Hours.length > 3 ? 'medium' : 'low'
    };
  }, []);

  useEffect(() => {
    if (finalConfig.enableMonitoring) {
      const cleanup = monitorUnusualBehavior();
      return cleanup;
    }
  }, [finalConfig.enableMonitoring, monitorUnusualBehavior]);

  return {
    reportSecurityEvent,
    validateInput,
    checkRateLimit,
    getSecurityReport
  };
};
