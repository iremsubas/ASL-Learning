// Learning content for the ASL beginner app.
// Descriptions cover the dominant hand unless both hands are mentioned.
// Text is a study aid only — learners should confirm each sign with video
// resources or fluent signers (see the Resources section on the Home page).
//
// Letters are illustrated with public-domain diagrams hotlinked from
// Wikimedia Commons (see js/hands.js). Numbers carry a `shape` key into the
// generated hand diagrams, and words carry an `anim` spec: simplified hands
// animated through 2–4 keyframes [x, y, rotationDeg, optionalShapeOverride]
// on a 220x240 head-and-shoulders scene.

const ALPHABET = [
  { id: "letter-a", label: "A", description: "Make a fist with your fingers folded down. Rest your thumb against the side of your index finger, palm facing out.", tip: "A fist with the thumb alongside — not wrapped over the fingers." },
  { id: "letter-b", label: "B", description: "Hold your four fingers straight up and together. Fold your thumb across your palm.", tip: "A flat wall of fingers, like the flat side of a 'B'." },
  { id: "letter-c", label: "C", description: "Curve all your fingers and thumb so your hand forms the shape of the letter C, palm facing sideways.", tip: "Your hand literally draws a 'C'." },
  { id: "letter-d", label: "D", description: "Point your index finger straight up. Touch the tips of your middle, ring, and pinky fingers to your thumb, forming a small circle.", tip: "One finger up, the rest make the round part of the 'd'." },
  { id: "letter-e", label: "E", description: "Tuck your thumb across your palm and fold your fingertips down so they rest on top of the thumb.", tip: "All fingertips curl down toward the thumb — a squeezed-shut hand." },
  { id: "letter-f", label: "F", description: "Touch the tip of your index finger to your thumb, making a circle. Keep your other three fingers extended and slightly spread.", tip: "Looks like the 'OK' gesture. 👌" },
  { id: "letter-g", label: "G", description: "Hold your index finger and thumb out flat and parallel to each other, pointing to the side. Close your other fingers.", tip: "Like pinching something flat, held sideways." },
  { id: "letter-h", label: "H", description: "Extend your index and middle fingers together, pointing to the side. Close your other fingers with your thumb holding them down.", tip: "Two fingers lying sideways, like train tracks." },
  { id: "letter-i", label: "I", description: "Raise only your pinky finger. Close the rest of your fingers into a fist with your thumb across them.", tip: "The smallest finger for a skinny letter." },
  { id: "letter-j", label: "J", description: "Start with the letter I (pinky up), then trace the letter J in the air with your pinky.", tip: "An 'I' that draws its own hook." },
  { id: "letter-k", label: "K", description: "Raise your index and middle fingers in a V. Place your thumb against the base of your middle finger, between the two raised fingers.", tip: "Like a V with the thumb tucked into the gap." },
  { id: "letter-l", label: "L", description: "Point your index finger up and stick your thumb out to the side at a right angle. Close your other fingers.", tip: "Your hand makes a perfect 'L'." },
  { id: "letter-m", label: "M", description: "Tuck your thumb under your index, middle, and ring fingers, folding those three fingers down over it.", tip: "Three fingers over the thumb — M has three bumps." },
  { id: "letter-n", label: "N", description: "Tuck your thumb under your index and middle fingers, folding those two fingers down over it.", tip: "Two fingers over the thumb — N has two bumps." },
  { id: "letter-o", label: "O", description: "Curve all your fingers down to touch your thumb, forming a round O shape.", tip: "Your hand draws an 'O'." },
  { id: "letter-p", label: "P", description: "Make the letter K (index and middle in a V, thumb between them), then point your hand downward.", tip: "A 'K' flipped to point at the floor." },
  { id: "letter-q", label: "Q", description: "Make the letter G (index finger and thumb parallel), then point your hand downward.", tip: "A 'G' flipped to point at the floor." },
  { id: "letter-r", label: "R", description: "Cross your index and middle fingers, pointing up. Close your other fingers.", tip: "Crossed fingers, like wishing for luck. 🤞" },
  { id: "letter-s", label: "S", description: "Make a fist with your thumb crossed over the front of your fingers.", tip: "Like 'A', but the thumb locks across the front." },
  { id: "letter-t", label: "T", description: "Make a fist and tuck your thumb between your index and middle fingers.", tip: "The thumb peeks out between the first two fingers." },
  { id: "letter-u", label: "U", description: "Extend your index and middle fingers straight up, held together. Close your other fingers.", tip: "Two fingers together, like the two sides of a 'U'." },
  { id: "letter-v", label: "V", description: "Extend your index and middle fingers straight up, spread apart in a V shape.", tip: "The classic peace sign. ✌️" },
  { id: "letter-w", label: "W", description: "Extend your index, middle, and ring fingers up and spread them apart. Touch your thumb to your pinky.", tip: "Three spread fingers make the 'W'." },
  { id: "letter-x", label: "X", description: "Bend your index finger into a hook shape. Close your other fingers into a fist.", tip: "A single hooked finger, like half an 'X'." },
  { id: "letter-y", label: "Y", description: "Stick out your thumb and pinky. Close your other three fingers.", tip: "The 'hang loose' gesture. 🤙" },
  { id: "letter-z", label: "Z", description: "Point your index finger and trace the letter Z in the air.", tip: "Zorro's signature move." },
];

