/* =========================================================
   ULTRA-OPTIMIZED 60FPS FLUTTERING SAFFRON FLAGS
   Precomputed wave frames for zero CPU overhead & silky smoothness
   ========================================================= */
(() => {
  const configs = [
    {
      id: 'hero',
      selector: '.hero-temple',
      src: 'resources/assets/source-1/saffron_flag_cloth.png',
      leftPct: 0.490,
      topPct: 0.013,
      widthPct: 0.186,
      heightPct: 0.110
    },
    {
      id: 'couple',
      selector: '.couple-temple',
      src: 'resources/assets/source-1/couple_flag_cloth.png',
      leftPct: 0.495,
      topPct: 0.045,
      widthPct: 0.224,
      heightPct: 0.078
    }
  ];

  const TOTAL_FRAMES = 24;

  configs.forEach(cfg => {
    const img = new Image();
    img.src = cfg.src;
    img.onload = () => {
      // Pre-render wave animation frames into offscreen canvases once
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const padY = 30;
      const frames = [];

      for (let f = 0; f < TOTAL_FRAMES; f++) {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = w + 10;
        offCanvas.height = h + padY * 2;
        const offCtx = offCanvas.getContext('2d');
        const t = (f / TOTAL_FRAMES) * Math.PI * 2;

        for (let x = 0; x < w; x++) {
          const progress = x / w;
          const waveY = Math.sin(t * 2 - progress * 6.5) * (progress * progress * 13) +
                        Math.cos(t * 3 - progress * 9.5) * (progress * 4.5);
          offCtx.drawImage(img, x, 0, 1, h, x, padY + waveY, 1.2, h);
        }
        frames.push(offCanvas);
      }
      cfg.frames = frames;
      initOverlay(cfg);
    };
  });

  function initOverlay(cfg) {
    const temple = document.querySelector(cfg.selector);
    if (!temple || !temple.parentElement) return;

    const parent = temple.parentElement;
    let canvas = parent.querySelector(`.flag-canvas-${cfg.id}`);
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.className = `flag-canvas flag-canvas-${cfg.id}`;
      canvas.style.cssText = 'position:absolute;pointer-events:none;z-index:10;will-change:transform;';
      parent.appendChild(canvas);
    }
    cfg.canvas = canvas;
    cfg.ctx = canvas.getContext('2d');
    updateCanvasPosition(cfg);
  }

  function updateCanvasPosition(cfg) {
    const temple = document.querySelector(cfg.selector);
    if (!temple || !cfg.canvas) return;

    const tRect = temple.getBoundingClientRect();
    const pRect = temple.parentElement.getBoundingClientRect();

    const tLeft = tRect.left - pRect.left;
    const tTop = tRect.top - pRect.top;
    const tWidth = tRect.width;
    const tHeight = tRect.height;

    const fLeft = tLeft + tWidth * cfg.leftPct;
    const fTop = tTop + tHeight * cfg.topPct;
    const fWidth = tWidth * cfg.widthPct;
    const fHeight = tHeight * cfg.heightPct;

    const padY = 24;
    cfg.canvas.style.left = `${fLeft}px`;
    cfg.canvas.style.top = `${fTop - padY / 2}px`;
    cfg.canvas.style.width = `${fWidth}px`;
    cfg.canvas.style.height = `${fHeight + padY}px`;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cfg.canvas.width = Math.round(fWidth * dpr);
    cfg.canvas.height = Math.round((fHeight + padY) * dpr);
    cfg.drawW = cfg.canvas.width;
    cfg.drawH = cfg.canvas.height;
  }

  window.addEventListener('resize', () => {
    configs.forEach(cfg => { if (cfg.canvas) updateCanvasPosition(cfg); });
  });

  let frameTick = 0;
  let running = true;

  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) requestAnimationFrame(loop);
  });

  function loop() {
    if (!running) return;
    frameTick = (frameTick + 0.4) % TOTAL_FRAMES;
    const frameIndex = Math.floor(frameTick);

    configs.forEach(cfg => {
      if (cfg.ctx && cfg.frames && cfg.frames[frameIndex]) {
        cfg.ctx.clearRect(0, 0, cfg.drawW, cfg.drawH);
        cfg.ctx.drawImage(cfg.frames[frameIndex], 0, 0, cfg.drawW, cfg.drawH);
      }
    });

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
})();
