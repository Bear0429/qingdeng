const SEAL_CONFIG = {
  lightRadius: 145,
  pointerSmoothing: 0.22,
  glyphs: [
    { text: "地", x: 47, y: 24, mobileX: 45, mobileY: 22 },
    { text: "煞", x: 72, y: 48, mobileX: 82, mobileY: 45 },
    { text: "封", x: 28, y: 55, mobileX: 18, mobileY: 56 },
    { text: "魂", x: 58, y: 78, mobileX: 59, mobileY: 80 },
  ],
};

const scene = document.querySelector(".seal-scene");
const glyphNodes = [...document.querySelectorAll("[data-glyph]")];
const rootStyle = document.documentElement.style;
const discovered = new Set();
const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2, targetX: window.innerWidth / 2, targetY: window.innerHeight / 2 };
let animationFrame = 0;
let audioContext = null;

function getGlyphConfig(text) {
  return SEAL_CONFIG.glyphs.find((glyph) => glyph.text === text);
}

function applyGlyphPositions() {
  const isMobile = window.matchMedia("(max-width: 760px)").matches;

  glyphNodes.forEach((node) => {
    const config = getGlyphConfig(node.dataset.glyph);
    if (!config) return;
    node.style.setProperty("--glyph-x", `${isMobile ? config.mobileX : config.x}%`);
    node.style.setProperty("--glyph-y", `${isMobile ? config.mobileY : config.y}%`);
  });
}

function setPointerPosition(clientX, clientY) {
  pointer.targetX = Math.max(0, Math.min(window.innerWidth, clientX));
  pointer.targetY = Math.max(0, Math.min(window.innerHeight, clientY));
  if (!animationFrame) animationFrame = window.requestAnimationFrame(updatePointer);
}

function updatePointer() {
  pointer.x += (pointer.targetX - pointer.x) * SEAL_CONFIG.pointerSmoothing;
  pointer.y += (pointer.targetY - pointer.y) * SEAL_CONFIG.pointerSmoothing;
  rootStyle.setProperty("--mouse-x", `${pointer.x}px`);
  rootStyle.setProperty("--mouse-y", `${pointer.y}px`);
  updateGlyphIllumination();

  if (Math.abs(pointer.targetX - pointer.x) > 0.2 || Math.abs(pointer.targetY - pointer.y) > 0.2) {
    animationFrame = window.requestAnimationFrame(updatePointer);
  } else {
    animationFrame = 0;
  }
}

function updateGlyphIllumination() {
  glyphNodes.forEach((node) => {
    const text = node.dataset.glyph;
    if (discovered.has(text)) return;

    const rect = node.getBoundingClientRect();
    const distance = Math.hypot(pointer.x - (rect.left + rect.width / 2), pointer.y - (rect.top + rect.height / 2));
    const intensity = Math.max(0, 1 - distance / SEAL_CONFIG.lightRadius);
    const opacity = 0.04 + Math.pow(intensity, 1.55) * 0.92;
    node.style.opacity = opacity.toFixed(3);
    node.style.filter = intensity > 0.1 ? `drop-shadow(0 0 ${Math.round(4 + intensity * 12)}px rgba(177, 74, 45, ${0.08 + intensity * 0.26}))` : "none";
    node.style.color = `rgba(145, 56, 42, ${Math.min(0.8, 0.08 + intensity * 0.72)})`;
  });
}

function primeAudio() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioContext) audioContext = new AudioContextClass();
  if (audioContext.state === "suspended") audioContext.resume().catch(() => {});
  return audioContext;
}

function playSealClick() {
  const context = primeAudio();
  if (!context) return;

  const now = context.currentTime;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(118, now);
  oscillator.frequency.exponentialRampToValueAtTime(74, now + 0.22);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.12, now + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.34);
}

function triggerMistake() {
  scene.classList.remove("is-mistake");
  void scene.offsetWidth;
  scene.classList.add("is-mistake");
}

function discoverGlyph(node) {
  const text = node.dataset.glyph;
  if (!text || discovered.has(text)) return;

  discovered.add(text);
  node.classList.add("is-found", "is-pulse");
  node.setAttribute("aria-label", `已发现：${text}`);
  node.disabled = true;
  playSealClick();
  window.setTimeout(() => node.classList.remove("is-pulse"), 540);

  if (discovered.size === SEAL_CONFIG.glyphs.length) {
    scene.classList.add("is-complete");
    document.body.classList.add("is-complete");
  }
}

glyphNodes.forEach((node) => node.addEventListener("click", () => discoverGlyph(node)));

scene.addEventListener("click", (event) => {
  if (!(event.target instanceof Element) || !event.target.closest(".seal-glyph")) triggerMistake();
});

window.addEventListener("mousemove", (event) => setPointerPosition(event.clientX, event.clientY), { passive: true });
window.addEventListener("touchstart", (event) => {
  const touch = event.touches[0];
  if (touch) setPointerPosition(touch.clientX, touch.clientY);
}, { passive: true });
window.addEventListener("touchmove", (event) => {
  const touch = event.touches[0];
  if (touch) setPointerPosition(touch.clientX, touch.clientY);
}, { passive: true });
window.addEventListener("resize", () => {
  applyGlyphPositions();
  setPointerPosition(pointer.targetX, pointer.targetY);
});

applyGlyphPositions();
setPointerPosition(pointer.x, pointer.y);
