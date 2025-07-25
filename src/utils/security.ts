import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks
 */
export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'span'],
    ALLOWED_ATTR: ['href', 'title'],
    FORBID_TAGS: ['script', 'object', 'embed', 'link', 'style'],
  });
};

/**
 * Sanitizes CSS to prevent injection attacks
 */
export const sanitizeCSS = (css: string): string => {
  // Remove potential dangerous CSS
  const sanitized = css
    .replace(/javascript:/gi, '')
    .replace(/expression\s*\(/gi, '')
    .replace(/data:/gi, '')
    .replace(/@import/gi, '')
    .replace(/url\s*\(/gi, '');
  
  return DOMPurify.sanitize(sanitized);
};

/**
 * Validates and sanitizes user input
 */
export const sanitizeInput = (input: string, maxLength = 1000): string => {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  // Trim and limit length
  const trimmed = input.trim().slice(0, maxLength);
  
  // Remove potentially dangerous characters
  return trimmed.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

/**
 * Encrypts data for localStorage storage
 */
export const encryptData = (data: string): string => {
  // Simple base64 encoding (for basic obfuscation)
  // In production, use proper encryption library
  return btoa(data);
};

/**
 * Decrypts data from localStorage
 */
export const decryptData = (encryptedData: string): string => {
  try {
    return atob(encryptedData);
  } catch (error) {
    console.error('Failed to decrypt data:', error);
    return '';
  }
};

/**
 * Validates email configuration safely
 */
export const validateEmailConfig = (config: {
  serviceId?: string;
  templateId?: string;
  publicKey?: string;
}) => {
  const { serviceId, templateId, publicKey } = config;
  
  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS configuration is incomplete. Please check your environment settings.');
  }
  
  if (serviceId.includes('YOUR_') || templateId.includes('YOUR_') || publicKey.includes('YOUR_')) {
    throw new Error('EmailJS configuration contains placeholder values. Please configure real API keys.');
  }
  
  return true;
};