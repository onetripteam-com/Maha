# Phase 3 — Personal Layer

Implemented: five moods and 75 editable notes, repeat-avoidance per mood, Kuwait time-of-day variants, seven letters, eight postcards, stamps, locally kept cards, future note with TXT export, a postbox with manual copy or optional mailto recipient, and the Quiet Carriage with illustrated rain and optional breathing visual.

The procedure-specific note section remains hidden unless a date is configured in `content/config.json` (`surgeryDate`, `YYYY-MM-DD`). It is shown only within 7 days before, the day of, and 14 days afterward, using Kuwait calendar dates.

Edit words in `content/notes.json`, `content/letters.json` and `content/postcards.json`. These are starter words and should be personalized with real memories. Do not commit sensitive material to this public repository. No recipient email is configured by default. Sending is never automatic.

Photo manifest: `content/photos.json` (empty, maximum ten). Voice-note recordings and full comfort media are placeholders until assets are provided.

Upcoming Phase 4: vlogging studio, playable arcade games, tiny clips. Phase 5: audio, PWA, comprehensive QA. Browser and device checks remain to be performed.
