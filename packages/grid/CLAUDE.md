# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`grid` is a local workspace package providing 2D grid implementations (Square, Circle, Hexagon, Triangle) with zero-based indexing. It targets both Node.js and browsers. Hexagon and Triangle are currently mapped to the Square implementation.

## Commands

- **Build + Test**: `npm test` (runs `build.js` via esbuild, then mocha)
- **Build only**: `npm run build` (esbuild — see `build.js`)
- **Test a specific grid type**: `npm run test-square`, `npm run test-circle`, `npm run test-hexagon`, `npm run test-triangle`, `npm run test-create`
- **Run a single test file**: `npx mocha test/square/square-smoke-test.js --timeout 5000`
- **Run tests matching a pattern**: `npx mocha --recursive -g 'pattern' test/ --timeout 20000`
- **Debug-tagged tests**: `npm run test-debug` (runs tests tagged `@DEBUG`)

Note: this is a private workspace package of the `maze-generator-v2` monorepo. From the repo root, `make build` builds all packages in dependency order and `make test` runs every workspace's tests; CI runs both on branch pushes.

## Architecture

- **`src/index.js`** — Main entry point. Exports factory functions: `Square`, `Circle`, `Hexagon`, `Triangle`, and a deprecated `create`.
- **`src/circle.js`** — Circle grid built on `grid-core`. Models concentric rings where each ring's cell count is calculated from circumference ratios.
- **`grid-core`** — Workspace dependency providing the base grid class (rows, get/set, fill, clone, isCell, clampRecursive, etc.).
- **`grid-square`** — Workspace dependency providing the square grid factory.
- **`dist/`** — esbuild output (gitignored; rebuilt by `make build`). `grid.js` (minified IIFE bundle, browser global: `MitchAllen.Grid`) and `grid.cjs.js` (CommonJS bundle, the package `main`). Do not edit directly.

## Code Conventions

- CommonJS modules (`require`/`module.exports`), ES6 features (arrow functions, destructuring, `const`/`let`)
- `"use strict"` in all source files
- JSHint directives at top of files: `/*jshint node: true */` and `/*jshint esversion: 6 */`
- Factory pattern — grids are created via factory functions (e.g., `Square({ x: 5, y: 5 })`), not constructors
- Immutable public properties defined via `Object.defineProperties()`
- Tests use mocha with `should` assertion library (BDD style)
- Test files follow `*-smoke-test.js` / `*-test.js` naming pattern
