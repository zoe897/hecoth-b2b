# Static B2B Machinery Website (HTML + Tailwind + JS)

Industry focus: **engineering machinery + tractors + agricultural machinery + smart drip irrigation + spare parts export** (English-only, industrial blue style).

This is a **pure front-end static website** (no backend / no database). Product & blog data are edited directly in the source files.

## 1) Project Structure

```
hecoth-b2b-site/
  index.html
  products.html
  product.html
  solutions.html
  about.html
  news.html
  contact.html
  robots.txt
  sitemap.xml
  assets/
    css/custom.css
    img/*.svg
    js/config.js
    js/site.js
    js/contact.js
  data/
    products.js
    news.js
```

## 2) Edit Company Info (Important)

Open:

- `assets/js/config.js`

Update:

- `companyName`
- `website` (your real domain, e.g. `https://www.yourdomain.com`)
- `whatsapp`

Also update domain inside:

- `robots.txt`
- `sitemap.xml`

## 3) Edit Products (No Database)

Open:

- `products-data.js`

You can:

- Modify categories in `window.ProductsData.categories`
- Modify products in `window.ProductsData.products`

Each product supports:

- image (SVG or JPG/PNG)
- summary and highlights
- **English technical parameters** (`keySpecs` and `specs`)
- SEO fields (`seo.title / description / keywords / alt`)

URLs:

- Product list: `products.html?cat=tractors`
- Product detail: `product.html?sku=TR-120`

## 4) Edit News / Blog (SEO Content)

Open:

- `data/news.js`

Each post supports:

- title, date, tags, excerpt
- `contentHtml` (write rich content with `<h2>`, `<ul>`, `<p>` etc.)
- SEO fields

URLs:

- List: `news.html`
- Detail: `news.html?id=tractor-selection-hot-climate`

## 5) Configure Email Sending (Form → Your Email)

This template uses **EmailJS** (front-end only) to send inquiry data to:

- `zoe@annetop.com`
- `anna@annetop.com`

### Steps

1. Create an account on EmailJS: https://www.emailjs.com/
2. Add an Email Service (Gmail / Outlook / SMTP etc.)
3. Create an Email Template
4. Copy your:
   - `Public Key`
   - `Service ID`
   - `Template ID`
5. Paste them into:
   - `assets/js/config.js` → `emailjs.publicKey / serviceId / templateId`

### Recommended EmailJS Template Variables

In your EmailJS template, you can use these variables:

- `{{from_name}}`
- `{{from_email}}`
- `{{buyer_company}}`
- `{{country}}`
- `{{phone}}`
- `{{whatsapp}}`
- `{{product}}`
- `{{message}}`
- `{{page_url}}`
- `{{to_email}}` *(if your EmailJS provider/template supports it; otherwise set “To email” in EmailJS UI)*

## 6) Run Locally (Preview)

Because this site loads data with JS, please preview via a local server (not `file://`).

### Option A (Python)

```bash
cd hecoth-b2b-site
python3 -m http.server 8080
```

Open:

- http://localhost:8080/

### Option B (Node)

```bash
npx serve .
```

## 7) Deploy (Static Hosting)

You can deploy to:

- **cPanel**: upload all files to `public_html/`
- **Nginx/Apache**: copy the folder to your web root
- **Cloudflare Pages / Netlify / Vercel**: deploy as a static site (no build needed)

## 8) Google SEO Checklist (Important)

1. Replace the domain in:
   - `assets/js/config.js` → `website`
   - `robots.txt`, `sitemap.xml`
2. Submit `sitemap.xml` in **Google Search Console**
3. Ensure every product image has meaningful `alt` text (already included in `products.js`)
4. Keep adding high-quality blog posts in `data/news.js` for buyer intent keywords:
   - agricultural tractor
   - farm machinery
   - construction machinery
   - smart drip irrigation system
   - machinery spare parts

## 9) Notes / Extensions (Optional)

- For best SEO at scale, you can generate **one static HTML page per product** (instead of `product.html?sku=...`). If you want, tell me your product list and I can generate dedicated product pages + a product sitemap.

---

## 10) Multi-language (EN / FR / ES / AR / RU / PT)

This project supports **multi-language UI** via a lightweight front-end i18n dictionary:

- File: `assets/js/i18n.js`
- Default language: **English**
- Switch language manually from the header dropdown
- The selected language is saved in `localStorage` (`site_lang`)
- Optional: `?lang=fr` to force language by URL

### Arabic RTL

When language is `ar`, the site automatically sets:

- `<html lang="ar" dir="rtl">`

So Arabic pages display in **RTL**. You can add extra RTL CSS in:

- `assets/css/custom.css`

### Add / Edit Translations

Open:

- `assets/js/i18n.js`

Find `dict = { en: {...}, fr: {...}, ... }` and edit text for keys such as:

- `nav.home`, `nav.products`, ...
- `cta.get_quote`, `cta.send_inquiry`, ...
- `contact.form.*`

### Important Note (SEO)

Current implementation (dictionary i18n) is the fastest way for multi-language display while keeping the site purely static.

If you want **maximum multi-language Google SEO**, the best practice is:

- generate separate static folders per language (e.g. `/en/ /fr/ /es/ /ar/ /ru/ /pt/`)
- add `hreflang` links and language-specific sitemaps

If you want, tell me your preferred URL structure and I can upgrade to the SEO-strong version.
