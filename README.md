# Maha's Little Elsewhere 🌸

**A small illustrated town made for return visits, not a particular occasion.**

A complete static experience built with HTML, CSS, vanilla JavaScript, inline SVG illustrations and an optional Web Audio soundtrack. No backend, build step, accounts, external libraries, analytics or external asset requests.

## Start here

1. Open this folder and keep its structure intact.
2. For a reliable local preview, start a simple server in this folder:

   ```bash
   python -m http.server 8000
   ```

3. Visit `http://localhost:8000` in a browser. Opening `index.html` directly can work, but local browser storage and caching behave differently under `file://`.
4. To put it online, follow **[DEPLOY.md](DEPLOY.md)**. The folder itself is ready for GitHub Pages.

## Director’s Cut — what changed in v2

This release responds to a deeper interaction and navigation review. The goal is **believable, tactile motion within an illustrated storybook**, rather than photorealistic 3D video.

- **World-first flow on phones.** The introduction is shorter, the town appears substantially earlier, and its buildings are tappable even on small screens.
- **Five-item thumb navigation + destination drawer.** All seven locations remain available. The persistent dock no longer scrolls sideways to hide destinations.
- **No dead ends.** Every scene includes a natural next-detour invitation and a way back to the town.
- **Paper and plant physics.** Envelope flaps rotate on their folds, letter paper unfolds with depth, postcards turn in 3D, and newly placed flowers visibly bloom with animated stems and brief, directionally drifting petals.
- **Camera-directed cinema.** Each film scene has its own subtle camera move; clouds, stars and the traveller have restrained layered motion. The curtain opens in stages. Play/pause/replay is controlled, and the camera freezes when paused.
- **Movement without dependency bloat.** All new motion is native CSS/SVG/JavaScript. Browser View Transitions are optional enhancements; basic navigation is instant when unsupported or reduced motion is requested. The art and functional content remain local.
- **A little town that breathes.** Slow internal SVG cloud/sun animation adds atmosphere without adding random particles throughout the page.

### Important design distinction

The illustrations are still **handcrafted 2D/SVG art**. The animations are meant to feel more physical and cinematic, not to imitate real recorded footage. Photorealistic characters, real-world travel scenes or a fully interactive 3D miniature world would require a separate art-production and performance budget. This site currently prioritizes quick mobile loading and lasting relevance.

## What Maha can explore

- **The town:** original illustrated world with phone-tappable buildings, a first-visit folding envelope, simplified dock, Explore drawer and short onward pathways.
- **Flower Shop:** illustrated flowers, a seven-stem bouquet arranger, undo, restart, a little note, and a locally saved bouquet.
- **Weather Window:** six distinct emotional mini-experiences, including gentle breathing, silly challenges, small celebrations and nostalgia.
- **Post Office:** eight illustrated flip-over postcards, a horizontal swipe gallery on narrow screens, and seven different unfolding letters, including one subtle well-wishing letter.
- **Picture House:** an original five-scene animated film with curtains, scene captions, play/pause, skip and replay.
- **Departure Lounge:** a three-shot travel-film editor with six original scenes and a softly animated cinematic premiere.
- **Little Arcade:** Flower Dash canvas game; a six-pair memory game; and a three-destination packing game. All include real rules and restart or replay controls.
- **Oddities Shop:** lost-and-found drawers, a randomized secret door, a private-on-device future note, and twelve collectible souvenir stamps.
- **Sound:** a softly synthesized optional melody and interaction cues, off by default. It starts only after a user presses the sound control.

## Editing Maha's messages

Open **`js/content.js`** in a text editor. It's the principal editable content file:

- `postcards`: destinations, front subtitles and back messages.
- `letters`: the envelope labels and the paragraphs in each letter.
- `flowers`: the flower colours and their little notes.
- `drawers` and `doorSurprises`: oddities and hidden jokes.
- `shots`: available film-studio scenes and captions.

For the introduction and section titles, edit the text in `index.html`. To adjust the overall look, edit `styles.css`. Interactive logic is isolated in `js/app.js`, `js/games.js`, `js/cinema.js`, `js/postcard-art.js`, and `js/audio.js`.

