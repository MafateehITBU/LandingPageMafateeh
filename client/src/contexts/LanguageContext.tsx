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
    "hero.badge": "Digital Marketing Company",
    "hero.title": "Certified Digital Marketing Company in Jordan for",
    "hero.titleHighlight": "Measurable Growth",
    "hero.subtitle": "We help Arab businesses increase their sales, leads, and ROAS through performance-driven digital marketing. Stop wasting your budget—let's build a strategy that delivers real results.",
    "hero.benefit1Title": "+70% Increase",
    "hero.benefit1Desc": "in Qualified Leads",
    "hero.benefit2Title": "2x-5x Return",
    "hero.benefit2Desc": "Average ROAS",
    "hero.benefit3Title": "Data-Driven",
    "hero.benefit3Desc": "Strategy & Reports",
    "hero.cta1": "Request Your Free Consultation Now",
    "hero.cta2": "Contact Us on WhatsApp",

    // Trust Section
    "trust.title": "The Trusted Partner for Businesses in Jordan and the GCC",
    "trust.description": "For over a decade, Mafateeh Group has been the preferred digital marketing agency in Jordan for companies that demand results. We combine deep local market knowledge with proven strategies to help you dominate your industry.",
    "trust.clientLogo": "Client Logo",
    "trust.result1": "5X Return",
    "trust.result1Desc": "For E-commerce Client",
    "trust.result2": "300%",
    "trust.result2Desc": "Increase in B2B Leads",
    "trust.result3": "Over 10 Years",
    "trust.result3Desc": "Market Experience",

    // Services Section
    "services.title": "Comprehensive Solutions to Grow Your Business",
    "services.description": "We offer a complete suite of digital marketing services designed to attract, engage, and convert your target audience.",
    "services.social.title": "Social Media Marketing",
    "services.social.desc": "Build and manage your brand's presence on social media platforms using content that enhances your digital presence.",
    "services.ads.title": "Paid Ads Management",
    "services.ads.desc": "Expert management of marketing campaigns on social media platforms to achieve the highest advertising ROI at the lowest possible cost.",
    "services.seo.title": "SEO Services",
    "services.seo.desc": "Improve your organic search to attract potential customers who are looking for your services.",
    "services.video.title": "AI-Powered Video Creation",
    "services.video.desc": "We create professional videos using AI technology, without the need for filming or complexity, high-quality and fast production that enhances your brand presence immediately upon publication.",
    "services.strategy.title": "Marketing Strategy",
    "services.strategy.desc": "Develop a clear roadmap for your growth, aligning your marketing efforts with your core business objectives.",
    "services.analytics.title": "Analytics & Reporting",
    "services.analytics.desc": "Transparent, data-driven insights that help you understand what's working and where to invest next.",

    // Why Us Section
    "whyUs.title": "Your Growth Partner, Not Just Another Agency",
    "whyUs.market.title": "Deep Understanding of the Market Across All Sectors",
    "whyUs.market.desc": "We understand cultural differences and consumer behavior.",
    "whyUs.bilingual.title": "Bilingual Content Excellence",
    "whyUs.bilingual.desc": "We craft compelling messages in both Arabic and English to connect with your entire audience.",
    "whyUs.roi.title": "Content Creation",
    "whyUs.roi.desc": "This includes creating videos using AI, written content, creative ideas, and images.",
    "whyUs.data.title": "Accurate Decisions Based on Reliable Data",
    "whyUs.data.desc": "We use advanced analytics to make the best decisions and provide you with clear, transparent reports.",
    "whyUs.management.title": "End-to-End Advertising Campaign Management",
    "whyUs.management.desc": "From strategy and creativity to execution and optimization, we handle it all.",
    "whyUs.experts.title": "Certified Experts",
    "whyUs.experts.desc": "We bring together a specialized team in various technical fields, marketing, and analytics, working in perfect harmony to deliver comprehensive and professional solutions.",

    // Why Mafateeh Section
    "whyMafateeh.title": "Why Mafateeh?",
    "whyMafateeh.subtitle": "Because success doesn't happen by chance… it's built by a team that knows how to open the path for you.",
    "whyMafateeh.intro": "At Mafateeh, we don't offer fleeting services; we build integrated digital solutions designed specifically for you, working intelligently with measurable results.",
    "whyMafateeh.team": "We are a team of specialized experts in every field:",
    "whyMafateeh.teamDesc": "Marketing experts, designers, data analysts, technical developers, and internet solutions specialists.",
    "whyMafateeh.teamTogether": "We all work as one hand to give you the growth you deserve.",
    "whyMafateeh.differentiator": "What distinguishes us is not just what we offer… but how we offer it:",
    "whyMafateeh.feature1": "Accurate strategies based on data, not assumptions.",
    "whyMafateeh.feature2": "High-performance marketing campaigns managed professionally and continuously evaluated.",
    "whyMafateeh.feature3": "Professional designs that reflect your project's identity and catch attention from the first glance.",
    "whyMafateeh.feature4": "Advanced technological solutions that make your digital presence stronger, easier, and faster.",
    "whyMafateeh.feature5": "Complete brand management from the first idea… to the final result.",
    "whyMafateeh.feature6": "Continuous follow-up and constant improvement because we believe that real success is made through repetition and development.",
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
    "faq.q1": "What do your marketing packages cost?",
    "faq.a1": "Our pricing is customized based on your needs and goals. We offer packages for different business sizes and can discuss options during your free strategy session.",
    "faq.q2": "What is the contract length?",
    "faq.a2": "We offer flexible agreements, but we recommend a minimum of 3-6 months to see significant, sustainable results from our efforts.",
    "faq.q3": "How quickly will we see results?",
    "faq.a3": "While some channels like paid ads can deliver quick wins, a sustainable strategy (especially SEO) can take 3-6 months to show significant traction. We focus on building long-term growth.",
    "faq.q4": "What do you need from us to get started?",
    "faq.a4": "We'll need access to your existing marketing accounts (e.g., Google Analytics, ad accounts), brand assets, and insights into your target customer.",
    "faq.q5": "How do you handle reporting and communication?",
    "faq.a5": "We provide monthly performance reports and hold regular meetings to discuss progress, strategy, and next steps. We believe in full transparency.",
    "faq.q6": "Can you manage campaigns in both Arabic and English?",
    "faq.a6": "Yes, this is one of our core strengths. We have a bilingual team that excels at creating and managing campaigns for both Arabic and English-speaking audiences.",
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
    "testimonials.client1.name": "Raed Al-Khatib",
    "testimonials.client1.position": "Business Development Manager in Technology Sector",
    "testimonials.client1.text": "After working with Mafateeh, qualified visits to our website increased by 65% within three months, and conversion rates from advertising campaigns doubled. For the first time, we're getting accurate and consistent results like this.",
    "testimonials.client2.name": "Layan Al-Salem",
    "testimonials.client2.position": "Fashion Store Owner",
    "testimonials.client2.text": "Mafateeh developed the content and account identity in a way that quadrupled engagement and significantly increased daily sales volume. The content became more professional and practically changed the entire shape of my brand's presence.",
    "testimonials.client3.name": "Mohammed Al-Jawhari",
    "testimonials.client3.position": "Marketing Officer in Digital Solutions Sector",
    "testimonials.client3.text": "After optimizing campaigns with Mafateeh, the number of new clients increased significantly. The results were measurable and clear from the first month.",
    "testimonials.client4.name": "Tala Murad",
    "testimonials.client4.position": "Founder of Digital Education Platform",
    "testimonials.client4.text": "Thanks to content optimization and campaign management, subscriptions increased by 80% in just two months. Mafateeh provided a strong strategy whose results continued even after the campaign ended.",
    "testimonials.client5.name": "Hussam Abdelghani",
    "testimonials.client5.position": "Executive Director in Logistics Sector",
    "testimonials.client5.text": "After improving digital presence and content creation, contact requests increased by 55%. The work was professional and fast, with tangible results we've never experienced with any other company.",
    "testimonials.client6.name": "Nora Al-Ali",
    "testimonials.client6.position": "Marketing Director in Healthcare Sector",
    "testimonials.client6.text": "Our collaboration with Mafateeh significantly contributed to increasing awareness of our brand. Inquiries increased by 90% and bookings increased by 70% within four months. The team is responsive and follows up on every detail.",

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
    "hero.badge": "شركة التسويق الرقمي",
    "hero.title": "شركة التسويق الرقمي المعتمدة في الأردن لـ",
    "hero.titleHighlight": "نمو قابل للقياس",
    "hero.subtitle": "نساعد الشركات العربية على زيادة المبيعات والعملاء المحتملين والعائد على الإنفاق الإعلاني من خلال التسويق الرقمي القائم على الأداء. توقف عن إهدار ميزانيتك - دعنا نبني استراتيجية تحقق نتائج حقيقية.",
    "hero.benefit1Title": "زيادة +70%",
    "hero.benefit1Desc": "في العملاء المحتملين المؤهلين",
    "hero.benefit2Title": "عائد 2x-5x",
    "hero.benefit2Desc": "متوسط العائد على الإنفاق",
    "hero.benefit3Title": "قائم على البيانات",
    "hero.benefit3Desc": "استراتيجية وتقارير",
    "hero.cta1": "اطلب استشارتك المجانية الآن ",
    "hero.cta2": "تواصل معنا على واتساب",

    // Trust Section
    "trust.title": "الشريك الموثوق للشركات في الأردن ودول الخليج",
    "trust.description": "لأكثر من عقد من الزمان، كانت مجموعة مفاتيح هي وكالة التسويق الرقمي المفضلة في الأردن للشركات التي تطالب بالنتائج. نحن نجمع بين المعرفة العميقة بالسوق المحلي والاستراتيجيات المثبتة لمساعدتك على السيطرة على صناعتك.",
    "trust.clientLogo": "شعار العميل",
    "trust.result1": "عائد 5X",
    "trust.result1Desc": "لعميل التجارة الإلكترونية",
    "trust.result2": "300%",
    "trust.result2Desc": "زيادة في عملاء B2B",
    "trust.result3": "أكثر من 10 سنوات",
    "trust.result3Desc": "خبرة في السوق",

    // Services Section
    "services.title": "حلول شاملة لتنمية أعمالك",
    "services.description": "نقدم مجموعة كاملة من خدمات التسويق الرقمي المصممة لجذب جمهورك المستهدف وإشراكه وتحويله.",
    "services.social.title": "التسويق عبر وسائل التواصل الاجتماعي",
    "services.social.desc": "قم ببناء وإدارة حضور علامتك التجارية على وسائل التواصل الاجتماعي باستخدام محتوى يعزز حضورك الرقمي.",
    "services.ads.title": "إدارة الإعلانات المدفوعة",
    "services.ads.desc": "إدارة الحملات التسويقية على منصات التواصل الاجتماعي من خلال الخبراء لتحقيق أعلى عائد على الاستثمار الإعلاني بأقل تكلفة ممكنة.",
    "services.seo.title": "خدمات تحسين محركات البحث",
    "services.seo.desc": "قم بتحسين البحث العضوي لديك لجذب العملاء المحتملين الذين يبحثون عن خدماتك.",
    "services.video.title": "إنشاء مقاطع فيديو باستخدام أدوات الذكاء الاصطناعي",
    "services.video.desc": "ننشئ مقاطع فيديو احترافية بتقنيات الذكاء الاصطناعي، دون الحاجة للتصوير أو التعقيد، عالية الجودة وسريعة الإنتاج تعزز حضور علامتك فور نشرها.",
    "services.strategy.title": "استراتيجية التسويق",
    "services.strategy.desc": "قم بتطوير خريطة واضحة لنموك، ومواءمة جهودك التسويقية مع أهداف عملك الأساسية.",
    "services.analytics.title": "التحليلات والتقارير",
    "services.analytics.desc": "رؤى شفافة تعتمد على البيانات تساعدك على فهم ما ينجح وأين تستثمر بعد ذلك.",

    // Why Us Section
    "whyUs.title": "شريك نموك، وليس مجرد وكالة أخرى",
    "whyUs.market.title": "فهم عميق بالسوق بمختلف قطاعاته",
    "whyUs.market.desc": "نحن نفهم الفروق الثقافية وسلوك المستهلك.",
    "whyUs.bilingual.title": "تميز المحتوى ثنائي اللغة",
    "whyUs.bilingual.desc": "نصنع رسائل مقنعة باللغتين العربية والإنجليزية للتواصل مع جمهورك بالكامل.",
    "whyUs.roi.title": "إنشاء المحتوى",
    "whyUs.roi.desc": "ويشمل ذلك إعداد مقاطع فيديو باستخدام الذكاء الاصطناعي، والمحتوى الكتابي، والأفكار الإبداعية، والصور.",
    "whyUs.data.title": "قرارات دقيقة تستند إلى بيانات موثوقة",
    "whyUs.data.desc": "نحن نستخدم التحليلات المتقدمة لاتخاذ أفضل القرارات، وتزويدك بتقارير واضحة وشفافة.",
    "whyUs.management.title": "إدارة الحملات الإعلانية من الألف إلى الياء",
    "whyUs.management.desc": "من الاستراتيجية والإبداع إلى التنفيذ والتحسين، نحن نتولى كل ذلك.",
    "whyUs.experts.title": "خبراء معتمدون",
    "whyUs.experts.desc": "نضمّ فريقًا متخصصًا في مختلف المجالات التقنية، التسويق، والتحليل، يعملون بتناغم كامل لتقديم حلول شاملة واحترافية.",

    // Why Mafateeh Section
    "whyMafateeh.title": "لماذا مفاتيح؟",
    "whyMafateeh.subtitle": "لأن النجاح لا يحدث صدفة… بل بصناعة فريق يعرف كيف يفتح لك الطريق.",
    "whyMafateeh.intro": "في مفاتيح، لا نقدّم خدمات عابرة؛ بل نبني حلولًا رقمية متكاملة تُصمَّم خصيصًا لك، وتعمل بذكاء ونتائج قابلة للقياس.",
    "whyMafateeh.team": "نحن فريق من الخبراء المختصين في كل مجال:",
    "whyMafateeh.teamDesc": "خبراء تسويق، ومصمّمون، ومحللو بيانات، ومطورون تقنيين و مختصون في حلول الاإنترنت.",
    "whyMafateeh.teamTogether": "كلنا نعمل كيدٍ واحدة لنمنحك النمو الذي تستحقه.",
    "whyMafateeh.differentiator": "ما يميزنا ليس ما نقدمه فقط… بل كيف نقدمه:",
    "whyMafateeh.feature1": "استراتيجية دقيقة مبنية على البيانات لا على الافتراضات.",
    "whyMafateeh.feature2": "حملات تسويقية ذات أداء مرتفع تُدار باحتراف وتُقيّم باستمرار.",
    "whyMafateeh.feature3": "تصميمات بروفيشنال تعكس هوية مشروعك وتلفت الانتباه من أول نظرة.",
    "whyMafateeh.feature4": "حلول تكنولوجية متقدمة تجعل حضورك الرقمي أقوى وأسهل وأسرع.",
    "whyMafateeh.feature5": "إدارة كاملة للعلامة التجارية من أول فكرة… إلى آخر نتيجة.",
    "whyMafateeh.feature6": "متابعة مستمرة وتحسين دائم لأننا نؤمن أن النجاح الحقيقي يُصنع بالتكرار والتطوير.",
    "whyMafateeh.approach": "نحن لا ننفّذ فقط…",
    "whyMafateeh.approachDesc": "نحلّل، نخطّط، نبتكر، ونحقق نتائج ملموسة.",
    "whyMafateeh.cta": "اختر مفاتيح، واختر فريقًا يرى مشروعك كما تراه أنت ويأخذه إلى أبعد مما تتوقع.",

    // Contact Form
    "contact.title": "لنبدأ في بناء استراتيجية نموك",
    "contact.description": "يرجى تعبئة النموذج أدناه للحصول على استشارة مجانية. تساعدنا هذه التفاصيل على فهم وضعك الحالي وتحضير توصيات دقيقة تدعم نمو مشروعك.",
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
    "faq.q1": "كم تكلفة باقات التسويق الخاصة بكم؟",
    "faq.a1": "يتم تخصيص أسعارنا بناءً على احتياجاتك وأهدافك. نقدم باقات لأحجام أعمال مختلفة ويمكننا مناقشة الخيارات خلال جلسة الاستراتيجية المجانية.",
    "faq.q2": "ما هي مدة العقد؟",
    "faq.a2": "نقدم اتفاقيات مرنة، لكننا نوصي بحد أدنى من 3-6 أشهر لرؤية نتائج كبيرة ومستدامة من جهودنا.",
    "faq.q3": "كم من الوقت سنرى النتائج؟",
    "faq.a3": "بينما يمكن لبعض القنوات مثل الإعلانات المدفوعة تحقيق انتصارات سريعة، يمكن أن تستغرق الاستراتيجية المستدامة (خاصة تحسين محركات البحث) من 3 إلى 6 أشهر لإظهار جذب كبير. نحن نركز على بناء النمو طويل الأجل.",
    "faq.q4": "ما الذي تحتاجونه منا للبدء؟",
    "faq.a4": "سنحتاج إلى الوصول إلى حسابات التسويق الحالية الخاصة بك (مثل Google Analytics وحسابات الإعلانات) وأصول العلامة التجارية ورؤى حول عميلك المستهدف.",
    "faq.q5": "كيف تتعاملون مع التقارير والتواصل؟",
    "faq.a5": "نقدم تقارير أداء شهرية ونعقد اجتماعات منتظمة لمناقشة التقدم والاستراتيجية والخطوات التالية. نحن نؤمن بالشفافية الكاملة.",
    "faq.q6": "هل يمكنكم إدارة الحملات باللغتين العربية والإنجليزية؟",
    "faq.a6": "نعم، هذه واحدة من نقاط قوتنا الأساسية. لدينا فريق ثنائي اللغة يتفوق في إنشاء وإدارة الحملات لكل من الجماهير الناطقة بالعربية والإنجليزية.",
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
    "testimonials.client1.name": "رائد الخطيب",
    "testimonials.client1.position": "مدير تطوير أعمال في قطاع التقنية",
    "testimonials.client1.text": "بعد تعاوننا مع مفاتيح، ارتفعت الزيارات المؤهلة لموقعنا بنسبة 65% خلال ثلاثة أشهر، وتضاعفت معدلات التحويل من الحملات الإعلانية. لأول مرة نحصل على نتائج دقيقة ومستمرة بهذا الشكل.",
    "testimonials.client2.name": "ليان السالم",
    "testimonials.client2.position": "صاحبة متجر في قطاع الأزياء",
    "testimonials.client2.text": "مفاتيح طورت المحتوى وهوية الحساب بطريقة رفعت التفاعل أربعة أضعاف، وازداد حجم المبيعات اليومية بشكل واضح. المحتوى أصبح أكثر احترافية وعمليًا غيّر شكل حضور علامتي بالكامل.",
    "testimonials.client3.name": "محمد الجوهري",
    "testimonials.client3.position": "مسؤول تسويق في قطاع الحلول الرقمية",
    "testimonials.client3.text": "بعد تحسين الحملات مع مفاتيح ارتفع عدد العملاء الجدد بشكل كبير. النتائج كانت قابلة للقياس وواضحة من أول شهر.",
    "testimonials.client4.name": "تالا مراد",
    "testimonials.client4.position": "مؤسسة منصة في قطاع التعليم الرقمي",
    "testimonials.client4.text": "بفضل تحسين المحتوى وإدارة الحملات، زادت الاشتراكات بنسبة 80% خلال شهرين فقط. مفاتيح قدّمت استراتيجية قوية استمرت نتائجها حتى بعد انتهاء الحملة.",
    "testimonials.client5.name": "حسام عبدالغني",
    "testimonials.client5.position": "مدير تنفيذي في قطاع الخدمات اللوجستية",
    "testimonials.client5.text": "بعد تحسين الظهور الرقمي وصياغة المحتوى، ارتفعت طلبات التواصل بنسبة 55%. العمل كان احترافيًا وسريعًا، والنتائج ملموسة بشكل لم نعهده مع أي جهة أخرى.",
    "testimonials.client6.name": "نورا العلي",
    "testimonials.client6.position": "مديرة تسويق في قطاع الرعاية الصحية",
    "testimonials.client6.text": "تعاوننا مع مفاتيح ساهم بشكل كبير في زيادة الوعي بعلامتنا التجارية. زاد عدد الاستفسارات بنسبة 90% وزادت الحجوزات بنسبة 70% خلال أربعة أشهر. الفريق متجاوب ومتابع لكل التفاصيل.",

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
