export const homeCopy = {
  hero: {
    kicker: "A THRILLER BY TODD SHEVLIN", titleFirst: "12 MINUTES", titleMiddle: "TO", titleLast: "FREEDOM",
    quote: "They framed the wrong guy. And now he was going to prove it.",
    body: "An IT manager framed for his CEO's murder, a corrupt small-city police department, and the online gaming crew who show up in person to help him prove it.",
    read: "Read Chapter One Free", rating: "Rated 5.0 of 5 on Amazon (4 ratings)", human: "Human-written. No AI.", scroll: "SCROLL TO START THE CLOCK",
  },
  premise: {
    kicker: "THE SETUP", title: "You will know who did it by Chapter 3. Jake won't.",
    paragraphs: [
      "Jake Ledger is twenty-five, an IT manager at ExperiCorp, and the kind of strategist who thinks three steps ahead. On a Tuesday morning his badge fails at the gate, a vice president walks toward him with two police officers, and the handcuffs come out before anyone says a word. So he runs.",
      "By the time he sees his own face on a dive bar television, the story is set: the company's CEO has been killed with Jake's own office scissors, and the evidence is already sealed. This is not a whodunit. You will watch the frame being built. The question is whether a man the whole town thinks is a killer can prove what you already know.",
    ],
    tags: ["Corporate conspiracy", "Framed for murder", "Found family", "Techno-thriller", "Police corruption", "Dramatic irony"],
    facts: ["278 pages", "22 chapters", "Hardcover, paperback, Kindle", "Collingwood Press, August 2026"],
    action: "Open the full case",
  },
  evidence: {
    kicker: "EXHIBITS", title: "Four things that don't add up.",
    cards: [
      { label: "The badge", text: "His badge swipe turned red instead of green. Then the VP walked out with two police officers." },
      { label: "The scissors", text: "Weapons used in fights ended up on the floor. On the desk. In the victim. Not neatly placed on a seat cushion like someone had set them down." },
      { label: "The wrong hand", text: "The slashes were across the left side of Johnson's face and body. Jake was left-handed; anyone who knew him would know that." },
      { label: "The speed", text: "The forensics came back impossibly fast. Someone decided the answer before the lab was involved." },
    ],
    note: "Something is wrong.", attribution: "Officer Meg Heller's notebook, Chapter 4",
  },
  squad: {
    kicker: "PLAYER ROSTER", title: "His team has never been in the same room.",
    intro: "For two years Jake has led the same crew in the strategy game StratoFortress under the handle Archimedes. He has met exactly one of them in person. When the whole town turns on him, they log off and show up.",
    players: [
      { handle: "ARCHIMEDES", name: "Jake Ledger", role: "The Strategist", quote: "We're outnumbered, but we're smarter. That's all we need." },
      { handle: "AQUABOT", name: "Max Chen", role: "The Friend He Has Met", quote: "Classic Archimedes. They won't see it coming." },
      { handle: "PWNEDAGAIN", name: "Greg Morrison", role: "The Hacker", quote: "Command center, ready to hack their comms." },
      { handle: "SEMPERGUY", name: "Marcus Washington", role: "The Marine", quote: "I'll never leave a man behind. Eighteen years in the Corps taught me that." },
      { handle: "STAGEGURL", name: "Charlotte", role: "The Actress", quote: "16 vs 11 and we didn't lose a single player. How do you DO that?" },
      { handle: "ILUVCARS", name: "Pete \"Luv\" Hernandez", role: "The Wheels", quote: "Later, Archimedes. Sick strategy as always." },
      { handle: "LAWABIDINGCTZN", name: "Rachel Matsuda", role: "The Lawyer (remote)", quote: "Fair warning: I'm sarcastic, expensive, and I don't lose.", remote: true },
    ],
    quote: "They all are. Your whole weird online family.", credit: "Carly Dennison, Chapter 2",
  },
  clock: { kicker: "THE CLOCK", title: "To clear his name, he has to break into the company that framed him.", body: "One building. One air-gapped server. A plan built by a man who thinks three steps ahead, and a crew of people who met inside a game. The plan takes twelve minutes. Minute thirteen was not in the plan." },
  chapter: { kicker: "START READING", title: "Start the clock tonight.", body: "Read Chapter One right now, free, no sign-up. Want Chapter Two and the Meet the Squad card? Drop your email and they land in your inbox in seconds.", action: "Read Chapter One" },
  author: { kicker: "THE AUTHOR", title: "Written by a human. On purpose.", body: "The author lives in the Philadelphia area with his wife, two children, and three cats. When he isn't writing he works in financial technology (fintech) and plays locally in a band.", second: "The copyright page of 12 Minutes to Freedom says it plainly: no portion of the manuscript was generated using artificial intelligence.", caption: "TODD SHEVLIN / PHILADELPHIA AREA", action: "Meet Todd" },
  reviews: { title: "Early readers are in.", lead: "out of 5 stars on Amazon, from", tail: "ratings", note: "as of", empty: "Your review could be the next exhibit. Finished the book? Tell the next reader what you thought.", amazon: "Review on Amazon", goodreads: "Rate on Goodreads" },
  buy: { title: "Pick your format.", library: "Prefer the library? Ask your local library to order it by title and author.", audio: "Human-narrated audiobook in production.", audioButton: "Tell Me When It's Out" },
  blog: { kicker: "FIELD NOTES", title: "From the blog", action: "View all posts" },
} as const;
