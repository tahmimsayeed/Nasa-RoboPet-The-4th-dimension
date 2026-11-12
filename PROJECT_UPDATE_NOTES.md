# Project update notes

## Implemented in this update

- Added multi-player local profiles and one-time migration from the old `roboPetPlayer` save key. Existing progress and creative submissions are preserved.
- Added Start a New Game from the Mission Archive and Champion screen, plus saved-player selection on the Welcome screen.
- Fixed the final-mission navigation so the Galaxy Champion screen can appear after the third newly completed mission.
- Connected the three learning challenges to real NASA hardware themes: Apollo 15 Lunar Roving Vehicle, Mars rovers, and Voyager.
- Connected trading cards to the selected robot's NASA mission record.
- Expanded Message Home with fact chips, a drawing pad, postcard preview, print, and text/image downloads.
- Expanded Rescue or Retire to three future-use choices with a reason and risk reflection.
- Made the museum aggregate exhibits from all saved local profiles, show creator/robot details, filter by location and hardware, support reactions and local approval/hide/remove actions, show a local poll summary, and print.
- Added high contrast, browser read-aloud, a short glossary, reduced-motion support, and a basic classroom-language filter for nicknames and creative writing.
- Added app title/description, a custom favicon, PWA icons, and GitHub Pages build/deploy workflow checks.
- Replaced the default Vite README with project instructions and clear offline/classroom limitations.

## Verification performed

- Parsed all 23 JavaScript/JSX source files and the project JSON files: no syntax diagnostics.
- Checked relative source imports: no missing imports found.
- Tested legacy save migration, multiple saved profiles, starting a new game without deleting old profiles, and switching back to an earlier profile: passed.
- Tested basic classroom-language filter cases: passed.
- Checked all 8 NASA mission records for required fields and HTTPS source links: passed.
- Verified generated PWA icon dimensions (192×192 and 512×512).

## Verification still required on the project's Windows development machine

A full Vite production build and Oxlint run could not be completed in this Linux workspace: the uploaded `node_modules` folder contained Windows-specific native packages, and reinstalling dependencies did not finish before the environment timeout. The source syntax and focused save-system tests passed, but this is not a substitute for `npm run lint` and `npm run build` on Windows.

## Features that still need a real backend

- Cross-device/class-wide museum synchronization and poll totals.
- Secure teacher authentication and moderation permissions.
- QR codes and audio recording/submission.

These are intentionally not represented as complete. The current profiles, museum, and poll are local to one browser/device. Audio recording is not enabled because it requires microphone permission and additional child-privacy safeguards.

## November 12, 2026 — Robot layout and print-color correction

- Moved the robot arms into the body element so their position is anchored to the body across robot base shapes.
- Changed wheels/feet to follow the body in normal layout flow instead of being positioned against a fixed-height robot canvas. This prevents the gap that made the limbs look detached.
- Removed the print stylesheet rules that forced the trading card to a white background and black text.
- Added print color-adjust rules and retained the card's dark palette, selected robot body color, and section colors when printing. Browser print settings may still need **Background graphics** enabled.
- The production build should be rerun on the project's Windows machine; dependency installation in the temporary Linux verification environment timed out, so no new build-pass claim is made for this patch.
