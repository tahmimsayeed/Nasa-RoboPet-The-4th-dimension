# NASA Robo-Pet Station

An educational space-exploration game built with React and Vite. Learners create a robot pet inspired by real NASA hardware, explore short space missions, discover real NASA missions, and submit creative work.

## Run locally

Requirements: Node.js 22 or later and npm.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite.

## Verify before publishing

```bash
npm run lint
npm run build
npm run preview
```

The production build is written to `dist/`.

## Main features

- Welcome screen with nickname and optional class code.
- NASA-inspired robot bases and custom robot appearance.
- Three interactive learning missions with replay support.
- NASA Mission Discovery records with source links.
- Message Home postcard with fact chips, drawing pad, preview, and text/image download or print.\n- Rescue or Retire decision report with three choices, reasons, and risk reflection.
- Trading card for the selected robot's NASA-inspired hardware.
- Local multi-player profiles, saved progress, and creative submissions.
- Museum wall with local approval demo, filters, reactions, and print layout.
- High-contrast mode, browser read-aloud, glossary, reduced-motion styling.
- Installable PWA with offline app-shell caching after the first successful online visit.

## Saving and classroom limitations

Player profiles and creative work are saved in the browser's local storage. Multiple profiles can be used on the same browser and device, and switching to a new game does not delete earlier profiles.

**This is not yet a shared classroom backend.** Different devices and browsers do not automatically share profiles, museum submissions, or poll results. The teacher view is a demonstration and is not protected by teacher authentication. Do not enter sensitive personal information. A real class-wide museum, secure moderation, QR codes, audio submissions, and synchronized polls require a backend and teacher/student access controls. The drawing pad works locally; microphone recording is intentionally not enabled in this child-focused version.

The optional class code is stored with the local profile; it is not validated against a classroom service.

## Offline behavior

The PWA caches the built application files after the app has been opened successfully online. The first visit requires an internet connection. Local profile data remains on the same browser/device. Offline changes do not synchronize to other devices.

## GitHub Pages

The Vite base path and Pages workflow are configured for:

`https://tahmimsayeed.github.io/Nasa-RoboPet-The-4th-dimension/`

The site is only live after the latest tested commit is pushed to the `feature/real-flow` branch and the GitHub Pages Actions deployment succeeds.

## Team modules

- `src/App.jsx` — application navigation and integration.
- `src/context/GameContext.jsx` — active player and game state.
- `src/services/storageService.js` — local profile persistence.
- `src/pages/PetWorkshop.jsx` — robot customization.
- `src/data/missions.json` and `src/pages/MissionDiscovery.jsx` — NASA mission learning content.
- `src/pages/CreativeMission.jsx` and `src/pages/MuseumWall.jsx` — creative activities and exhibit wall.
