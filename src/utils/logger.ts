/**
 * Secure logging utility that filters sensitive data in production
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogConfig {
  level: LogLevel;
  enableConsole: boolean;
  sanitizeData: boolean;
}

const config: LogConfig = {
  level: import.meta.env.MODE === 'development' ? 'debug' : 'error',
  enableConsole: import.meta.env.MODE === 'development',
  sanitizeData: import.meta.env.MODE === 'production'
};

/**
 * Sanitizes data to remove potential sensitive information
 */
const sanitizeLogData = (data: any): any => {
  if (!config.sanitizeData) return data;
  
  if (typeof data === 'string') {
    // Remove potential API keys, tokens, passwords
    return data
      .replace(/([a-zA-Z0-9]{32,})/g, '[REDACTED]')
      .replace(/(password|token|key|secret)[=:]\s*[^\s&]+/gi, '$1=[REDACTED]')
      .replace(/(\b\w+@\w+\.\w+\b)/g, '[EMAIL_REDACTED]');
  }
  
  if (typeof data === 'object' && data !== null) {
    const sanitized: any = Array.isArray(data) ? [] : {};
    
    for (const [key, value] of Object.entries(data)) {
      // Skip sensitive keys
      if (/password|token|key|secret|email|api/i.test(key)) {
        sanitized[key] = '[REDACTED]';
      } else {
        sanitized[key] = sanitizeLogData(value);
      }
    }
    
    return sanitized;
  }
  
  return data;
};

/**
 * Secure logger with filtering capabilities
 */
export const logger = {
  debug: (...args: any[]) => {
    if (config.enableConsole && config.level === 'debug') {
      console.debug('[DEBUG]', ...args.map(sanitizeLogData));
    }
  },
  
  info: (...args: any[]) => {
    if (config.enableConsole && ['debug', 'info'].includes(config.level)) {
      console.info('[INFO]', ...args.map(sanitizeLogData));
    }
  },
  
  warn: (...args: any[]) => {
    if (config.enableConsole && ['debug', 'info', 'warn'].includes(config.level)) {
      console.warn('[WARN]', ...args.map(sanitizeLogData));
    }
  },
  
  error: (...args: any[]) => {
    if (config.enableConsole) {
      console.error('[ERROR]', ...args.map(sanitizeLogData));
    }
  },
  
  // Secure error reporting that doesn't expose sensitive data
  reportError: (error: Error, context?: Record<string, any>) => {
    const sanitizedContext = context ? sanitizeLogData(context) : {};
    
    if (config.enableConsole) {
      console.error('[SECURITY_ERROR]', {
        message: error.message,
        stack: import.meta.env.MODE === 'development' ? error.stack : '[REDACTED]',
        context: sanitizedContext,
        timestamp: new Date().toISOString()
      });
    }
  }
};

/**
 * Replace console.log with secure logger
 */
export const secureConsole = {
  log: logger.info,
  debug: logger.debug,
  info: logger.info,
  warn: logger.warn,
  error: logger.error
};