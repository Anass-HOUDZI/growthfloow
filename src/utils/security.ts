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
 * Generates a key for encryption based on browser fingerprint
 */
const generateEncryptionKey = (): string => {
  const browserData = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    new Date().getTimezoneOffset()
  ].join('|');
  
  // Simple hash function for key generation
  let hash = 0;
  for (let i = 0; i < browserData.length; i++) {
    const char = browserData.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
};

/**
 * Simple XOR encryption for localStorage
 */
const xorEncrypt = (text: string, key: string): string => {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
};

/**
 * Encrypts data for localStorage storage with improved security
 */
export const encryptData = (data: string): string => {
  try {
    const key = generateEncryptionKey();
    const encrypted = xorEncrypt(data, key);
    const encoded = btoa(encrypted);
    
    // Add integrity check
    const checksum = btoa(data.length.toString());
    return `${encoded}.${checksum}`;
  } catch (error) {
    console.error('Failed to encrypt data:', error);
    return btoa(data); // Fallback to base64
  }
};

/**
 * Decrypts data from localStorage with integrity validation
 */
export const decryptData = (encryptedData: string): string => {
  try {
    const [encoded, checksum] = encryptedData.split('.');
    if (!encoded || !checksum) {
      // Legacy format - try simple base64
      return atob(encryptedData);
    }
    
    const key = generateEncryptionKey();
    const encrypted = atob(encoded);
    const decrypted = xorEncrypt(encrypted, key);
    
    // Verify integrity
    const expectedLength = parseInt(atob(checksum), 10);
    if (decrypted.length !== expectedLength) {
      throw new Error('Data integrity check failed');
    }
    
    return decrypted;
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