# 🤟 HandStart — ASL for Absolute Beginners

A lightweight web app for learning the basics of American Sign Language (ASL),
designed for people starting from zero. No installs, no accounts, no build step —
just open it in a browser.

## Try it now

📱 Instant preview (no setup):
<https://raw.githack.com/iremsubas/ASL-Learning/claude/asl-learning-app-llc69y/index.html>

A GitHub Actions workflow also deploys the app to GitHub Pages on every push:
<https://iremsubas.github.io/ASL-Learning/>

## Features

- **Alphabet (A–Z):** Real fingerspelling diagrams (public-domain images from
  Wikimedia Commons) plus handshape descriptions and memory tips for all 26
  letters. Falls back to text-only when offline.
- **Numbers (1–10):** Generated hand diagrams for every number, including the
  look-alikes to watch out for (3 vs. W, 9 vs. F).
- **First words & phrases:** 20+ essential signs organized by category —
  greetings, courtesy, family, and everyday words — each with an **animated
  2–4 keyframe illustration** showing the movement on a head-and-shoulders
  figure, with play and frame-step controls.
- **Flashcards:** Flip-to-reveal practice with deck filters and shuffle.
- **Quiz:** 10-question multiple-choice quiz with a saved personal best.
- **Fingerspelling tool:** Type any word and see how to spell it letter by letter.
- **Progress tracking:** Mark signs as learned; progress is saved in your
  browser (localStorage) — no account needed.

## Running it

Open `index.html` directly in any modern browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Tech

Plain HTML, CSS, and JavaScript — zero dependencies, fully offline-capable.

- `index.html` — page structure and the seven views (hash-based navigation)
- `css/styles.css` — all styling
- `js/data.js` — learning content (alphabet, numbers, words + animation keyframes)
- `js/hands.js` — SVG hand renderer and keyframe animation player
- `js/app.js` — navigation, flashcards, quiz, fingerspelling, progress

Letter diagrams are hotlinked from
[Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:ASL_letters)
(public domain), so they need an internet connection; everything else works
fully offline.

## A note on learning ASL

ASL is a living visual language with its own grammar, and written descriptions
are only a starting point. Verify signs with video resources — such as
[Lifeprint](https://www.lifeprint.com/), [Handspeak](https://www.handspeak.com/),
or [SignASL.org](https://www.signasl.org/) — and learn from Deaf signers and
qualified instructors whenever you can. Signs may also vary by region.
