/* Global UI + rendering (no build tools required). */

(function () {
  const cfg = window.SiteConfig;
  const t = (key) => (window.I18n ? window.I18n.t(key) : key);

  function q(sel, root = document) {
    return root.querySelector(sel);
  }
  function qa(sel, root = document) {
    return Array.from(root.querySelectorAll(sel));
  }
  function getParam(name) {
    return new URLSearchParams(location.search).get(name);
  }
  function escapeHtml(str = "") {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function setMetaByName(name, content) {
    const el = document.querySelector(`meta[name="${name}"]`);
    if (el && content) el.setAttribute("content", content);
  }
  function setMetaByProp(prop, content) {
    const el = document.querySelector(`meta[property="${prop}"]`);
    if (el && content) el.setAttribute("content", content);
  }
  function setCanonicalToCurrent() {
    const el = document.querySelector('link[rel="canonical"]');
    if (!el) return;
    // keep hash out of canonical
    el.setAttribute("href", location.href.split("#")[0]);
  }

  function renderHeader() {
    const header = q("#site-header");
    if (!header) return;

    header.innerHTML = `
      <div class="border-b border-white/10 bg-black/20 backdrop-blur">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center justify-between gap-4">
            <a href="index.html" class="flex items-center gap-3">
              <img src="assets/img/logo.svg" alt="${escapeHtml(cfg.companyName)} logo" class="h-9 w-9">
              <div class="leading-tight">
                <div class="text-sm font-semibold tracking-wide text-white">${escapeHtml(
                  cfg.companyName
                )}</div>
                <div class="text-xs text-slate-300 hidden sm:block">${escapeHtml(
                  cfg.brandTagline
                )}</div>
              </div>
            </a>

            <nav class="hidden lg:flex items-center gap-6 text-sm text-slate-200">
              <a data-nav="home" href="index.html" class="hover:text-white">${escapeHtml(
                t("nav.home")
              )}</a>
              <a data-nav="products" href="products.html" class="hover:text-white">${escapeHtml(
                t("nav.products")
              )}</a>
              <a data-nav="solutions" href="solutions.html" class="hover:text-white">${escapeHtml(
                t("nav.solutions")
              )}</a>
              <a data-nav="about" href="about.html" class="hover:text-white">${escapeHtml(
                t("nav.about")
              )}</a>
              <a data-nav="news" href="news.html" class="hover:text-white">${escapeHtml(
                t("nav.news")
              )}</a>
              <a data-nav="contact" href="contact.html" class="hover:text-white">${escapeHtml(
                t("nav.contact")
              )}</a>
            </nav>

            <div class="flex items-center gap-2">
              <div id="lang-switcher" class="hidden sm:block"></div>
              <a href="contact.html#inquiry" class="hidden sm:inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400">
                ${escapeHtml(t("cta.get_quote"))}
                <span aria-hidden="true">→</span>
              </a>
              <button id="mobile-menu-btn" class="lg:hidden inline-flex items-center justify-center rounded-lg border border-white/15 px-3 py-2 text-slate-200 hover:text-white hover:border-white/25" aria-label="Open menu">
                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="mobile-menu" class="lg:hidden hidden border-b border-white/10 bg-black/40 backdrop-blur">
        <div class="mx-auto max-w-7xl px-4 py-3 text-sm text-slate-200 space-y-2">
          <div class="pb-2" id="lang-switcher-mobile"></div>
          <a class="block py-1 hover:text-white" href="index.html">${escapeHtml(t("nav.home"))}</a>
          <a class="block py-1 hover:text-white" href="products.html">${escapeHtml(t("nav.products"))}</a>
          <a class="block py-1 hover:text-white" href="solutions.html">${escapeHtml(t("nav.solutions"))}</a>
          <a class="block py-1 hover:text-white" href="about.html">${escapeHtml(t("nav.about"))}</a>
          <a class="block py-1 hover:text-white" href="news.html">${escapeHtml(t("nav.news"))}</a>
          <a class="block py-1 hover:text-white" href="contact.html">${escapeHtml(t("nav.contact"))}</a>
          <a class="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-brand-500 px-4 py-2 font-semibold text-white hover:bg-brand-400" href="contact.html#inquiry">${escapeHtml(
            t("cta.get_quote")
          )}</a>
        </div>
      </div>
    `;

    const btn = q("#mobile-menu-btn", header);
    const menu = q("#mobile-menu", header);
    if (btn && menu) {
      btn.addEventListener("click", () => menu.classList.toggle("hidden"));
    }

    // mount language switcher (manual switch; default English)
    if (window.I18n?.mountLanguageSwitcher) {
      window.I18n.mountLanguageSwitcher("#lang-switcher");
      window.I18n.mountLanguageSwitcher("#lang-switcher-mobile");
    }
  }

  function renderFooter() {
    const footer = q("#site-footer");
    if (!footer) return;

    footer.innerHTML = `
      <div class="border-t border-white/10 bg-black/30">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div class="grid gap-8 lg:grid-cols-4">
            <div class="lg:col-span-2">
              <div class="flex items-center gap-3">
                <img src="assets/img/logo.svg" alt="${escapeHtml(cfg.companyName)} logo" class="h-10 w-10">
                <div>
                  <div class="font-semibold text-white">${escapeHtml(cfg.companyName)}</div>
                  <div class="text-sm text-slate-300">${escapeHtml(cfg.brandTagline)}</div>
                </div>
              </div>
              <p class="mt-4 text-sm text-slate-300 max-w-xl">
                We serve overseas B2B buyers with export-ready equipment, technical matching, QC photos, and spare parts support.
              </p>
              <div class="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
                <span class="rounded-full border border-white/10 bg-white/5 px-3 py-1">Africa</span>
                <span class="rounded-full border border-white/10 bg-white/5 px-3 py-1">Southeast Asia</span>
                <span class="rounded-full border border-white/10 bg-white/5 px-3 py-1">Central Asia</span>
                <span class="rounded-full border border-white/10 bg-white/5 px-3 py-1">South America</span>
              </div>
            </div>

            <div class="text-sm">
              <div class="font-semibold text-white">${escapeHtml(t("footer.quick_links") || "Quick Links")}</div>
              <ul class="mt-3 space-y-2 text-slate-300">
                <li><a class="hover:text-white" href="products.html">${escapeHtml(t("nav.products"))}</a></li>
                <li><a class="hover:text-white" href="solutions.html">${escapeHtml(t("nav.solutions"))}</a></li>
                <li><a class="hover:text-white" href="news.html">${escapeHtml(t("nav.news"))}</a></li>
                <li><a class="hover:text-white" href="contact.html">${escapeHtml(t("nav.contact"))}</a></li>
              </ul>
            </div>

            <div class="text-sm">
              <div class="font-semibold text-white">${escapeHtml(t("footer.contact") || "Contact")}</div>
              <ul class="mt-3 space-y-2 text-slate-300">
                <li><span class="text-slate-400">Email:</span> <a class="hover:text-white" href="mailto:${escapeHtml(
                  cfg.primaryEmail
                )}">${escapeHtml(cfg.primaryEmail)}</a></li>
                <li><span class="text-slate-400">Email:</span> <a class="hover:text-white" href="mailto:${escapeHtml(
                  cfg.secondaryEmail
                )}">${escapeHtml(cfg.secondaryEmail)}</a></li>
                <li><span class="text-slate-400">WhatsApp:</span> <a class="hover:text-white" href="https://wa.me/${escapeHtml(
                  (cfg.whatsapp || "").replace(/[^\d]/g, "")
                )}" target="_blank" rel="noopener">${escapeHtml(cfg.whatsapp)}</a></li>
                <li><span class="text-slate-400">Address:</span> ${escapeHtml(cfg.addressLine)}</li>
                <li><span class="text-slate-400">Hours:</span> ${escapeHtml(cfg.workingHours)}</li>
              </ul>
            </div>
          </div>

          <div class="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-400">
            <div>© <span id="year"></span> ${escapeHtml(cfg.companyName)}. All rights reserved.</div>
            <div class="flex gap-4">
              <a class="hover:text-white" href="sitemap.xml">Sitemap</a>
              <a class="hover:text-white" href="contact.html#privacy">Privacy</a>
            </div>
          </div>
        </div>
      </div>
    `;

    const y = q("#year", footer);
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function setActiveNav() {
    const page = document.body?.dataset?.page;
    if (!page) return;
    qa("[data-nav]").forEach((a) => {
      if (a.getAttribute("data-nav") === page) {
        a.classList.add("text-white", "font-semibold");
      } else {
        a.classList.remove("text-white", "font-semibold");
      }
    });
  }

  function renderCategoryChips(container, activeId) {
    const cats = window.ProductsData?.categories || [];
    container.innerHTML = `
      <a href="products.html" class="rounded-full border px-4 py-2 text-sm ${
        !activeId
          ? "border-brand-400 bg-brand-500/20 text-white"
          : "border-white/15 bg-white/5 text-slate-200 hover:text-white"
      }">All</a>
      ${cats
        .map((c) => {
          const active = c.id === activeId;
          return `<a href="products.html?cat=${encodeURIComponent(
            c.id
          )}" class="rounded-full border px-4 py-2 text-sm ${
            active
              ? "border-brand-400 bg-brand-500/20 text-white"
              : "border-white/15 bg-white/5 text-slate-200 hover:text-white"
          }">${escapeHtml(c.name)}</a>`;
        })
        .join("")}
    `;
  }

  function renderProductGrid(container, products) {
    container.innerHTML = products
      .map((p) => {
        const specs = Object.entries(p.specs || {})
          .slice(0, 4)
          .map(
            ([k, v]) =>
              `<div class="flex items-center justify-between gap-3 border-b border-white/10 py-2 text-xs">
                <span class="text-slate-400">${escapeHtml(k)}</span>
                <span class="text-slate-200 font-medium">${escapeHtml(v)}</span>
              </div>`
          )
          .join("");

        return `
          <article class="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-white/20 transition">
            <div class="relative">
              <img src="${escapeHtml(p.image)}" alt="${escapeHtml(
          p.name
        )}" class="h-44 w-full object-cover bg-black/30">
              <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div class="text-sm font-semibold text-white">${escapeHtml(p.name)}</div>
                <div class="text-xs text-slate-300 line-clamp-3">${escapeHtml(
                  p.desc
                )}</div>
              </div>
            </div>
            <div class="p-4">
              ${specs}
              <div class="mt-4 flex items-center justify-between gap-2">
                <a href="product.html?sku=${encodeURIComponent(
                  p.id
                )}" class="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-black/20 px-3 py-2 text-sm text-slate-200 hover:text-white hover:border-white/25">
                  ${escapeHtml(t("cta.view_details"))}
                  <span aria-hidden="true">→</span>
                </a>
                <a href="contact.html?sku=${encodeURIComponent(
                  p.id
                )}#inquiry" class="text-sm font-semibold text-brand-200 hover:text-white">${escapeHtml(
          t("cta.quick_inquiry")
        )}</a>
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderProductsPage() {
    const chips = q("#category-chips");
    const grid = q("#product-grid");
    if (!chips || !grid) return;

    const cat = getParam("cat");
    const cats = window.ProductsData?.categories || [];
    const products = window.ProductsData?.products || [];

    renderCategoryChips(chips, cat);

    const filtered = cat ? products.filter((p) => p.category === cat) : products;
    const hero = q("#products-hero");
    const title = q("#products-title");
    const desc = q("#products-desc");

    const c = cat ? cats.find((x) => x.id === cat) : null;
    if (hero && c?.hero) hero.src = c.hero;
    if (title) title.textContent = c ? c.name : t("products.title");
    if (desc) desc.textContent = c ? c.description : t("products.desc");

    renderProductGrid(grid, filtered);
  }

  function renderHomePage() {
    const catWrap = q("#home-categories");
    const prodWrap = q("#home-featured-products");
    const postWrap = q("#home-latest-posts");

    const cats = window.ProductsData?.categories || [];
    const products = window.ProductsData?.products || [];
    const posts = window.SiteData?.posts || [];

    if (catWrap) {
      catWrap.innerHTML = cats
        .map(
          (c) => `
          <a href="products.html?cat=${encodeURIComponent(
            c.id
          )}" class="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-white/20 transition">
            <img src="${escapeHtml(c.hero)}" alt="${escapeHtml(
            c.name
          )}" class="h-36 w-full object-cover bg-black/30">
            <div class="p-5">
              <div class="text-lg font-semibold text-white group-hover:text-brand-200">${escapeHtml(
                c.name
              )}</div>
              <div class="mt-2 text-sm text-slate-300">${escapeHtml(
                c.description
              )}</div>
              <div class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-200 group-hover:text-white">
                Explore <span aria-hidden="true">→</span>
              </div>
            </div>
          </a>
        `
        )
        .join("");
    }

    if (prodWrap) {
      renderProductGrid(prodWrap, products.slice(0, 6));
    }

    if (postWrap) {
      postWrap.innerHTML = posts
        .slice(0, 3)
        .map(
          (p) => `
          <article class="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/20 transition">
            <div class="text-xs text-slate-400">${escapeHtml(p.date)}</div>
            <h3 class="mt-2 text-lg font-semibold text-white">
              <a class="hover:text-brand-200" href="news.html?id=${encodeURIComponent(
                p.id
              )}">${escapeHtml(p.title)}</a>
            </h3>
            <p class="mt-3 text-sm text-slate-300">${escapeHtml(p.excerpt)}</p>
            <a class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-200 hover:text-white" href="news.html?id=${encodeURIComponent(
              p.id
            )}">Read more <span aria-hidden="true">→</span></a>
          </article>
        `
        )
        .join("");
    }
  }

  function productJsonLd(p) {
    const offers = {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "0",
      availability: "https://schema.org/InStock",
      url: `${cfg.website.replace(/\/$/, "")}/product.html?sku=${encodeURIComponent(p.id)}`,
    };
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.name,
      image: [`${cfg.website.replace(/\/$/, "")}/${p.image}`],
      description: p.desc,
      sku: p.id,
      brand: { "@type": "Brand", name: cfg.companyName },
      offers,
    };
  }

  function renderProductPage() {
    const sku = getParam("sku");
    const wrap = q("#product-detail");
    if (!wrap) return;

    const products = window.ProductsData?.products || [];
    const p = products.find((x) => x.id === sku) || products[0];
    if (!p) return;

    // SEO title (basic, client-side)
    document.title = `${p.name} | ${cfg.companyName}`;
    setMetaByName("description", p.desc);
    setMetaByName(
      "keywords",
      [...(cfg.seoKeywords || []), p.name].join(", ")
    );
    setMetaByProp("og:title", `${p.name} | ${cfg.companyName}`);
    setMetaByProp("og:description", p.desc);
    setMetaByProp("og:image", p.image);
    setCanonicalToCurrent();

    const specRows = Object.entries(p.specs || {})
      .map(
        ([k, v]) => `
          <tr class="border-b border-white/10">
            <th class="w-1/3 py-3 pr-4 text-left text-sm font-medium text-slate-200 align-top">${escapeHtml(
              k
            )}</th>
            <td class="py-3 text-sm text-slate-300">${escapeHtml(v)}</td>
          </tr>`
      )
      .join("");

    const highlights = (p.features || [])
      .map(
        (t) => `
        <li class="flex gap-3">
          <span class="mt-1 h-2 w-2 rounded-full bg-accent-500"></span>
          <span class="text-slate-200">${escapeHtml(t)}</span>
        </li>`
      )
      .join("");

    const keySpecs = Object.entries(p.specs || {})
      .slice(0, 4)
      .map(
        ([k, v]) =>
          `<div class="rounded-xl border border-white/10 bg-white/5 p-4">
            <div class="text-xs text-slate-400">${escapeHtml(k)}</div>
            <div class="mt-1 text-sm font-semibold text-white">${escapeHtml(v)}</div>
          </div>`
      )
      .join("");

    wrap.innerHTML = `
      <div class="grid gap-8 lg:grid-cols-2">
        <div>
          <img src="${escapeHtml(p.image)}" alt="${escapeHtml(
      p.name
    )}" class="w-full rounded-2xl border border-white/10 bg-black/30">
          <div class="mt-4 grid grid-cols-2 gap-3">${keySpecs}</div>
        </div>
        <div>
          <div class="text-sm text-brand-200 font-semibold">SKU: ${escapeHtml(p.id)}</div>
          <h1 class="mt-2 text-3xl font-bold tracking-tight text-white">${escapeHtml(
            p.name
          )}</h1>
          <p class="mt-4 text-slate-300">${escapeHtml(p.desc)}</p>

          <div class="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div class="text-sm font-semibold text-white">Why buyers choose this model</div>
            <ul class="mt-4 space-y-3">${highlights}</ul>
          </div>

          <div class="mt-6 flex flex-wrap gap-3">
            <a href="contact.html?sku=${encodeURIComponent(
              p.id
            )}#inquiry" class="inline-flex items-center justify-center rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-400">
              Request Quote / Inquiry
            </a>
            <a href="products.html?cat=${encodeURIComponent(p.category)}" class="inline-flex items-center justify-center rounded-xl border border-white/15 bg-black/20 px-5 py-3 text-sm font-semibold text-slate-200 hover:text-white hover:border-white/25">Back to Category</a>
          </div>
        </div>
      </div>

      <div class="mt-12 grid gap-8 lg:grid-cols-3">
        <div class="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div class="text-lg font-semibold text-white">Technical Specifications</div>
          <div class="mt-4 overflow-x-auto">
            <table class="w-full border-collapse">${specRows}</table>
          </div>
        </div>

        <aside class="rounded-2xl border border-white/10 bg-black/20 p-6">
          <div class="text-lg font-semibold text-white">Fast B2B Response</div>
          <p class="mt-3 text-sm text-slate-300">
            Send your destination port, target quantity, and application. We will respond with configuration suggestions and export packing plan.
          </p>
          <div class="mt-4 space-y-2 text-sm text-slate-300">
            <div><span class="text-slate-400">Email:</span> ${escapeHtml(cfg.primaryEmail)}</div>
            <div><span class="text-slate-400">Email:</span> ${escapeHtml(cfg.secondaryEmail)}</div>
          </div>
          <a class="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 hover:text-white hover:border-white/25" href="contact.html?sku=${encodeURIComponent(
            p.id
          )}#inquiry">Inquire Now</a>
        </aside>
      </div>
    `;

    // Inject product JSON-LD
    const ld = q("#jsonld-product");
    if (ld) ld.textContent = JSON.stringify(productJsonLd(p), null, 2);

    // Pre-fill inquiry subject if contact page anchors are used externally
  }

  function renderNewsPage() {
    const list = q("#news-list");
    const detail = q("#news-detail");
    if (!list || !detail) return;

    const id = getParam("id");
    const posts = window.SiteData?.posts || [];

    if (id) {
      const p = posts.find((x) => x.id === id) || posts[0];
      if (!p) return;

      document.title = `${p.title} | ${cfg.companyName}`;
      setMetaByName("description", p.seo?.description || p.excerpt);
      setMetaByName(
        "keywords",
        [...(cfg.seoKeywords || []), ...(p.seo?.keywords || [])].join(", ")
      );
      setMetaByProp("og:title", `${p.title} | ${cfg.companyName}`);
      setMetaByProp("og:description", p.seo?.description || p.excerpt);
      setCanonicalToCurrent();

      list.classList.add("hidden");
      detail.classList.remove("hidden");

      detail.innerHTML = `
        <a href="news.html" class="inline-flex items-center gap-2 text-sm text-brand-200 hover:text-white">
          <span aria-hidden="true">←</span> Back to News
        </a>
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-white">${escapeHtml(
          p.title
        )}</h1>
        <div class="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span>${escapeHtml(p.date)}</span>
          <span class="text-slate-600">•</span>
          ${(p.tags || [])
            .map(
              (t) =>
                `<span class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">${escapeHtml(
                  t
                )}</span>`
            )
            .join("")}
        </div>
        <article class="prose prose-invert prose-slate mt-8 max-w-none">
          ${p.contentHtml}
        </article>
        <div class="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div class="text-lg font-semibold text-white">Need sourcing support?</div>
          <p class="mt-2 text-sm text-slate-300">
            Tell us your target market, quantity, and technical requirements. We respond with recommended models and an export plan.
          </p>
          <a href="contact.html#inquiry" class="mt-4 inline-flex items-center justify-center rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-400">Contact Sales</a>
        </div>
      `;
      return;
    }

    // List view
    list.classList.remove("hidden");
    detail.classList.add("hidden");

    list.innerHTML = posts
      .map((p) => {
        return `
          <article class="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/20 transition">
            <div class="text-xs text-slate-400">${escapeHtml(p.date)}</div>
            <h2 class="mt-2 text-xl font-semibold text-white">
              <a class="hover:text-brand-200" href="news.html?id=${encodeURIComponent(
                p.id
              )}">${escapeHtml(p.title)}</a>
            </h2>
            <p class="mt-3 text-sm text-slate-300">${escapeHtml(p.excerpt)}</p>
            <div class="mt-4 flex flex-wrap gap-2">
              ${(p.tags || [])
                .slice(0, 4)
                .map(
                  (t) =>
                    `<span class="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-300">${escapeHtml(
                      t
                    )}</span>`
                )
                .join("")}
            </div>
            <div class="mt-4">
              <a class="inline-flex items-center gap-2 text-sm font-semibold text-brand-200 hover:text-white" href="news.html?id=${encodeURIComponent(
                p.id
              )}">
                Read more
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function prefillInquiryFromUrl() {
    const sku = getParam("sku");
    const form = q("#inquiry-form");
    if (!form) return;

    const productField = q('input[name="product"]', form);
    if (productField && sku) productField.value = sku;

    const message = q('textarea[name="message"]', form);
    if (message && sku) {
      const products = window.ProductsData?.products || [];
      const p = products.find((x) => x.id === sku);
      const hint = p
        ? `I'm interested in: ${p.name} (SKU: ${p.id}).\n\nDestination country/port:\nTarget quantity:\nApplication:\n`
        : `I'm interested in SKU: ${sku}.\n\nDestination country/port:\nTarget quantity:\nApplication:\n`;
      message.value = hint;
    }
  }

  // Public API
  window.SiteUI = {
    q,
    qa,
    getParam,
    escapeHtml,
    setMetaByName,
    renderHeader,
    renderFooter,
    setActiveNav,
    renderProductsPage,
    renderHomePage,
    renderProductPage,
    renderNewsPage,
    prefillInquiryFromUrl,
  };
})();
