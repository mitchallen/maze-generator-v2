
@mitchallen/maze-generator-v2
==

[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/mitchallen/maze-generator-v2/publish.yml)](https://github.com/mitchallen/maze-generator-v2/actions)
[![codecov](https://codecov.io/gh/mitchallen/maze-generator-v2/branch/main/graph/badge.svg)](https://codecov.io/gh/mitchallen/maze-generator-v2)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/mitchallen/maze-generator-v2)](https://github.com/mitchallen/maze-generator-v2)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](https://github.com/mitchallen/maze-generator-v2/blob/main/package.json)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](https://github.com/mitchallen/maze-generator-v2/blob/main/package.json)
[![GitHub last commit](https://img.shields.io/github/last-commit/mitchallen/maze-generator-v2)](https://github.com/mitchallen/maze-generator-v2/commits/main)

maze generator
--

## What's new in v2

This is a new and improved version of the original [@mitchallen/maze-generator](https://www.npmjs.com/package/@mitchallen/maze-generator) package. The v2 repo has been reorganized as an **npm workspaces monorepo**, bringing all of the previously separate dependency packages under one roof. This makes it easier to develop, test, and maintain the entire maze generator stack in a single repository.

Key improvements over v1:

- **Monorepo structure** — all internal packages live in `packages/*` and are managed via npm workspaces, eliminating the need to publish and version them independently
- **Simplified dependency management** — workspace packages are private and resolved locally, so there are no cross-published version conflicts
- **Unified build and test** — a single `make test` or `make build` runs across all workspace packages
- **Modern build tooling** — Grunt/Browserify/Babel/Terser have been replaced with [esbuild](https://esbuild.github.io/); each package builds a browser IIFE bundle and a CommonJS bundle directly from `src/`
- **Updated tooling** — modernized build dependencies and Node.js compatibility (Node 20+, CI runs on Node 24)

* * *
## Installation

This package is published to **GitHub Packages** (not the public npm registry).

By default, npm pulls packages from the public npm registry. To install this package from GitHub Packages, add the scope-to-registry mapping to your **project** `.npmrc`. This line has no secret and is safe to commit:

```
@mitchallen:registry=https://npm.pkg.github.com/
```

GitHub Packages requires authentication even for public packages, so you need a Personal Access Token (PAT) with the `read:packages` scope. Store it in your **user** `~/.npmrc` so it never lands in your repository:

```sh
npm config set //npm.pkg.github.com/:_authToken=YOUR_PAT --location=user
```

> ⚠️ Do **not** put the `_authToken` line in your project `.npmrc` — if it is committed, your token is exposed. Keep it in `~/.npmrc`. In CI, set the `NODE_AUTH_TOKEN` environment variable and reference it with `//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}` instead.

Then install:

```
npm install @mitchallen/maze-generator-v2
```

**Alternative:** You can also specify the registry directly in the install command (useful for CI or one-off installs):

```
npm install @mitchallen/maze-generator-v2 --registry=https://npm.pkg.github.com/
```

If authentication is required, make sure your environment has the appropriate `NPM_TOKEN` or PAT set up.

### Why is a PAT required for public packages on GitHub Packages?

GitHub Packages (npm registry at https://npm.pkg.github.com) enforces authentication for all package access, regardless of visibility.

- Unlike registry.npmjs.org, GitHub Packages does not support unauthenticated access, even for public packages.
- To install any package from https://npm.pkg.github.com, you must use a Personal Access Token (PAT) with at least `read:packages` scope.
- Put the scope mapping in your **project** `.npmrc` (safe to commit):

```
@mitchallen:registry=https://npm.pkg.github.com/
```

- Put the token in your **user** `~/.npmrc` so it never ends up in the repo:

```sh
npm config set //npm.pkg.github.com/:_authToken=YOUR_PAT --location=user
```

## Monorepo (npm workspaces)

- root package: `@mitchallen/maze-generator-v2`
- workspace packages: `packages/*` (private, unpublished internal dependencies)

### Workspace bootstrap

```sh
make install
```

### Common monorepo commands

Running `make` with no target prints a help screen listing all available targets.

```sh
make list     # list workspace packages
make deps     # show workspace dependency tree
make build    # build all workspaces, in dependency order
make test     # run test scripts in all workspaces (if present)
make test-all # alias for make test
make pack     # build, then dry-run npm pack to verify the published tarball
make clean    # remove all node_modules directories
```

### Build process

Every package (including the root) builds with [esbuild](https://esbuild.github.io/) via its own `build.js` (or `npm run build` script), producing two bundles:

- `dist/<name>.js` — a minified browser IIFE bundle exposing a `window.MitchAllen.<Name>` global
- `dist/<name>.cjs.js` — a CommonJS bundle used as the package's `main` entry and by its tests

Because the root package and `packages/grid` / `packages/connection-grid` bundle other workspace packages via `require()`, they must be built *after* their dependencies. `npm run build --workspaces` builds in workspace-listing order (not dependency order) and will fail for this reason — always use `make build`, which runs explicit dependency-ordered build layers (`build-layer1` .. `build-layer4`) before building the root package.

### No conflict with the standalone `@mitchallen/*` packages

Several of these vendored packages share a base name with packages published
separately to GitHub Packages (for example, `@mitchallen/connection-grid`,
`@mitchallen/grid`, `@mitchallen/shuffle`). They **cannot** collide, for three
independent reasons:

1. **They are all `private: true`.** npm refuses to publish a package marked
   private, so the workspace packages are never published anywhere.
2. **They use unscoped names** (`connection-grid`, `grid`, `shuffle`, …), which
   are entirely different identifiers from the scoped, published
   `@mitchallen/connection-grid`, `@mitchallen/grid`, etc. There is no
   namespace overlap. (GitHub Packages only accepts scoped names matching the
   owner, so an unscoped name could not be published there regardless.)
3. **Only the root package is published.** `publish.yml` runs a single
   `npm publish` for `@mitchallen/maze-generator-v2` — it does not publish the
   workspaces.

Because the root's dependencies reference the unscoped names, npm workspaces
links them to the local `packages/*` copies; the published `@mitchallen/*`
versions are never pulled. The monorepo is intentionally self-contained.

### What gets published (and why the deps are `devDependencies`)

The published package contains **only the `dist/` bundles** — there is no
runtime dependency on `grid`, `connection-grid`, `maze-generator-square`, etc.,
even though the code clearly uses them. Two things make this work:

1. **esbuild bundles everything at build time.** `build.js` runs esbuild with
   `bundle: true`, so every `require('grid')`, `require('connection-grid-square')`,
   and friend is followed and its source is **inlined directly into**
   `dist/maze-generator-v2.cjs.js` (and the IIFE `dist/maze-generator-v2.js`).
   The shipped bundle has no external `require()` calls pointing at those
   packages — the code is physically baked in.

2. **So those packages are build-time-only inputs.** Because they are consumed
   and discarded when the bundle is produced, they live in **`devDependencies`**,
   and the package declares **no runtime `dependencies` at all**. A consumer who
   runs `npm install @mitchallen/maze-generator-v2` downloads just the
   self-contained `dist/` and never has to resolve `grid` et al. from any
   registry. (This is exactly what made the package installable — see the
   `fix: make the published package installable` change that moved these from
   workspace deps to `devDependencies`.)

#### The published file list is an allowlist

`package.json` uses a `files` allowlist so that **only `dist/` is ever
published**:

```json
"files": ["dist"]
```

This is deliberately a small *allowlist* rather than an `.npmignore` *blocklist*.
A blocklist silently leaks anything you forget to add to it: this package was
previously shipping ~1.4 MB of `coverage/` test-output because `.npmignore`
excluded `src/`, `test/`, etc. but never listed `coverage/`. (Note: when an
`.npmignore` file exists, npm uses it and **ignores `.gitignore` entirely** —
so even though `coverage/` was git-ignored, it still ended up in the tarball.)
An allowlist can't leak: anything not named simply does not ship.

#### Verify the tarball before publishing

Run a dry-run pack to see exactly what `npm publish` would include:

```sh
make pack
```

This builds the root bundle and then runs `npm pack --dry-run`. The output
should list **only** `package.json`, `README.md`, and the `dist/` files — no
`src/`, `test/`, `coverage/`, or other build artifacts.

To enforce that automatically, run the packaging check:

```sh
make pack-check
```

This builds, then runs `scripts/check-pack.js`, which packs with
`npm pack --dry-run --json` and **exits non-zero** if the tarball contains any
file outside `dist/` (plus npm's always-included `package.json` / `README` /
`LICENSE`), or if a required entry point (`dist/maze-generator-v2.cjs.js`,
`dist/maze-generator-v2.js`) is missing. CI runs this check on every push and
pull request — after generating `coverage/`, so it proves the `files` allowlist
actually keeps build artifacts out of the package — so a packaging regression
fails the build instead of shipping.

* * *

## Usage

```js
    "use strict";

    var mazeFactory = require("@mitchallen/maze-generator-v2");

    let xSize = 5;
    let ySize = 6;

    var maze = mazeFactory.Square({ x: xSize, y: ySize });
```
    
## Browser Usage:

Example:

```html
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Maze Generator Example</title>
        <meta name="description" content="Maze Generator Example">
        <script src="https://cdn.jsdelivr.net/gh/mitchallen/maze-generator-v2@latest/dist/maze-generator-v2.js"></script>
        <script>
          var factory = window.MitchAllen.MazeGeneratorV2;
          console.log(factory);
          var xSize = 10, ySize = 5;
          var sm = factory.Square( { x: xSize, y: ySize } );
          console.log(sm);
          sm.generate();
          sm.printBoard(); 
        </script>
      </head>
      <body>
        <h1>Maze Generator Example</h1>
        <p>See JavaScript developer console for output.</p>
      </body>
    </html>
```


* * *

## Methods

For more methods see the parent class: __connection-grid__ (in `packages/connection-grid`).

### mazeFactory = factory.Square(spec)

Factory method that returns a __square__ maze generator object. 

It takes one spec parameter that must be an object with x and y values specifying the size of the maze.

If x and y size values are less than one (0) they will be normalized to 0.

You can call Square multiple times to create multiple mazes.

    var mazeFactory = require("@mitchallen/maze-generator-v2");

    var maze1 = mazeFactory.Square( { x: 5, y: 10 } );
    var maze2 = mazeFactory.Square( { x: 7, y: 20 } );

    maze1.generate();
    maze2.generate();
    
### mazeFactory = factory.Weave(spec)

Factory method that returns a __weave__ maze generator object.

It takes one spec parameter that must be an object with x and y values specifying the size of the maze.

If x and y size values are less than one (0) they will be normalized to 0.

A weave maze is a square maze where some passages tunnel under (or over) an existing straight corridor instead of stopping at it, producing cells (called __crossings__) that are open in all four directions. Pass `weaveChance` (0-1, default 0.6) to control how often a tunnel is taken when one is available; `0` produces an ordinary maze with few or no crossings.

You can call Weave multiple times to create multiple mazes.

    var mazeFactory = require("@mitchallen/maze-generator-v2");

    var maze1 = mazeFactory.Weave( { x: 5, y: 10 } );
    var maze2 = mazeFactory.Weave( { x: 7, y: 20, weaveChance: 0.8 } );

    maze1.generate();
    maze2.generate();

Use `maze.isUnder(x, y)` to check whether a cell is a crossing; it returns `"NS"`, `"EW"`, or `null`. `printBoard` marks crossing cells with `+`.

### mazeFactory = factory.Hexagon(spec)

Factory method that returns a __hexagon__ maze generator object. 

It takes one spec parameter that must be an object with x and y values specifying the size of the maze.

If x and y size values are less than one (0) they will be normalized to 0.

You can call Hexagon multiple times to create multiple mazes.

    var mazeFactory = require("@mitchallen/maze-generator-v2");

    var maze1 = mazeFactory.Hexagon( { x: 5, y: 10 } );
    var maze2 = mazeFactory.Hexagon( { x: 7, y: 20 } );

    maze1.generate();
    maze2.generate();
    
### mazeFactory = factory.Triangle(spec)

Factory method that returns a __triangle__ maze generator object. 

It takes one spec parameter that must be an object with x and y values specifying the size of the maze.

If x and y size values are less than one (0) they will be normalized to 0.

You can call Triangle multiple times to create multiple mazes.

    var mazeFactory = require("@mitchallen/maze-generator-v2");

    var maze1 = mazeFactory.Triangle( { x: 5, y: 10 } );
    var maze2 = mazeFactory.Triangle( { x: 7, y: 20 } );

    maze1.generate();
    maze2.generate();

### mazeFactory = factory.Circle(spec)

Factory method that returns a __circle__ maze generator object. 

It takes one spec parameter that must be an object with a __rings__ value specifying the size of the maze.

You can call Circle multiple times to create multiple mazes.

    var mazeFactory = require("@mitchallen/maze-generator-v2");

    var maze1 = mazeFactory.Circle( { rings: 5 } );
    var maze2 = mazeFactory.Circle( { rings: 6 } );

    maze1.generate();
    maze2.generate();

### maze.generate(spec = null);

Generates a maze by filling a connection grid with connection info. 

    maze.generate();
    
#### maze.generate(spec.mask = array)

Generates a maze with masked off cells.

    let spec = {
        mask: [
            { c: 2, r: 3 },
            { c: 2, r: 4 }
        ]
    };
    mazeGenerator.generate(spec);
    
#### maze.generate(spec.start = array)

Generates a maze starting at a cell other than 0,0. Useful when you want to mask off 0,0.

    let spec = {
        start: { c: 3, r: 3 },
        mask: [
            { c: 0, r: 0 },
            { c: 0, r: 1 },
            { c: 1, r: 0 },
            { c: 1, r: 1 }
        ]
    };
    mazeGenerator.generate(spec);

### maze.printBoard()

Logs to the console the generated maze. You should examine the source for this method to determine other ways to display the generated maze.

    maze.generate();
    maze.printBoard();

Example:

    SQUARE MAZE: 20, 20
     _______________________________________
    |_  |    ___  |___   _   _|  ___   _  | |
    | | | |___  | |   |_  |_____| |  _|  _| |
    |  _| |_  | |___| | |  _____  |_  | |_  |
    |_  |  ___|_  | | |  _|  _  |___| | |   |
    | | |_|  _____| | |_|  _| | |  ___|___| |
    | |_____|    ___|_  | |  _|___|     |  _|
    |_____   _|_|  _  | | |    _|  _| |_|_  |
    |  _____|  ___| |___| |_| |  _|  _|  ___|
    | |   |  _|_   _______|  _| | |_  | |   |
    |  _| | |   | |  ___    |  _| |  _| |_| |
    |_  |___| |___|  _|  _| | |_  |_  |_  | |
    | | |  ___  | | |   |___|_  |_  |_  |_  |
    | | |___  | | | | | |  _____|  ___|_____|
    |  _|   | | | | | | |_  | |  _  |  _   _|
    |_  | |___| | | | |_|  _| | |  _| | |_  |
    |  _|___  | |  _|_____|_  | |_____|  _| |
    |_  |  ___| |_  |   |   |___   ___  |  _|
    |  _|_|  ___| | | |___| |   |_|   | |_  |
    | |  ___| |   | | |  _| | |_  | | |___| |
    |___|_______|_____|_______|_____|_______|
    

    HEXAGON MAZE: 10, 5
     _   _   _   _   _   
    / \_/ \_/ \_/ \_/ \_ 
    \ / \_       _  \_  \
    /  _  \_/ \_/  _/ \ /
    \_/ \_  \ /  _/  _  \
    /  _  \ / \ /  _/ \ /
    \_/ \ /  _/ \ /  _/ \
    /  _  \_/ \ / \ / \ /
    \ /  _/  _/ \ /  _  \
    / \_/ \   \_  \ / \_/
    \_   _  \_   _/  _  \
      \_/ \_/ \_/ \_/ \_/
      

    TRIANGLE MAZE: 10, 5
      ____________________        
     /        \          /        
    /__  __    \        /         
    \       \   \   \   \         
     \ __    \   \   \   \        
     /    \   \      /   /        
    /      \   \ __ /   /         
    \   \      /    \   \         
     \   \ __ /      \   \        
     /            \      /        
    /__  __  __  __\ __ /         
                      

    CIRCLE MAZE: 5
    _________________________________________________
    | _ _ | _ |____ __| _ ___ | _____ __| ___ | ___ |
    __| |_| |____ |__ __|__ |_|__ | | | __| |___| |__
    |_______|   ____|___|___________|_______________|
    _       |________________________________________
    |_______________________________________________|


A weave maze prints like a square maze, except __crossing__ cells (where a
passage tunnels under a corridor) are marked with `+`:

    WEAVE MAZE: 10, 10
     ____________________
    |_  |  _  |  ___   _|
    | |___|  _|___|  +  |
    |  _   + _______|  _|
    |_  | | |  ___  | | |
    |  + _| |_  |  + _| |
    |_|  _ + ___|_ +  | |
    |  +  |_  |  ___| | |
    | |_|_____| | |  _| |
    | |   |___  |  _|   |
    |___|_______|_____|_|


## Publishing to GitHub Packages

To publish this package to GitHub Packages, you need a GitHub Personal Access Token (PAT) with the following scopes:
- `write:packages`
- `read:packages`
- `repo`

Add this token as a repository secret named `GH_PUBLISH_TOKEN`.

The GitHub Actions workflow will use this token to authenticate and publish the package when a version tag is pushed. See `.github/workflows/publish.yml` for details.

To bump the version and trigger a publish:

```
make publish
```

This will switch to the `main` branch, increment the patch version, and push the changes and tags to GitHub — which triggers the publish workflow.

* * *

## Testing

To test, go to the root folder and type (sans __$__):

    $ npm test

This builds the package (via esbuild) and runs the full test suite. To run the tests for all workspace packages in the monorepo:

    $ make test

Run individual suites (each builds first via `npm run build`):

    $ npm run test-square
    $ npm run test-weave
    $ npm run test-hexagon
    $ npm run test-triangle
    $ npm run test-circle
    $ npm run test-ascii
   
* * *
 
## Repo(s)

* [github.com/mitchallen/maze-generator-v2](https://github.com/mitchallen/maze-generator-v2)

* * *

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

* * *

## Version History

#### Version 0.3.3

* documented the weave maze: added a sample `printBoard` output showing `+` crossing cells to the README

#### Version 0.3.2

* restricted the published package to `dist/` via a `files` allowlist (the prior `.npmignore` blocklist had been leaking ~1.4 MB of test `coverage/` output into the tarball); added `make pack` / `make pack-check` and a CI guard (`scripts/check-pack.js`) that fails if anything outside `dist/` would ship
* removed stale per-package `package-lock.json` files left over from the monorepo migration — they were unused (npm workspaces locks at the root) but triggered 279 spurious Dependabot alerts; gitignored `packages/*/package-lock.json` so they can't return

#### Version 0.3.x

* added `maze-generator-weave` package and `factory.Weave` method for generating weave mazes (passages that tunnel under/over existing corridors, producing "crossing" cells)

#### Version 0.2.x

* removed Grunt/Browserify/Babel/Terser from every package in the monorepo
* each package now builds with esbuild (`build.js`), producing a browser IIFE bundle (`dist/<name>.js`) and a CommonJS bundle (`dist/<name>.cjs.js`)
* added dependency-ordered `make build` layers so packages that bundle other workspace packages (root, `grid`, `connection-grid`) build after their dependencies
* CI workflows now run `npm audit --audit-level=high`
* `make` with no target prints a help screen; added `make test-all`

#### Version 0.1.21

* replaced modules/square.js with @mitchallen/maze-generator-square
* updated browser example

#### Version 0.1.20

* Fixed issue integrating new core and grunt with npm test

#### Version 0.1.19

* replaced modules/base.js with @mitchallen/maze-generator-core
* square now uses @mitchallen/connection-grid-square instead of @mitchallen/connection-grid

#### Version 0.1.18

* removed old file from dist folder

#### Version 0.1.17

* added browser client example
* updated documentation

#### Version 0.1.16

* updated package to use @mitchallen/connection-grid version 0.1.25
* added browser client support

#### Version 0.1.15

* updated package to use @mitchallen/connection-grid version 0.1.19

#### Version 0.1.14

* updated package to use @mitchallen/connection-grid version 0.1.18

#### Version 0.1.13

* updated package to use @mitchallen/connection-grid version 0.1.17
* Moved __connectsAny__ from __Circle__ to @mitchallen/connection-grid

#### Version 0.1.12

* Added __Circle__ method
* updated package to use @mitchallen/connection-grid version 0.1.16

#### Version 0.1.11

* Added __Triangle__ method

#### Version 0.1.10

* Added __Hexagon__ method

#### Version 0.1.9

* Corrected version history

#### Version 0.1.8

* updated package to use @mitchallen/connection-grid version 0.1.14
* now use connection-grid.Square instead of .create (deprecated)
* Restructured code base
* Added __Square__ method to replace __create__ method (deprecated)

#### Version 0.1.7

* updated package to use @mitchallen/connection-grid version 0.1.8

#### Version 0.1.6

* updated package to use @mitchallen/connection-grid version 0.1.7
* can now generate empty mazes
* negative x and y sizes will be normalized to zero

#### Version 0.1.5

* updated package to use @mitchallen/connection-grid version 0.1.5

#### Version 0.1.4

* added __start__ and __mask__ options to __generate__ method

#### Version 0.1.3

* updated documentation

#### Version 0.1.2

* now uses @mitchallen/connection-grid 0.1.3
* generate method now fills grid with zeros before generating maze
* max depth is now calculated automatically and no longer needs to be passed to generate method

#### Version 0.1.1 

* fixed error in documentation

#### Version 0.1.0 

* initial release

* * *
