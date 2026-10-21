# MAHA — A Little Escape: Phase 5 QA

## Integration fixes and regression coverage (October 21, 2026)
- Fixed repeated/double routing caused by multiple station click handlers.
- Personal rooms now initialize on actual scene entry, so Chai Stall notes, postcard collection counts and the Quiet Carriage's date-aware layer refresh even when entered directly from train cards.
- Railway scenery and Kuwait Today board update after view transitions.
- Added the user-requested uppercase `SURGERY_DATE` config field (null by default), with backward compatibility for the older `surgeryDate` field.
- Added a dependency-free Node smoke test under `tests/smoke.mjs` and GitHub Actions workflow `.github/workflows/maha-escape-smoke.yml` for repeatable syntax, route, manifest, content and selector checks. A workflow commit does not guarantee the run passed; verify the check status under Actions.

## Automated/static checks performed
- Checked JavaScript syntax for app.js, train.js, personal.js, play.js, finish.js and sw.js.
- Verified that direct `#id` selectors in these modules refer to HTML elements; `#vlogChecklist input` is a descendant selector and is intentionally valid.
- Validated the web app manifest parses as JSON.
- Checked that all six station routes now open their correct rooms; the Last Station remains a separate ending.
- Checked navigation includes Hug, Flowers, Train, Hub, Vlog, Arcade, Post, Chai, Quiet, Last.
- No external telemetry scripts were added.

**Not performed:** simulated or real browser interaction testing, Lighthouse, actual physical iPhone/Android testing, audio loudness measurement, or 60fps measurements. Don't treat this phase as complete cross-browser certification.

## Manual test pass — before gifting
1. Load in Chrome Android and Safari iOS; check portrait 360px, 390px, 1440px desktop. Test on a mid-range handset.
2. Choose No in the hug scene; wait for delayed message and proceed; replay No several times. Choose Yes.
3. Hand over 7 flowers, download PNG, refresh and verify bouquet persistence.
4. Board train; scroll to all six landscapes. Use Skip ride and Station lobby shortcuts.
5. Open each stop from hub and train; inspect headings, focus, Back and Last Station closing.
6. Choose each of five moods, trigger 15 notes and verify no repeats until exhausted.
7. Open and keep postcards; open letters. Check stamp count. Save and export future note. Clear browser data only if expected.
8. Test the quiet window animation, paused state and reduced-motion; set a **test** surgery date in config and verify -8/-7/0/+14/+15 date boundaries in Kuwait timezone, then set it back to null.
9. Win/loss test each arcade game. Test touch hold/release in Chai Maker. Test suitcase collisions, rotation and reset. Test keyboard input in Manglish Word.
10. Download vlog title card, persist shot checklist and bucket list; try missing Tiny Clips without broken content.
11. Sound must remain off after reload until explicit user click, including if saved choice was previously on. Mute and repeat.
12. Online once, then DevTools offline or airplane mode and reload. Make sure JSON and illustrated fallback survive; optional videos and remote fonts are not guaranteed offline.
13. Test keyboard-only Tab/Shift-Tab and visible focus; screen-reader headings and status announcements. Run automated contrast audit.
14. Check caching after deploy with a new browser profile. Version cache if you make future changes.

## Known limits / follow-up issues
- No actual video/audio files supplied; sound is locally synthesised ambience and UI tones. Voice-note player slots remain unpopulated.
- New web app manifest supplies an SVG icon; additional PNG icons may improve install support on iOS.
- First load under 3 MB, WCAG AA, and 60fps are targets, **not measured certifications**.
- External Google Fonts may require a first online connection; system fallback fonts remain available offline.
- This static GitHub Pages project is **public**, not access-controlled. noindex is not security.
- Saved notes and stamps are browser-local, not synced, not encrypted, and may be lost if browser data is cleared. Export meaningful personal notes.
- Date-aware surgery layer deliberately defaults off; it is not medical advice and never promises outcomes.
- Word list uses a small Manglish bank. Have a native speaker review alternative transliterations and clue quality before gifting.
- Station cards and sections use static illustration in place of video; the main train has no GSAP/Lenis dependency at present. This avoids mobile library overhead, but visual QA is still necessary.

## Visual refinement pass (21 October 2026)
- Added CSS-painted boat, skyline, trees, plane wing, glass reflection and window muntin across the existing landscape states. No optional video is required for these visuals.
- Fixed stylesheet import precedence: the Google Fonts @import now sits before other CSS rules, with browser fallback fonts retained.
- Extended the offline shell cache to include `css/cinema-polish.css`; version bumped to invalidate old cached styles.
- These changes are source-level visual refinement, not verified Awwwards-level quality or measured phone performance. Check actual screenshots at 360px and 1440px before gifting.
