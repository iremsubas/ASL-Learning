// HandStart — ASL learning app for beginners.
// Plain JS, hash-based navigation, progress persisted in localStorage.

const STORAGE_KEYS = {
  learned: "handstart.learned",
  bestScore: "handstart.bestScore",
};

const QUIZ_LENGTH = 10;
const QUIZ_OPTION_COUNT = 4;

// ---------- Persistence ----------

function loadLearned() {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.learned)) || []);
  } catch {
    return new Set();
  }
}

function saveLearned(learned) {
  localStorage.setItem(STORAGE_KEYS.learned, JSON.stringify([...learned]));
}

const learned = loadLearned();

// ---------- Navigation ----------

const VIEWS = ["home", "alphabet", "numbers", "words", "flashcards", "quiz", "fingerspell"];

function showView(name) {
  if (!VIEWS.includes(name)) name = "home";
  document.querySelectorAll(".view").forEach((section) => {
    section.classList.toggle("active", section.id === `view-${name}`);
  });
  document.querySelectorAll("#main-nav a").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${name}`);
  });
  if (name === "home") renderProgress();
  window.scrollTo({ top: 0 });
}

window.addEventListener("hashchange", () => showView(location.hash.slice(1)));

// ---------- Learn sections (alphabet / numbers / words) ----------

function createSignCard(item) {
  const card = document.createElement("div");
  card.className = "sign-card";
  if (learned.has(item.id)) card.classList.add("learned");

  const glyph = document.createElement("div");
  glyph.className = "glyph";
  glyph.textContent = item.label;

  const visual = createSignVisual(item);

  const description = document.createElement("p");
  description.textContent = item.description;

  const tip = document.createElement("p");
  tip.className = "tip";
  tip.textContent = `💡 ${item.tip}`;

  const toggle = document.createElement("button");
  toggle.className = "learn-toggle";
  toggle.textContent = "✓";
  toggle.title = "Mark as learned";
  toggle.setAttribute("aria-label", `Mark ${item.label} as learned`);
  toggle.addEventListener("click", () => {
    if (learned.has(item.id)) {
      learned.delete(item.id);
    } else {
      learned.add(item.id);
    }
    saveLearned(learned);
    card.classList.toggle("learned", learned.has(item.id));
  });

  card.append(toggle, glyph);
  if (visual) card.appendChild(visual);
  card.append(description, tip);

  if (item.id.startsWith("word-")) {
    const slug = item.label.toLowerCase().split("/")[0].trim()
      .replace(/[^a-z ]/g, "").replace(/ +/g, "-");
    const watch = document.createElement("a");
    watch.className = "watch-link";
    watch.href = `https://www.signasl.org/sign/${slug}`;
    watch.target = "_blank";
    watch.rel = "noopener";
    watch.textContent = "▶ More videos of this sign ↗";
    card.appendChild(watch);
  }
  return card;
}

function renderGrid(containerId, items) {
  const grid = document.getElementById(containerId);
  items.forEach((item) => grid.appendChild(createSignCard(item)));
}

function renderWords() {
  const container = document.getElementById("words-container");
  WORDS.forEach((group) => {
    const title = document.createElement("h3");
    title.className = "category-title";
    title.textContent = group.category;
    container.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "card-grid";
    group.items.forEach((item) => grid.appendChild(createSignCard(item)));
    container.appendChild(grid);
  });
}

// ---------- Home progress ----------

function renderProgress() {
  const total = ALL_ITEMS.length;
  const done = ALL_ITEMS.filter((item) => learned.has(item.id)).length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  document.getElementById("progress-fill").style.width = `${percent}%`;
  document.getElementById("progress-stats").textContent =
    done === 0
      ? "Nothing marked as learned yet — open a section and tap ✓ on signs you know."
      : `${done} of ${total} signs marked as learned (${percent}%). Keep going!`;

  const best = localStorage.getItem(STORAGE_KEYS.bestScore);
  document.getElementById("quiz-best").textContent = best
    ? `🏆 Best quiz score: ${best}/${QUIZ_LENGTH}`
    : "🏆 No quiz attempts yet — try one when you're ready!";
}

// ---------- Flashcards ----------

const flashcardState = { deck: [], index: 0 };

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function deckFor(name) {
  switch (name) {
    case "alphabet":
      return ALL_ITEMS.filter((item) => item.type === "Letter");
    case "numbers":
      return ALL_ITEMS.filter((item) => item.type === "Number");
    case "words":
      return ALL_ITEMS.filter((item) => item.type === "Word");
    default:
      return ALL_ITEMS;
  }
}

