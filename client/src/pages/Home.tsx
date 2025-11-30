import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Menu,
  X,
  TrendingUp,
  Target,
  BarChart3,
  Users,
  Globe,
  Award,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Zap,
  Shield,
  Lightbulb,
  Languages,
  Star,
  Quote,
} from "lucide-react";
import { APP_LOGO } from "@/const";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

// Import partner logos
import Partner1 from "@/assets/ourpartners/4-02.png";
import Partner2 from "@/assets/ourpartners/4-03.png";
import Partner3 from "@/assets/ourpartners/4-04.png";
import Partner4 from "@/assets/ourpartners/4-05.png";
import Partner5 from "@/assets/ourpartners/4-07.png";
import Partner6 from "@/assets/ourpartners/4-08.png";
import Partner7 from "@/assets/ourpartners/4-09.png";
import Partner8 from "@/assets/ourpartners/4-10.png";
import Partner9 from "@/assets/ourpartners/4-11.png";
import Partner10 from "@/assets/ourpartners/4-12.png";
import Partner11 from "@/assets/ourpartners/4-13.png";
import Partner12 from "@/assets/ourpartners/4-14.png";
import Partner13 from "@/assets/ourpartners/4-15.png";
import Partner14 from "@/assets/ourpartners/4-16.png";
import Partner15 from "@/assets/ourpartners/4-17.png";
import Partner16 from "@/assets/ourpartners/CSE LOGO.png";
import Partner17 from "@/assets/ourpartners/IMG_1045.PNG";
import Partner18 from "@/assets/ourpartners/logo (1).svg";
import Partner19 from "@/assets/ourpartners/logo_6377d0e9c4fe9.png";
import Partner20 from "@/assets/ourpartners/Vector Smart Object.png";
import Partner21 from "@/assets/ourpartners/بمكو-01.png";

const partnerLogos = [
  Partner1,
  Partner2,
  Partner3,
  Partner4,
  Partner5,
  Partner6,
  Partner7,
  Partner8,
  Partner9,
  Partner10,
  Partner11,
  Partner12,
  Partner13,
  Partner14,
  Partner15,
  Partner16,
  Partner17,
  Partner18,
  Partner19,
  Partner20,
  Partner21,
];

