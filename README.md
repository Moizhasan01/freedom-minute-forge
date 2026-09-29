# Freedom Clock Dev

Build the official author website for the published thriller "12 Minutes to Freedom" by Todd Shevlin (publisher: Collingwood Press). This first message covers the foundation, design system, global layout, and the complete Home page. Later messages will add the other pages. Please read everything before starting.

=== ABSOLUTE RULES (apply to every file, every string, every comment) ===
1. Frontend only: React + TypeScript + Vite + Tailwind + shadcn/ui. Do NOT enable Supabase, Lovable Cloud, auth, or any database or backend. No edge functions. Everything stays TypeScript so the site can later be ported to a WordPress theme.
2. NEVER use the em dash character or the en dash character anywhere: not in copy, alt text, comments, meta tags, or JSON-LD. Use commas, colons, periods, or parentheses. Ranges use the word "to".
3. NEVER generate, fetch, or use AI-generated images, stock photos, or placeholder images. The client's contract forbids AI imagery. The only images allowed are the 8 attached files. Every other visual effect must be made with code (CSS, SVG, canvas).
4. US English spelling throughout.
5. No TikTok and no X/Twitter anywhere (icons, links, share buttons, meta). Allowed socials: Instagram, Facebook, LinkedIn, YouTube, plus Goodreads and Amazon as book links. No Twitter Card meta tags; Open Graph only.
6. Do not invent reviews, testimonials, awards, press mentions, or quotes. Every quote below is verified verbatim from the manuscript; reproduce them exactly.
7. Put ALL visible copy in typed content files under src/content/ (site.ts, home.ts, and later one file per page) so a human copywriter can rewrite it in one place. Components import copy from there. Put all links, IDs and toggles in src/config/site.config.ts.

=== ATTACHED IMAGES: save them to public/images/ with these exact file names ===
- 12-minutes-to-freedom-cover.webp (1323x2000, full front cover; use for the 3D book, zoom views, Open Graph)
- 12-minutes-to-freedom-cover-600.webp (600x907, same cover, use wherever the cover shows under 600px wide)
- hero-runner-police-street.webp (1323x610, landscape crop of the cover art with no text: a man running away from a lit glass office tower at night, two police SUVs with red and blue light bars, wet reflective pavement, city skyline at right, white cracked-glass lines). This is the hero backdrop.
- texture-shattered-sky.webp (443x820, stormy night sky with white cracked-glass lines; section texture)
- texture-lit-tower.webp (330x1500, narrow strip of the glass tower with warm amber lit floors; section texture)
- todd-shevlin-author-portrait.webp (900x1125, the author facing camera, black t-shirt, pale stucco wall)
- todd-shevlin-author-side.webp (900x1125, the author, three-quarter angle, side glance)
- todd-shevlin-author-smile.webp (900x1125, the author smiling)
Always set width and height, loading="lazy" (except the hero, which gets fetchpriority="high" and a preload link), and descriptive alt text.

=== SITE MAP (create all routes now; pages other than Home can be simple styled shells with their H1 and a short intro until the next messages) ===
/ Home
/the-book  (nav label: The Book)
/free-chapter  (nav label: Free Chapter)
/about  (nav label: About Todd)
/press  (nav label: Press)
/blog  (nav label: Blog) and /blog/:slug
/privacy, /cookies, and a themed 404 page
Use React Router. Scroll to top on route change. Add route transitions: a quick horizontal "scanline wipe" (a thin ice-blue line sweeps down the screen and reveals the new page), using the View Transitions API where supported with a simple fade fallback.

