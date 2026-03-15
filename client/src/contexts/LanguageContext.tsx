import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved === "ar" || saved === "en") ? saved : "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.services": "Services",
    "nav.whyUs": "Why Us",
    "nav.process": "Process",
    "nav.faq": "FAQ",
    "nav.whatsapp": "WhatsApp",
    "nav.getStarted": "Get Started",

    // Hero Section
    "hero.badge": "Digital Technology Solutions Company",
    "hero.title": "We Build Stores and Applications That Multiply Your Sales ",
    "hero.titleHighlight": "in Jordan and the Gulf",
    "hero.subtitle": "We help businesses launch professional e-commerce stores, mobile applications, and websites that simplify operations, increase sales, and give your project a stronger digital presence.",
    "hero.benefit1Title": "30+ Stores & Applications",
    "hero.benefit1Desc": "Successfully launched",
    "hero.benefit2Title": "100% Scalable Architecture",
    "hero.benefit2Desc": "Built for growth",
    "hero.benefit3Title": "24/7 Technical Monitoring",
    "hero.benefit3Desc": "Continuous support and response",
    "hero.cta1": "Request Your Free Consultation Now",
    "hero.cta2": "Contact Us on WhatsApp",

    // Trust Section
    "trust.title": "The Trusted Technical Partner for Businesses in Jordan and the GCC",
    "trust.description": "For over 10 years, Mafateeh has been developing integrated technology solutions for companies seeking stable systems, professional user experiences, and a technical infrastructure capable of supporting real growth. \n We combine deep technical expertise with strong market understanding to build e-commerce stores, mobile applications, and websites that run efficiently and grow alongside your business.",
    "trust.clientLogo": "Client Logo",
    "trust.result1": "10+ Years",
    "trust.result1Desc": "In technology solutions",
    "trust.result2": "300%",
    "trust.result2Desc": "Operational Efficiency Improvement",
    "trust.result3": "5X",
    "trust.result3Desc": "Project Scalability",

    // Services Section
    "services.title": "Complete IT Solutions for Online Stores and E-Commerce",
    "services.description": "We build, manage, and optimize stores and applications for businesses of all sizes.",
    "services.social.title": "Launch Ready-to-Sell Online Stores",
    "services.social.desc": "We develop professional e-commerce stores with a seamless shopping experience and full integration with payment gateways, shipping services, and product management, featuring online payments, an easy-to-use dashboard, and a store ready to sell.",
    "services.ads.title": "E-commerce Store Management & Operations",
    "services.ads.desc": "We handle product updates, order management, performance monitoring, and continuous optimization to ensure your store grows and increases sales.",
    "services.seo.title": "Custom Applications for Your Business",
    "services.seo.desc": "We design practical, fast applications that help you reach your customers easily and deliver a powerful user experience, featuring Android/iOS support, high performance, and scalability.",
    "services.video.title": "Professional Website Design",
    "services.video.desc": "Fast, modern websites optimized for all devices to reflect the strength of your brand.  We create websites that are not only visually appealing but also functional and easy to use.",

    // Why Us Section
    "whyUs.title": "Your Growth Partner, Not Just Another Agency",
    "whyUs.market.title": "Accurate Project Analysis",
    "whyUs.market.desc": "We begin by understanding how your business works before writing a single line of code.",
    "whyUs.bilingual.title": "Scalable Solutions",
    "whyUs.bilingual.desc": "Every system is designed to grow with your business.",
    "whyUs.roi.title": "Thoughtful User Experience",
    "whyUs.roi.desc": "Ease of use is a core part of every project.",
    "whyUs.data.title": "Specialized Development Team",
    "whyUs.data.desc": "Designers, developers, and UX experts working together.",
    "whyUs.management.title": "System Integrations & Automation",
    "whyUs.management.desc": "We connect the tools you need to reduce manual work.",
    "whyUs.experts.title": "Continuous Support",
    "whyUs.experts.desc": "Our role doesn’t end at delivery.",

    // Why Mafateeh Section
    "whyMafateeh.title": "Why Mafateeh?",
    "whyMafateeh.subtitle": "The right technical solution isn’t built with code alone… it starts with understanding your business from the very beginning.",
    "whyMafateeh.intro": "At Mafateeh, we don't offer fleeting services; we build integrated digital solutions designed specifically for you, working intelligently with measurable results.",
    "whyMafateeh.team": "We work as one team that understands your business before developing the right solution.",
    "whyMafateeh.teamDesc": "Business analysts, designers, and developers collaborate to build systems that serve your real objectives.",
    "whyMafateeh.teamTogether": "Every technical decision is designed to give your business greater flexibility today and make growth easier tomorrow.",
    "whyMafateeh.differentiator": "What sets us apart is not only what we build, but how we build it:",
    "whyMafateeh.feature1": "Precise technology solutions tailored to real project needs",
    "whyMafateeh.feature2": "Clear, easy-to-manage systems that support daily operations",
    "whyMafateeh.feature3": "Professional designs that reflect your project's identity and catch attention from the first glance.",
    "whyMafateeh.feature4": "Flexible technical architecture built for growth",
    "whyMafateeh.feature5": "System integrations that simplify management and improve performance",
    "whyMafateeh.feature6": "Continuous support because great solutions evolve over time",
    "whyMafateeh.approach": "We don't just execute…",
    "whyMafateeh.approachDesc": "We analyze, plan, innovate, and achieve tangible results.",
    "whyMafateeh.cta": "Choose Mafateeh, and choose a team that sees your project as you see it and takes it further than you expect.",

    // Contact Form
    "contact.title": "Let's Start Building Your Growth Strategy",
    "contact.description": "Please fill out the form below to get a free consultation. These details help us understand your current situation and prepare accurate recommendations that support your project's growth.",
    "contact.name": "Name",
    "contact.company": "Company Name",
    "contact.phone": "Phone (WhatsApp)",
    "contact.email": "Email",
    "contact.message": "Tell us about your marketing needs",
    "contact.messagePlaceholder": "What are your main marketing goals and challenges?",
    "contact.submit": "Get My Free Strategy Session",
    "contact.privacy": "Your information is confidential and will not be shared.",

    // FAQ Section
    "faq.title": "Frequently Asked Questions",
    "faq.q1": "How long does it take to complete a project?",
    "faq.a1": "The timeline varies depending on the project type and size, but we always start with a clear plan and defined schedule to ensure structured execution.",
    "faq.q2": "Can the project be customized to our specific needs?",
    "faq.a2": "Yes. All of our technology solutions are built based on the project’s requirements, not generic templates.",
    "faq.q3": "What is included when the project is delivered?",
    "faq.a3": "The full system, a clear admin dashboard, operational testing, and preparation for real-world use.",
    "faq.q4": "Do you provide support after launch?",
    "faq.a4": "Yes. We provide technical follow-up after delivery to ensure system stability and handle any operational feedback.",
    "faq.q5": "Can the website or app integrate with other systems?",
    "faq.a5": "Yes. Projects can be integrated with payment gateways, shipping services, management systems, or any tools your business requires.",
    "faq.q6": "Do you work with different industries?",
    "faq.a6": "We have experience building technology solutions for commercial, service, educational, and industrial businesses in Jordan and the Gulf.",
    "faq.q7": "Do you work with companies in our industry?",
    "faq.a7": "We have experience across a wide range of B2B and B2C industries in the MENA region. We can discuss our experience relevant to your industry during our call.",

    // Final CTA
    "finalCta.title": "Are You Ready to Achieve Real Growth in Your Project?",
    "finalCta.description": "Stop letting your competitors win. It's time to partner with a digital marketing agency in Jordan that is as focused on your bottom line as you are.",
    "finalCta.cta1": "Request Your Free Consultation Now",
    "finalCta.cta2": "Chat With Us on WhatsApp Now",

    // Testimonials Section
    "testimonials.title": "What Our Clients Say",
    "testimonials.subtitle": "Don't just take our word for it - hear from businesses we've helped grow.",
    "testimonials.client1.name": "Ahmed Al-Salem",
    "testimonials.client1.position": "Project Manager – Retail Sector",
    "testimonials.client1.text": "After launching our online store, receiving orders became much easier and our internal organization improved significantly. The biggest impact was how simple daily management became.",
    "testimonials.client2.name": "Layan Al-Khatib",
    "testimonials.client2.position": "Business Owner – Services Sector",
    "testimonials.client2.text": "The application that was developed helped us speed up communication with customers, making it easier than ever for them to access our services.",
    "testimonials.client3.name": "Raed Al-Hussein",
    "testimonials.client3.position": "Business Manager – Construction Sector",
    "testimonials.client3.text": "The new website gave our company a more professional presence and made it easier for clients to find information and contact us.",
    "testimonials.client4.name": "Noor Al-Ali",
    "testimonials.client4.position": "E-commerce Store Manager",
    "testimonials.client4.text": "Store management became much more organized after the system upgrade, giving us clearer tracking of products and orders.",
    "testimonials.client5.name": "Hussam Abdulhadi",
    "testimonials.client5.position": "CEO – Logistics Sector",
    "testimonials.client5.text": "The team understood our needs from the beginning. The execution was structured and clear, and the final result exceeded our expectations.",
    "testimonials.client6.name": "Tala Murad",
    "testimonials.client6.position": "Founder – Educational Company",
    "testimonials.client6.text": "The new website directly improved the company’s image and gave us a clearer platform to present our services",

    // Footer
    "footer.tagline": "Your trusted digital marketing partner in Jordan and the MENA region.",
    "footer.quickLinks": "Quick Links",
    "footer.contact": "Contact",
    "footer.location": "Amman Jordan 7th Circle",
    "footer.email": "Email: info@mafateehgroup.com",
    "footer.phone": "Phone: +962 7 7060 9728",
    "footer.copyright": "Mafateeh IT & Media Solutions. All rights reserved.",
  },
  ar: {
    // Navigation
    "nav.services": "الخدمات",
    "nav.whyUs": "لماذا نحن",
    "nav.process": "العملية",
    "nav.faq": "الأسئلة الشائعة",
    "nav.whatsapp": "واتساب",
    "nav.getStarted": "ابدأ الآن",

    // Hero Section
    "hero.badge": "شركة حلول تقنية رقمية",
    "hero.title": "نبني متاجر وتطبيقات تضاعف مبيعات ",
    "hero.titleHighlight": "شركتك في الأردن والخليج",
    "hero.subtitle": "نساعد الشركات على إطلاق متاجر إلكترونية، تطبيقات، ومواقع احترافية تُسهّل التشغيل، ترفع المبيعات، وتمنح مشروعك حضورًا رقميًا أقوى.",
    "hero.benefit1Title": "+30 متجر وتطبيق",
    "hero.benefit1Desc": "تم إطلاقها بنجاح",
    "hero.benefit2Title": "عائد 100% قابلية للتوسع",
    "hero.benefit2Desc": "بنية جاهزة للنمو",
    "hero.benefit3Title": "24/7 متابعة تقنية",
    "hero.benefit3Desc": "واستجابة مستمرة",
    "hero.cta1": "اطلب استشارتك المجانية الآن ",
    "hero.cta2": "تواصل معنا على واتساب",

    // Trust Section
    "trust.title": "الشريك التقني الموثوق للشركات في الأردن ودول الخليج",
    "trust.description": "لأكثر من 10 سنوات، تطور مفاتيح حلولًا تقنية متكاملة للشركات التي تبحث عن أنظمة مستقرة، تجربة مستخدم احترافية، وبنية تقنية قادرة على دعم النمو الحقيقي.\n نجمع بين الخبرة التقنية العميقة وفهم احتياجات السوق لبناء متاجر إلكترونية، تطبيقات، ومواقع تعمل بكفاءة وتكبر مع أعمالك.",
    "trust.clientLogo": "شعار العميل",
    "trust.result1": "+10 سنوات خبرة",
    "trust.result1Desc": "في الحلول التقنية",
    "trust.result2": "300%",
    "trust.result2Desc": "تحسين كفاءة التشغيل",
    "trust.result3": "5X",
    "trust.result3Desc": "قابلية توسع للمشروع",

    // Services Section
    "services.title": "حلول IT كاملة للمتاجر والتجارة الإلكترونية",
    "services.description": "نبني، ندير، ونحسّن المتاجر والتطبيقات للشركات مهما كانت",
    "services.social.title": "إنشاء متاجر إلكترونية جاهزة للبيع",
    "services.social.desc": "نطوّر متاجر إلكترونية احترافية بتجربة شراء سلسة، وربط كامل ببوابات الدفع والشحن وإدارة المنتجات، مع دفع إلكتروني، ولوحة تحكم سهلة، ومتجر جاهز للبيع",
    "services.ads.title": "إدارة وتشغيل المتاجر الإلكترونية",
    "services.ads.desc": "نتولى متابعة المنتجات، الطلبات، الأداء، والتحسين المستمر لضمان نمو المتجر ورفع المبيعات.",
    "services.seo.title": "تطوير تطبيقات مخصصة لأعمالك",
    "services.seo.desc": "نصمم تطبيقات عملية وسريعة تساعدك على الوصول إلى عملائك بسهولة وتقديم تجربة استخدام قوية، مع دعم Android و iOS، وسرعة عالية، وقابلية للتوسع.",
    "services.video.title": "تصميم مواقع إلكترونية احترافية",
    "services.video.desc": "مواقع سريعة، عصرية، ومتوافقة مع جميع الأجهزة لتعكس قوة علامتك التجارية.",

    // Why Us Section
    "whyUs.title": "شريك نموك، وليس مجرد وكالة أخرى",
    "whyUs.market.title": "تحليل احتياج المشروع بدقة",
    "whyUs.market.desc": "نبدأ بفهم طريقة عمل مشروعك قبل كتابة أي سطر برمجي.",
    "whyUs.bilingual.title": "حلول قابلة للتطوير",
    "whyUs.bilingual.desc": "كل نظام يُبنى ليكبر معك.",
    "whyUs.roi.title": "تجربة مستخدم مدروسة",
    "whyUs.roi.desc": "سهولة الاستخدام جزء أساسي من كل مشروع.",
    "whyUs.data.title": "فريق تطوير متخصص",
    "whyUs.data.desc": "مصممون ومطورون وخبراء تجربة مستخدم.",
    "whyUs.management.title": "ربط الأنظمة والأتمتة",
    "whyUs.management.desc": "نربط كل ما تحتاجه لتقليل الجهد اليدوي.",
    "whyUs.experts.title": "دعم ومتابعة مستمرة",
    "whyUs.experts.desc": "لا ينتهي دورنا بعد التسليم",

    // Why Mafateeh Section
    "whyMafateeh.title": "لماذا مفاتيح؟",
    "whyMafateeh.subtitle": "لأن الحل التقني الصحيح لا يُبنى بالبرمجة فقط... بل بفهم مشروعك من البداية وحتى التشغيل الكامل.",
    "whyMafateeh.intro": "في مفاتيح، لا نطوّر أنظمة جاهزة للجميع؛ بل نبني حلولًا تقنية مصممة لتخدم طريقة عملك، وتمنح مشروعك بنية رقمية واضحة، مستقرة، وقابلة للتوسع.",
    "whyMafateeh.team": "نعمل كفريق واحد يفهم مشروعك قبل أن يطوّر له الحل المناسب. ",
    "whyMafateeh.teamDesc": "محللو أعمال، مصممون، ومطورون يعملون بتناغم لبناء نظام يخدم أهدافك الفعلية.",
    "whyMafateeh.teamTogether": "كل قرار تقني يُبنى ليمنح مشروعك مرونة أكبر اليوم ونموًا أسهل غدًا.",
    "whyMafateeh.differentiator": "ما يميزنا ليس ما نقدمه فقط... بل كيف نبنيه:",
    "whyMafateeh.feature1": "حلول تقنية دقيقة تُبنى حسب احتياج المشروع الفعلي.",
    "whyMafateeh.feature2": "أنظمة واضحة وسهلة الإدارة تدعم التشغيل اليومي بكفاءة.",
    "whyMafateeh.feature3": "تصميم احترافي يعكس هوية مشروعك ويمنح تجربة استخدام أفضل.",
    "whyMafateeh.feature4": "بنية تقنية مرنة تجعل مشروعك أكثر جاهزية للنمو.",
    "whyMafateeh.feature5": "تكامل بين الأنظمة لتسهيل الإدارة وتحسين الأداء.",
    "whyMafateeh.feature6": "متابعة مستمرة لأن الحل الناجح يحتاج تطويرًا دائمًا.",
    "whyMafateeh.approach": "نحن لا ننفّذ فقط...",
    "whyMafateeh.approachDesc": "نحلل، نطوّر، ونبني حلولًا تعمل بكفاءة حقيقية.",
    "whyMafateeh.cta": "في مفاتيح، كل مشروع يُبنى ليخدم الاستخدام الفعلي ويمنحك تجربة تشغيل أكثر وضوحًا واستقرارًا.",

    // Contact Form
    "contact.title": "لنبدأ بناء الحل التقني المناسب لمشروعك",
    "contact.description": "يرجى تعبئة النموذج أدناه للحصول على استشارة مجانية. تساعدنا هذه المعلومات على فهم احتياجك وتقديم تصور واضح للحل الأنسب لمشروعك.",
    "contact.name": "الاسم",
    "contact.company": "اسم الشركة",
    "contact.phone": "الهاتف (واتساب)",
    "contact.email": "البريد الإلكتروني",
    "contact.message": "أخبرنا عن احتياجاتك التسويقية",
    "contact.messagePlaceholder": "ما هي أهدافك وتحدياتك التسويقية الرئيسية؟",
    "contact.submit": "احصل على جلستي الاستراتيجية المجانية",
    "contact.privacy": "معلوماتك سرية ولن تتم مشاركتها.",

    // FAQ Section
    "faq.title": "الأسئلة الشائعة",
    "faq.q1": "كم تستغرق مدة تنفيذ المشروع؟",
    "faq.a1": "تختلف المدة حسب نوع المشروع وحجمه، لكننا نبدأ دائمًا بخطة واضحة وجدول زمني محدد منذ البداية لضمان تنفيذ منظم وواضح.",
    "faq.q2": "هل يمكن تطوير المشروع حسب احتياجاتنا الخاصة؟",
    "faq.a2": "نعم، جميع الحلول التقنية لدينا تُبنى حسب طبيعة المشروع، وليس اعتمادًا على قوالب جاهزة.",
    "faq.q3": "ماذا يشمل المشروع عند التسليم؟",
    "faq.a3": "يشمل النظام كاملاً، لوحة إدارة واضحة، اختبار التشغيل، وتجهيز المشروع ليكون جاهزًا للاستخدام الفعلي.",
    "faq.q4": "هل تقدمون دعمًا بعد الإطلاق؟",
    "faq.a4": "نعم، نوفر متابعة تقنية بعد التسليم لضمان استقرار النظام ومعالجة أي ملاحظات تشغيلية.",
    "faq.q5": "هل يمكن ربط الموقع أو التطبيق بأنظمة أخرى؟",
    "faq.a5": "نعم، يمكن ربط المشروع ببوابات الدفع، الشحن، أنظمة الإدارة، أو أي خدمات يحتاجها نشاطك.",
    "faq.q6": "هل تعملون مع قطاعات مختلفة؟",
    "faq.a6": "لدينا خبرة في تطوير حلول تقنية لمشاريع تجارية، خدمية، تعليمية، وصناعية في الأردن ودول الخليج.",
    "faq.q7": "هل تعملون مع شركات في صناعتنا؟",
    "faq.a7": "لدينا خبرة عبر مجموعة واسعة من صناعات B2B وB2C في منطقة الشرق الأوسط وشمال إفريقيا. يمكننا مناقشة خبرتنا ذات الصلة بصناعتك خلال مكالمتنا.",

    // Final CTA
    "finalCta.title": "هل أنت جاهز لتحقيق نمو فعلي في مشروعك؟",
    "finalCta.description": "توقف عن السماح لمنافسيك بالفوز. حان الوقت للشراكة مع وكالة تسويق رقمي في الأردن تركز على أرباحك النهائية بقدر تركيزك.",
    "finalCta.cta1": "اطلب استشارتك المجانية الآن ",
    "finalCta.cta2": "تحدث معنا على واتساب الآن",

    // Testimonials Section
    "testimonials.title": "ماذا يقول عملاؤنا",
    "testimonials.subtitle": "لا تأخذ كلامنا فقط - استمع إلى الشركات التي ساعدناها على النمو.",
    "testimonials.client1.name": "أحمد السالم",
    "testimonials.client1.position": "مدير مشروع في قطاع التجارة",
    "testimonials.client1.text": "بعد إطلاق المتجر الإلكتروني معنا أصبح استقبال الطلبات أسهل بكثير، والتنظيم الداخلي أوضح. أكثر شيء لمسناه هو سهولة الإدارة اليومية.",
    "testimonials.client2.name": "ليان الخطيب",
    "testimonials.client2.position": "صاحبة مشروع في قطاع الخدمات",
    "testimonials.client2.text": "التطبيق الذي تم تطويره ساعدنا على تسريع التواصل مع العملاء بشكل واضح، وأصبح الوصول للخدمة أسهل من قبل.",
    "testimonials.client3.name": "رائد الحسين",
    "testimonials.client3.position": "مدير أعمال في قطاع المقاولات",
    "testimonials.client3.text": "الموقع الجديد أعطى شركتنا حضورًا أكثر احترافية، وسهّل على العملاء الوصول للمعلومات والتواصل معنا.",
    "testimonials.client4.name": "نور العلي",
    "testimonials.client4.position": "مديرة متجر إلكتروني",
    "testimonials.client4.text": "إدارة المتجر أصبحت أكثر ترتيبًا بعد تطوير النظام، وأصبح لدينا وضوح أكبر في متابعة المنتجات والطلبات.",
    "testimonials.client5.name": "حسام عبدالهادي",
    "testimonials.client5.position": "مدير تنفيذي في قطاع اللوجستيات",
    "testimonials.client5.text": "الفريق فهم احتياجنا من البداية، والتنفيذ كان مرتبًا وواضحًا، والنتيجة النهائية جاءت أفضل مما توقعنا.",
    "testimonials.client6.name": "تالة مراد",
    "testimonials.client6.position": "مؤسسة شركة تعليمية",
    "testimonials.client6.text": "العمل على الويب سايت الجديد انعكس مباشرة على صورة الشركة، وأصبح لدينا منصة أوضح لعرض خدماتنا.",
    // Footer
    "footer.tagline": "شريكك الموثوق في التسويق الرقمي في الأردن ومنطقة الشرق الأوسط وشمال إفريقيا.",
    "footer.quickLinks": "روابط سريعة",
    "footer.contact": "اتصل بنا",
    "footer.location": "عمان الأردن الدائرة السابعة",
    "footer.email": "البريد الإلكتروني: info@mafateehgroup.com",
    "footer.phone": "الهاتف: +962 7 7060 9728",
    "footer.copyright": "مفاتيح لتكنولوجيا المعلومات والحلول الإعلامية. جميع الحقوق محفوظة.",
  },
};