const NUMBERS = [
  { id: "number-1", label: "1", shape: "point1", description: "Hold up your index finger, palm facing toward you. Close your other fingers.", tip: "Just like counting 'one'. ☝️" },
  { id: "number-2", label: "2", shape: "shapeV", description: "Hold up your index and middle fingers, spread apart, palm facing toward you.", tip: "Like the letter V, but palm in." },
  { id: "number-3", label: "3", shape: "n3", description: "Hold up your thumb, index, and middle fingers, palm facing toward you.", tip: "Thumb counts! Not the same as 'W'." },
  { id: "number-4", label: "4", shape: "n4", description: "Hold up four fingers, spread apart, with your thumb tucked against your palm. Palm faces toward you.", tip: "All fingers, no thumb." },
  { id: "number-5", label: "5", shape: "open5", description: "Hold up all five fingers, spread apart, palm facing toward you.", tip: "A full open hand. 🖐️" },
  { id: "number-6", label: "6", shape: "n6", description: "Touch your thumb to your pinky. Hold your other three fingers up and spread.", tip: "Looks like 'W' — the smallest finger touches for the number after 5." },
  { id: "number-7", label: "7", shape: "n7", description: "Touch your thumb to your ring finger. Hold your other three fingers up.", tip: "One finger over from 6." },
  { id: "number-8", label: "8", shape: "n8", description: "Touch your thumb to your middle finger. Hold your other three fingers up.", tip: "Two fingers over from 6." },
  { id: "number-9", label: "9", shape: "n9", description: "Touch your thumb to your index finger. Hold your other three fingers up.", tip: "Looks like the letter F." },
  { id: "number-10", label: "10", shape: "thumbsUp", description: "Make a thumbs-up fist and give it a little shake.", tip: "A shaking thumbs-up. 👍" },
];

