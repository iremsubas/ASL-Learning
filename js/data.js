// Learning content for the ASL beginner app.
// Descriptions cover the dominant hand unless both hands are mentioned.
// Text is a study aid only — learners should confirm each sign with video
// resources or fluent signers (see the Resources section on the Home page).

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
  { id: "number-1", label: "1", description: "Hold up your index finger, palm facing toward you. Close your other fingers.", tip: "Just like counting 'one'. ☝️" },
  { id: "number-2", label: "2", description: "Hold up your index and middle fingers, spread apart, palm facing toward you.", tip: "Like the letter V, but palm in." },
  { id: "number-3", label: "3", description: "Hold up your thumb, index, and middle fingers, palm facing toward you.", tip: "Thumb counts! Not the same as 'W'." },
  { id: "number-4", label: "4", description: "Hold up four fingers, spread apart, with your thumb tucked against your palm. Palm faces toward you.", tip: "All fingers, no thumb." },
  { id: "number-5", label: "5", description: "Hold up all five fingers, spread apart, palm facing toward you.", tip: "A full open hand. 🖐️" },
  { id: "number-6", label: "6", description: "Touch your thumb to your pinky. Hold your other three fingers up and spread.", tip: "Looks like 'W' — the smallest finger touches for the number after 5." },
  { id: "number-7", label: "7", description: "Touch your thumb to your ring finger. Hold your other three fingers up.", tip: "One finger over from 6." },
  { id: "number-8", label: "8", description: "Touch your thumb to your middle finger. Hold your other three fingers up.", tip: "Two fingers over from 6." },
  { id: "number-9", label: "9", description: "Touch your thumb to your index finger. Hold your other three fingers up.", tip: "Looks like the letter F." },
  { id: "number-10", label: "10", description: "Make a thumbs-up fist and give it a little shake.", tip: "A shaking thumbs-up. 👍" },
];

const WORDS = [
  {
    category: "Greetings",
    items: [
      { id: "word-hello", label: "Hello", description: "Touch the side of your flat hand near your forehead, then move it outward — like a relaxed salute.", tip: "A friendly salute. 👋" },
      { id: "word-goodbye", label: "Goodbye", description: "Open your hand, palm facing out, and wave it side to side — or fold your fingers down and up like a small wave.", tip: "Just like waving goodbye." },
      { id: "word-name", label: "Name", description: "Make a U handshape with both hands (index and middle fingers extended together). Tap the fingers of your dominant hand on top of the other hand's fingers twice.", tip: "Two 'U' hands tap to make an X shape." },
      { id: "word-nice-to-meet-you", label: "Nice to meet you", description: "NICE: slide your flat dominant palm across the upturned palm of your other hand. MEET: point both index fingers up and bring your hands together so they 'meet'.", tip: "Two signs in a row: a smooth slide, then two 'people' coming together." },
    ],
  },
  {
    category: "Courtesy",
    items: [
      { id: "word-please", label: "Please", description: "Place your flat hand on your chest and move it in a circular motion.", tip: "A polite circle over your heart." },
      { id: "word-thank-you", label: "Thank you", description: "Touch the fingertips of your flat hand to your chin, then move your hand forward and down toward the person you're thanking.", tip: "Like blowing a kiss from your chin." },
      { id: "word-sorry", label: "Sorry", description: "Make a fist (the letter A) and rub it in a circle over the center of your chest.", tip: "A fist circling your heart — showing regret." },
      { id: "word-yes", label: "Yes", description: "Make a fist (the letter S) and bob it up and down, like a head nodding.", tip: "Your fist nods 'yes' for you." },
      { id: "word-no", label: "No", description: "Extend your index and middle fingers together with your thumb, then tap the fingers and thumb together, like a mouth snapping shut.", tip: "Fingers and thumb snap together — 'nope'." },
      { id: "word-help", label: "Help", description: "Make a thumbs-up fist and place it on the flat, upturned palm of your other hand. Lift both hands upward together.", tip: "One hand lifts the other up." },
    ],
  },
  {
    category: "People & Family",
    items: [
      { id: "word-i-love-you", label: "I love you", description: "Extend your thumb, index finger, and pinky while keeping your middle and ring fingers down. Palm faces out.", tip: "Combines the letters I, L, and Y in one hand. 🤟" },
      { id: "word-friend", label: "Friend", description: "Hook your index fingers together, then reverse them and hook the other way.", tip: "Two fingers linked like close friends." },
      { id: "word-mother", label: "Mother", description: "Open your hand wide (the number 5) and tap your thumb against your chin.", tip: "Female signs happen near the chin." },
      { id: "word-father", label: "Father", description: "Open your hand wide (the number 5) and tap your thumb against your forehead.", tip: "Male signs happen near the forehead." },
      { id: "word-family", label: "Family", description: "Make the letter F with both hands, touch them together in front of you, then circle them outward until your pinkies meet.", tip: "Two 'F' hands draw a family circle." },
    ],
  },
  {
    category: "Everyday Words",
    items: [
      { id: "word-eat", label: "Eat / Food", description: "Pinch your fingertips and thumb together (a flattened O) and tap them to your mouth.", tip: "Bringing food to your mouth." },
      { id: "word-water", label: "Water", description: "Make the letter W and tap your index finger against your chin a couple of times.", tip: "'W' at your chin, where you drink." },
      { id: "word-more", label: "More", description: "Pinch the fingertips and thumbs of both hands together (flattened O shapes), then tap the fingertips of both hands against each other.", tip: "Two pinched hands tap — 'give me more'." },
      { id: "word-bathroom", label: "Bathroom", description: "Make the letter T (thumb between index and middle fingers in a fist) and shake it side to side.", tip: "A shaking 'T' — for Toilet." },
      { id: "word-learn", label: "Learn", description: "Hold one palm flat and facing up. With your other hand, 'grab' information off the palm and lift it to your forehead.", tip: "Picking up knowledge and putting it in your head." },
      { id: "word-good", label: "Good", description: "Touch the fingertips of your flat hand to your chin, then bring the hand down to land on the upturned palm of your other hand.", tip: "Starts like 'thank you', lands in your palm." },
      { id: "word-bad", label: "Bad", description: "Touch the fingertips of your flat hand to your chin, then flip the hand over and move it down and away.", tip: "Starts like 'good', but flips away." },
      { id: "word-again", label: "Again / Repeat", description: "Hold one palm flat and facing up. Bend your other hand and tap its fingertips into the open palm.", tip: "Very useful when someone signs too fast!" },
    ],
  },
];

// Flat list of every learnable item, used by flashcards, the quiz, and progress tracking.
const ALL_ITEMS = [
  ...ALPHABET.map((item) => ({ ...item, type: "Letter" })),
  ...NUMBERS.map((item) => ({ ...item, type: "Number" })),
  ...WORDS.flatMap((group) => group.items.map((item) => ({ ...item, type: "Word" }))),
];