function renderFlashcard() {
  const item = flashcardState.deck[flashcardState.index];
  document.getElementById("flashcard").classList.remove("flipped");
  document.getElementById("card-type").textContent = item.type;
  document.getElementById("card-front").textContent = item.label;
  document.getElementById("card-back").textContent = item.description;
  document.getElementById("card-tip").textContent = `💡 ${item.tip}`;

  const visualBox = document.getElementById("card-visual");
  visualBox.innerHTML = "";
  const visual = createSignVisual(item, { compact: true });
  if (visual) visualBox.appendChild(visual);
  // Don't let taps on the animation controls flip the card.
  visualBox.onclick = (event) => event.stopPropagation();
  document.getElementById("card-counter").textContent =
    `Card ${flashcardState.index + 1} of ${flashcardState.deck.length}`;
}

function setDeck(name) {
  flashcardState.deck = shuffle(deckFor(name));
  flashcardState.index = 0;
  renderFlashcard();
}

function moveCard(step) {
  const size = flashcardState.deck.length;
  flashcardState.index = (flashcardState.index + step + size) % size;
  renderFlashcard();
}

function setupFlashcards() {
  document.getElementById("deck-picker").addEventListener("click", (event) => {
    const chip = event.target.closest("button[data-deck]");
    if (!chip) return;
    document.querySelectorAll("#deck-picker .chip").forEach((b) => b.classList.remove("selected"));
    chip.classList.add("selected");
    setDeck(chip.dataset.deck);
  });

  const flip = () => document.getElementById("flashcard").classList.toggle("flipped");
  document.getElementById("flashcard").addEventListener("click", flip);
  document.getElementById("card-flip").addEventListener("click", flip);
  document.getElementById("card-prev").addEventListener("click", () => moveCard(-1));
  document.getElementById("card-next").addEventListener("click", () => moveCard(1));
  document.getElementById("card-shuffle").addEventListener("click", () => {
    flashcardState.deck = shuffle(flashcardState.deck);
    flashcardState.index = 0;
    renderFlashcard();
  });

  setDeck("all");
}

// ---------- Quiz ----------

const quizState = { questions: [], current: 0, score: 0 };

function buildQuestions() {
  const pool = shuffle(ALL_ITEMS).slice(0, QUIZ_LENGTH);
  return pool.map((answer) => {
    // Distractors of the same type keep options plausible (letters vs letters, etc.).
    const sameType = ALL_ITEMS.filter((item) => item.type === answer.type && item.id !== answer.id);
    const options = shuffle([answer, ...shuffle(sameType).slice(0, QUIZ_OPTION_COUNT - 1)]);
    return { answer, options };
  });
}

function startQuiz() {
  quizState.questions = buildQuestions();
  quizState.current = 0;
  quizState.score = 0;
  renderQuestion();
}

function renderQuizIntro() {
  const panel = document.getElementById("quiz-panel");
  panel.innerHTML = "";

  const heading = document.createElement("p");
  heading.className = "quiz-question";
  heading.textContent =
    `Ready? You'll get ${QUIZ_LENGTH} questions mixing letters, numbers, and words.`;

  const start = document.createElement("button");
  start.textContent = "Start the quiz";
  start.addEventListener("click", startQuiz);

  panel.append(heading, start);
}