**Before publishing:** Carefully review the small letter with ID `wishing-well` in `js/content.js`. It mentions a forthcoming procedure without any specific medical details. You can revise or remove it. Don't add identifying family information, personal media, private addresses, unapproved memories, or additional medical information to a public repository.

### Optional personal material

This is fully playable as delivered. It could become more personal with **one or two actual shared memories**, a handwritten sentence in your own words, or one or two photos **only if Maha is happy for them to be on a public website**. Never invent shared memories. You do not need any of these assets to launch the site.

## Privacy, storage and sound

- No analytics, cookies, trackers, backend, login or telemetry.
- The garden, collection, postcards and future note use browser `localStorage` under the key `maha-little-elsewhere-v1`. This is **local to each browser/device**, not synced or encrypted. Someone using the same browser profile could see the saved note.
- The Oddities Shop includes **Erase saved note** and **Clear collected stamps & progress**. The latter intentionally keeps the note; use the separate erase control to delete it.
- Browser clearing, private browsing, storage eviction or switching devices can remove saved progress. A backup or account-sync feature is not included.
- The optional music and cues are generated using the browser's Web Audio API; there are **no music downloads and no third-party audio licenses to manage**.
- The service worker caches this site's own files after a first successful online load, where supported, to help later offline visits. Full offline and installation behaviour depends on the device/browser and should be checked after deployment.
- GitHub Pages links are generally publicly accessible. Even if you send the link to one person, anyone with the link may open it.

## Accessibility and performance

Native buttons, visible focus states, a skip link, semantic headings, labelled controls, dialog escape handling, desktop keyboard games, no-hover-required mobile controls and `prefers-reduced-motion` styling are included. Navigation, postcards and buttons work by taps. The site uses SVG/CSS and no heavyweight 3D engine or font download.

See **[QA.md](QA.md)** for the revised release checks and limitations. In particular, an actual iPhone Safari/WhatsApp in-app-browser check still needs a real device. Please do not assume simulated phone viewports are a physical iPhone test.

## Project files

```text
index.html                 Main accessible page and interactive sections
styles.css                 Original base visual system, layout and responsive rules
refinement.css             Director’s Cut navigation, realistic-material motion, mobile improvements
manifest.webmanifest       Installable-app metadata
service-worker.js          Optional offline cache
.nojekyll                  Prevents GitHub Pages/Jekyll processing
assets/
  little-town.svg          Original illustrated town map
  favicon.svg              Original floral mark
  apple-touch-icon.png     iPhone home screen icon
  icon-192.png             Android/PWA icon
  icon-512.png             Large Android/PWA icon
js/
  content.js               Edit personal messages here
  app.js                   Navigation, garden, moods, mail, travel, collections
  motion.js                Material animations, destination menu, scene transitions
  postcard-art.js          Original postcard scene illustrations
  cinema.js                Original five-scene film
  games.js                 Three actual mini games
  audio.js                 Optional original generative sound
DEPLOY.md                  GitHub Pages deployment instructions
QA.md                      Verification notes and unverified items
README.md                  This file
```

## Design research: decisions worth keeping

- **Codrops / creative transition experiments:** physicality of elements (envelope, card, theatre) over effects without meaning. Inspired, not copied.
- **web.dev animation guidance:** use transform/opacity for most transitions to reduce unnecessary layout work.
- **Reduced motion guidance:** keep equivalent non-moving pathways and remove decorative motion when requested.
- **MDN Web Audio autoplay guidance:** no surprise autoplay; audio is opt-in by direct user interaction.

References: [Codrops PageTransitions](https://github.com/codrops/PageTransitions), [web.dev animation performance](https://web.dev/articles/animations-overview), [prefers-reduced-motion](https://web.dev/articles/prefers-reduced-motion), [MDN autoplay guide](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay).

**A small reminder:** This world is for Maha to enjoy as she likes. She doesn't have to visit it daily, complete the games, or collect every stamp.
