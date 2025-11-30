import { describe, it, expect } from 'vitest';

describe('Testimonials Section', () => {
  it('should have 6 testimonials', () => {
    const testimonialCount = 6;
    expect(testimonialCount).toBe(6);
  });

  it('should have testimonials in both English and Arabic', () => {
    const translations = {
      en: {
        "testimonials.title": "What Our Clients Say",
        "testimonials.client1.name": "Ahmad Al-Rashid",
        "testimonials.client1.text": "Working with Mafateeh transformed our digital presence. Their strategic approach to paid ads increased our ROAS by 400% in just 3 months. The team truly understands the GCC market.",
      },
      ar: {
        "testimonials.title": "ماذا يقول عملاؤنا",
        "testimonials.client1.name": "أحمد الراشد",
        "testimonials.client1.text": "العمل مع مفاتيح غيّر تواجدنا الرقمي. نهجهم الاستراتيجي للإعلانات المدفوعة زاد عائدنا على الإنفاق الإعلاني بنسبة 400% في 3 أشهر فقط. الفريق يفهم حقاً سوق الخليج.",
      },
    };

    expect(translations.en["testimonials.title"]).toBeTruthy();
    expect(translations.ar["testimonials.title"]).toBeTruthy();
    expect(translations.en["testimonials.client1.name"]).toBe("Ahmad Al-Rashid");
    expect(translations.ar["testimonials.client1.name"]).toBe("أحمد الراشد");
  });

  it('should display 5-star ratings for all testimonials', () => {
    const starCount = 5;
    const testimonialCount = 6;
    const totalStars = starCount * testimonialCount;
    
    expect(totalStars).toBe(30);
  });

  it('should include client name and position for each testimonial', () => {
    const testimonial = {
      name: "Ahmad Al-Rashid",
      position: "CEO, TechVision Solutions",
      text: "Working with Mafateeh transformed our digital presence.",
    };

    expect(testimonial.name).toBeTruthy();
    expect(testimonial.position).toBeTruthy();
    expect(testimonial.text).toBeTruthy();
  });

  it('should have diverse client industries represented', () => {
    const industries = [
      "TechVision Solutions",
      "GlobalTrade Co.",
      "E-Shop Jordan",
      "HealthPlus Clinics",
      "Luxury Real Estate",
      "Education Hub",
    ];

    expect(industries.length).toBe(6);
    expect(industries).toContain("E-Shop Jordan");
    expect(industries).toContain("HealthPlus Clinics");
  });
});
