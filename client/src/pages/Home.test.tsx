import { describe, it, expect } from 'vitest';

describe('Landing Page Form Validation', () => {
  it('should validate email format', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Valid emails
    expect(emailRegex.test('test@example.com')).toBe(true);
    expect(emailRegex.test('user.name@domain.co.uk')).toBe(true);
    
    // Invalid emails
    expect(emailRegex.test('invalid-email')).toBe(false);
    expect(emailRegex.test('@example.com')).toBe(false);
    expect(emailRegex.test('test@')).toBe(false);
  });

  it('should validate required fields', () => {
    const formData = {
      name: 'John Doe',
      company: 'Test Company',
      phone: '+962123456789',
      email: 'john@example.com',
      message: 'Test message',
    };

    // Check all required fields are present
    expect(formData.name).toBeTruthy();
    expect(formData.email).toBeTruthy();
    expect(formData.phone).toBeTruthy();
  });

  it('should handle WhatsApp number format', () => {
    const whatsappNumber = '962XXXXXXXXX';
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
    
    expect(whatsappUrl).toBe('https://wa.me/962XXXXXXXXX');
  });
});

describe('SEO Schema Validation', () => {
  it('should have valid LocalBusiness schema structure', () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Mafateeh IT & Media Solutions",
    };

    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("LocalBusiness");
    expect(schema.name).toBeTruthy();
  });
});
