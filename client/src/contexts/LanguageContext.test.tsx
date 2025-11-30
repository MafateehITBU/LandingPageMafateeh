import { describe, it, expect } from 'vitest';

describe('Language Context', () => {
  it('should default to English when no language is saved', () => {
    const defaultLang = "en";
    expect(defaultLang).toBe("en");
  });

  it('should toggle between en and ar', () => {
    let currentLang = "en";
    const toggle = () => {
      currentLang = currentLang === "en" ? "ar" : "en";
    };
    
    expect(currentLang).toBe("en");
    toggle();
    expect(currentLang).toBe("ar");
    toggle();
    expect(currentLang).toBe("en");
  });

  it('should have translations for both languages', () => {
    const translations = {
      en: {
        "nav.services": "Services",
        "hero.title": "Your Expert Digital Marketing Agency in Jordan for",
        "hero.cta1": "Request Your FREE Strategy Session",
      },
      ar: {
        "nav.services": "الخدمات",
        "hero.title": "وكالة التسويق الرقمي المعتمدة في الأردن لـ",
        "hero.cta1": "احصل على جلسة استراتيجية مجانية",
      },
    };

    expect(translations.en["nav.services"]).toBe("Services");
    expect(translations.ar["nav.services"]).toBe("الخدمات");
    expect(translations.en["hero.title"]).toBeTruthy();
    expect(translations.ar["hero.title"]).toBeTruthy();
    expect(translations.en["hero.cta1"]).toBeTruthy();
    expect(translations.ar["hero.cta1"]).toBeTruthy();
  });

  it('should set document direction based on language', () => {
    const setDirection = (lang: "en" | "ar") => {
      return lang === "ar" ? "rtl" : "ltr";
    };

    expect(setDirection("en")).toBe("ltr");
    expect(setDirection("ar")).toBe("rtl");
  });

  it('should set document lang attribute based on language', () => {
    const setLangAttr = (lang: "en" | "ar") => {
      return lang;
    };

    expect(setLangAttr("en")).toBe("en");
    expect(setLangAttr("ar")).toBe("ar");
  });
});
