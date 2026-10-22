/* ===================================================================
   nxttu. — cursor trail
   The head of the trail sits exactly on the pointer and every following
   point eases toward the one in front of it, so the tail always drags
   BEHIND the cursor. When the pointer stops the whole trail fades out,
   so it never piles up into a white blob.
   Disabled on touch devices.
   =================================================================== */
(() => {
  if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.style.cssText =
    "position:fixed;left:0;top:0;width:100vw;height:100vh;pointer-events:none;z-index:999999;";

  document.body.appendChild(canvas);

  function resize() {
    canvas.width = innerWidth * devicePixelRatio;
    canvas.height = innerHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }

  resize();
  addEventListener("resize", resize);

  const mouse = { x: innerWidth / 2, y: innerHeight / 2 };

  let trailLength = 14;
  let pointSize = 7;
  let hue = 0;
  let hueSpeed = 1.5;
  let fade = 0;            // 1 while moving, eases to 0 once the pointer is still

  const trail = [];
  for (let i = 0; i < trailLength; i++) trail.push({ x: mouse.x, y: mouse.y });

  let lastMove = 0;

  window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    lastMove = performance.now();
  });

  function ensureLength(n) {
    while (trail.length < n) {
      const tail = trail[trail.length - 1] || mouse;
      trail.push({ x: tail.x, y: tail.y });
    }
    trail.length = n;
  }

  function update() {
    trail[0].x = mouse.x;
    trail[0].y = mouse.y;

    for (let i = 1; i < trail.length; i++) {
      trail[i].x += (trail[i - 1].x - trail[i].x) * 0.35;
      trail[i].y += (trail[i - 1].y - trail[i].y) * 0.35;
    }

    // still for longer than ~90ms → fade the tail away over ~250ms instead of
    // stacking every point on one pixel (which used to turn it white).
    // Time-based, so it behaves the same at any frame rate.
    const idle = performance.now() - lastMove;
    fade = idle <= 90 ? 1 : Math.max(0, 1 - (idle - 90) / 250);
  }

  function draw() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    if (fade > 0.01) {
      ctx.globalCompositeOperation = "source-over";
      ctx.shadowBlur = 10;

      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        const t = i / trail.length;               // 0 at the pointer, 1 at the tail
        const alpha = (1 - t) * 0.85 * fade;
        if (alpha <= 0.01) continue;

        const color = `hsl(${(hue + i * 8) % 360},100%,60%)`;

        ctx.beginPath();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.arc(p.x, p.y, pointSize * (1 - t), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    }

    hue += hueSpeed;
  }

  function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
  }

  animate();

  const hoverSelector =
    "a, button, input, textarea, select, .btn, [data-cursor-hover]";

  function hoverOn() {
    trailLength = 20;
    pointSize = 11;
    hueSpeed = 5;
    ensureLength(trailLength);
    canvas.style.filter = "brightness(1.3) saturate(1.5)";
  }

  function hoverOff() {
    trailLength = 14;
    pointSize = 7;
    hueSpeed = 1.5;
    ensureLength(trailLength);
    canvas.style.filter = "";
  }

  document.addEventListener("mouseover", e => {
    if (e.target.closest(hoverSelector)) hoverOn();
  });

  document.addEventListener("mouseout", e => {
    if (e.target.closest(hoverSelector)) hoverOff();
  });

})();
