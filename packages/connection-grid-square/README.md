
connection-grid-square
==
Connection grid for square array
--


* * *
## Installation

> **Note:** This is a private workspace package. It is not published to npm and is resolved automatically via npm workspaces.

* * *

## Usage

```js
"use strict";
    
let gridFactory = require("connection-grid-square");
    
let xSize = 5;
let ySize = 6;

let grid = gridFactory.create({ x: xSize, y: ySize });
```

## Browser usage

This package builds a browser IIFE bundle at `dist/connection-grid-square.js` exposing the
`window.MitchAllen.ConnectionGridSquare` global. Build it from the repo root with
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

* [bitbucket.org/mitchallen/connection-grid-square.git](https://bitbucket.org/mitchallen/connection-grid-square.git)
* [github.com/mitchallen/connection-grid-square.git](https://github.com/mitchallen/connection-grid-square.git)

* * *

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

* * *

## Version History

### Version 0.1.9

* updated .npmignore
* updated dependencies

### Version 0.1.8

* updated to latest version of grid-square and connection-grid-core
* updated test coverage to 100%

### Version 0.1.7

* integrated travis-ci and codecov.io

### Version 0.1.6

* installed latest version of __connection-grid-core__ 

### Version 0.1.5

* installed latest version of __connection-grid-core__ 
* refactored documentation

#### Version 0.1.4

* corrected version history

#### Version 0.1.3

* installed latest version of __connection-grid-core__ 
* updated npm scripts
* updated client example
* integrated jsdoc 

#### Version 0.1.2

* error while publishing, trying again

#### Version 0.1.1 

* added missing package dependency for __connection-grid-core__

#### Version 0.1.0 

* initial release

* * *
