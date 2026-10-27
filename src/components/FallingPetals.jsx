import React, { useEffect, useRef } from 'react';

export default function FallingPetals() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Petal elements: rose petals & marigold petals
    const petalColors = [
      { fill: '#ff4d6d', stroke: '#c9184a' }, // Deep Rose
      { fill: '#ff758f', stroke: '#ff4d6d' }, // Soft Rose
      { fill: '#ffb703', stroke: '#fb8500' }, // Marigold Yellow
      { fill: '#fb8500', stroke: '#d46500' }, // Marigold Orange
      { fill: '#ffe6a7', stroke: '#f4a261' }, // Gold Petal
    ];

    const petalCount = window.innerWidth < 768 ? 20 : 38;
    const petals = Array.from({ length: petalCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 1.2 + 0.6,
      speedX: Math.random() * 1 - 0.5,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 1.5 - 0.75,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      sway: Math.random() * 2,
      swaySpeed: Math.random() * 0.02 + 0.01,
    }));

    const drawPetal = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color.fill;
      ctx.strokeStyle = p.color.stroke;
      ctx.lineWidth = 0.5;

      // Draw curved flower petal
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.4, p.size * 0.7, p.size * 0.8, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.7, p.size * 0.8, -p.size * 0.8, -p.size * 0.4, 0, -p.size);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(time * p.swaySpeed + p.sway) * 0.8 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 opacity-75"
    />
  );
}
