/**
 * Secure error message handler that prevents information leakage in production
 */

export interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  timestamp?: string;
}

export interface SecurityError extends Error {
  code?: string;
  context?: ErrorContext;
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

/**
 * Generic error messages that don't reveal sensitive information
 */
const GENERIC_MESSAGES = {
  validation: 'Les données saisies ne sont pas valides. Veuillez vérifier et réessayer.',
  network: 'Une erreur de connexion est survenue. Veuillez vérifier votre connexion internet.',
  authentication: 'Erreur d\'authentification. Veuillez vous reconnecter.',
  authorization: 'Vous n\'avez pas les permissions nécessaires pour cette action.',
  server: 'Une erreur serveur est survenue. Nous travaillons à résoudre le problème.',
  storage: 'Erreur de stockage des données. Veuillez réessayer.',
  unknown: 'Une erreur inattendue s\'est produite. Veuillez réessayer ou contacter le support.'
} as const;

/**
 * Development-specific error messages with more details
 */
const DEVELOPMENT_MESSAGES = {
  validation: (details: string) => `Erreur de validation: ${details}`,
  network: (details: string) => `Erreur réseau: ${details}`,
  authentication: (details: string) => `Erreur d'authentification: ${details}`,
  authorization: (details: string) => `Erreur d'autorisation: ${details}`,
  server: (details: string) => `Erreur serveur: ${details}`,
  storage: (details: string) => `Erreur de stockage: ${details}`,
  unknown: (details: string) => `Erreur inconnue: ${details}`
};

/**
 * Error categories for consistent handling
 */
export type ErrorCategory = keyof typeof GENERIC_MESSAGES;

/**
 * Creates a user-friendly error message based on environment
 */
export const createSecureErrorMessage = (
  category: ErrorCategory,
  originalError: Error,
  context?: ErrorContext
): string => {
  const isDevelopment = import.meta.env.MODE === 'development';
  
  if (isDevelopment && DEVELOPMENT_MESSAGES[category]) {
    return DEVELOPMENT_MESSAGES[category](originalError.message);
  }
  
  return GENERIC_MESSAGES[category];
};

/**
 * Sanitizes error data for logging
 */
export const sanitizeErrorForLogging = (
  error: Error,
  context?: ErrorContext
): Record<string, any> => {
  const sanitized: Record<string, any> = {
    message: error.message,
    name: error.name,
    timestamp: new Date().toISOString()
  };
  
  // Only include stack trace in development
  if (import.meta.env.MODE === 'development') {
    sanitized.stack = error.stack;
  }
  
  // Sanitize context
  if (context) {
    sanitized.context = {
      component: context.component || 'unknown',
      action: context.action || 'unknown',
      // Never log userId in production
      ...(import.meta.env.MODE === 'development' && context.userId && { 
        userId: context.userId 
      })
    };
  }
  
  return sanitized;
};

/**
 * Creates a standardized error response
 */
export const createErrorResponse = (
  category: ErrorCategory,
  originalError: Error,
  context?: ErrorContext
): {
  userMessage: string;
  logData: Record<string, any>;
  shouldReport: boolean;
} => {
  const userMessage = createSecureErrorMessage(category, originalError, context);
  const logData = sanitizeErrorForLogging(originalError, context);
  
  // Determine if error should be reported to external services
  const criticalCategories: ErrorCategory[] = ['server', 'authentication', 'authorization'];
  const shouldReport = criticalCategories.includes(category) || 
                      originalError.name === 'SecurityError';
  
  return {
    userMessage,
    logData,
    shouldReport
  };
};

/**
 * Enhanced error boundary error handler
 */
export const handleBoundaryError = (
  error: Error,
  errorInfo: { componentStack: string },
  context?: ErrorContext
) => {
  const errorResponse = createErrorResponse('unknown', error, {
    ...context,
    component: 'ErrorBoundary'
  });
  
  // Add component stack to log data
  errorResponse.logData.componentStack = import.meta.env.MODE === 'development' 
    ? errorInfo.componentStack 
    : '[REDACTED]';
  
  return errorResponse;
};

/**
 * Network error handler with retry logic
 */
export const handleNetworkError = (
  error: Error,
  context?: ErrorContext,
  retryCount = 0
): {
  userMessage: string;
  canRetry: boolean;
  retryAfter?: number;
} => {
  const maxRetries = 3;
  const baseDelay = 1000; // 1 second
  
  const errorResponse = createErrorResponse('network', error, context);
  
  return {
    userMessage: errorResponse.userMessage,
    canRetry: retryCount < maxRetries,
    retryAfter: Math.min(baseDelay * Math.pow(2, retryCount), 30000) // Max 30 seconds
  };
};

/**
 * Form validation error handler
 */
export const handleValidationError = (
  fieldErrors: Record<string, string[]>,
  context?: ErrorContext
): {
  fieldMessages: Record<string, string>;
  generalMessage: string;
} => {
  const fieldMessages: Record<string, string> = {};
  
  Object.entries(fieldErrors).forEach(([field, errors]) => {
    // Use first error message, sanitized for production
    fieldMessages[field] = import.meta.env.MODE === 'development' 
      ? errors[0] 
      : 'Ce champ contient une erreur. Veuillez le corriger.';
  });
  
  const generalMessage = Object.keys(fieldErrors).length > 1
    ? 'Plusieurs champs contiennent des erreurs. Veuillez les corriger.'
    : 'Un champ contient une erreur. Veuillez le corriger.';
  
  return {
    fieldMessages,
    generalMessage
  };
};