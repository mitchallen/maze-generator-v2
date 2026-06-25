
maze-generator-core
==
maze generator core
--

* * *
## Installation

> **Note:** This is a private workspace package. It is not published to npm and is resolved automatically via npm workspaces.

* * *

## Usage

```js
let cgFactory = require("connection-grid-square"),
    mazeCore = require("maze-generator-core");
    
spec = spec || {};

let _x = spec.x || 5;
let _y = spec.y || 6;

let _gridSpec = {
    x: _x,
    y: _y
};

let _connectionGrid = cgFactory.create(_gridSpec);

if(!_connectionGrid) {
    return null;
}

let maze = mazeCore.create( {
    grid: _connectionGrid,
});
    
maze.generate();
```

* * *

## Browser usage

This package builds a browser IIFE bundle at `dist/maze-generator-core.js` exposing the
`window.MitchAllen.MazeGeneratorCore` global. Build it from the repo root with
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

* [bitbucket.org/mitchallen/maze-generator-core.git](https://bitbucket.org/mitchallen/maze-generator-core.git)
* [github.com/mitchallen/maze-generator-core.git](https://github.com/mitchallen/maze-generator-core.git)

* * *

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

* * *

## Version History

#### Version 0.1.7

* updated dependencies
* updated client example

#### Version 0.1.6

* changed __openBorder__ to __afterGenerate__ to make it more generic
* integrated travis-ci and codecov.io
* changed license to MIT
* updated test cases for 100% code coverage

#### Version 0.1.5

* added __openBorder__ placeholder method for derived classes
* updated documentation

#### Version 0.1.4

* refactored generate method

#### Version 0.1.3

* updated browser example

#### Version 0.1.2

* removed file that wasn't being used.

#### Version 0.1.1

* updated browser example to log array

#### Version 0.1.0 

* initial release

* * *
