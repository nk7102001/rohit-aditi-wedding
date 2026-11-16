(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const flags = [
    { selector: '.hero-temple', source: 'saffron_flag_cloth.png', x: .490, y: .013, w: .186, h: .110, phase: 0 },
    { selector: '.couple-temple', source: 'couple_flag_cloth.png', x: .500, y: .035, w: .224, h: .080, phase: 1.3 }
  ];
  let frame = 0;
  function attach(flag) {
    const temple = document.querySelector(flag.selector);
    if (!temple || !temple.complete || !temple.naturalWidth || !flag.image.complete || !flag.image.naturalWidth) return;
    if (flag.temple === temple && flag.canvas?.isConnected) return;
    flag.canvas?.remove();
    flag.temple = temple;
    flag.canvas = document.createElement('canvas');
    flag.canvas.className = 'flag-canvas';
    flag.canvas.setAttribute('aria-hidden', 'true');
    flag.canvas.style.cssText = 'position:absolute;pointer-events:none;z-index:10';
    temple.parentElement.append(flag.canvas);
    flag.context = flag.canvas.getContext('2d');
    if (flag.selector === '.couple-temple') {
      flag.lights?.forEach(light => light.remove());
      flag.lights = [.17, .83].map(() => {
        const light = document.createElement('span'); light.className = 'diya-light';
        light.setAttribute('aria-hidden', 'true'); temple.parentElement.append(light); return light;
      });
    }
  }
  function render(time) {
    frame = 0;
    for (const flag of flags) {
      attach(flag);
      if (!flag.canvas || !flag.temple.isConnected) continue;
      const box = flag.temple.getBoundingClientRect();
      if (box.bottom < 0 || box.top > innerHeight) continue;
      const parent = flag.temple.parentElement.getBoundingClientRect();
      flag.lights?.forEach((light, index) => {
        const x = index === 0 ? .17 : .83;
        Object.assign(light.style, {
          left: `${box.left - parent.left + box.width * (x - .055)}px`,
          top: `${box.top - parent.top + box.height * .69}px`,
          width: `${box.width * .11}px`, height: `${box.height * .045}px`
        });
      });
      const width = box.width * flag.w, height = box.height * flag.h;
      const padding = height * .16;
      const ratio = Math.min(devicePixelRatio || 1, 1.5);
      const pixelWidth = Math.max(1, Math.round(width * ratio));
      const pixelHeight = Math.max(1, Math.round((height + padding * 2) * ratio));
      if (flag.canvas.width !== pixelWidth || flag.canvas.height !== pixelHeight) {
        flag.canvas.width = pixelWidth; flag.canvas.height = pixelHeight;
      }
      Object.assign(flag.canvas.style, {
        left: `${box.left - parent.left + box.width * flag.x}px`,
        top: `${box.top - parent.top + box.height * flag.y - padding}px`,
        width: `${width}px`, height: `${height + padding * 2}px`
      });
      const ctx = flag.context;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, width, height + padding * 2);
      const strips = 64;
      for (let i = 0; i < strips; i++) {
        const progress = i / strips;
        const wave = Math.sin(time / 620 - progress * 6 + flag.phase) * padding * progress * progress;
        ctx.drawImage(flag.image, i * flag.image.naturalWidth / strips, 0,
          flag.image.naturalWidth / strips, flag.image.naturalHeight,
          i * width / strips, padding + wave, width / strips + .7, height);
      }
      // Remove only the original flag rectangle once its animated replacement is ready.
      const left = flag.x * 100, top = flag.y * 100;
      const right = (flag.x + flag.w) * 100, bottom = (flag.y + flag.h) * 100;
      flag.temple.style.clipPath = `polygon(evenodd,0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,${left}% ${top}%,${right}% ${top}%,${right}% ${bottom}%,${left}% ${bottom}%,${left}% ${top}%)`;
    }
    if (!document.hidden && !reduced.matches) frame = requestAnimationFrame(render);
  }
  function sync() {
    cancelAnimationFrame(frame);
    for (const flag of flags) {
      if (flag.canvas) flag.canvas.hidden = reduced.matches;
      if (reduced.matches && flag.temple) flag.temple.style.clipPath = '';
    }
    if (!document.hidden && !reduced.matches) frame = requestAnimationFrame(render);
  }
  for (const flag of flags) {
    flag.image = new Image(); flag.image.onload = sync;
    flag.image.src = 'resources/assets/source-1/' + flag.source;
  }
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', sync);
})();
