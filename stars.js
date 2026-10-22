/* ===================================================================
   nxttu. — falling-star background
   Bright stars fall diagonally and twinkle on a canvas that is drawn
   behind every page element (z-index -1), so they never cover the text.
   =================================================================== */
(() => {
  const reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const canvas = document.createElement('canvas');
  canvas.className = 'bg-stars';
  canvas.setAttribute('aria-hidden', 'true');
  const ctx = canvas.getContext('2d');

  let W = 0, H = 0;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  // diagonal fall direction (down-left)
  const DX = -Math.SQRT1_2;
  const DY = Math.SQRT1_2;

  let stars = [];

  function makeStar(initial) {
    const size = 2 + Math.random() * 4;
    return {
      x: Math.random() * (W + 140) - 70,
      y: initial ? Math.random() * H : -20 - Math.random() * 90,
      size,
      speed: 0.35 + size * 0.3,
      phase: Math.random() * Math.PI * 2,
      twinkle: 0.6 + Math.random() * 1.6
    };
  }

  function spawn(initial) {
    const count = Math.max(30, Math.round((W * H) / 15000));
    stars = [];
    for (let i = 0; i < count; i++) stars.push(makeStar(initial));
  }

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.max(1, Math.round(W * DPR));
    canvas.height = Math.max(1, Math.round(H * DPR));
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  let last = 0;
  function frame(now) {
    const dt = last ? Math.min(48, now - last) / 16.67 : 1;
    last = now;

    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';

    for (const s of stars) {
      // twinkle: alpha pulses between 0.35 and 1
      const alpha = 0.5 + 0.5 * (0.5 + 0.5 * Math.sin(s.phase));

      ctx.beginPath();
      ctx.fillStyle = 'rgba(255,255,255,' + alpha.toFixed(3) + ')';
      ctx.shadowBlur = 4 + s.size * 2;
      ctx.shadowColor = 'rgba(190,225,255,' + alpha.toFixed(3) + ')';
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();

      if (!reduceMotion) {
        s.x += DX * s.speed * dt;
        s.y += DY * s.speed * dt;
        s.phase += s.twinkle * 0.05 * dt;
      }

      if (s.y - s.size > H + 6 || s.x + s.size < -6) {
        Object.assign(s, makeStar(false));
      }
    }

    if (!reduceMotion) requestAnimationFrame(frame);
  }

  resize();
  spawn(true);
  window.addEventListener('resize', () => { resize(); spawn(true); });
  document.body.appendChild(canvas);
  requestAnimationFrame(frame);
})();
