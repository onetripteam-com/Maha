# MAHA — A Little Escape 🌸

**Phase 2 — The Maha Express** is committed in `a-little-escape/`. This is a separate project from the existing site in the repository root; no root files are overwritten.

## Working features

**Phase 1**
- Optional, animated virtual hug with six playful refusal responses and replay.
- Seven custom SVG flowers, assembled into a bouquet with paper wrap, ribbon and PNG export.
- Mobile-responsive styling; stored bouquet progress and reduced-motion preference.

**Phase 2**
- Scroll-linked slow-train scene, with a sticky illustrated carriage/window, six landscape moods, layered scenery and journey progress.
- Painted CSS/SVG-like scenery that requires **no video files**; landscape changes include Kerala backwaters, Bangalore rain, Kuwait golden hour, mountains, rainy glass and a cloudscape.
- Six station destinations presented as touch-friendly cards below the journey. Each station has its own room/entry scene and a return route to the train or hub.
- Last Station closes the experience with **“This place doesn't expire.”** and a path to the hub.
- Returning-visit Station Hub, with a Kuwait-local time-aware Today board and direct doors to all six stops.
- View Transitions API for supported browsers, immediate fallback navigation for unsupported/reduced-motion browsers, and a persistent reduced-motion toggle.
- Content-driven station names and introductory copy in `content/stations.json`.

## What is deliberately not finished yet

The station interiors are real navigable spaces, but their deeper features are forthcoming:
- Phase 3: 75 mood notes, letters, postbox, stamp passport, date-aware surgery notes and Rest Room.
- Phase 4: vlog coach, three playable arcade games, Tiny Clips.
- Phase 5: licensed sound, richer captions, PWA/offline caching, final accessibility, mobile performance and real-device QA.

The train currently uses hand-painted CSS layers, not real video. Optional video loops and their fallback handling will follow later. Avoid placing personal/sensitive information in this **public GitHub repository**.

## Run locally

Serve from the **repository root**:

```sh
python -m http.server 8000
```

Open `http://localhost:8000/a-little-escape/`. JSON content won't reliably load with `file://`.

If GitHub Pages publishes `main` from `/(root)`, the preview path is:

`https://onetripteam-com.github.io/Maha/a-little-escape/`

The address above is conditional on Pages configuration; it is not a deployment confirmation.

## Editing

- `content/flowers.json`: flower names, colours and messages.
- `content/stations.json`: six stops, subtitles, hint text and descriptions.
- `content/config.json`: future surgery-date config (currently null; not yet consumed).
- `css/site.css`: original design system and Phase 1.
- `css/train.css`: Phase 2 train, station and hub visuals.
- `js/app.js`: hug, bouquet, scene router.
- `js/train.js`: train progress, station navigation, returning visits and Kuwait clock.

## Performance and accessibility

No JavaScript framework or build step. Scroll updates are throttled to one per animation frame; layers animate primarily with transforms. The content cards are keyboard-accessible native buttons and stay reachable without scrolling the animated route. Motion-sensitive visitors get stopped parallax and short scene transitions. Neither 60fps nor cross-browser support has been verified on actual mid-range phones or physical iPhones yet.

## Creative note

The project's visual identity is warm, editorial, earthy and analog, not a space or glow theme. Personal writing is intentionally provisional until real shared jokes and memories are supplied. The website does not include trackers or analytics.
