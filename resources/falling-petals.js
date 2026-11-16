(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const canvas = document.createElement('canvas');
  canvas.id = 'falling-petals-canvas';
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:25';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.append(canvas);
  const ctx = canvas.getContext('2d');
  const petal = new Image();
  const marigold = new Image();
  let width, height, frame, last = 0;
  const petals = Array.from({length: innerWidth < 700 ? 12 : 22}, (_, index) => ({
    x: Math.random() * innerWidth, y: Math.random() * innerHeight,
    flower: index % 4 === 0,
    size: index % 4 === 0 ? 25 + Math.random() * 12 : 12 + Math.random() * 17, speed: 18 + Math.random() * 22,
    angle: Math.random() * 6.28, phase: Math.random() * 6.28
  }));
  function resize() {
    width = innerWidth; height = innerHeight;
    const ratio = Math.min(devicePixelRatio, 1.5);
    canvas.width = width * ratio; canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  function draw(time) {
    const dt = Math.min((time - last) / 1000 || 0, .05); last = time;
    ctx.clearRect(0, 0, width, height);
    for (const p of petals) {
      p.y += p.speed * dt; p.x += Math.sin(time / 1800 + p.phase) * 13 * dt;
      p.angle += dt * .35;
      if (p.y > height + 30) { p.y = -30; p.x = Math.random() * width; }
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.angle);
      const tilt = Math.abs(Math.sin(time / 2400 + p.phase));
      ctx.scale(p.flower ? .85 + tilt * .15 : .55 + tilt * .45, 1);
      ctx.globalAlpha = p.flower ? .85 : .65;
      const sprite = p.flower && marigold.naturalWidth ? marigold : petal;
      if (sprite.complete && sprite.naturalWidth) {
        const spriteHeight = p.size * sprite.naturalHeight / sprite.naturalWidth;
        ctx.drawImage(sprite, -p.size / 2, -spriteHeight / 2, p.size, spriteHeight);
      }
      ctx.restore();
    }
    frame = requestAnimationFrame(draw);
  }
  function sync() {
    cancelAnimationFrame(frame); last = 0;
    ctx.clearRect(0, 0, width, height);
    if (!document.hidden && !reduced.matches && ((petal.complete && petal.naturalWidth) || (marigold.complete && marigold.naturalWidth))) frame = requestAnimationFrame(draw);
  }
  resize();
  petal.onload = sync; marigold.onload = sync;
  petal.src = 'resources/rose-petal.webp';
  marigold.src = 'resources/marigold-flower.webp';
  addEventListener('resize', resize);
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', sync);
})();
