/* Contact / inquiry form - EmailJS integration (front-end only). */

(function () {
  const cfg = window.SiteConfig;
  const t = (key) => (window.I18n ? window.I18n.t(key) : key);

  function showMsg(type, text) {
    const el = document.getElementById("form-status");
    if (!el) return;
    el.className =
      "mt-4 rounded-xl border px-4 py-3 text-sm " +
      (type === "ok"
        ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-100"
        : type === "warn"
        ? "border-amber-400/40 bg-amber-500/10 text-amber-100"
        : "border-rose-400/40 bg-rose-500/10 text-rose-100");
    el.textContent = text;
    el.classList.remove("hidden");
  }

  function isPlaceholderEmailJS() {
    const e = cfg?.emailjs || {};
    return (
      !e.publicKey ||
      !e.serviceId ||
      !e.templateId ||
      e.publicKey.includes("YOUR_") ||
      e.serviceId.includes("YOUR_") ||
      e.templateId.includes("YOUR_")
    );
  }

  function initEmailJS() {
    if (!window.emailjs) return;
    try {
      if (!isPlaceholderEmailJS()) {
        window.emailjs.init({ publicKey: cfg.emailjs.publicKey });
      }
    } catch (err) {
      // silent
    }
  }

  function bindForm() {
    const form = document.getElementById("inquiry-form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const btn = document.getElementById("submit-btn");
      if (btn) {
        btn.disabled = true;
        btn.textContent = t("form.sending");
      }

      try {
        if (isPlaceholderEmailJS()) {
          showMsg(
            "warn",
            t("form.not_configured")
          );
          return;
        }

        const fd = new FormData(form);
        const params = {
          to_email: cfg.emailjs.toEmails,
          company_name: cfg.companyName,
          from_name: fd.get("name") || "",
          from_email: fd.get("email") || "",
          buyer_company: fd.get("company") || "",
          country: fd.get("country") || "",
          phone: fd.get("phone") || "",
          whatsapp: fd.get("whatsapp") || "",
          product: fd.get("product") || "",
          message: fd.get("message") || "",
          page_url: location.href,
        };

        await window.emailjs.send(cfg.emailjs.serviceId, cfg.emailjs.templateId, params);

        form.reset();
        showMsg(
          "ok",
          t("form.success")
        );
      } catch (err) {
        showMsg(
          "err",
          t("form.failed_prefix") +
            cfg.primaryEmail +
            " / " +
            cfg.secondaryEmail
        );
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.textContent = t("contact.form.send");
        }
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initEmailJS();
    bindForm();
  });
})();
