# Sound design and licensing

**Current release:** All audible effects are procedurally generated in the browser with Web Audio API oscillators and a locally generated pseudo-random noise buffer. No royalty-free or CC0 audio recordings are bundled yet, and no third-party audio assets are downloaded. There are therefore no external recording credits to claim.

Sound layers: softened filtered noise (rain/interior texture), two-part low-frequency train pulse (only in train), short melodic positive cue, flower cue, stamp cue, paper/page cue. All audio is optional, muted initially, and activated only after an explicit user gesture; a preference is stored locally. The application suspends the audio context when the page is hidden.

**Future expansion:** For authentic train rails, Kerala rain, chai-shop atmosphere, airport crowd and soft acoustic loops, supply licence-verified CC0 or royalty-free source assets under `assets/audio/` and record: track name, artist, source URL, licence text or version, attribution requirements, any commercial-use restrictions, and download date. Royalty-free does **not** necessarily mean attribution-free. Do not copy commercial music without permission.

Suggested production slots (not provided or claimed as complete):
- `assets/audio/train-loop.ogg`
- `assets/audio/kerala-water.ogg`
- `assets/audio/bangalore-rain.ogg`
- `assets/audio/kuwait-wind.ogg`
- `assets/audio/chai-stall.ogg`
- `assets/audio/soft-guitar.ogg`
- `assets/audio/page-turn.ogg`

Prefer recorded stereo ambience, compressed at appropriate quality, loaded lazily, with poster/visual fallbacks. Keep volume reasonable; test iOS Safari after adding media.
