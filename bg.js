/* ===================================================================
   nxttu. — themed background particles
   One fixed canvas behind every page (z-index -1), so it never covers
   text. The particle mode follows the active climax theme:
     sakura / candy ............ falling petals
     lava / blood .............. ash + rising embers
     terminal .................. matrix rain
     ice / ocean ............... snow
     forest .................... falling leaves
     neon / vaporwave / sunset / gold ... neon sparks
     everything else ........... the classic falling stars
   The fall always plays — the OS "reduce motion" preference only slows
   it down, never freezes it.
   =================================================================== */
(() => {
  const reduceMotion = !!(window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const MOTION = reduceMotion ? 0.5 : 1;

  const TAU = Math.PI * 2;
  const canvas = document.createElement('canvas');
  canvas.className = 'bg-fx';
  canvas.setAttribute('aria-hidden', 'true');
  const ctx = canvas.getContext('2d');

  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  let W = 1, H = 1;

  /* ------------------------------ theme map ------------------------------ */
  const THEME_MODE = {
    sakura: 'petals', candy: 'petals',
    lava: 'ash', blood: 'ash',
    terminal: 'matrix',
    ice: 'snow', ocean: 'snow',
    forest: 'leaves',
    neon: 'sparks', vaporwave: 'sparks', sunset: 'sparks', gold: 'sparks'
  };

  const rand = (a, b) => a + Math.random() * (b - a);
  const PETALS = ['#ffb7c5', '#ff9ec4', '#ffd7e3', '#f78fb3'];
  const LEAVES = ['#5fae5f', '#8fd08f', '#3f8a4a', '#a8c96a'];

  /* ---------------------------- canvas sizing ---------------------------- */
  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.max(1, Math.round(W * DPR));
    canvas.height = Math.max(1, Math.round(H * DPR));
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  /* ------------------------------- flakes -------------------------------- */
  function flake(cfg, initial) {
    return {
      x: Math.random() * (W + 160) - 80,
      y: initial ? Math.random() * (H + 40) - 40 : -30 - Math.random() * 140,
      size: rand(cfg.size[0], cfg.size[1]),
      speed: rand(cfg.speed[0], cfg.speed[1]),
      sway: rand(cfg.sway[0], cfg.sway[1]),
      phase: Math.random() * TAU,
      rot: Math.random() * TAU,
      spin: rand(-0.04, 0.04)
    };
  }

  const MODES = {
    /* classic twinkling stars, diagonal 45° fall */
    stars: {
      area: 15000, min: 28,
      spawn(initial) { return flake({ size: [2, 6], speed: [0.6, 2.6], sway: [0, 0] }, initial); },
      step(p, dt) {
        p.x -= p.speed * dt * 0.7071;
        p.y += p.speed * dt * 0.7071;
        p.phase += 0.9 * dt;
      },
      draw(p) {
        const a = 0.5 + 0.5 * (0.5 + 0.5 * Math.sin(p.phase));
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = 'rgba(255,255,255,' + a.toFixed(3) + ')';
        ctx.shadowBlur = 4 + p.size * 2;
        ctx.shadowColor = 'rgba(190,225,255,' + a.toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, TAU);
        ctx.fill();
        ctx.shadowBlur = 0;
      },
      gone(p) { return p.y - p.size > H + 30 || p.x + p.size < -40; }
    },

    /* sakura — soft petals tumbling down-left */
    petals: {
      area: 20000, min: 20,
      spawn(initial) {
        const p = flake({ size: [6, 13], speed: [0.7, 2], sway: [18, 55] }, initial);
        p.tint = PETALS[(Math.random() * PETALS.length) | 0];
        return p;
      },
      step(p, dt) {
        p.phase += 0.02 * dt;
        p.y += p.speed * dt;
        p.x += (Math.sin(p.phase) * p.sway * 0.02 - p.speed * 0.35) * dt;
        p.rot += p.spin * dt;
      },
      draw(p) {
        const s = p.size;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = p.tint;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.quadraticCurveTo(s * 0.95, -s * 0.15, 0, s);
        ctx.quadraticCurveTo(-s * 0.95, -s * 0.15, 0, -s);
        ctx.fill();
        ctx.restore();
      },
      gone(p) { return p.y - p.size > H + 30 || p.x < -80; }
    },

    /* lava — grey ash falling while embers drift up */
    ash: {
      area: 14000, min: 26,
      spawn(initial) {
        const p = flake({ size: [1.2, 3.4], speed: [0.4, 1.8], sway: [10, 40] }, initial);
        p.ember = Math.random() < 0.22;
        if (p.ember) {
          p.size = rand(1.2, 2.6);
          p.speed = rand(0.5, 1.4);
          if (!initial) p.y = H + rand(10, 120);
        }
        return p;
      },
      step(p, dt) {
        p.phase += 0.05 * dt;
        p.x += Math.sin(p.phase) * p.sway * 0.015 * dt;
        p.y += (p.ember ? -p.speed * 0.55 : p.speed) * dt;
        p.rot += p.spin * dt * 2;
      },
      draw(p) {
        if (p.ember) {
          const a = 0.35 + 0.4 * (0.5 + 0.5 * Math.sin(p.phase * 3));
          ctx.globalCompositeOperation = 'lighter';
          ctx.fillStyle = 'rgba(255,138,42,' + a.toFixed(3) + ')';
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(255,96,20,0.9)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, TAU);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.globalCompositeOperation = 'source-over';
          ctx.fillStyle = 'rgba(198,186,172,0.45)';
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillRect(-p.size, -p.size * 0.6, p.size * 2, p.size * 1.2);
          ctx.restore();
        }
      },
      gone(p) {
        if (p.ember) return p.y + p.size < -50 || p.x < -60;
        return p.y - p.size > H + 30 || p.x < -60;
      }
    },

    /* ice / ocean — slow snow */
    snow: {
      area: 18000, min: 24,
      spawn(initial) { return flake({ size: [1.5, 4], speed: [0.3, 1.2], sway: [15, 45] }, initial); },
      step(p, dt) {
        p.phase += 0.03 * dt;
        p.x += Math.sin(p.phase) * p.sway * 0.02 * dt - 0.15 * dt;
        p.y += p.speed * dt;
      },
      draw(p) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.shadowBlur = 3;
        ctx.shadowColor = 'rgba(190,225,255,0.8)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, TAU);
        ctx.fill();
        ctx.shadowBlur = 0;
      },
      gone(p) { return p.y - p.size > H + 20 || p.x < -50; }
    },

    /* forest — leaves tumbling down */
    leaves: {
      area: 22000, min: 18,
      spawn(initial) {
        const p = flake({ size: [5, 10], speed: [0.5, 1.6], sway: [25, 70] }, initial);
        p.tint = LEAVES[(Math.random() * LEAVES.length) | 0];
        return p;
      },
      step(p, dt) {
        p.phase += 0.025 * dt;
        p.x += (Math.sin(p.phase) * p.sway * 0.03 - p.speed * 0.25) * dt;
        p.y += p.speed * dt;
        p.rot += p.spin * dt * 1.5;
      },
      draw(p) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = p.tint;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.55, p.size, 0, 0, TAU);
        ctx.fill();
        ctx.restore();
      },
      gone(p) { return p.y - p.size > H + 30 || p.x < -80; }
    },

    /* neon / vaporwave — thin glowing streaks */
    sparks: {
      area: 20000, min: 22,
      spawn(initial) {
        const p = flake({ size: [1, 2.4], speed: [1.2, 3.4], sway: [0, 0] }, initial);
        p.tail = rand(14, 46);
        p.tint = Math.random() < 0.5 ? '125,232,255' : '255,106,213';
        return p;
      },
      step(p, dt) {
        p.y += p.speed * dt;
        p.x -= p.speed * 0.35 * dt;
      },
      draw(p) {
        ctx.globalCompositeOperation = 'lighter';
        const g = ctx.createLinearGradient(p.x, p.y, p.x + p.tail * 0.35, p.y - p.tail);
        g.addColorStop(0, 'rgba(' + p.tint + ',0.9)');
        g.addColorStop(1, 'rgba(' + p.tint + ',0)');
        ctx.strokeStyle = g;
        ctx.lineWidth = p.size;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.tail * 0.35, p.y - p.tail);
        ctx.stroke();
      },
      gone(p) { return p.y - p.tail > H + 30 || p.x < -p.tail; }
    }
  };

  /* ------------------------- terminal: matrix rain ----------------------- */
  const GLYPHS = '01ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ'.split('');
  const CELL = 16;
  let columns = [];

  function buildMatrix(initial) {
    const count = Math.max(10, Math.floor(W / CELL));
    columns = Array.from({ length: count }, (_, i) => ({
      x: i * CELL + CELL / 2,
      y: initial ? Math.random() * H : -Math.random() * H,
      speed: rand(30, 130),
      len: Math.round(rand(7, 20)),
      seed: Math.round(rand(0, 9999))
    }));
  }

  function matrixChar(col, i) {
    const n = Math.floor(col.y / CELL) + i;
    return GLYPHS[Math.abs((n * 31 + col.seed * 17) % GLYPHS.length)];
  }

  function stepMatrix(dt) {
    for (const c of columns) {
      c.y += c.speed * dt * MOTION;
      if (c.y - c.len * CELL > H + CELL) {
        c.y = -Math.random() * 120;
        c.speed = rand(30, 130);
        c.len = Math.round(rand(7, 20));
        c.seed = Math.round(rand(0, 9999));
      }
    }
  }

  function drawMatrix() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.font = '700 14px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (const c of columns) {
      for (let i = 0; i < c.len; i++) {
        const y = c.y - i * CELL;
        if (y < -CELL || y > H + CELL) continue;
        if (i === 0) {
          ctx.fillStyle = 'rgba(190,255,200,0.95)';
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(80,255,120,0.9)';
        } else {
          const a = Math.pow(1 - i / c.len, 1.7) * 0.85;
          ctx.fillStyle = 'rgba(72,214,110,' + a.toFixed(3) + ')';
          ctx.shadowBlur = 0;
        }
        ctx.fillText(matrixChar(c, i), c.x, y);
      }
    }
    ctx.shadowBlur = 0;
  }

  /* ------------------------------- loop ---------------------------------- */
  let mode = 'stars';
  let flakes = [];
  let last = 0;

  function spawnAll(initial) {
    if (mode === 'matrix') { buildMatrix(initial); return; }
    const cfg = MODES[mode] || MODES.stars;
    const n = Math.max(cfg.min, Math.round((W * H) / cfg.area));
    flakes = [];
    for (let i = 0; i < n; i++) flakes.push(cfg.spawn(initial));
  }

  function frame(now) {
    const dt = last ? Math.min(48, now - last) / 16.67 : 1;
    last = now;

    ctx.clearRect(0, 0, W, H);

    if (mode === 'matrix') {
      stepMatrix(dt);
      drawMatrix();
    } else {
      const cfg = MODES[mode] || MODES.stars;
      for (const p of flakes) {
        cfg.draw(p);
        cfg.step(p, dt * MOTION);
        if (cfg.gone(p)) Object.assign(p, cfg.spawn(false));
      }
    }

    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(frame);
  }

  /* ------------------------------- public -------------------------------- */
  function setTheme(key) {
    const next = THEME_MODE[key] || 'stars';
    if (next === mode && flakes.length) return;
    mode = next;
    last = 0;
    spawnAll(true);
  }

  window.nxttuBg = { setTheme, get mode() { return mode; } };

  resize();
  mode = THEME_MODE[document.body.dataset.theme || localStorage.getItem('nxttu-theme') || 'webcore'] || 'stars';
  spawnAll(true);
  document.body.appendChild(canvas);
  requestAnimationFrame(frame);

  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); spawnAll(true); }, 150);
  });
})();
