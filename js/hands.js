// Stylized SVG hand renderer + sign animation player.
//
// Letters use real public-domain fingerspelling diagrams hotlinked from
// Wikimedia Commons (with graceful text-only fallback when offline).
// Numbers and word signs use simplified hand diagrams generated here, and
// word signs animate through 2–4 keyframes to show the movement.

const SVG_NS = "http://www.w3.org/2000/svg";

// ---------- Letter images (Wikimedia Commons, public domain) ----------

function commonsLetterUrl(letter) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/Sign_language_${letter}.svg?width=200`;
}

// ---------- Parametric hand glyphs ----------
//
// Local glyph coordinates: palm centered near (0,0), fingers point up
// (negative y). Finger order: index, middle, ring, pinky.
// Finger states: up | spread | fold | bent | pinch | touch
// Thumb states:  side | up | across | fold | between | pinch | touchLine

const FINGERS = [
  { x: 12, len: 26 },  // index
  { x: 4, len: 30 },   // middle
  { x: -4, len: 27 },  // ring
  { x: -12, len: 21 }, // pinky
];

const PINCH_POINT = { x: 4, y: -30 };  // where fingertips meet the thumb
const TOUCH_POINT = { x: 16, y: -12 }; // where a single finger meets the thumb

const HAND_SHAPES = {
  flat: { fingers: ["up", "up", "up", "up"], thumb: "across" },
  open5: { fingers: ["spread", "spread", "spread", "spread"], thumb: "side" },
  fistA: { fingers: ["fold", "fold", "fold", "fold"], thumb: "fold" },
  fistS: { fingers: ["fold", "fold", "fold", "fold"], thumb: "across" },
  thumbsUp: { fingers: ["fold", "fold", "fold", "fold"], thumb: "up" },
  point1: { fingers: ["up", "fold", "fold", "fold"], thumb: "fold" },
  flatO: { fingers: ["pinch", "pinch", "pinch", "pinch"], thumb: "pinch" },
  shapeU: { fingers: ["up", "up", "fold", "fold"], thumb: "fold" },
  shapeV: { fingers: ["spread", "spread", "fold", "fold"], thumb: "fold" },
  shapeF: { fingers: ["touch", "spread", "spread", "spread"], thumb: "touchLine" },
  shapeT: { fingers: ["fold", "fold", "fold", "fold"], thumb: "between" },
  shapeILY: { fingers: ["spread", "fold", "fold", "spread"], thumb: "side" },
  hookX: { fingers: ["bent", "fold", "fold", "fold"], thumb: "fold" },
  bentB: { fingers: ["bent", "bent", "bent", "bent"], thumb: "fold" },
  // "No" snaps index+middle against the thumb.
  noOpen: { fingers: ["up", "up", "fold", "fold"], thumb: "side" },
  noClosed: { fingers: ["pinch", "pinch", "fold", "fold"], thumb: "pinch" },
  // Number handshapes.
  n3: { fingers: ["spread", "spread", "fold", "fold"], thumb: "side" },
  n4: { fingers: ["spread", "spread", "spread", "spread"], thumb: "across" },
  n6: { fingers: ["spread", "spread", "spread", "touch"], thumb: "touchLine" },
  n7: { fingers: ["spread", "spread", "touch", "spread"], thumb: "touchLine" },
  n8: { fingers: ["spread", "touch", "spread", "spread"], thumb: "touchLine" },
  n9: { fingers: ["touch", "spread", "spread", "spread"], thumb: "touchLine" },
};

function svgEl(tag, attrs) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
  return el;
}

function strokeAttrs(width) {
  return {
    stroke: "#33415e",
    "stroke-width": width,
    "stroke-linecap": "round",
    fill: "none",
  };
}

function drawFinger(group, finger, state) {
  const { x, len } = finger;
  switch (state) {
    case "up":
      group.appendChild(svgEl("line", { x1: x, y1: -4, x2: x, y2: -len - 4, ...strokeAttrs(7) }));
      break;
    case "spread": {
      const tipX = x + x * 0.55;
      group.appendChild(svgEl("line", { x1: x, y1: -4, x2: tipX, y2: -len - 4, ...strokeAttrs(7) }));
      break;
    }
    case "fold":
      // Folded finger: just the knuckle bump above the palm.
      group.appendChild(svgEl("circle", { cx: x, cy: -3, r: 4, fill: "#33415e" }));
      break;
    case "bent":
      group.appendChild(svgEl("path", {
        d: `M ${x} -4 Q ${x + 1} ${-len + 2} ${x + 9} ${-len + 10}`,
        ...strokeAttrs(7),
      }));
      break;
    case "pinch":
      group.appendChild(svgEl("line", {
        x1: x, y1: -4, x2: PINCH_POINT.x, y2: PINCH_POINT.y, ...strokeAttrs(7),
      }));
      break;
    case "touch":
      group.appendChild(svgEl("path", {
        d: `M ${x} -4 Q ${x} -22 ${TOUCH_POINT.x} ${TOUCH_POINT.y}`,
        ...strokeAttrs(7),
      }));
      break;
  }
}

function drawThumb(group, state) {
  const line = (x1, y1, x2, y2) =>
    group.appendChild(svgEl("line", { x1, y1, x2, y2, ...strokeAttrs(7) }));
  const dot = (cx, cy) =>
    group.appendChild(svgEl("circle", { cx, cy, r: 3, fill: "#33415e" }));

  switch (state) {
    case "side":
      line(17, 8, 31, -2);
      break;
    case "up":
      line(17, 6, 17, -18);
      break;
    case "across":
      line(17, 6, -8, 6);
      break;
    case "fold":
      line(17, 6, 24, 14);
      break;
    case "between":
      line(17, 10, 8, -2);
      dot(8, -3);
      break;
    case "pinch":
      line(17, 8, PINCH_POINT.x, PINCH_POINT.y);
      dot(PINCH_POINT.x, PINCH_POINT.y);
      break;
    case "touchLine":
      line(17, 8, TOUCH_POINT.x, TOUCH_POINT.y);
      dot(TOUCH_POINT.x, TOUCH_POINT.y);
      break;
  }
}

// Builds a <g> containing one hand glyph in local coordinates.
function buildHandGlyph(shapeName) {
  const shape = HAND_SHAPES[shapeName];
  const group = svgEl("g", {});
  if (!shape) return group;

  group.appendChild(svgEl("rect", {
    x: -17, y: -6, width: 34, height: 32, rx: 9,
    fill: "#eef0ff", stroke: "#33415e", "stroke-width": 5,
  }));
  shape.fingers.forEach((state, i) => drawFinger(group, FINGERS[i], state));
  drawThumb(group, shape.thumb);
  return group;
}

// Standalone hand diagram (used for number cards).
function buildHandSVG(shapeName, size) {
  const svg = svgEl("svg", {
    viewBox: "-38 -44 80 84",
    width: size,
    height: Math.round(size * 84 / 80),
    role: "img",
  });
  svg.appendChild(buildHandGlyph(shapeName));
  return svg;
}

// ---------- Animated sign scenes (word signs) ----------
//
// Scene coordinates: 220 x 240. Head at (110, 58), shoulders from y≈148.
// Each hand: { shape, mirror?, frames: [[x, y, rotationDeg, shapeOverride?], ...] }
// All hands in a scene must have the same number of frames.

const SEGMENT_MS = 550; // travel time between keyframes
const HOLD_MS = 350;    // pause on each keyframe
const LOOP_PAUSE_MS = 900;

function buildSceneSVG() {
  const svg = svgEl("svg", { viewBox: "0 0 220 240", role: "img" });
  svg.appendChild(svgEl("path", {
    d: "M 28 242 C 30 178 64 148 110 148 C 156 148 190 178 192 242 Z",
    fill: "#f6f7fb", stroke: "#c7cde0", "stroke-width": 3,
  }));
  svg.appendChild(svgEl("circle", {
    cx: 110, cy: 58, r: 28,
    fill: "#f6f7fb", stroke: "#c7cde0", "stroke-width": 3,
  }));
  return svg;
}

function setHandTransform(hand, x, y, rotation) {
  const mirror = hand.mirror ? " scale(-1,1)" : "";
  hand.el.setAttribute("transform", `translate(${x},${y}) rotate(${rotation})${mirror} scale(0.8)`);
}

function setHandShape(hand, shapeName) {
  if (hand.currentShape === shapeName) return;
  hand.currentShape = shapeName;
  hand.el.replaceChildren(buildHandGlyph(shapeName));
}

function applyFrame(hands, index) {
  hands.forEach((hand) => {
    const [x, y, rotation, shapeOverride] = hand.frames[index];
    setHandShape(hand, shapeOverride || hand.shape);
    setHandTransform(hand, x, y, rotation);
  });
}

// Creates the animated scene with play + frame-step controls.
function createSignAnimation(anim, options = {}) {
  const root = document.createElement("div");
  root.className = "sign-anim" + (options.compact ? " compact" : "");

  const stage = document.createElement("div");
  stage.className = "anim-stage";
  const svg = buildSceneSVG();
  stage.appendChild(svg);

  const hands = anim.hands.map((spec) => {
    const el = svgEl("g", {});
    el.appendChild(buildHandGlyph(spec.shape));
    svg.appendChild(el);
    return { ...spec, el, currentShape: spec.shape };
  });

  const frameCount = hands[0].frames.length;
  applyFrame(hands, 0);

  const controls = document.createElement("div");
  controls.className = "anim-controls";

  const playBtn = document.createElement("button");
  playBtn.className = "anim-play";
  playBtn.type = "button";

  const frameButtons = [];
  let rafId = null;
  let playing = false;

  function stop() {
    playing = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    playBtn.textContent = "▶ Play";
  }

  function highlightFrame(index) {
    frameButtons.forEach((btn, i) => btn.classList.toggle("selected", i === index));
  }

  function showFrame(index) {
    stop();
    applyFrame(hands, index);
    highlightFrame(index);
  }

  function play() {
    stop();
    playing = true;
    playBtn.textContent = "⏸ Stop";
    const segment = SEGMENT_MS + HOLD_MS;
    const cycle = (frameCount - 1) * segment + LOOP_PAUSE_MS;
    const start = performance.now();

    function tick(now) {
      if (!playing) return;
      const t = (now - start) % cycle;
      const i = Math.min(Math.floor(t / segment), frameCount - 2);
      const local = t - i * segment;
      // Hold on the keyframe, then ease toward the next one.
      const progress = t >= (frameCount - 1) * segment ? 1
        : Math.min(Math.max((local - HOLD_MS) / SEGMENT_MS, 0), 1);
      const eased = progress * progress * (3 - 2 * progress);

      hands.forEach((hand) => {
        const from = hand.frames[i];
        const to = hand.frames[Math.min(i + 1, frameCount - 1)];
        setHandShape(hand, (eased < 0.5 ? from[3] : to[3]) || hand.shape);
        setHandTransform(
          hand,
          from[0] + (to[0] - from[0]) * eased,
          from[1] + (to[1] - from[1]) * eased,
          from[2] + (to[2] - from[2]) * eased,
        );
      });
      highlightFrame(eased < 0.5 ? i : i + 1);
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
  }

  if (frameCount > 1) {
    playBtn.textContent = "▶ Play";
    playBtn.addEventListener("click", () => (playing ? stop() : play()));
    controls.appendChild(playBtn);

    for (let i = 0; i < frameCount; i++) {
      const btn = document.createElement("button");
      btn.className = "anim-frame";
      btn.type = "button";
      btn.textContent = String(i + 1);
      btn.title = `Show position ${i + 1}`;
      btn.addEventListener("click", () => showFrame(i));
      frameButtons.push(btn);
      controls.appendChild(btn);
    }
    highlightFrame(0);
  }

  root.append(stage, controls);
  return root;
}

// ---------- Public factory ----------
//
// Returns a visual element for any learnable item, or null if none applies.
// options.compact: smaller layout for flashcards/quiz.

function createSignVisual(item, options = {}) {
  if (item.type === "Letter" || /^letter-/.test(item.id)) {
    const wrap = document.createElement("div");
    wrap.className = "letter-visual" + (options.compact ? " compact" : "");
    const img = document.createElement("img");
    img.src = commonsLetterUrl(item.label);
    img.alt = `ASL fingerspelling handshape for the letter ${item.label}`;
    img.loading = "lazy";
    // Offline / blocked? Drop the image; the text description still teaches the sign.
    img.addEventListener("error", () => wrap.remove());
    wrap.appendChild(img);
    return wrap;
  }

  if (item.shape) { // numbers: static generated diagram
    const wrap = document.createElement("div");
    wrap.className = "number-visual" + (options.compact ? " compact" : "");
    wrap.appendChild(buildHandSVG(item.shape, options.compact ? 72 : 92));
    return wrap;
  }

  if (item.anim) { // words: animated scene
    return createSignAnimation(item.anim, options);
  }

  return null;
}