export default function Home() {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    message: "",
  });

  // Auto-scroll carousel
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0); // Reset to start
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error(language === "en" ? "Please fill in all required fields" : "يرجى ملء جميع الحقول المطلوبة");
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error(language === "en" ? "Please enter a valid email address" : "يرجى إدخال عنوان بريد إلكتروني صالح");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Send to server API endpoint (uses nodemailer)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(language === "en" ? "Thank you! We'll contact you soon." : "شكراً لك! سنتواصل معك قريباً.");
        // Reset form
        setFormData({
          name: "",
          company: "",
          phone: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error(data.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : (language === "en" ? "Failed to send message. Please try again." : "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.");
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/962770609728", "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={APP_LOGO} alt="Mafateeh Group" className="h-20 w-auto" />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">{t("nav.services")}</a>
            <a href="#why-us" className="text-sm font-medium hover:text-primary transition-colors">{t("nav.whyUs")}</a>
            <a href="#why-mafateeh" className="text-sm font-medium hover:text-primary transition-colors">{t("whyMafateeh.title")}</a>
            <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">{t("nav.faq")}</a>
            <Button onClick={toggleLanguage} variant="ghost" size="sm">
              <Languages className="mr-2 h-4 w-4" />
              {language === "en" ? "العربية" : "English"}
            </Button>
            <Button onClick={handleWhatsAppClick} variant="outline" size="sm">
              <MessageCircle className={language === "ar" ? "ml-2 h-4 w-4" : "mr-2 h-4 w-4"} />
              {t("nav.whatsapp")}
            </Button>
            <Button asChild size="sm">
              <a href="#contact">{t("nav.getStarted")}</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="container py-4 flex flex-col gap-4">
              <a href="#services" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>{t("nav.services")}</a>
              <a href="#why-us" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>{t("nav.whyUs")}</a>
              <a href="#why-mafateeh" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>{t("whyMafateeh.title")}</a>
              <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>{t("nav.faq")}</a>
              <Button onClick={toggleLanguage} variant="ghost" className="w-full justify-start">
                <Languages className={language === "ar" ? "ml-2 h-4 w-4" : "mr-2 h-4 w-4"} />
                {language === "en" ? "العربية" : "English"}
              </Button>
              <Button onClick={handleWhatsAppClick} variant="outline" className="w-full">
                <MessageCircle className={language === "ar" ? "ml-2 h-4 w-4" : "mr-2 h-4 w-4"} />
                {t("nav.whatsapp")}
              </Button>
              <Button asChild className="w-full">
                <a href="#contact" onClick={() => setMobileMenuOpen(false)}>{t("nav.getStarted")}</a>
              </Button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 md:py-32">
          <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-5"></div>
          <div className="container relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-block">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                    {t("hero.badge")}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                  {t("hero.title")}{" "}
                  <span className="text-primary">{t("hero.titleHighlight")}</span>
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                  {t("hero.subtitle")}
                </p>

                <div className="grid sm:grid-cols-3 gap-6 py-6">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{t("hero.benefit1Title")}</div>
                      <div className="text-sm text-muted-foreground">{t("hero.benefit1Desc")}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-accent/10 p-2">
                      <Target className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{t("hero.benefit2Title")}</div>
                      <div className="text-sm text-muted-foreground">{t("hero.benefit2Desc")}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{t("hero.benefit3Title")}</div>
                      <div className="text-sm text-muted-foreground">{t("hero.benefit3Desc")}</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild className="text-base">
                    <a href="#contact">{t("hero.cta1")}</a>
                  </Button>
                  <Button size="lg" variant="outline" onClick={handleWhatsAppClick} className="text-base">
                    <MessageCircle className={language === "ar" ? "ml-2 h-5 w-5" : "mr-2 h-5 w-5"} />
                    {t("hero.cta2")}
                  </Button>
                </div>
              </div>

              <div className="hidden lg:block">
                <img
                  src="/analytics.webp"
                  alt="Digital Marketing Analytics"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Trust & Credibility Section */}
        <section id="trust" className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("trust.title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("trust.description")}
              </p>
            </div>

            {/* Client Logos Slider */}
            <div className="mb-16">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                setApi={setApi}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {partnerLogos.map((logo, index) => (
                    <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/4 lg:basis-1/5">
                      <Card className="bg-background border-0 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="flex items-center justify-center h-24 p-4">
                          <img
                            src={logo}
                            alt={`Partner ${index + 1}`}
                            className="max-h-16 max-w-full object-contain transition-all duration-300 hover:scale-105"
                          />
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-12" />
                <CarouselNext className="hidden md:flex -right-12" />
              </Carousel>
            </div>

            {/* Case Results */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold mb-2">{t("trust.result1")}</div>
                  <div className="text-primary-foreground/90">{t("trust.result1Desc")}</div>
                </CardContent>
              </Card>
              <Card className="bg-accent text-accent-foreground">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold mb-2">{t("trust.result2")}</div>
                  <div className="text-accent-foreground/90">{t("trust.result2Desc")}</div>
                </CardContent>
              </Card>
              <Card className="bg-foreground text-background">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold mb-2">{t("trust.result3")}</div>
                  <div className="text-background/90">{t("trust.result3Desc")}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 md:py-24">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("services.title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("services.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{t("services.social.title")}</h3>
                  <p className="text-muted-foreground">
                    {t("services.social.desc")}
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-accent/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{t("services.ads.title")}</h3>
                  <p className="text-muted-foreground">
                    {t("services.ads.desc")}
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{t("services.seo.title")}</h3>
                  <p className="text-muted-foreground">
                    {t("services.seo.desc")}
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-accent/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{t("services.video.title")}</h3>
                  <p className="text-muted-foreground">
                    {t("services.video.desc")}
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{t("services.strategy.title")}</h3>
                  <p className="text-muted-foreground">
                    {t("services.strategy.desc")}
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-accent/10 w-12 h-12 flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{t("services.analytics.title")}</h3>
                  <p className="text-muted-foreground">
                    {t("services.analytics.desc")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-us" className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("whyUs.title")}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{t("whyUs.market.title")}</h3>
                  <p className="text-muted-foreground">{t("whyUs.market.desc")}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="rounded-full bg-accent/10 w-10 h-10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{t("whyUs.bilingual.title")}</h3>
                  <p className="text-muted-foreground">{t("whyUs.bilingual.desc")}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{t("whyUs.roi.title")}</h3>
                  <p className="text-muted-foreground">{t("whyUs.roi.desc")}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="rounded-full bg-accent/10 w-10 h-10 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{t("whyUs.data.title")}</h3>
                  <p className="text-muted-foreground">{t("whyUs.data.desc")}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{t("whyUs.management.title")}</h3>
                  <p className="text-muted-foreground">{t("whyUs.management.desc")}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="rounded-full bg-accent/10 w-10 h-10 flex items-center justify-center">
                    <Award className="h-5 w-5 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{t("whyUs.experts.title")}</h3>
                  <p className="text-muted-foreground">{t("whyUs.experts.desc")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("testimonials.title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("testimonials.subtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Testimonial 1 */}
              <Card className="hover:shadow-lg transition-shadow relative">
                <CardContent className="pt-6">
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    "{t("testimonials.client1.text")}"
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-foreground">{t("testimonials.client1.name")}</div>
                    <div className="text-sm text-muted-foreground">{t("testimonials.client1.position")}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial 2 */}
              <Card className="hover:shadow-lg transition-shadow relative">
                <CardContent className="pt-6">
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    "{t("testimonials.client2.text")}"
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-foreground">{t("testimonials.client2.name")}</div>
                    <div className="text-sm text-muted-foreground">{t("testimonials.client2.position")}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial 3 */}
              <Card className="hover:shadow-lg transition-shadow relative">
                <CardContent className="pt-6">
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    "{t("testimonials.client3.text")}"
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-foreground">{t("testimonials.client3.name")}</div>
                    <div className="text-sm text-muted-foreground">{t("testimonials.client3.position")}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial 4 */}
              <Card className="hover:shadow-lg transition-shadow relative">
                <CardContent className="pt-6">
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    "{t("testimonials.client4.text")}"
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-foreground">{t("testimonials.client4.name")}</div>
                    <div className="text-sm text-muted-foreground">{t("testimonials.client4.position")}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial 5 */}
              <Card className="hover:shadow-lg transition-shadow relative">
                <CardContent className="pt-6">
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    "{t("testimonials.client5.text")}"
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-foreground">{t("testimonials.client5.name")}</div>
                    <div className="text-sm text-muted-foreground">{t("testimonials.client5.position")}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial 6 */}
              <Card className="hover:shadow-lg transition-shadow relative">
                <CardContent className="pt-6">
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    "{t("testimonials.client6.text")}"
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-foreground">{t("testimonials.client6.name")}</div>
                    <div className="text-sm text-muted-foreground">{t("testimonials.client6.position")}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        {/* Why Mafateeh Section */}
        <section id="why-mafateeh" className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
          <div className="container relative">
            <div className="max-w-5xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {t("whyMafateeh.title")}
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed">
                  {t("whyMafateeh.subtitle")}
                </p>
              </div>

              {/* Main Content Card */}
              <Card className="border-2 shadow-xl mb-8">
                <CardContent className="p-8 md:p-12">
                  <p className="text-lg md:text-xl text-foreground mb-6 leading-relaxed">
                    {t("whyMafateeh.intro")}
                  </p>
                  
                  <div className="bg-primary/5 rounded-lg p-6 mb-6 border-l-4 border-primary">
                    <p className="font-semibold text-foreground mb-2 text-lg">
                      {t("whyMafateeh.team")}
                    </p>
                    <p className="text-muted-foreground text-base">
                      {t("whyMafateeh.teamDesc")}
                    </p>
                    <p className="text-primary font-bold mt-3 text-lg">
                      {t("whyMafateeh.teamTogether")}
                    </p>
                  </div>

                  <div className="border-t pt-6">
                    <p className="font-bold text-xl text-foreground mb-6">
                      {t("whyMafateeh.differentiator")}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-accent/50 transition-colors">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <p className="text-foreground">{t("whyMafateeh.feature1")}</p>
                      </div>
                      <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-accent/50 transition-colors">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <p className="text-foreground">{t("whyMafateeh.feature2")}</p>
                      </div>
                      <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-accent/50 transition-colors">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <p className="text-foreground">{t("whyMafateeh.feature3")}</p>
                      </div>
                      <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-accent/50 transition-colors">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <p className="text-foreground">{t("whyMafateeh.feature4")}</p>
                      </div>
                      <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-accent/50 transition-colors">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <p className="text-foreground">{t("whyMafateeh.feature5")}</p>
                      </div>
                      <div className="flex items-start gap-3 p-4 rounded-lg hover:bg-accent/50 transition-colors">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <p className="text-foreground">{t("whyMafateeh.feature6")}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Approach Section */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 md:p-10 text-center border-2 border-primary/20">
                <p className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {t("whyMafateeh.approach")}
                </p>
                <p className="text-xl md:text-2xl text-primary font-semibold mb-6">
                  {t("whyMafateeh.approachDesc")}
                </p>
                <p className="text-lg md:text-xl text-foreground font-medium max-w-3xl mx-auto">
                  {t("whyMafateeh.cta")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t("contact.title")}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t("contact.description")}
                </p>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-foreground">
                          {t("contact.name")} *
                        </label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-sm font-medium text-foreground">
                          {t("contact.company")}
                        </label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-foreground">
                          {t("contact.phone")} *
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+962 7 7060 9728"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-foreground">
                          {t("contact.email")} *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground">
                        {t("contact.message")}
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={t("contact.messagePlaceholder")}
                        rows={4}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full text-base"
                      disabled={isSubmitting}
                    >
                      {isSubmitting 
                        ? (language === "en" ? "Sending..." : "جاري الإرسال...")
                        : t("contact.submit")
                      }
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      {t("contact.privacy")}
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t("faq.title")}
                </h2>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="bg-background rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {t("faq.q1")}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {t("faq.a1")}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="bg-background rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {t("faq.q2")}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {t("faq.a2")}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="bg-background rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {t("faq.q3")}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {t("faq.a3")}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="bg-background rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {t("faq.q4")}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {t("faq.a4")}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="bg-background rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {t("faq.q5")}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {t("faq.a5")}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6" className="bg-background rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {t("faq.q6")}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {t("faq.a6")}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7" className="bg-background rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {t("faq.q7")}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {t("faq.a7")}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary to-accent">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("finalCta.title")}
              </h2>
              <p className="text-lg mb-8 text-primary-foreground/90">
                {t("finalCta.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild className="text-base">
                  <a href="#contact">{t("finalCta.cta1")}</a>
                </Button>
                <Button size="lg" variant="outline" onClick={handleWhatsAppClick} className="text-base bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <MessageCircle className={language === "ar" ? "ml-2 h-5 w-5" : "mr-2 h-5 w-5"} />
                  {t("finalCta.cta2")}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={APP_LOGO} alt="Mafateeh Group" className="h-20 w-auto brightness-0 invert" />
              </div>
              <p className="text-background/80">
                {t("footer.tagline")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t("footer.quickLinks")}</h3>
              <div className="space-y-2">
                <a href="#services" className="block text-background/80 hover:text-background transition-colors">{t("nav.services")}</a>
                <a href="#why-us" className="block text-background/80 hover:text-background transition-colors">{t("nav.whyUs")}</a>
                <a href="#process" className="block text-background/80 hover:text-background transition-colors">{t("nav.process")}</a>
                <a href="#faq" className="block text-background/80 hover:text-background transition-colors">{t("nav.faq")}</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t("footer.contact")}</h3>
              <div className="space-y-2 text-background/80">
                <p>{t("footer.location")}</p>
                <p>{t("footer.email")}</p>
                <p>{t("footer.phone")}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-background/60 text-sm">
            <p>&copy; {new Date().getFullYear()} {t("footer.copyright")}</p>
          </div>
        </div>
      </footer>

      {/* Fixed WhatsApp Button */}
      <a
        href="https://wa.me/962770609728"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        aria-label="Contact us on WhatsApp"
      >
        <svg
          className="h-5 w-5 md:h-6 md:w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center animate-pulse">
          <span className="text-[8px] md:text-[10px]">1</span>
        </span>
      </a>
    </div>
  );
}
