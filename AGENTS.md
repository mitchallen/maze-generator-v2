# Repository Guidelines

## Project Structure & Module Organization
This repository is an npm workspaces monorepo for maze generation libraries.
- Root package: `src/` (entry modules), `dist/` (bundled output), `test/` (root smoke tests), `examples/` (browser/client demos).
- Workspace packages: `packages/*` (for example `grid-core`, `connection-grid`, `maze-generator-core`, `maze-generator-square`).
- Package-local tests usually live under each package’s `test/` directory, and package demos under `examples/client-example/`.

## Build, Test, and Development Commands
Use Node `>=20` and npm `>=10`.
- `make install`: install root and workspace dependencies.
- `make build`: run `build` scripts across all workspaces.
- `make test`: run `test` scripts across all workspaces.
- `npm test`: root build + recursive Mocha tests.
- `npm run test-square` (or `test-hexagon`, `test-triangle`, `test-circle`, `test-ascii`): run targeted suites.
- `make clean`: remove all `node_modules` folders in the monorepo.

## Coding Style & Naming Conventions
Code is CommonJS-first and uses JSHint/Grunt tooling.
- Indentation: 4 spaces; include semicolons.
- Prefer `var` in legacy modules; use `let`/`const` only where already established.
- File names are kebab-case or shape-oriented (for example `hexagon.js`, `smoke-test.js`).
- Keep public API factory names in PascalCase (`Square`, `Hexagon`, `Triangle`, `Circle`) to match existing exports.

## Testing Guidelines
Mocha + Should are the primary test stack.
- Place tests in `test/**` using `*-test.js` naming.
- Keep smoke coverage for each shape/module (`square`, `hexagon`, `triangle`, `circle`, `ascii`).
- Run `make test` before opening a PR; for quick validation, run the relevant targeted test script first.

## Commit & Pull Request Guidelines
Recent history shows two common commit patterns:
- Imperative summaries (for example, `Fix repository URL format in package.json`).
- Version bump commits using plain semver (for example, `0.2.3`).

For pull requests:
- Include a concise description, impacted package(s), and test commands run.
- Link related issues when applicable.
- If browser example output changes, include a screenshot or brief console/output snippet.