const WORDS = [
  {
    category: "Greetings",
    items: [
      {
        id: "word-hello", label: "Hello",
        description: "Touch the side of your flat hand near your forehead, then move it outward — like a relaxed salute.",
        tip: "A friendly salute. 👋",
        anim: { hands: [{ shape: "flat", frames: [[140, 58, 18], [186, 44, 38]] }] },
      },
      {
        id: "word-goodbye", label: "Goodbye",
        description: "Open your hand, palm facing out, and wave it side to side — or fold your fingers down and up like a small wave.",
        tip: "Just like waving goodbye.",
        anim: { hands: [{ shape: "open5", frames: [[162, 78, -14], [162, 78, 14], [162, 78, -14]] }] },
      },
      {
        id: "word-name", label: "Name",
        description: "Make a U handshape with both hands (index and middle fingers extended together). Tap the fingers of your dominant hand on top of the other hand's fingers twice.",
        tip: "Two 'U' hands tap to make an X shape.",
        anim: {
          hands: [
            { shape: "shapeU", frames: [[128, 130, 115], [128, 144, 115], [128, 130, 115], [128, 144, 115]] },
            { shape: "shapeU", mirror: true, frames: [[92, 152, -115], [92, 152, -115], [92, 152, -115], [92, 152, -115]] },
          ],
        },
      },
      {
        id: "word-nice-to-meet-you", label: "Nice to meet you",
        description: "NICE: slide your flat dominant palm across the upturned palm of your other hand. MEET: point both index fingers up and bring your hands together so they 'meet'.",
        tip: "Two signs in a row: a smooth slide, then two 'people' coming together.",
        anim: {
          hands: [
            { shape: "point1", frames: [[170, 152, 0], [122, 146, 0]] },
            { shape: "point1", mirror: true, frames: [[50, 152, 0], [98, 146, 0]] },
          ],
        },
      },
    ],
  },
  {
    category: "Courtesy",
    items: [
      {
        id: "word-please", label: "Please",
        description: "Place your flat hand on your chest and move it in a circular motion.",
        tip: "A polite circle over your heart.",
        anim: { hands: [{ shape: "flat", frames: [[100, 148, 0], [116, 158, 8], [100, 168, 0], [84, 158, -8], [100, 148, 0]] }] },
      },
      {
        id: "word-thank-you", label: "Thank you",
        description: "Touch the fingertips of your flat hand to your chin, then move your hand forward and down toward the person you're thanking.",
        tip: "Like blowing a kiss from your chin.",
        anim: { hands: [{ shape: "flat", frames: [[112, 98, 0], [154, 134, 42]] }] },
      },
      {
        id: "word-sorry", label: "Sorry",
        description: "Make a fist (the letter A) and rub it in a circle over the center of your chest.",
        tip: "A fist circling your heart — showing regret.",
        anim: { hands: [{ shape: "fistA", frames: [[104, 146, 0], [118, 156, 0], [104, 166, 0], [90, 156, 0], [104, 146, 0]] }] },
      },
      {
        id: "word-yes", label: "Yes",
        description: "Make a fist (the letter S) and bob it up and down, like a head nodding.",
        tip: "Your fist nods 'yes' for you.",
        anim: { hands: [{ shape: "fistS", frames: [[148, 114, 0], [148, 138, 12], [148, 114, 0]] }] },
      },
      {
        id: "word-no", label: "No",
        description: "Extend your index and middle fingers together with your thumb, then tap the fingers and thumb together, like a mouth snapping shut.",
        tip: "Fingers and thumb snap together — 'nope'.",
        anim: { hands: [{ shape: "noOpen", frames: [[150, 108, 12], [150, 112, 12, "noClosed"], [150, 108, 12]] }] },
      },
      {
        id: "word-help", label: "Help",
        description: "Make a thumbs-up fist and place it on the flat, upturned palm of your other hand. Lift both hands upward together.",
        tip: "One hand lifts the other up.",
        anim: {
          hands: [
            { shape: "thumbsUp", frames: [[106, 152, 0], [106, 116, 0]] },
            { shape: "flat", frames: [[106, 182, 96], [106, 146, 96]] },
          ],
        },
      },
    ],
  },
  {
    category: "People & Family",
    items: [
      {
        id: "word-i-love-you", label: "I love you",
        description: "Extend your thumb, index finger, and pinky while keeping your middle and ring fingers down. Palm faces out.",
        tip: "Combines the letters I, L, and Y in one hand. 🤟",
        anim: { hands: [{ shape: "shapeILY", frames: [[148, 116, 0]] }] },
      },
      {
        id: "word-friend", label: "Friend",
        description: "Hook your index fingers together, then reverse them and hook the other way.",
        tip: "Two fingers linked like close friends.",
        anim: {
          hands: [
            { shape: "hookX", frames: [[104, 128, 178], [112, 138, 158], [104, 128, 178]] },
            { shape: "hookX", mirror: true, frames: [[116, 150, 2], [108, 140, -18], [116, 150, 2]] },
          ],
        },
      },
      {
        id: "word-mother", label: "Mother",
        description: "Open your hand wide (the number 5) and tap your thumb against your chin.",
        tip: "Female signs happen near the chin.",
        anim: { hands: [{ shape: "open5", frames: [[136, 96, -12], [128, 96, -12], [136, 96, -12]] }] },
      },
      {
        id: "word-father", label: "Father",
        description: "Open your hand wide (the number 5) and tap your thumb against your forehead.",
        tip: "Male signs happen near the forehead.",
        anim: { hands: [{ shape: "open5", frames: [[136, 48, -12], [128, 48, -12], [136, 48, -12]] }] },
      },
      {
        id: "word-family", label: "Family",
        description: "Make the letter F with both hands, touch them together in front of you, then circle them outward until your pinkies meet.",
        tip: "Two 'F' hands draw a family circle.",
        anim: {
          hands: [
            { shape: "shapeF", frames: [[120, 126, 14], [158, 140, 62], [150, 170, 120]] },
            { shape: "shapeF", mirror: true, frames: [[100, 126, -14], [62, 140, -62], [70, 170, -120]] },
          ],
        },
      },
    ],
  },
  {
    category: "Everyday Words",
    items: [
      {
        id: "word-eat", label: "Eat / Food",
        description: "Pinch your fingertips and thumb together (a flattened O) and tap them to your mouth.",
        tip: "Bringing food to your mouth.",
        anim: { hands: [{ shape: "flatO", frames: [[112, 148, -8], [114, 100, -8], [112, 112, -8], [114, 100, -8]] }] },
      },
      {
        id: "word-water", label: "Water",
        description: "Make the letter W and tap your index finger against your chin a couple of times.",
        tip: "'W' at your chin, where you drink.",
        anim: { hands: [{ shape: "n6", frames: [[126, 100, -10], [118, 100, -10], [126, 100, -10]] }] },
      },
      {
        id: "word-more", label: "More",
        description: "Pinch the fingertips and thumbs of both hands together (flattened O shapes), then tap the fingertips of both hands against each other.",
        tip: "Two pinched hands tap — 'give me more'.",
        anim: {
          hands: [
            { shape: "flatO", frames: [[140, 148, -78], [120, 148, -78], [140, 148, -78], [120, 148, -78]] },
            { shape: "flatO", mirror: true, frames: [[80, 148, 78], [100, 148, 78], [80, 148, 78], [100, 148, 78]] },
          ],
        },
      },
      {
        id: "word-bathroom", label: "Bathroom",
        description: "Make the letter T (thumb between index and middle fingers in a fist) and shake it side to side.",
        tip: "A shaking 'T' — for Toilet.",
        anim: { hands: [{ shape: "shapeT", frames: [[148, 104, -16], [148, 104, 16], [148, 104, -16]] }] },
      },
      {
        id: "word-learn", label: "Learn",
        description: "Hold one palm flat and facing up. With your other hand, 'grab' information off the palm and lift it to your forehead.",
        tip: "Picking up knowledge and putting it in your head.",
        anim: {
          hands: [
            { shape: "flatO", frames: [[90, 152, 0], [104, 108, 0], [116, 56, 0]] },
            { shape: "flat", frames: [[86, 178, 96], [86, 178, 96], [86, 178, 96]] },
          ],
        },
      },
      {
        id: "word-good", label: "Good",
        description: "Touch the fingertips of your flat hand to your chin, then bring the hand down to land on the upturned palm of your other hand.",
        tip: "Starts like 'thank you', lands in your palm.",
        anim: {
          hands: [
            { shape: "flat", frames: [[112, 98, 0], [112, 148, 24]] },
            { shape: "flat", frames: [[112, 180, 96], [112, 180, 96]] },
          ],
        },
      },
      {
        id: "word-bad", label: "Bad",
        description: "Touch the fingertips of your flat hand to your chin, then flip the hand over and move it down and away.",
        tip: "Starts like 'good', but flips away.",
        anim: { hands: [{ shape: "flat", frames: [[112, 98, 0], [124, 146, 168]] }] },
      },
      {
        id: "word-again", label: "Again / Repeat",
        description: "Hold one palm flat and facing up. Bend your other hand and tap its fingertips into the open palm.",
        tip: "Very useful when someone signs too fast!",
        anim: {
          hands: [
            { shape: "bentB", frames: [[152, 116, -45], [106, 150, -92], [152, 116, -45]] },
            { shape: "flat", frames: [[90, 174, 96], [90, 174, 96], [90, 174, 96]] },
          ],
        },
      },
    ],
  },
];

