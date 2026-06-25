maze-generator-square
==
square maze generator
--

## Installation

> **Note:** This is a private workspace package. It is not published to npm and is resolved automatically via npm workspaces.

* * *

## Usage

```js
    "use strict";

    var mazeFactory = require("maze-generator-square");

    let xSize = 5;
    let ySize = 6;

    var maze = mazeFactory.create({ x: xSize, y: ySize });
```
    
## Browser usage

This package builds a browser IIFE bundle at `dist/maze-generator-square.js` exposing the
`window.MitchAllen.MazeGeneratorSquare` global. Build it from the repo root with
`make build`, then open [`examples/client-example/`](examples/client-example/)
— a runnable example that loads the local build (serve the repo root). As a
private workspace package it is not available on npm or a CDN.

* * *

## Documentation

* [DOC-API.md](./DOC-API.md)

* * *

## Testing

To test, go to the root folder and type (sans __$__):

    $ npm test
   
* * *
 
## Repo(s)

* [bitbucket.org/mitchallen/maze-generator-square.git](https://bitbucket.org/mitchallen/maze-generator-square.git)
* [github.com/mitchallen/maze-generator-square.git](https://github.com/mitchallen/maze-generator-square.git)

* * *

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

* * *

## Version History

#### Verion 0.1.16

* Fixed broken build due to folder change

#### Version 0.1.12

* updated dependencies
* updated client example

#### Version 0.1.11

* integrated travis-ci and codecov.io
* updated test cases for 100% coverage
* updated .npmignore 
* change license to MIT
* updated dependencies

#### Version 0.1.10

* __afterGenerate__ now fails gracefully for border parameters that are out of range.

#### Version 0.1.9

* completed work on __afterGenerate__
* added new open parameter option to __generate/afterGenerate__ to open maze borders

#### Version 0.1.8

* updated dependencies
* added __afterGenerate__ method (work in progress)

#### Version 0.1.7

* updated connection-grid-square to version 0.1.4

#### Version 0.1.6

* updated maze-generator-core to 0.1.4

#### Version 0.1.5

* removed template based doc

#### Version 0.1.4

* fixed type-o in usage

#### Version 0.1.3

* removed printBorder method
* added jsdoc info
* integrated jsdoc into README

#### Version 0.1.2

* fixed return issue in __create__ method

#### Version 0.1.1

* added mac server script to browser example

#### Version 0.1.0

* initial release

* * *

