// Global site configuration (easy to edit).
// Language: English-only site for overseas B2B buyers.

window.SiteConfig = {
  companyName: "JINAN HECOTH INTERNATIONAL TRADING CO., LTD",
  brandTagline: "Construction & Agricultural Machinery | Smart Drip Irrigation | Spare Parts",
  primaryEmail: "zoe@annetop.com",
  secondaryEmail: "anna@annetop.com",
  whatsapp: "+86 000 0000 0000", // TODO: replace with your sales WhatsApp number
  addressLine: "Jinan, Shandong, China",
  workingHours: "Mon–Sat, 09:00–18:00 (Beijing Time)",
  website: "https://www.example.com", // TODO: set after you bind your domain

  // EmailJS (front-end only). Fill these after creating EmailJS account.
  // Docs: https://www.emailjs.com/docs/
  emailjs: {
    publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
    serviceId: "YOUR_EMAILJS_SERVICE_ID",
    templateId: "YOUR_EMAILJS_TEMPLATE_ID",
    // multiple recipients supported by many email providers / templates:
    toEmails: "zoe@annetop.com, anna@annetop.com",
  },

  // SEO keyword seed (used in meta keywords + some content).
  seoKeywords: [
    "agricultural tractor",
    "farm machinery",
    "construction machinery",
    "smart drip irrigation system",
    "machinery spare parts",
  ],

  // i18n
  defaultLang: "en",
  supportedLangs: ["en", "fr", "es", "ar", "ru", "pt"],
};
