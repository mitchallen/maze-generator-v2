
@mitchallen/maze-generator-v2
==
maze generator
--

## What's new in v2

This is a new and improved version of the original [@mitchallen/maze-generator](https://www.npmjs.com/package/@mitchallen/maze-generator) package. The v2 repo has been reorganized as an **npm workspaces monorepo**, bringing all of the previously separate dependency packages under one roof. This makes it easier to develop, test, and maintain the entire maze generator stack in a single repository.

Key improvements over v1:

- **Monorepo structure** — all internal packages live in `packages/*` and are managed via npm workspaces, eliminating the need to publish and version them independently
- **Simplified dependency management** — workspace packages are private and resolved locally, so there are no cross-published version conflicts
- **Unified build and test** — a single `make test` or `make build` runs across all workspace packages
- **Updated tooling** — modernized build dependencies and Node.js compatibility (Node 20+)

* * *
## Installation

This package is published to **GitHub Packages** (not the public npm registry).

By default, npm pulls packages from the public npm registry. To install this package from GitHub Packages, configure your `.npmrc`:

```
@mitchallen:registry=https://npm.pkg.github.com/
```

If you are using a Personal Access Token (PAT), add this line as well:

```
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

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
- Configure your `.npmrc` like this:

```
//npm.pkg.github.com/:_authToken=YOUR_PAT
@mitchallen:registry=https://npm.pkg.github.com/
```

## Monorepo (npm workspaces)

- root package: `@mitchallen/maze-generator-v2`
- workspace packages: `packages/*` (private, unpublished internal dependencies)

### Workspace bootstrap

```sh
make install
```

### Common monorepo commands

```sh
make list     # list workspace packages
make deps     # show workspace dependency tree
make build    # run build scripts in all workspaces (if present)
make test     # run test scripts in all workspaces (if present)
make clean    # remove all node_modules directories
```

### Runtime note

Some workspace packages use older build/test tooling. If `make test` fails under very new Node.js releases, use an LTS runtime (Node 20 or Node 22).
  
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
        <script src="https://cdn.jsdelivr.net/gh/mitchallen/maze-generator-v2@latest/dist/maze-generator-v2.min.js"></script>
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

### gridFactory = factory.create(spec)

The __create__ method is deprecated. Use __Square__ instead.

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

Run all tests using nodemon:

    $ npm run test-nodemon
    
Run suites using nodemon:

    $ npm run test-square
    $ npm run test-hexagon
    $ npm run test-triangle
    $ npm run test-circle
   
* * *
 
## Repo(s)

* [github.com/mitchallen/maze-generator-v2](https://github.com/mitchallen/maze-generator-v2)

* * *

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

* * *

## Version History

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
