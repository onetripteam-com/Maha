# Director’s Cut QA — October 2026

**What was actually checked:** headless Chromium with in-memory document injection (the execution environment blocks direct browser navigation to a local HTTP server). This can check DOM interactions, style, layout, SVG animations and script errors, but it **cannot verify an installed service worker or cross-reload localStorage persistence** because the test document has an opaque origin. The application continues to use the same localStorage schema as v1.

## Verified in this release

- New home layout at **320, 390, 430, 768 and 1440 CSS pixels** had no document-level horizontal overflow or JavaScript exceptions in the main interaction run.
- At 320 and 390 CSS pixels, the seven main destinations were individually opened and observed without page-wide overflow.
- The new Explore sheet opens, closes and navigates into another scene. The updated dock selects major sections.
- The cinema opens its curtain and displays motion-enabled frames. Play, pause, next scene and replay controls have been code-reviewed; a simple start interaction was browser-tested.
- The flower shop adds a stem, changes its count and displays a bloom interaction.
- Postcards flip and show their back text; a letter opens as a modal and closes by Escape.
- Game tabs work; the memory board generates 12 cards, the suitcase game generates 8 selectable items, and the Oddities secret door reveals a real surprise. Existing game logic was otherwise retained from v1.
- The new CSS was exercised at different screen widths, and updated JavaScript modules pass `node --check`.

## Still needs real-device verification

- **iOS Safari on a physical iPhone**, especially 3D card backfaces, the first-visit envelope, picture-house performance, safe-area padding and WhatsApp’s embedded browser.
- Touch responsiveness over long sessions on low-end devices.
- Actual service-worker cache updates and return-visit progress restoration on a deployed HTTPS origin.
- Full screen-reader pass (VoiceOver/TalkBack), accessibility contrast audit and real-device reduced-motion settings.
- Audio output on actual devices. It remains opt-in.

## Pre-share checklist

1. Open the uploaded site on the recipient’s actual phone where possible.
2. Test all five dock buttons, the Explore drawer, every map hotspot and a next-detour link.
3. Build a bouquet, turn over a postcard, open and close a letter, play/pause/replay the cinema.
4. Play all three games and check that restart works.
5. Close the tab, return in a normal browsing session and see whether a saved bouquet and souvenir persist.
6. Recheck the personal messages in `js/content.js`, particularly the discreet well-wishing note, before making the site publicly accessible.

**No claim is made that Safari or WhatsApp on a physical phone has been tested here.**
