connection-grid
==
Map connections between cells in a 2D grid.
--
* * *
## Installation

> **Note:** This is a private workspace package. It is not published to npm and is resolved automatically via npm workspaces.

* * *

## Usage

```js
"use strict";
    
let gridFactory = require("connection-grid");
    
let xSize = 5;
let ySize = 6;

let grid = gridFactory.Square({ x: xSize, y: ySize });
```

## Browser usage

This package builds a browser IIFE bundle at `dist/connection-grid.js` exposing the
`window.MitchAllen.ConnectionGrid` global. Build it from the repo root with
`make build`, then open [`examples/client-example/`](examples/client-example/)
— a runnable example that loads the local build (serve the repo root). As a
private workspace package it is not available on npm or a CDN.

* * *

## Testing

To test, go to the root folder and type (sans __$__):

    $ npm test

This builds the package (via esbuild) and runs the full test suite. Run individual suites (each builds first via `npm run build`):

    $ npm run test-create
    $ npm run test-square
    $ npm run test-hexagon
    $ npm run test-triangle
    $ npm run test-circle
   
* * *
 
## Repo(s)

* [bitbucket.org/mitchallen/connection-grid.git](https://bitbucket.org/mitchallen/connection-grid.git)
* [github.com/mitchallen/connection-grid.git](https://github.com/mitchallen/connection-grid.git)

* * *

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

* * *

## Version History

#### Version 0.1.28

* replaced modules/square.js with connection-grid-square

#### Version 0.1.27

* square now uses grid-square

#### Version 0.1.26

* Replaced modules/base.js with connection-grid-core

#### Version 0.1.25

* Browser now must use __window.MitchAllen.ConnectionGrid__.

#### Version 0.1.24

* Updated CDN URL

#### Version 0.1.23

* Added client example

#### Version 0.1.22

* Changed client window name to 'ConnectionGrid'

#### Version 0.1.21

* Added client distribution

#### Version 0.1.20

* updated to latest grid

#### Version 0.1.19

* Updated documentation for connection directions
* Removed unused code

#### Version 0.1.18

* Refactored __Circle.getNeighbor__
* Fixed bug in __Circle.getNeighbor__

#### Version 0.1.17

* Add __connectsAny__ method

#### Version 0.1.16

* __Cirlce.getNeighbor__ with CW for last cell in ring now wraps properly

#### Version 0.1.15

* Added __Triangle__ method

#### Version 0.1.14

* Fixed bug in __isDir__
* Fixed __Circle__ direction mapp

#### Version 0.1.13

* Refactored code base and tests

#### Version 0.1.12

* Added tests for __Circle__

#### Version 0.1.11

* Added __Hexagon__ and __Circle__ methods

#### Version 0.1.10

* now uses grid 0.1.10

#### Version 0.1.9

* now uses grid 0.1.9
* changed internal use of __grid.create__ to __grid.Square__
* added __Square__ method to replace __create__ method
* added test suites for __Square__ method
* __create__ method now generates deprecation warning

#### Version 0.1.8

* now uses grid 0.1.8
* added experimental __Hexagon__ method

#### Version 0.1.7 

* now uses grid 0.1.7
* x and y values that are missing or less than 0 will be normalized to 0
* updated tests 

#### Version 0.1.6

* added replaced __getDirMap__ function with __dirMap__ property

#### Version 0.1.5

* added __getOppositeDir__ method

#### Version 0.1.5

* added __getOppositeDir__ method

#### Version 0.1.4

* added __mask__ and __isMasked__ methods

#### Version 0.1.3 

* now uses grid 0.1.6

#### Version 0.1.2 

* added __connects__ method

#### Version 0.1.1 

* fixed bug in __hasConnections__

#### Version 0.1.0 

* initial release

* * *
