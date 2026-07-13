# Sami-Severi Sjöberg Portfolio

A personal portfolio website built with **Vite + React + TypeScript**. It is a
single-page site with Hero, About, Projects, and a Contact section (with a
client-side validated form).

## Development

Standard scripts are defined in `package.json`:

- `npm run dev` — start the Vite dev server (http://localhost:5173)
- `npm run build` — type-check (`tsc --noEmit`) then produce a production build in `dist/`
- `npm run preview` — serve the production build locally
- `npm run lint` — run ESLint (flat config in `eslint.config.js`)
- `npm test` — run the Vitest suite once (`npm run test:watch` for watch mode)

## Project structure

- `src/components/` — UI sections (`NavBar`, `Hero`, `About`, `Projects`, `Contact`, `Footer`)
- `src/data/` — static content (`projects.ts`, `skills.ts`)
- `src/lib/validation.ts` — pure contact-form validation logic (unit tested in `validation.test.ts`)
- `src/index.css` — global styles / design tokens

## Cursor Cloud specific instructions

- Node 22 is used. The environment's default `node` (`/exec-daemon/node`) and the
  nvm-managed `npm` are both Node 22 and work together; you do not need to switch
  node versions.
- `typescript-eslint` does not yet support TypeScript 7, so TypeScript is pinned to
  `^5.x` in `package.json`. Do not bump `typescript` to 7+ or `npm install` / lint
  will hit a peer-dependency conflict.
- The Vite dev server binds to `0.0.0.0:5173` (`server.host: true` in
  `vite.config.ts`) so it is reachable from the VM's browser/desktop pane.
- Run the dev server in a persistent tmux session (it is a long-running process),
  not as a one-shot foreground command.