=== DESIGN SYSTEM (derived from the cover) ===
Colors as CSS variables and Tailwind theme tokens:
--night #05080F (page background), --night-2 #0B111B (raised surfaces), --steel #323A4B (borders, muted UI), --slate #1B1E24, --paper #EBDFCC (primary text, warm white), --paper-dim #B9AE9C (secondary text), --amber #C9A36B (lit-window glow, primary accent for buttons and highlights), --amber-deep #8B7151, --ice #B1C6CF (secondary accent, the FREEDOM blue-white), --ice-bright #92D3F6 (police-light blue, focus rings, links), --siren #D23B45 (police-light red, used sparingly for alerts and the ACCESS DENIED state).
Check every text/background pair for WCAG AA contrast.
Fonts (Google Fonts, display=swap, preconnect): "Bebas Neue" for display headlines (matches the cover's condensed title), "Barlow Condensed" (300 to 600) for wide-tracked labels, kickers and the author name, "JetBrains Mono" for HUD, timestamps, badge readouts and game handles, "Inter" for UI and body, "Source Serif 4" for long-form reading (the chapter excerpt and blog posts). Fluid type scale with clamp().
Texture: a subtle animated film-grain overlay (SVG feTurbulence, opacity about 0.06) fixed over the whole site, and a faint vignette. Thin 1px rules in --steel. Corners mostly square (2px radius). Buttons: primary = amber fill with night text; secondary = ice outline. Every button is "magnetic" on desktop (pulls toward the cursor within about 40px, springs back) and has a light-sweep shine on hover.

=== MOTION STACK ===
Install and use gsap (with ScrollTrigger and SplitText; GSAP is free for commercial use) and lenis for smooth scrolling synced to ScrollTrigger. Use the useGSAP hook from @gsap/react with proper cleanup. Respect prefers-reduced-motion everywhere: when it is set, disable Lenis, parallax, pinning, the intro, rain, cursor and scroll-scrubbed animations, and use simple opacity fades instead. Pause canvas animations when off screen (IntersectionObserver) or when the tab is hidden. Keep LCP under 2.5s on mobile: the hero image and H1 must render immediately even while the intro plays over them.

Custom cursor (desktop, fine pointer only): a small ice-blue reticle (circle with four tick marks) that follows with slight lag, expands and shows a label ("BUY", "READ", "OPEN", "VIEW") over interactive elements and images, and turns red briefly on click. Hide it on touch devices.

=== HOVER AND SCROLL EFFECTS ON EVERY IMAGE (site-wide requirement) ===
Create one reusable <CinematicImage> component and use it for EVERY image on the site. It provides:
- Scroll: clip-path reveal as the image enters the viewport (a wipe from bottom), plus gentle parallax (the image drifts about 8 percent inside its frame as you scroll).
- Hover (desktop): 3D tilt toward the pointer (max 8 degrees), slight zoom (1.06), a diagonal light-sweep glint, and a duotone-to-full-color transition (images rest at a cool night-blue duotone graded toward --night and --ice, and warm to full color on hover). Author photos rest in a warm amber-to-night duotone.
- Optional variants via props: "cctv" (scanlines, a REC dot, and a monospace timestamp overlay that fade in on hover), "evidence" (a paper tag and pin appear, slight rotation), "rgb-split" (brief chromatic aberration flicker on hover).
- Touch devices: the color and reveal happen on scroll into view instead of hover.
- Reduced motion: no tilt, no parallax; a simple color fade.

=== HOME PAGE, FOLD BY FOLD ===

FOLD 1: HERO "ACCESS DENIED INTO THE CLOCK"
Stage 0, the intro (first visit per session only; remember it in sessionStorage wrapped in try/catch; skippable by click, key press, or a visible "Skip" button; total under 1.6 seconds; never blocks the hero from rendering underneath):
- Black screen. A monospace badge-reader panel types in: "EXPERICORP / MAIN GATE" then "BADGE READ ..." then a status light flips from green to red and the text "ACCESS DENIED" glitches in --siren with a short horizontal jitter. (In the book, Jake's badge swipe turns red instead of green, and then everything goes wrong.)
- Then white cracked-glass lines (SVG paths, drawn with stroke-dashoffset) spread outward from the pointer position (or the screen center on touch), and the black screen shatters into 6 to 8 angular shards (clip-path polygons) that fall away with slight rotation, revealing the hero.
Stage 1, the hero (100svh, pinned for about 1.5 extra screen heights on desktop):
- Background: hero-runner-police-street.webp, object-fit cover, with a slow push-in (scale 1.0 to 1.12). Build depth by stacking the same image 3 times with different CSS mask-image gradients: the sky and skyline band moves slowest, the building and runner band at medium speed, the wet street band fastest, so it reads as layered parallax on scroll and on pointer move (max 20px).
- Police light sweep: two large radial gradients (--siren red on the right, --ice-bright blue at center-right) over the image with mix-blend-mode screen, pulsing alternately about twice per second at low opacity, and reflected as streaks on the wet street band.
- Rain: a lightweight canvas of thin diagonal streaks (max about 120 drops, reduced on mobile, disabled for reduced motion).
- Glass cracks: 2 or 3 subtle white SVG crack clusters in corners that "grow" slightly on scroll.
- Gradient scrim so text stays legible: dark at left and bottom.
- Headline stack, left aligned on desktop, centered on mobile:
  kicker (Barlow Condensed, wide tracking, ice): "A THRILLER BY TODD SHEVLIN"
  H1 (visually): "12 MINUTES" on line 1 in huge Bebas Neue paper white with a subtle distressed texture, then a line with thin rules on both sides and "TO" in the middle, then "FREEDOM" in icy blue (gradient from --ice to --ice-bright). SplitText character reveal: characters rise and unblur in sequence. The accessible H1 text must read "12 Minutes to Freedom: a thriller by Todd Shevlin" (use visually hidden text for the byline part).
  Hook line (Source Serif 4 italic, paper): "They framed the wrong guy. And now he was going to prove it." (verified quote, Chapter 1)
  Subline (Inter, paper-dim, max 60ch): "An IT manager framed for his CEO's murder, a corrupt small-city police department, and the online gaming crew who show up in person to help him prove it."
  CTAs: primary "Buy the Book" (opens the Retailer Modal, see below), secondary "Read Chapter One Free" (links to /free-chapter).
  Micro-proof row (JetBrains Mono, small): "Rated 5.0 of 5 on Amazon (4 ratings)" with 5 small amber stars, then a divider dot, then "Human-written. No AI." Pull these from config (amazonRating.value, amazonRating.count, amazonRating.asOf) so they can be updated; hide the rating if config is empty.
- The 3D book: on the right on desktop (below the text on mobile), a real CSS 3D book object using the cover image as the front face, with a spine (dark, with the title in vertical Bebas Neue), and cream page edges with fine lines on the fore-edge. It floats gently, tilts toward the pointer (max 18 degrees), and as the pinned hero scrolls it rotates about 25 degrees to show the spine. Soft amber rim light and a reflection on the "floor". Clicking it opens the Retailer Modal.
- The Clock: around the book, a thin circular SVG ring with 60 tick marks and a monospace readout "12:00". Scroll progress through the pinned hero scrubs the countdown from 12:00 down to 00:00 (minutes:seconds display, ticks going dark as time drains, ring stroke goes from ice to amber to siren red in the last 10 percent). When it hits 00:00, the whole hero pushes in (camera zooms into the tower) and hands off to Fold 2 with a white flash of about 80ms (not for reduced motion). On mobile, run the countdown as a normal scroll-linked element without pinning.
- Scroll cue at bottom center: "SCROLL TO START THE CLOCK" with an animated line.

FOLD 2: THE PREMISE (link to /the-book)
Kicker: "THE SETUP". Heading: "You will know who did it by Chapter 3. Jake won't."
Body (2 short paragraphs):
"Jake Ledger is twenty-five, an IT manager at ExperiCorp, and the kind of strategist who thinks three steps ahead. On a Tuesday morning his badge fails at the gate, a vice president walks toward him with two police officers, and the handcuffs come out before anyone says a word. So he runs."
"By the time he sees his own face on a dive bar television, the story is set: the company's CEO has been killed with Jake's own office scissors, and the evidence is already sealed. This is not a whodunit. You will watch the frame being built. The question is whether a man the whole town thinks is a killer can prove what you already know."
Tag chips (hover glow): Corporate conspiracy / Framed for murder / Found family / Techno-thriller / Police corruption / Dramatic irony
Book-at-a-glance strip (mono): 278 pages / 22 chapters / Hardcover, paperback, Kindle / Collingwood Press, August 2026
Link button: "Open the full case" to /the-book.
Scroll effect: the heading reveals line by line; a faint texture-lit-tower.webp strip runs down one edge with parallax.

FOLD 3: THE EVIDENCE (pinned horizontal scroll on desktop, vertical stack on mobile)
Kicker "EXHIBITS", heading "Four things that don't add up." Four evidence cards styled like case-file index cards with a numbered tag (EXHIBIT A, B, C, D), a monospace label, and a short line. They slide horizontally as you scroll, each card rotating slightly and settling as it "pins" to a cork-dark board with a red string drawn (SVG) between cards.
A: "The badge" / "His badge swipe turned red instead of green. Then the VP walked out with two police officers."
B: "The scissors" / A quote from Officer Meg Heller's point of view (Chapter 4): "Weapons used in fights ended up on the floor. On the desk. In the victim. Not neatly placed on a seat cushion like someone had set them down."
C: "The wrong hand" / Verified quote (Chapter 1): "The slashes were across the left side of Johnson's face and body. Jake was left-handed; anyone who knew him would know that."
D: "The speed" / "The forensics came back impossibly fast. Someone decided the answer before the lab was involved."
Each card: hover lifts it, straightens it, and the red string tightens.
Below: a handwritten-style note (use Barlow Condensed italic, not a script font): "Something is wrong." with the attribution "Officer Meg Heller's notebook, Chapter 4".

FOLD 4: MEET THE SQUAD (flip cards, link to /the-book#squad)
Kicker "PLAYER ROSTER", heading "His team has never been in the same room.", intro: "For two years Jake has led the same crew in the strategy game StratoFortress under the handle Archimedes. He has met exactly one of them in person. When the whole town turns on him, they log off and show up."
Seven cards styled like a game roster / player card (mono handle, level bar, role tag, subtle holographic foil on hover). Front shows handle, real name, and role. Hover (or tap) flips the card in 3D to reveal the signature line. Stagger-reveal on scroll.
1. ARCHIMEDES / Jake Ledger / The Strategist / back: "We're outnumbered, but we're smarter. That's all we need."
2. AQUABOT / Max Chen / The Friend He Has Met / back: "Classic Archimedes. They won't see it coming."
3. PWNEDAGAIN / Greg Morrison / The Hacker / back: "Command center, ready to hack their comms."
4. SEMPERGUY / Marcus Washington / The Marine / back: "I'll never leave a man behind. Eighteen years in the Corps taught me that."
5. STAGEGURL / Charlotte / The Actress / back: "16 vs 11 and we didn't lose a single player. How do you DO that?"
6. ILUVCARS / Pete "Luv" Hernandez / The Wheels / back: "Later, Archimedes. Sick strategy as always."
7. LAWABIDINGCTZN / Rachel Matsuda / The Lawyer (remote) / back: "Fair warning: I'm sarcastic, expensive, and I don't lose."
Card 7 has a small "REMOTE" status badge. Below the grid, a line from the book in italics: "They all are. Your whole weird online family." (Carly Dennison, Chapter 2)

FOLD 5: THE TWELVE MINUTES (full-bleed band)
Background: texture-shattered-sky.webp enlarged and blurred with a dark overlay, and a giant faint "12:00" in outline Bebas Neue behind the text that counts down as you scroll through the band.
Kicker "THE CLOCK". Heading: "To clear his name, he has to break into the company that framed him."
Body: "One building. One air-gapped server. A plan built by a man who thinks three steps ahead, and a crew of people who met inside a game. The plan takes twelve minutes. Minute thirteen was not in the plan."
CTA: "Buy the Book" (Retailer Modal).

FOLD 6: READ CHAPTER ONE FREE (lead magnet band)
Split layout: left, the 3D book lying open (CSS) or the cover at an angle with a glowing page edge; right, the offer.
Heading: "Start the clock tonight." Text: "Read Chapter One right now, free, no sign-up. Want Chapter Two and the Meet the Squad card? Drop your email and they land in your inbox in seconds."
Two actions: button "Read Chapter One" to /free-chapter, and a one-field email form (label "Email address", button "Send Me Chapter Two"), consent line: "One email with your free chapters, then occasional news from Todd. Unsubscribe anytime." Link to /privacy.
The form uses the shared <NewsletterForm source="home-band"> component (see Email below).

FOLD 7: ABOUT THE AUTHOR (link to /about)
Left: todd-shevlin-author-side.webp in a <CinematicImage> with the amber duotone, a thin amber frame offset behind it that shifts on hover, and a caption in mono "TODD SHEVLIN / PHILADELPHIA AREA".
Right: kicker "THE AUTHOR", heading "Written by a human. On purpose." Body in Todd's own words from his approved bio: "The author lives in the Philadelphia area with his wife, two children, and three cats. When he isn't writing he works in financial technology (fintech) and plays locally in a band." Then: "The copyright page of 12 Minutes to Freedom says it plainly: no portion of the manuscript was generated using artificial intelligence." Button "Meet Todd" to /about.

FOLD 8: READER REVIEWS
Heading "Early readers are in." Show a large rating block from config: "5.0 out of 5 stars on Amazon, from 4 ratings" with a note "as of September 2026" (from config.amazonRating.asOf). Do NOT invent any review text. Beside it an empty-state card styled like an open case file: "Your review could be the next exhibit. Finished the book? Tell the next reader what you thought." Buttons: "Review on Amazon" (config.retailers.amazon.reviewUrl) and "Rate on Goodreads" (config.goodreads.bookUrl). Build a ReviewCarousel component ready for real quoted reviews from a config array (empty now; when empty the carousel is hidden). Carousel requirements for later: accessible, pause on hover, keyboard arrows, no auto-advance faster than 6s.

FOLD 9: WHERE TO BUY
Heading "Pick your format." Format tabs: Hardcover / Paperback / Kindle / Audiobook. Each tab shows the retailer buttons for that format from config (only render retailers that have a URL). Current real links:
Hardcover: Amazon https://www.amazon.com/dp/B0HFB2VCX1
Paperback: Amazon https://www.amazon.com/dp/B0HFBMGG3G
Kindle: Amazon https://www.amazon.com/dp/B0HFBKL3LD
Empty for now (keep in config, hidden until filled): Barnes and Noble, Bookshop.org, Apple Books, Kobo, Google Play Books.
Audiobook tab: "Human-narrated audiobook in production." plus a small email signup (NewsletterForm source="audiobook-waitlist", button "Tell Me When It's Out"). No fake player.
Also a line: "Prefer the library? Ask your local library to order it by title and author." Buttons open in a new tab with rel="noopener".

FOLD 10: FROM THE BLOG (3 latest posts as cards, link to /blog). Use placeholder-free cards pulled from src/content/blog.ts; for now create the data file with these three titles and one-sentence excerpts (full posts come in a later message):
- "What Is FM-200? The Server Room Gas at the Heart of a Thriller" (slug what-is-fm-200-fire-suppression)
- "Can Friends You Met in an Online Game Be Real Friends?" (slug friends-you-met-in-online-games)
- "The Wrong Hand: How a Staged Crime Scene Gives Itself Away" (slug staged-crime-scene-left-handed-clue)

=== GLOBAL COMPONENTS ===
Header: fixed, transparent over the hero, turns into a blurred --night-2 bar with a 1px steel bottom border after scrolling. Left: a text logo "12 MINUTES TO FREEDOM" in Bebas Neue with a tiny ring-clock icon (SVG). Nav links with an underline that draws from left on hover and a mono index number (01 to 06) above each label. Right: "Buy the Book" button. Mobile: full-screen menu with staggered link reveal and a large "Buy the Book" button.
Sticky mobile buy bar: after the hero scrolls out of view on mobile, a slim bottom bar appears: "12 Minutes to Freedom" + "Buy" button (opens the Retailer Modal).
Retailer Modal: accessible dialog (shadcn Dialog). Step 1 choose format (Hardcover, Paperback, Kindle, Audiobook), step 2 choose retailer. Remember the last chosen format in localStorage (wrapped in try/catch). Each retailer button label says the retailer name plainly, like "Buy on Amazon". Every retailer click pushes a dataLayer event: { event: "buy_click", retailer, format, placement }. Opening the modal pushes "retailer_modal_open".
Footer: large faint "12:00" watermark, the logo, short nav, a mini NewsletterForm (source="footer"), book links (Amazon, Goodreads author page https://www.goodreads.com/author/show/71789789.Todd_Shevlin), social icons for Instagram, Facebook, LinkedIn, YouTube rendered ONLY if their URL exists in config (all empty now), legal links (Privacy Policy, Cookie Policy, Cookie Settings button that reopens the consent banner), "Published by Collingwood Press", and a copyright line with the year computed automatically: "(c) {year} Todd Shevlin. All rights reserved." (use the real copyright symbol).
Preloader: none beyond the intro. 

=== EMAIL (no backend) ===
Create src/lib/newsletter.ts with a provider adapter chosen in config: provider: "kit" | "mailmunch" | "mailerlite" | "none". Default "kit" with an empty formId. For Kit, POST form-encoded email_address to https://app.kit.com/forms/{formId}/subscriptions using fetch with mode "no-cors" and treat completion as success; add hidden tag fields for source. If the provider is not configured, do not pretend it worked: show the message "Sign-up is being connected. Please try again soon." and log a console warning in development. NewsletterForm component: one email field, a hidden honeypot field, client-side validation, loading and success states ("Check your inbox. Chapter Two is on its way."), and on success push dataLayer event { event: "newsletter_signup", source, magnet: "first-chapters" }.

=== ANALYTICS AND CONSENT ===
Create src/lib/analytics.ts with a safe push(event) helper to window.dataLayer. Load Google Tag Manager ONLY if config.gtmId is set, and set Google Consent Mode v2 defaults to denied (ad_storage, analytics_storage, ad_user_data, ad_personalization) before GTM loads. Build a cookie consent banner (bottom, --night-2, mono details) with "Accept all", "Reject non-essential", and "Customize" (analytics and marketing toggles). Store the choice in localStorage (try/catch), send gtag consent update, and allow reopening from the footer "Cookie Settings" link.

=== SEO FOUNDATION ===
Install react-helmet-async. A <Seo> component sets title, description, canonical, and Open Graph tags per page (og:image = /images/12-minutes-to-freedom-cover.webp). Home: title "12 Minutes to Freedom by Todd Shevlin | A Techno-Thriller", description "An IT manager framed for murder, a corrupt police department, and an online gaming crew who show up to help. Read Chapter One free." Add JSON-LD on Home: WebSite, Organization (Collingwood Press), Person (Todd Shevlin, sameAs the Goodreads author URL), and Book with workExample editions:
- Hardcover, ISBN 9798951043184, bookFormat Hardcover, datePublished 2026-08-12, numberOfPages 278
- Paperback, ISBN 9798951043177, bookFormat Paperback, datePublished 2026-08-12, numberOfPages 278
- Kindle ebook, ISBN 9798951043160, bookFormat EBook, datePublished 2026-08-14
with author Todd Shevlin, publisher Collingwood Press, inLanguage en-US, genre Thriller, and potentialAction BuyAction targets to the Amazon URLs. Do NOT add AggregateRating (the ratings live on Amazon, not on this site). Semantic HTML5, one H1 per page, logical heading order, skip-to-content link, visible focus rings in --ice-bright.

Please build all of this now with production polish. Test that the intro, pinned hero, horizontal evidence scroll, flip cards, and modal all work on desktop and mobile widths, and that nothing overflows horizontally at 320px.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/132a63b7-f08e-4fa4-8756-21aa8784c2a3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
