import { useEffect, useRef, useState } from 'react';

export default function ParticleText({
  lines = ['Software', 'Engineer'],
  particleColor = '#262626',
  particleSize = 2.6,
  gridGap = 3,
  mouseRadius = 90,
  pushStrength = 14,
  ease = 0.09,
  friction = 0.89,
  className = '',
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [canvasHeight, setCanvasHeight] = useState(190);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    let mouse = { x: -1000, y: -1000, isHovering: false };

    const init = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = rect.width;

      if (width === 0) return;

      // Find the longest line to calculate maximum fitting font size
      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      // Start with a large base font size and scale dynamically to fill the width
      let targetFontSize = width < 480 ? 58 : width < 768 ? 74 : width < 1024 ? 86 : 94;
      offCtx.font = `900 ${targetFontSize}px 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif`;

      const longestLine = lines.reduce((a, b) => (a.length > b.length ? a : b), '');
      let measuredWidth = offCtx.measureText(longestLine).width;

      // Scale down slightly only if it exceeds available width
      if (measuredWidth > width * 0.98) {
        targetFontSize = Math.floor(targetFontSize * ((width * 0.98) / measuredWidth));
      }

      const lineHeight = Math.round(targetFontSize * 0.98);
      const totalHeight = Math.round(lines.length * lineHeight + targetFontSize * 0.15);

      setCanvasHeight(totalHeight);

      offscreen.width = width;
      offscreen.height = totalHeight;
      canvas.width = width * dpr;
      canvas.height = totalHeight * dpr;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      offCtx.fillStyle = particleColor;
      offCtx.font = `900 ${targetFontSize}px 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif`;
      offCtx.textAlign = 'left';
      offCtx.textBaseline = 'top';

      lines.forEach((line, index) => {
        offCtx.fillText(line, 0, index * lineHeight);
      });

      // Sample pixels
      const imgData = offCtx.getImageData(0, 0, width, totalHeight);
      const data = imgData.data;
      particles = [];

      const isMobile = width < 480;
      const gap = isMobile ? 3 : gridGap;

      for (let y = 0; y < totalHeight; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 120) {
            // Initial scatter from slight offset for dynamic entry
            const initialX = x + (Math.random() - 0.5) * 160;
            const initialY = y + (Math.random() - 0.5) * 160;

            particles.push({
              x: initialX,
              y: initialY,
              originX: x,
              originY: y,
              vx: (Math.random() - 0.5) * 2.5,
              vy: (Math.random() - 0.5) * 2.5,
              size: isMobile ? particleSize * 0.85 : particleSize,
              color: particleColor,
            });
          }
        }
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isHovering = false;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
        mouse.isHovering = true;
      }
    };

    const handleTouchEnd = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isHovering = false;
    };

    // Render loop
    const render = () => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Interaction with cursor
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius && dist > 0) {
          const force = (mouseRadius - dist) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * pushStrength;
          p.vy -= Math.sin(angle) * force * pushStrength;
        }

        // Spring force towards origin
        p.vx += (p.originX - p.x) * ease;
        p.vy += (p.originY - p.y) * ease;

        // Apply friction
        p.vx *= friction;
        p.vy *= friction;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Initialize when fonts are loaded
    if (document.fonts) {
      document.fonts.ready.then(() => {
        init();
        render();
      });
    } else {
      init();
      render();
    }

    const resizeObserver = new ResizeObserver(() => {
      init();
    });
    resizeObserver.observe(container);

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [lines, particleColor, particleSize, gridGap, mouseRadius, pushStrength, ease, friction]);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Screen-reader text for SEO and accessibility */}
      <h1 className="sr-only">
        {lines.join(' ')}
      </h1>
      <canvas
        ref={canvasRef}
        style={{ height: `${canvasHeight}px` }}
        className="w-full cursor-pointer block select-none"
      />
    </div>
  );
}

