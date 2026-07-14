/* Lightweight i18n for static site (no build tools).
 * - Default language: English (en)
 * - Manual switch via header dropdown (stored in localStorage)
 * - Optional URL param: ?lang=fr
 * - Arabic enables RTL: <html dir="rtl" lang="ar">
 */

(function () {
  const STORAGE_KEY = "site_lang";

  // --- Dictionaries ---
  // Notes:
  // 1) Keep keys stable.
  // 2) Short UI copy is translated here. Long blog/product copy can stay English or be extended later.
  const dict = {
    en: {
      "nav.home": "Home",
      "nav.products": "Products",
      "nav.solutions": "Solutions",
      "nav.about": "About",
      "nav.news": "News",
      "nav.contact": "Contact",
      "cta.get_quote": "Get a Quote",
      "cta.browse_products": "Browse Products",
      "cta.view_all": "View all",
      "cta.browse_catalog": "Browse catalog",
      "cta.send_inquiry": "Send Inquiry",
      "cta.contact_sales": "Contact Sales",
      "cta.view_details": "View details",
      "cta.quick_inquiry": "Quick inquiry",
      "footer.quick_links": "Quick Links",
      "footer.contact": "Contact",

      "home.badge": "Export-ready for Africa • Southeast Asia • Central Asia • South America",
      "home.h1":
        "B2B Export Supplier of Agricultural Tractor, Farm Machinery & Construction Machinery",
      "home.p":
        "We support distributors and project procurement with model matching, stable quality control, export packing, and spare parts supply — including smart drip irrigation system solutions.",
      "home.features.title": "Why B2B Buyers Work With Us",
      "home.cats.title": "4 Main Product Categories",
      "home.cats.desc":
        "Designed for overseas B2B procurement: clear specs, stable supply, and easy inquiry.",
      "home.featured.title": "Featured Products",
      "home.featured.desc":
        "Images + English technical parameters. Edit product data in /products-data.js.",
      "home.blog.title": "Latest News & Export Guides",
      "home.blog.desc":
        "High-quality English content designed for Google SEO and buyer intent searches.",

      "products.title": "All Products",
      "products.desc":
        "Export-ready equipment and parts. Fast configuration matching for overseas distributors and project procurement.",
      "product.breadcrumb.details": "Details",
      "product.inquiry.what_to_include": "What to include in your inquiry",

      "contact.title": "Send Inquiry (Fast B2B Reply)",
      "contact.desc":
        "For fastest quotation, please include destination country/port, target quantity, and working condition.",
      "contact.form.title": "Inquiry Form",
      "contact.form.sends_to": "This form sends to:",
      "contact.form.name": "Your Name *",
      "contact.form.email": "Email *",
      "contact.form.company": "Company",
      "contact.form.country": "Country / Region",
      "contact.form.phone": "Phone",
      "contact.form.whatsapp": "WhatsApp",
      "contact.form.details": "Inquiry Details *",
      "contact.form.send": "Send Inquiry",
      "contact.form.or_email": "Or Email Directly",
      "contact.privacy.title": "Privacy",
      "contact.privacy.text":
        "We use your inquiry information only to respond to your request and provide quotation or technical matching support. We do not sell your information to third parties.",

      "form.sending": "Sending...",
      "form.not_configured":
        "Email sending is not configured yet. Please set EmailJS keys in assets/js/config.js (publicKey / serviceId / templateId).",
      "form.success":
        "Thank you! Your inquiry has been sent. We will reply within 24 hours (usually faster).",
      "form.failed_prefix": "Failed to send. Please email us directly: ",
    },

    fr: {
      "nav.home": "Accueil",
      "nav.products": "Produits",
      "nav.solutions": "Solutions",
      "nav.about": "À propos",
      "nav.news": "Actualités",
      "nav.contact": "Contact",
      "cta.get_quote": "Demander un devis",
      "cta.browse_products": "Voir les produits",
      "cta.view_all": "Tout voir",
      "cta.browse_catalog": "Parcourir le catalogue",
      "cta.send_inquiry": "Envoyer une demande",
      "cta.contact_sales": "Contacter le service commercial",
      "cta.view_details": "Voir les détails",
      "cta.quick_inquiry": "Demande rapide",
      "footer.quick_links": "Liens rapides",
      "footer.contact": "Contact",

      "home.badge":
        "Prêt à l’export : Afrique • Asie du Sud-Est • Asie centrale • Amérique du Sud",
      "home.h1":
        "Fournisseur B2B à l’export : tracteurs agricoles, machines agricoles & engins de chantier",
      "home.p":
        "Nous aidons les distributeurs et les achats projets : sélection de modèles, contrôle qualité, emballage export et pièces de rechange — y compris systèmes d’irrigation goutte-à-goutte intelligents.",
      "home.cats.title": "4 grandes catégories",
      "home.cats.desc":
        "Conçu pour les achats B2B : spécifications claires, approvisionnement stable et demande simple.",
      "home.featured.title": "Produits phares",
      "home.featured.desc":
        "Images + paramètres techniques en anglais. Modifiez /products-data.js.",
      "home.blog.title": "Dernières actualités & guides export",
      "home.blog.desc":
        "Contenu en anglais optimisé pour Google SEO et l’intention d’achat.",

      "products.title": "Tous les produits",
      "products.desc":
        "Équipements et pièces prêts à l’export. Correspondance rapide des configurations pour distributeurs et projets.",
      "product.breadcrumb.details": "Détails",
      "product.inquiry.what_to_include": "À inclure dans votre demande",

      "contact.title": "Envoyer une demande (réponse B2B rapide)",
      "contact.desc":
        "Pour un devis rapide : pays/port de destination, quantité et conditions de travail.",
      "contact.form.title": "Formulaire de demande",
      "contact.form.sends_to": "Envoi vers :",
      "contact.form.name": "Nom *",
      "contact.form.email": "E-mail *",
      "contact.form.company": "Entreprise",
      "contact.form.country": "Pays / Région",
      "contact.form.phone": "Téléphone",
      "contact.form.whatsapp": "WhatsApp",
      "contact.form.details": "Détails de la demande *",
      "contact.form.send": "Envoyer",
      "contact.form.or_email": "Ou envoyer un e-mail",
      "contact.privacy.title": "Confidentialité",
      "contact.privacy.text":
        "Nous utilisons vos informations uniquement pour répondre à votre demande et fournir un devis ou un support technique. Nous ne vendons pas vos informations.",

      "form.sending": "Envoi...",
      "form.not_configured":
        "L’envoi d’e-mail n’est pas encore configuré. Renseignez les clés EmailJS dans assets/js/config.js (publicKey / serviceId / templateId).",
      "form.success":
        "Merci ! Votre demande a été envoyée. Réponse sous 24 h (souvent plus rapide).",
      "form.failed_prefix": "Échec de l’envoi. Merci de nous écrire : ",
    },

    es: {
      "nav.home": "Inicio",
      "nav.products": "Productos",
      "nav.solutions": "Soluciones",
      "nav.about": "Nosotros",
      "nav.news": "Noticias",
      "nav.contact": "Contacto",
      "cta.get_quote": "Solicitar cotización",
      "cta.browse_products": "Ver productos",
      "cta.view_all": "Ver todo",
      "cta.browse_catalog": "Ver catálogo",
      "cta.send_inquiry": "Enviar consulta",
      "cta.contact_sales": "Contactar ventas",
      "cta.view_details": "Ver detalles",
      "cta.quick_inquiry": "Consulta rápida",
      "footer.quick_links": "Enlaces rápidos",
      "footer.contact": "Contacto",

      "home.badge":
        "Listo para exportación: África • Sudeste Asiático • Asia Central • Sudamérica",
      "home.h1":
        "Proveedor B2B de exportación: tractor agrícola, maquinaria agrícola y maquinaria de construcción",
      "home.p":
        "Apoyamos a distribuidores y compras de proyectos con selección de modelos, control de calidad, embalaje de exportación y repuestos — incluyendo sistemas de riego por goteo inteligentes.",
      "home.cats.title": "4 categorías principales",
      "home.cats.desc":
        "Diseñado para compras B2B: especificaciones claras, suministro estable y consulta fácil.",
      "home.featured.title": "Productos destacados",
      "home.featured.desc":
        "Imágenes + parámetros técnicos en inglés. Edita /products-data.js.",
      "home.blog.title": "Últimas noticias y guías de exportación",
      "home.blog.desc":
        "Contenido en inglés optimizado para Google SEO y búsquedas de intención de compra.",

      "products.title": "Todos los productos",
      "products.desc":
        "Equipos y repuestos listos para exportación. Emparejamiento rápido de configuraciones para distribuidores y proyectos.",
      "product.breadcrumb.details": "Detalles",
      "product.inquiry.what_to_include": "Qué incluir en tu consulta",

      "contact.title": "Enviar consulta (respuesta B2B rápida)",
      "contact.desc":
        "Para cotizar más rápido: país/puerto de destino, cantidad y condiciones de trabajo.",
      "contact.form.title": "Formulario de consulta",
      "contact.form.sends_to": "Este formulario envía a:",
      "contact.form.name": "Nombre *",
      "contact.form.email": "Email *",
      "contact.form.company": "Empresa",
      "contact.form.country": "País / Región",
      "contact.form.phone": "Teléfono",
      "contact.form.whatsapp": "WhatsApp",
      "contact.form.details": "Detalles de la consulta *",
      "contact.form.send": "Enviar",
      "contact.form.or_email": "O enviar email",
      "contact.privacy.title": "Privacidad",
      "contact.privacy.text":
        "Usamos tu información solo para responder y ofrecer cotización o soporte técnico. No vendemos tu información.",

      "form.sending": "Enviando...",
      "form.not_configured":
        "El envío de email no está configurado. Configura EmailJS en assets/js/config.js (publicKey / serviceId / templateId).",
      "form.success":
        "¡Gracias! Tu consulta fue enviada. Responderemos en 24 horas (normalmente antes).",
      "form.failed_prefix": "No se pudo enviar. Por favor escribe a: ",
    },

    ar: {
      "nav.home": "الرئيسية",
      "nav.products": "المنتجات",
      "nav.solutions": "الحلول",
      "nav.about": "من نحن",
      "nav.news": "الأخبار",
      "nav.contact": "اتصل بنا",
      "cta.get_quote": "اطلب عرض سعر",
      "cta.browse_products": "تصفح المنتجات",
      "cta.view_all": "عرض الكل",
      "cta.browse_catalog": "تصفح الكتالوج",
      "cta.send_inquiry": "إرسال استفسار",
      "cta.contact_sales": "التواصل مع المبيعات",
      "cta.view_details": "عرض التفاصيل",
      "cta.quick_inquiry": "استفسار سريع",
      "footer.quick_links": "روابط سريعة",
      "footer.contact": "اتصل بنا",

      "home.badge":
        "جاهز للتصدير: أفريقيا • جنوب شرق آسيا • آسيا الوسطى • أمريكا الجنوبية",
      "home.h1":
        "مورد تصدير B2B: جرارات زراعية، معدات زراعية، ومعدات إنشائية",
      "home.p":
        "ندعم الموزعين ومشتريات المشاريع عبر مطابقة المواصفات، مراقبة الجودة، التغليف للتصدير وقطع الغيار — بما في ذلك أنظمة الري بالتنقيط الذكية.",
      "home.cats.title": "4 فئات رئيسية للمنتجات",
      "home.cats.desc":
        "مصمم لشراء B2B: مواصفات واضحة، توريد ثابت، واستفسار سهل.",
      "home.featured.title": "منتجات مميزة",
      "home.featured.desc":
        "صور + معلمات تقنية باللغة الإنجليزية. عدّل /products-data.js.",
      "home.blog.title": "أحدث الأخبار وأدلة التصدير",
      "home.blog.desc":
        "محتوى باللغة الإنجليزية محسّن لـ Google SEO وعمليات بحث نية الشراء.",

      "products.title": "جميع المنتجات",
      "products.desc":
        "معدات وقطع غيار جاهزة للتصدير. مطابقة سريعة للمواصفات للموزعين ومشتريات المشاريع.",
      "product.breadcrumb.details": "التفاصيل",
      "product.inquiry.what_to_include": "ماذا تكتب في الاستفسار",

      "contact.title": "إرسال استفسار (رد سريع للشركات)",
      "contact.desc":
        "لأسرع عرض سعر: بلد/ميناء الوجهة، الكمية، وظروف التشغيل.",
      "contact.form.title": "نموذج الاستفسار",
      "contact.form.sends_to": "سيتم الإرسال إلى:",
      "contact.form.name": "الاسم *",
      "contact.form.email": "البريد الإلكتروني *",
      "contact.form.company": "الشركة",
      "contact.form.country": "الدولة / المنطقة",
      "contact.form.phone": "الهاتف",
      "contact.form.whatsapp": "واتساب",
      "contact.form.details": "تفاصيل الاستفسار *",
      "contact.form.send": "إرسال",
      "contact.form.or_email": "أو أرسل بريدًا مباشرًا",
      "contact.privacy.title": "الخصوصية",
      "contact.privacy.text":
        "نستخدم بياناتك فقط للرد على الاستفسار وتقديم عرض سعر أو دعم فني. لا نبيع معلوماتك لأي طرف ثالث.",

      "form.sending": "جارٍ الإرسال...",
      "form.not_configured":
        "لم يتم إعداد إرسال البريد بعد. يرجى إضافة مفاتيح EmailJS في assets/js/config.js (publicKey / serviceId / templateId).",
      "form.success":
        "شكرًا لك! تم إرسال استفسارك. سنرد خلال 24 ساعة (عادةً أسرع).",
      "form.failed_prefix": "فشل الإرسال. يرجى مراسلتنا مباشرة: ",
    },

    ru: {
      "nav.home": "Главная",
      "nav.products": "Продукция",
      "nav.solutions": "Решения",
      "nav.about": "О компании",
      "nav.news": "Новости",
      "nav.contact": "Контакты",
      "cta.get_quote": "Запросить цену",
      "cta.browse_products": "Каталог",
      "cta.view_all": "Смотреть все",
      "cta.browse_catalog": "Открыть каталог",
      "cta.send_inquiry": "Отправить запрос",
      "cta.contact_sales": "Связаться с отделом продаж",
      "cta.view_details": "Подробнее",
      "cta.quick_inquiry": "Быстрый запрос",
      "footer.quick_links": "Быстрые ссылки",
      "footer.contact": "Контакты",

      "home.badge":
        "Экспортная комплектация: Африка • Юго-Восточная Азия • Центральная Азия • Южная Америка",
      "home.h1":
        "B2B поставщик на экспорт: сельхозтракторы, сельхозтехника и строительная техника",
      "home.p":
        "Помогаем дилерам и проектным закупкам: подбор моделей, контроль качества, экспортная упаковка и поставка запчастей — включая интеллектуальные системы капельного орошения.",
      "home.cats.title": "4 основные категории",
      "home.cats.desc":
        "Для B2B закупок: понятные спецификации, стабильные поставки и удобный запрос.",
      "home.featured.title": "Рекомендуемые товары",
      "home.featured.desc":
        "Изображения + техпараметры на английском. Редактируйте /products-data.js.",
      "home.blog.title": "Новости и экспортные гайды",
      "home.blog.desc":
        "Контент на английском для Google SEO и запросов с покупательским намерением.",

      "products.title": "Вся продукция",
      "products.desc":
        "Экспортная техника и запчасти. Быстро подбираем конфигурации для дилеров и проектов.",
      "product.breadcrumb.details": "Детали",
      "product.inquiry.what_to_include": "Что указать в запросе",

      "contact.title": "Отправить запрос (быстрый ответ B2B)",
      "contact.desc":
        "Для быстрого расчёта: страна/порт назначения, количество и условия работы.",
      "contact.form.title": "Форма запроса",
      "contact.form.sends_to": "Форма отправляет на:",
      "contact.form.name": "Имя *",
      "contact.form.email": "E-mail *",
      "contact.form.company": "Компания",
      "contact.form.country": "Страна / регион",
      "contact.form.phone": "Телефон",
      "contact.form.whatsapp": "WhatsApp",
      "contact.form.details": "Детали запроса *",
      "contact.form.send": "Отправить",
      "contact.form.or_email": "Или написать на e-mail",
      "contact.privacy.title": "Конфиденциальность",
      "contact.privacy.text":
        "Мы используем ваши данные только для ответа и подготовки предложения/технического подбора. Мы не продаём ваши данные третьим лицам.",

      "form.sending": "Отправка...",
      "form.not_configured":
        "Отправка e-mail ещё не настроена. Укажите ключи EmailJS в assets/js/config.js (publicKey / serviceId / templateId).",
      "form.success":
        "Спасибо! Ваш запрос отправлен. Ответим в течение 24 часов (обычно быстрее).",
      "form.failed_prefix": "Не удалось отправить. Напишите нам: ",
    },

    pt: {
      "nav.home": "Início",
      "nav.products": "Produtos",
      "nav.solutions": "Soluções",
      "nav.about": "Sobre",
      "nav.news": "Notícias",
      "nav.contact": "Contato",
      "cta.get_quote": "Solicitar cotação",
      "cta.browse_products": "Ver produtos",
      "cta.view_all": "Ver tudo",
      "cta.browse_catalog": "Ver catálogo",
      "cta.send_inquiry": "Enviar consulta",
      "cta.contact_sales": "Falar com vendas",
      "cta.view_details": "Ver detalhes",
      "cta.quick_inquiry": "Consulta rápida",
      "footer.quick_links": "Links rápidos",
      "footer.contact": "Contato",

      "home.badge":
        "Pronto para exportação: África • Sudeste Asiático • Ásia Central • América do Sul",
      "home.h1":
        "Fornecedor B2B para exportação: tratores agrícolas, máquinas agrícolas e máquinas de construção",
      "home.p":
        "Apoiamos distribuidores e compras de projetos com seleção de modelos, controle de qualidade, embalagem para exportação e peças de reposição — incluindo sistemas inteligentes de irrigação por gotejamento.",
      "home.cats.title": "4 categorias principais",
      "home.cats.desc":
        "Feito para compras B2B: especificações claras, fornecimento estável e consulta fácil.",
      "home.featured.title": "Produtos em destaque",
      "home.featured.desc":
        "Imagens + parâmetros técnicos em inglês. Edite /products-data.js.",
      "home.blog.title": "Últimas notícias e guias de exportação",
      "home.blog.desc":
        "Conteúdo em inglês pensado para Google SEO e intenção de compra.",

      "products.title": "Todos os produtos",
      "products.desc":
        "Equipamentos e peças prontos para exportação. Correspondência rápida de configurações para distribuidores e projetos.",
      "product.breadcrumb.details": "Detalhes",
      "product.inquiry.what_to_include": "O que incluir na sua consulta",

      "contact.title": "Enviar consulta (resposta B2B rápida)",
      "contact.desc":
        "Para cotação rápida: país/porto de destino, quantidade e condições de trabalho.",
      "contact.form.title": "Formulário de consulta",
      "contact.form.sends_to": "Este formulário envia para:",
      "contact.form.name": "Nome *",
      "contact.form.email": "E-mail *",
      "contact.form.company": "Empresa",
      "contact.form.country": "País / Região",
      "contact.form.phone": "Telefone",
      "contact.form.whatsapp": "WhatsApp",
      "contact.form.details": "Detalhes da consulta *",
      "contact.form.send": "Enviar",
      "contact.form.or_email": "Ou enviar e-mail",
      "contact.privacy.title": "Privacidade",
      "contact.privacy.text":
        "Usamos suas informações apenas para responder e fornecer cotação ou suporte técnico. Não vendemos seus dados a terceiros.",

      "form.sending": "Enviando...",
      "form.not_configured":
        "O envio de e-mail ainda não está configurado. Defina as chaves EmailJS em assets/js/config.js (publicKey / serviceId / templateId).",
      "form.success":
        "Obrigado! Sua consulta foi enviada. Responderemos em até 24 horas (normalmente antes).",
      "form.failed_prefix": "Falha ao enviar. Por favor envie e-mail para: ",
    },
  };

  const rtlLangs = new Set(["ar"]);

  function getLangFromUrl() {
    const p = new URLSearchParams(location.search).get("lang");
    if (!p) return null;
    return p.toLowerCase();
  }

  function getLang() {
    const fromUrl = getLangFromUrl();
    if (fromUrl && dict[fromUrl]) return fromUrl;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && dict[stored]) return stored;
    return "en";
  }

  function setLang(lang) {
    if (!dict[lang]) lang = "en";
    localStorage.setItem(STORAGE_KEY, lang);
    applyLangToDom(lang);
  }

  function applyLangToDom(lang) {
    const html = document.documentElement;
    html.setAttribute("lang", lang);
    html.setAttribute("dir", rtlLangs.has(lang) ? "rtl" : "ltr");
    document.body?.setAttribute("data-lang", lang);
  }

  function t(key) {
    const lang = getLang();
    return (
      dict?.[lang]?.[key] ??
      dict?.en?.[key] ??
      key
    );
  }

  function applyToStaticDom() {
    // Translate elements with [data-i18n="key"] (innerText)
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      el.textContent = t(key);
    });

    // Translate placeholders with [data-i18n-placeholder="key"]
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (!key) return;
      el.setAttribute("placeholder", t(key));
    });
  }

  function renderLangOptions(current) {
    const options = [
      ["en", "English"],
      ["fr", "Français"],
      ["es", "Español"],
      ["ar", "العربية"],
      ["ru", "Русский"],
      ["pt", "Português"],
    ];
    return options
      .map(
        ([code, label]) =>
          `<option value="${code}" ${code === current ? "selected" : ""}>${label}</option>`
      )
      .join("");
  }

  function mountLanguageSwitcher(containerSelector = "#lang-switcher") {
    const el = document.querySelector(containerSelector);
    if (!el) return;
    const current = getLang();
    el.innerHTML = `
      <label class="sr-only" for="lang-select">Language</label>
      <select id="lang-select" class="rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-xs text-slate-200 hover:border-white/25">
        ${renderLangOptions(current)}
      </select>
    `;
    const select = el.querySelector("#lang-select");
    if (select) {
      select.addEventListener("change", () => {
        setLang(select.value);
        // re-apply translations for static DOM; header/footer are re-rendered by SiteUI
        applyToStaticDom();
        if (window.SiteUI?.renderHeader) window.SiteUI.renderHeader();
        if (window.SiteUI?.renderFooter) window.SiteUI.renderFooter();
        if (window.SiteUI?.setActiveNav) window.SiteUI.setActiveNav();
      });
    }
  }

  function init() {
    const lang = getLang();
    applyLangToDom(lang);
    applyToStaticDom();
  }

  window.I18n = {
    dict,
    getLang,
    setLang,
    t,
    init,
    applyToStaticDom,
    mountLanguageSwitcher,
  };
})();
