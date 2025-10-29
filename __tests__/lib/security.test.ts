import { describe, it, expect, beforeEach } from '@jest/globals';
import { RateLimiter } from '@/lib/security';
import {
  sanitizeInput,
  isValidEmail,
  isValidPhone,
  validateInput,
  escapeHtml,
  containsMaliciousContent,
  validateFileUpload,
} from '@/lib/security';

describe('Security Utilities', () => {
  describe('RateLimiter', () => {
    let rateLimiter: RateLimiter;

    beforeEach(() => {
      rateLimiter = new RateLimiter(5, 1000); // 5 requests per second
    });

    it('should allow requests within limit', () => {
      expect(rateLimiter.isAllowed('user1')).toBe(true);
      expect(rateLimiter.isAllowed('user1')).toBe(true);
      expect(rateLimiter.isAllowed('user1')).toBe(true);
    });

    it('should block requests exceeding limit', () => {
      for (let i = 0; i < 5; i++) {
        rateLimiter.isAllowed('user1');
      }
      expect(rateLimiter.isAllowed('user1')).toBe(false);
    });

    it('should return remaining requests', () => {
      rateLimiter.isAllowed('user1');
      rateLimiter.isAllowed('user1');
      expect(rateLimiter.getRemaining('user1')).toBe(3);
    });

    it('should reset limit correctly', () => {
      for (let i = 0; i < 5; i++) {
        rateLimiter.isAllowed('user1');
      }
      rateLimiter.reset('user1');
      expect(rateLimiter.isAllowed('user1')).toBe(true);
    });
  });

  describe('sanitizeInput', () => {
    it('should remove script tags', () => {
      const input = 'Hello <script>alert("xss")</script> World';
      expect(sanitizeInput(input)).not.toContain('<script>');
    });

    it('should remove iframe tags', () => {
      const input = 'Content <iframe src="evil.com"></iframe>';
      expect(sanitizeInput(input)).not.toContain('<iframe>');
    });

    it('should remove javascript: protocol', () => {
      const input = '<a href="javascript:alert(1)">Click</a>';
      expect(sanitizeInput(input)).not.toContain('javascript:');
    });
  });

  describe('isValidEmail', () => {
    it('should validate correct email formats', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email formats', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('invalid@')).toBe(false);
      expect(isValidEmail('@invalid.com')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('should validate Indian phone numbers', () => {
      expect(isValidPhone('9876543210')).toBe(true);
      expect(isValidPhone('8123456789')).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
      expect(isValidPhone('1234567890')).toBe(false); // Starts with 1
      expect(isValidPhone('987654321')).toBe(false); // Too short
      expect(isValidPhone('98765432101')).toBe(false); // Too long
    });
  });

  describe('validateInput', () => {
    it('should validate email type', () => {
      expect(validateInput('test@example.com', 'email')).toBe(true);
      expect(validateInput('invalid', 'email')).toBe(false);
    });

    it('should validate phone type', () => {
      expect(validateInput('9876543210', 'phone')).toBe(true);
      expect(validateInput('123', 'phone')).toBe(false);
    });

    it('should validate URL type', () => {
      expect(validateInput('https://example.com', 'url')).toBe(true);
      expect(validateInput('not-a-url', 'url')).toBe(false);
    });

    it('should validate text length', () => {
      expect(validateInput('Valid text', 'text')).toBe(true);
      expect(validateInput('', 'text')).toBe(false);
    });
  });

  describe('escapeHtml', () => {
    it('should escape HTML special characters', () => {
      expect(escapeHtml('<script>')).toBe('&lt;script&gt;');
      expect(escapeHtml('&')).toBe('&amp;');
      expect(escapeHtml('"quotes"')).toBe('&quot;quotes&quot;');
    });
  });

  describe('containsMaliciousContent', () => {
    it('should detect script tags', () => {
      expect(containsMaliciousContent('<script>alert(1)</script>')).toBe(true);
    });

    it('should detect javascript: protocol', () => {
      expect(containsMaliciousContent('javascript:void(0)')).toBe(true);
    });

    it('should detect event handlers', () => {
      expect(containsMaliciousContent('onerror="malicious"')).toBe(true);
      expect(containsMaliciousContent('onclick="malicious"')).toBe(true);
    });

    it('should not flag safe content', () => {
      expect(containsMaliciousContent('Safe content')).toBe(false);
    });
  });

  describe('validateFileUpload', () => {
    it('should validate file type', () => {
      const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
      const result = validateFileUpload(file, ['image/jpeg', 'image/png'], 5);
      expect(result.valid).toBe(true);
    });

    it('should reject invalid file types', () => {
      const file = new File(['content'], 'test.exe', { type: 'application/x-msdownload' });
      const result = validateFileUpload(file, ['image/jpeg'], 5);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Invalid file type');
    });

    it('should validate file size', () => {
      // Create a mock file that exceeds size limit
      const largeContent = 'x'.repeat(6 * 1024 * 1024); // 6MB
      const file = new File([largeContent], 'large.jpg', { type: 'image/jpeg' });
      const result = validateFileUpload(file, ['image/jpeg'], 5);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('size exceeds');
    });
  });
});

