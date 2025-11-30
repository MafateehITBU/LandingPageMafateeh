export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Mafateeh IT & Media Solutions",
    "image": "https://mafateeh-landing.manus.space/logo.png",
    "description": "Results-driven digital marketing agency in Jordan helping SMEs increase sales and ROAS with SEO, paid ads, and social media marketing.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "7th Circle",
      "addressLocality": "Amman",
      "addressCountry": "JO"
    },
    "telephone": "+962 7 7060 9728",
    "email": "info@mafateehgroup.com",
    "url": "https://mafateeh-landing.manus.space",
    "priceRange": "$$",
    "openingHours": "Mo-Fr 09:00-18:00",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Marketing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO Services",
            "description": "Search engine optimization services to improve organic rankings in Jordan"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Paid Ads Management",
            "description": "Expert management of Google Ads, Meta Ads, TikTok, Snapchat, and LinkedIn campaigns"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Social Media Marketing",
            "description": "Social media management and content creation for brand growth"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Marketing Strategy & Consulting",
            "description": "Strategic marketing planning and consulting services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Video Creation",
            "description": "AI-powered video content creation for marketing campaigns"
          }
        }
      ]
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Jordan"
      },
      {
        "@type": "Place",
        "name": "GCC Countries"
      },
      {
        "@type": "Place",
        "name": "MENA Region"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
