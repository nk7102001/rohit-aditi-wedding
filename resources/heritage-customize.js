(() => {
  "use strict";

  const originalFetch = window.fetch.bind(window);
  window.fetch = (resource, options = {}) => {
    const url = typeof resource === "string" ? resource : resource?.url || "";
    if (/(^|\/)wedding\.json(?:[?#]|$)/i.test(url)) {
      return originalFetch(resource, {
        ...options,
        credentials: options.credentials || "same-origin",
        cache: "no-store",
      });
    }
    return originalFetch(resource, options);
  };

  const firstName = (person, fallback) => {
    const stored = String(person?.firstName || "").trim();
    if (stored) return stored;
    return String(person?.name || fallback || "").trim().split(/\s+/)[0] || fallback;
  };

  const applyFirstNamePresentation = (data, inviteSide) => {
    const primary = data?.couple?.[inviteSide] || {};
    const partnerSide = inviteSide === "groom" ? "bride" : "groom";
    const partner = data?.couple?.[partnerSide] || {};
    const names = [
      firstName(primary, inviteSide === "groom" ? "Groom" : "Bride"),
      firstName(partner, partnerSide === "groom" ? "Groom" : "Bride"),
    ];
    const hashtag = `#${names[0]}And${names[1]}`.replace(/[^a-z0-9#]/gi, "");
    const update = () => {
      const localized = window.inviteLanguage?.translate(data) || data;
      const shownNames = [localized.couple[inviteSide].firstName, localized.couple[partnerSide].firstName];
      const shownHashtag = localized.social.hashtag || hashtag;
      const heroNames = document.querySelectorAll(".hero-copy h1");
      heroNames.forEach((node, index) => {
        if (shownNames[index] && node.textContent !== shownNames[index]) node.textContent = shownNames[index];
      });
      document.querySelectorAll(".social-hashtag").forEach((node) => {
        if (node.textContent !== shownHashtag) node.textContent = shownHashtag;
      });
    };

    update();
    const root = document.getElementById("root");
    if (!root) return;
    const observer = new MutationObserver(update);
    observer.observe(root, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 12000);
  };

  const escapeHtml = (value) =>
    String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const showPaymentGate = (data) => {
    const editorPreview = new URLSearchParams(window.location.search).get("editorPreview") === "1";
    const gate = data?.paymentGate || {};
    const shouldGate = !editorPreview && data?.active === false && gate.enabled !== false;
    const inviteSide =
      typeof data?.config?.groomSide === "boolean"
        ? data.config.groomSide
          ? "groom"
          : "bride"
        : data?.config?.inviteSide === "bride"
          ? "bride"
          : "groom";
    // Names and hashtags are rendered by React from the selected language.
    document.documentElement.classList.remove("heritage-loading");
    if (!shouldGate) return;

    document.documentElement.classList.add("heritage-payment-locked");
    const root = document.getElementById("root");
    if (root) root.setAttribute("aria-hidden", "true");

    const first = firstName(
      data?.couple?.[inviteSide],
      inviteSide === "groom" ? "Groom" : "Bride",
    );
    const secondSide = inviteSide === "groom" ? "bride" : "groom";
    const second = firstName(
      data?.couple?.[secondSide],
      secondSide === "groom" ? "Groom" : "Bride",
    );
    const names = `${first} & ${second}`;
    const path = window.location.pathname.replace(/^\/+|\/+$/g, "") || window.location.hostname;
    const phone = String(gate.whatsappPhone || "917665634581").replace(/[^\d]/g, "");
    const message = String(gate.messageTemplate || "help me complete payment for {path}").replaceAll(
      "{path}",
      path,
    );
    const logo = gate.logo || "./resources/wedvo-logo.png";
    const siteUrl = gate.siteUrl || "https://wedvo.in";
    const overlay = document.createElement("main");
    overlay.className = "heritage-payment-gate";
    overlay.innerHTML = `
      <section class="heritage-payment-gate__card">
        <a class="heritage-payment-gate__logo" href="${escapeHtml(siteUrl)}" aria-label="wedvo.in home">
          <img src="${escapeHtml(logo)}" alt="wedvo.in">
        </a>
        <p class="heritage-payment-gate__eyebrow">${escapeHtml(path)}</p>
        <h1>${escapeHtml(names)}</h1>
        <p>Payment pending. Please complete payment to view your Ram Mandir wedding website.</p>
        <a class="heritage-payment-gate__button" href="https://wa.me/${escapeHtml(phone)}?text=${encodeURIComponent(message)}">Connect on WhatsApp</a>
      </section>`;
    document.body.appendChild(overlay);
  };

  fetch("./wedding.json", { credentials: "same-origin", cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("Wedding data unavailable");
      return response.json();
    })
    .then(showPaymentGate)
    .catch(() => document.documentElement.classList.remove("heritage-loading"));
})();
