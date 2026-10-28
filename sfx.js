/* ===================================================================
   nxttu. — UI sound effects
   Synthesised with WebAudio, so there are no audio files to download and
   nothing to license: a short "click" on controls, a soft "tick" while
   scrolling and a small blip when a window is opened/closed.
   View → Sound FX (localStorage 'nxttu-sfx') mutes all of it.
   =================================================================== */
(function () {
  const KEY = 'nxttu-sfx';
  const CLICKABLE = 'button, a, select, input, [role="button"], .win-btn, .desk-icon, .win-menu span, .menu-item, .theme-menu-item, .meme-target';
  let ctx = null;
  let on = localStorage.getItem(KEY) !== 'off';
  let lastScroll = 0;

  /* the context may only start inside a user gesture — every sound here is
     triggered by one, so create it lazily on the first sound */
  function audio() {
    if (!on) return null;
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function tone(from, to, dur, type, vol) {
    const ac = audio();
    if (!ac) return;
    const t = ac.currentTime;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(from, t);
    osc.frequency.exponentialRampToValueAtTime(to, t + dur);
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain).connect(ac.destination);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  function tick(hz, vol) {
    const ac = audio();
    if (!ac) return;
    const len = Math.max(1, Math.floor(ac.sampleRate * 0.045));
    const buf = ac.createBuffer(1, len, ac.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = ac.createBufferSource();
    const band = ac.createBiquadFilter();
    band.type = 'bandpass';
    band.frequency.value = hz;
    const gain = ac.createGain();
    gain.gain.value = vol;
    src.buffer = buf;
    src.connect(band).connect(gain).connect(ac.destination);
    src.start();
  }

  const click = () => tone(820, 420, 0.05, 'square', 0.03);
  const open = () => tone(480, 880, 0.09, 'triangle', 0.035);
  const shut = () => tone(420, 160, 0.1, 'triangle', 0.035);

  document.addEventListener('pointerdown', e => {
    if (!on || !e.target.closest) return;
    const el = e.target.closest(CLICKABLE);
    if (!el) return;
    if (el.classList.contains('win-btn')) {
      const t = el.textContent.trim();
      if (t === '✕') shut();
      else open();
      return;
    }
    click();
  }, true);

  window.addEventListener('wheel', () => {
    if (!on) return;
    const now = Date.now();
    if (now - lastScroll < 55) return;
    lastScroll = now;
    tick(1900, 0.018);
  }, { passive: true });

  window.nxttuSfx = {
    isOn: () => on,
    toggle() {
      on = !on;
      localStorage.setItem(KEY, on ? 'on' : 'off');
      if (on) click();
      return on;
    },
    state: () => ({ on, ctx: ctx ? ctx.state : null })
  };
})();
