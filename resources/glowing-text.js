(() => {
  "use strict";

  // The invitation is shipped as a compiled React bundle, so decorate its
  // rendered text without changing the bundle or the content in wedding.json.
  const selectors = [
    ".story-heading-region h2",
    ".rsvp-card h2",
    ".social-hashtag-static",
    ".countdown-inner h2",
  ];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const revealOnView = "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add("glow-visible");
            revealOnView.unobserve(entry.target);
          }
        },
        { threshold: 0.25 },
      )
    : null;

  const decorate = (node) => {
    if (node.querySelector(".kashi-title")) {
      node.classList.remove("glow-text");
      node.setAttribute("aria-label", node.querySelector(".kashi-title").getAttribute("aria-label"));
      return;
    }

    // Keep Hindi words, conjuncts, and matras intact: never split Devanagari into char spans
    if (document.documentElement.lang === "hi") {
      const text = node.textContent?.trim();
      if (node.querySelector(".glow-char, .glow-word")) node.textContent = text;
      node.classList.remove("glow-text", "glow-visible");
      node.removeAttribute("data-glow-source");
      if (text) node.setAttribute("aria-label", text);
      return;
    }

    const value = node.textContent?.trim();
    if (!value || node.dataset.glowSource === value) return;

    revealOnView?.unobserve(node);
    node.classList.remove("glow-visible");
    node.setAttribute("aria-label", value);

    const content = document.createDocumentFragment();
    // Split into whitespace and words to ensure words NEVER split across lines
    const tokens = value.split(/(\s+)/);
    let charIndex = 0;

    tokens.forEach((token) => {
      if (!token) return;
      if (/^\s+$/.test(token)) {
        content.append(document.createTextNode(token));
        return;
      }
      const wordSpan = document.createElement("span");
      wordSpan.className = "glow-word";
      wordSpan.style.display = "inline-block";
      wordSpan.style.whiteSpace = "nowrap";

      const chars = Array.from(token);
      chars.forEach((character) => {
        const charSpan = document.createElement("span");
        charSpan.className = "glow-char";
        charSpan.setAttribute("aria-hidden", "true");
        charSpan.style.setProperty("--char-delay", `${0.12 + charIndex * 0.035}s`);
        charSpan.textContent = character;
        wordSpan.append(charSpan);
        charIndex++;
      });
      content.append(wordSpan);
    });

    node.replaceChildren(content);
    node.dataset.glowSource = value;
    node.classList.add("glow-text");
    if (reducedMotion.matches || !revealOnView) {
      node.classList.add("glow-visible");
    } else {
      revealOnView.observe(node);
    }
  };

  const start = () => {
    const root = document.getElementById("root");
    if (!root) return;
    let queued = false;
    const scan = () => {
      queued = false;
      for (const selector of selectors) {
        root.querySelectorAll(selector).forEach(decorate);
      }
    };
    const observer = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(scan);
    });
    observer.observe(root, { childList: true, subtree: true, characterData: true });
    scan();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
