# 🤟 HandStart — ASL for Absolute Beginners

A lightweight web app for learning the basics of American Sign Language (ASL),
designed for people starting from zero. No installs, no accounts, no build step —
just open it in a browser.

## Features

- **Alphabet (A–Z):** Clear handshape descriptions and memory tips for all 26
  fingerspelling letters.
- **Numbers (1–10):** Counting basics, including the look-alikes to watch out
  for (3 vs. W, 9 vs. F).
- **First words & phrases:** 20+ essential signs organized by category —
  greetings, courtesy, family, and everyday words.
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
- `js/data.js` — learning content (alphabet, numbers, words)
- `js/app.js` — navigation, flashcards, quiz, fingerspelling, progress

## A note on learning ASL

ASL is a living visual language with its own grammar, and written descriptions
are only a starting point. Verify signs with video resources — such as
[Lifeprint](https://www.lifeprint.com/), [Handspeak](https://www.handspeak.com/),
or [SignASL.org](https://www.signasl.org/) — and learn from Deaf signers and
qualified instructors whenever you can. Signs may also vary by region.