function renderQuestion() {
  const panel = document.getElementById("quiz-panel");
  panel.innerHTML = "";
  const { answer, options } = quizState.questions[quizState.current];

  const progress = document.createElement("div");
  progress.className = "quiz-progress";
  progress.textContent =
    `Question ${quizState.current + 1} of ${QUIZ_LENGTH} · Score: ${quizState.score}`;

  const question = document.createElement("p");
  question.className = "quiz-question";
  // Letters and numbers have a self-explanatory visual, so showing the
  // description would give the answer away. Words keep the description
  // because their diagrams are simplified.
  const visual = createSignVisual(answer, { compact: true });
  const descriptionQuestion = `Which ${answer.type.toLowerCase()} is signed like this? “${answer.description}”`;
  // Words with a real signer clip get a "watch and identify" question too.
  if (visual && (answer.type !== "Word" || answer.gif)) {
    question.textContent = `Which ${answer.type.toLowerCase()} is this?`;
    // If the hotlinked diagram can't load (e.g. offline), fall back to text.
    const img = visual.querySelector("img");
    if (img) img.addEventListener("error", () => { question.textContent = descriptionQuestion; });
  } else {
    question.textContent = descriptionQuestion;
  }

  const optionsBox = document.createElement("div");
  optionsBox.className = "quiz-options";

  const feedback = document.createElement("p");
  feedback.className = "quiz-feedback";

  options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "quiz-option";
    button.textContent = option.label;
    button.addEventListener("click", () => {
      optionsBox.querySelectorAll("button").forEach((b) => (b.disabled = true));
      const isRight = option.id === answer.id;
      button.classList.add(isRight ? "correct" : "wrong");
      if (isRight) {
        quizState.score++;
        feedback.textContent = "✅ Correct!";
        feedback.classList.add("good");
      } else {
        optionsBox.querySelectorAll("button").forEach((b) => {
          if (b.textContent === answer.label) b.classList.add("correct");
        });
        feedback.textContent = `❌ Not quite — that was “${answer.label}”.`;
        feedback.classList.add("bad");
      }

      const next = document.createElement("button");
      next.style.marginTop = "0.9rem";
      next.textContent =
        quizState.current + 1 < QUIZ_LENGTH ? "Next question →" : "See results";
      next.addEventListener("click", () => {
        quizState.current++;
        if (quizState.current < QUIZ_LENGTH) {
          renderQuestion();
        } else {
          renderResults();
        }
      });
      panel.appendChild(next);
    });
    optionsBox.appendChild(button);
  });

  panel.appendChild(progress);
  panel.appendChild(question);
  if (visual) {
    visual.classList.add("quiz-visual");
    panel.appendChild(visual);
  }
  panel.append(optionsBox, feedback);
}

function renderResults() {
  const panel = document.getElementById("quiz-panel");
  panel.innerHTML = "";

  const previousBest = Number(localStorage.getItem(STORAGE_KEYS.bestScore)) || 0;
  const isNewBest = quizState.score > previousBest;
  if (isNewBest) {
    localStorage.setItem(STORAGE_KEYS.bestScore, String(quizState.score));
  }

  const box = document.createElement("div");
  box.className = "quiz-score";

  const title = document.createElement("h3");
  title.textContent =
    quizState.score === QUIZ_LENGTH ? "Perfect score! 🎉"
    : quizState.score >= QUIZ_LENGTH * 0.7 ? "Nice work! 👏"
    : "Good effort — review and try again! 💪";

  const score = document.createElement("div");
  score.className = "big-score";
  score.textContent = `${quizState.score}/${QUIZ_LENGTH}`;

  const bestNote = document.createElement("p");
  bestNote.textContent = isNewBest
    ? "🏆 That's a new personal best!"
    : `Personal best: ${Math.max(previousBest, quizState.score)}/${QUIZ_LENGTH}`;

  const retry = document.createElement("button");
  retry.textContent = "Try again";
  retry.addEventListener("click", startQuiz);

  box.append(title, score, bestNote, retry);
  panel.appendChild(box);
}

// ---------- Fingerspelling ----------

function renderFingerspelling(text) {
  const output = document.getElementById("spell-output");
  output.innerHTML = "";
  const letterById = new Map(ALPHABET.map((item) => [item.label, item]));

  [...text.toUpperCase()].forEach((char) => {
    const item = letterById.get(char);
    if (!item) return; // skip spaces, digits, punctuation
    const card = document.createElement("div");
    card.className = "spell-letter";

    const glyph = document.createElement("div");
    glyph.className = "glyph";
    glyph.textContent = item.label;

    const visual = createSignVisual({ ...item, type: "Letter" }, { compact: true });

    const description = document.createElement("p");
    description.textContent = item.description;

    card.appendChild(glyph);
    if (visual) card.appendChild(visual);
    card.appendChild(description);
    output.appendChild(card);
  });
}

function setupFingerspelling() {
  const input = document.getElementById("spell-input");
  input.addEventListener("input", () => renderFingerspelling(input.value));
  document.getElementById("spell-clear").addEventListener("click", () => {
    input.value = "";
    renderFingerspelling("");
    input.focus();
  });
}

// ---------- Boot ----------

renderGrid("alphabet-grid", ALPHABET);
renderGrid("numbers-grid", NUMBERS);
renderWords();
setupFlashcards();
renderQuizIntro();
setupFingerspelling();
showView(location.hash.slice(1) || "home");
