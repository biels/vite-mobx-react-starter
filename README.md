# Vite MobX React Starter

A maintained starter for React apps that use Vite, MobX, React Router, Tailwind CSS v4, and TypeScript.

## Requirements

- Node.js `24.21.0` LTS via [`.nvmrc`](.nvmrc), or another version that satisfies `^22.22.0 || >=24.0.0`
- Bun `1.4.2` or newer; npm is also supported

## Create A New App

```bash
bunx degit biels/vite-mobx-react-starter app-name
cd app-name
bun install --frozen-lockfile
bun run dev
```

For an existing checkout, run `nvm install && nvm use` to select the pinned Node version.
With npm, install from `package-lock.json` using `npm ci`, then use `npm run` for the scripts below.

## Available Scripts

```bash
bun run dev
bun run typecheck
bun run test
bun run build
bun run check
bun run preview
```

`bun run check` runs strict TypeScript validation, regression tests, and the production build.
The tests use Vite's development transforms and a minified production bundle to check MobX decorators,
tsyringe constructor injection, singleton stores, reactive state, and theme preferences.
GitHub Actions runs the same checks on a clean installation.

## Dependency Maintenance

The current stack uses React 19.3, Vite 8.3, React Router 8.4, Tailwind CSS 4.3, and TypeScript 7.0.
Import routing APIs from `react-router` and the browser `RouterProvider` from `react-router/dom`.

MobX remains on its latest compatible release line:

- **MobX 6.16 / mobx-react 9.2:** the stores use legacy decorators and `makeObservable(this)`,
  with `experimentalDecorators` and `emitDecoratorMetadata` enabled for tsyringe.
  [MobX 7 requires modern decorators](https://mobx.js.org/enabling-decorators.html), so upgrading it
  requires a coordinated change to the store and dependency injection patterns.

Node types follow the pinned Node 24 LTS line.

Keep both lockfiles synchronized after dependency updates:

```bash
bun update
npm install --package-lock-only --ignore-scripts
bun run check
bun audit
```

Use `bun outdated` to check for newer majors, read their migration guides, and rerun the checks before adopting them.
Before shipping an app, verify the counter, navigation, and theme controls using both `bun run dev` and
`bun run preview`; the regression tests do not render React in a browser.