// Real signer video clips (GIFs) for word signs, hotlinked from GIPHY.
// Most come from "Sign with Robert", an ASL education series by Deaf actor
// and ASL consultant Robert DeMayo, published on GIPHY for sharing/embedding.
// Words without an entry fall back to the simplified keyframe animation.
const WORD_VIDEOS = {
  "word-hello": { gif: "3o7TKNKOfKlIhbD3gY", by: "Sign with Robert", page: "https://giphy.com/gifs/signwithrobert-sign-with-robert-3o7TKNKOfKlIhbD3gY" },
  "word-goodbye": { gif: "3o7TKzb3i29i86BPJm", by: "Sign with Robert", page: "https://giphy.com/gifs/signwithrobert-sign-with-robert-3o7TKzb3i29i86BPJm" },
  "word-name": { gif: "3o7TKDJBonanzESryE", by: "Sign with Robert", page: "https://giphy.com/gifs/signwithrobert-sign-with-robert-3o7TKDJBonanzESryE", note: "Clip shows the question “What's your name?”" },
  "word-nice-to-meet-you": { gif: "7R4etle4klLTdlHYmu", by: "BuzzFeed", page: "https://giphy.com/gifs/buzzfeed-asl-international-day-of-sign-languages-i-learned-american-language-for-7R4etle4klLTdlHYmu" },
  "word-please": { gif: "l0MYEXSLkUipy1zVK", by: "Sign with Robert", page: "https://giphy.com/gifs/signwithrobert-sign-with-robert-l0MYEXSLkUipy1zVK" },
  "word-thank-you": { gif: "l0MYrlUnFtq25TQR2", by: "Sign with Robert", page: "https://giphy.com/gifs/signwithrobert-sign-with-robert-l0MYrlUnFtq25TQR2" },
  "word-sorry": { gif: "3o7TKq0oNLk8ljH7vG", by: "Sign with Robert", page: "https://giphy.com/gifs/signwithrobert-sign-with-robert-3o7TKq0oNLk8ljH7vG" },
  "word-yes": { gif: "l4Jz0THKhQLo61NBK", by: "Sign with Robert", page: "https://giphy.com/gifs/signwithrobert-sign-with-robert-l4Jz0THKhQLo61NBK" },
  "word-no": { gif: "l4Jz4faxuS1FiSEV2", by: "Sign with Robert", page: "https://giphy.com/gifs/signwithrobert-sign-with-robert-l4Jz4faxuS1FiSEV2" },
  "word-help": { gif: "l0MYQo0iDSTlnRifK", by: "Sign with Robert", page: "https://giphy.com/gifs/signwithrobert-sign-with-robert-l0MYQo0iDSTlnRifK" },
  "word-i-love-you": { gif: "UNyHCOe7UFeJa", by: "ASL Nook", page: "https://giphy.com/gifs/i-love-you-asl-sign-language-UNyHCOe7UFeJa" },
  "word-friend": { gif: "3o7TKxJ9b7iHDWj0pa", by: "Sign with Robert", page: "https://giphy.com/gifs/signwithrobert-sign-with-robert-3o7TKxJ9b7iHDWj0pa" },
  "word-mother": { gif: "3o7TKOMlsNLawB8B9K", by: "Sign with Robert", page: "https://giphy.com/gifs/signwithrobert-sign-with-robert-3o7TKOMlsNLawB8B9K" },
  "word-father": { gif: "l0HlNzPBWFE3c2Hao", by: "Sign with Robert", page: "https://giphy.com/gifs/signwithrobert-sign-with-robert-l0HlNzPBWFE3c2Hao" },
  "word-family": { gif: "l0HlPEVDldKdcRAsM", by: "Sign with Robert", page: "https://giphy.com/gifs/signwithrobert-sign-with-robert-l0HlPEVDldKdcRAsM" },
  "word-eat": { gif: "l3vRhFBHY2JT5QIdq", by: "Sign with Robert", page: "https://giphy.com/gifs/signwithrobert-sign-with-robert-l3vRhFBHY2JT5QIdq" },
  "word-water": { gif: "26DOtNnaZuvgS5wTS", by: "Sign with Robert", page: "https://giphy.com/gifs/signwithrobert-sign-with-robert-26DOtNnaZuvgS5wTS" },
  "word-bathroom": { gif: "26DONjlzKa7fM9HUI", by: "Sign with Robert", page: "https://giphy.com/gifs/signwithrobert-sign-with-robert-26DONjlzKa7fM9HUI" },
  "word-again": { gif: "Rfek7db5VppCEnUDFa", by: "ASLwithS3S3", page: "https://giphy.com/gifs/asl-again-Rfek7db5VppCEnUDFa" },
};

WORDS.forEach((group) => group.items.forEach((item) => {
  const video = WORD_VIDEOS[item.id];
  if (video) {
    item.gif = video.gif;
    item.gifBy = video.by;
    item.gifPage = video.page;
    if (video.note) item.gifNote = video.note;
  }
}));

// Flat list of every learnable item, used by flashcards, the quiz, and progress tracking.
const ALL_ITEMS = [
  ...ALPHABET.map((item) => ({ ...item, type: "Letter" })),
  ...NUMBERS.map((item) => ({ ...item, type: "Number" })),
  ...WORDS.flatMap((group) => group.items.map((item) => ({ ...item, type: "Word" }))),
];
