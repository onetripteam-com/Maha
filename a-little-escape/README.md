# MAHA — A Little Escape 🌸

Phase 1 of the new **Maha Express** experience, built separately from the existing *Maha's Little Elsewhere* site in the repository root.

## Current features
- Fully illustrated, optional virtual-hug invitation with six escalating refusal responses.
- Handmade SVG flowers that join a seven-stem bouquet one at a time.
- Responsive floral counter, progress indicator, petals, bouquet wrapping and PNG download.
- Reduced-motion toggle and preference support; keyboard-accessible controls and visible focus rings.
- Editable flower copy in `content/flowers.json`.
- Basic local persistence for flower count and motion preference. Works without an account or tracking.

## Run locally
From the repository root:

```sh
python -m http.server 8000
```

Open `http://localhost:8000/a-little-escape/` (do not open as a file URL, because JSON loading needs HTTP).

## GitHub Pages
With Pages set to deploy from `main` at `/(root)`, this preview will live at:
`https://onetripteam-com.github.io/Maha/a-little-escape/`

If GitHub Pages uses a custom domain or another source, the URL differs. No deployment status is implied.

## Upcoming phases
2. Scroll-linked train, painted landscapes, transitions, station lobby.
3. Mood notes, letters, postbox, surgery-date-aware Quiet Carriage.
4. Vlog coach, playable games, tiny clips.
5. Licensed sound assets, full PWA offline, performance and accessibility QA.

## Personalization still needed
Why seven flowers; real inside jokes; favourite comforts/music; surgery date (if confirmed); shared destinations. Placeholder copy is intentionally generic until these details are provided. Keep sensitive information out of a public repository.

## Technical notes
No bundler, runtime dependencies or analytics. Remote Google Fonts are optional and fall back to system fonts. This phase is **not yet an offline PWA**. Motion has a reduced-motion alternative; real-device Safari tests remain necessary.
