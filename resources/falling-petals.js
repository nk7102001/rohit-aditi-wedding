/* =========================================================
   ULTRA-FAST 60FPS FALLING PETALS WITH CACHED SPRITES
   Zero GC overhead, zero gradient churn, silky smooth physics
   ========================================================= */
(() => {
  if (document.getElementById('falling-petals-canvas')) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'falling-petals-canvas';
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:25;';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Pre-render cached petal sprites on offscreen canvases
  function createRoseSprite() {
    const c = document.createElement('canvas');
    c.width = c.height = 36;
    const cx = c.getContext('2d');
    const grad = cx.createRadialGradient(18, 12, 2, 18, 18, 18);
    grad.addColorStop(0, '#ff758f');
    grad.addColorStop(0.7, '#e63946');
    grad.addColorStop(1, '#9b111e');
    cx.fillStyle = grad;
    cx.beginPath();
    cx.moveTo(18, 2);
    cx.bezierCurveTo(32, 6, 30, 30, 18, 34);
    cx.bezierCurveTo(6, 30, 4, 6, 18, 2);
    cx.fill();
    return c;
  }

  function createMarigoldSprite() {
    const c = document.createElement('canvas');
    c.width = 24; c.height = 38;
    const cx = c.getContext('2d');
    const grad = cx.createLinearGradient(0, 0, 24, 38);
    grad.addColorStop(0, '#ffea00');
    grad.addColorStop(0.5, '#ff9e00');
    grad.addColorStop(1, '#e85d04');
    cx.fillStyle = grad;
    cx.beginPath();
    cx.ellipse(12, 19, 9, 17, 0, 0, Math.PI * 2);
    cx.fill();
    return c;
  }

  function createLeafSprite() {
    const c = document.createElement('canvas');
    c.width = 24; c.height = 36;
    const cx = c.getContext('2d');
    cx.fillStyle = '#40916c';
    cx.beginPath();
    cx.moveTo(12, 2);
    cx.quadraticCurveTo(22, 18, 12, 34);
    cx.quadraticCurveTo(2, 18, 12, 2);
    cx.fill();
    cx.strokeStyle = '#95d5b2';
    cx.lineWidth = 1;
    cx.beginPath();
    cx.moveTo(12, 4);
    cx.lineTo(12, 32);
    cx.stroke();
    return c;
  }

  function createSparkleSprite() {
    const c = document.createElement('canvas');
    c.width = c.height = 16;
    const cx = c.getContext('2d');
    const grad = cx.createRadialGradient(8, 8, 1, 8, 8, 7);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.4, '#ffd166');
    grad.addColorStop(1, 'rgba(255,209,102,0)');
    cx.fillStyle = grad;
    cx.beginPath();
    cx.arc(8, 8, 7, 0, Math.PI * 2);
    cx.fill();
    return c;
  }

  const sprites = [
    createRoseSprite(),
    createMarigoldSprite(),
    createLeafSprite(),
    createSparkleSprite()
  ];

  const isMobile = window.innerWidth < 768;
  const count = isMobile ? 16 : 28;

  function resetPetal(p, initial = false) {
    p.x = Math.random() * width;
    p.y = initial ? Math.random() * height : -30;
    const r = Math.random();
    p.spriteIdx = r < 0.45 ? 0 : r < 0.78 ? 1 : r < 0.90 ? 2 : 3;
    p.w = p.spriteIdx === 3 ? 8 : (Math.random() * 8 + 14);
    p.h = p.spriteIdx === 3 ? 8 : (p.w * (sprites[p.spriteIdx].height / sprites[p.spriteIdx].width));
    p.speedY = Math.random() * 0.9 + 0.6;
    p.speedX = Math.random() * 0.6 - 0.3;
    p.rotation = Math.random() * 360;
    p.rotSpeed = Math.random() * 1.2 - 0.6;
    p.flip = Math.random() * Math.PI * 2;
    p.flipSpeed = Math.random() * 0.025 + 0.015;
    p.sway = Math.random() * 10;
    p.swaySpeed = Math.random() * 0.015 + 0.008;
    p.opacity = Math.random() * 0.3 + 0.7;
    return p;
  }

  const petals = Array.from({ length: count }).map(() => resetPetal({}, true));

  let time = 0;
  let running = true;

  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) requestAnimationFrame(loop);
  });

  function loop() {
    if (!running) return;
    ctx.clearRect(0, 0, width, height);
    time += 0.02;

    for (let i = 0; i < count; i++) {
      const p = petals[i];
      p.y += p.speedY;
      p.x += Math.sin(time * p.swaySpeed + p.sway) * 0.9 + p.speedX;
      p.rotation += p.rotSpeed;
      p.flip += p.flipSpeed;

      if (p.y > height + 30) {
        resetPetal(p);
      }
      if (p.x > width + 20) p.x = -20;
      if (p.x < -20) p.x = width + 20;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.scale(Math.sin(p.flip), 1);
      ctx.globalAlpha = p.opacity;

      const sp = sprites[p.spriteIdx];
      ctx.drawImage(sp, -p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
})();
