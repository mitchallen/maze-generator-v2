
@mitchallen/connection-grid-core-v2
==
Connection grid core
--

> Internal package of [maze-generator-v2](https://github.com/mitchallen/maze-generator-v2). It is not published; it is bundled into `@mitchallen/maze-generator-v2`.
> It continues the code of `@mitchallen/connection-grid-core`, which stays on GitHub Packages frozen at 0.1.28 for existing users.

* * *

## Usage

```js
"use strict";
    
let gridFactory = require("@mitchallen/connection-grid-core-v2"),
    gridSquare = require('@mitchallen/grid-square-v2')
    
let sourceGrid = gridSquare.create({ x: 5, y: 6 });
	
let _dirMap = { 
        "N": 0x010, 
        "S": 0x020, 
        "E": 0x040, 
        "W": 0x080 };

let _oppositeMap = { "E": "W", "W": "E", "N": "S", "S": "N" };

let cg = gridFactory.create({  
        grid: sourceGrid,     
        dirMap: _dirMap,
        oppositeMap: _oppositeMap 
      });
```

* * *

## Documentation

* [DOC-API.md](./DOC-API.md)

* * *

## Testing

To test, go to the root folder and type (sans __$__):

    $ npm test
   
* * *
 
## Repo(s)

* [bitbucket.org/mitchallen/connection-grid-core.git](https://bitbucket.org/mitchallen/connection-grid-core.git)
* [github.com/mitchallen/connection-grid-core.git](https://github.com/mitchallen/maze-generator-v2/tree/main/packages/connection-grid-core)

* * *

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

* * *

## Version History

#### Version 0.1.12

* Added isDeadEnd method
* Added connectionCount method
* hasConnections accounts for VISITED flag

#### Version 0.1.11

* added experimental getMaxDistance and supporting functions

#### Version 0.1.10

* updated .npmignore

#### Version 0.1.9

* integrated travis-ci and codecov.io
* uses latest version of @mitchallen/shuffle-v2
* updated license to MIT
* refactored test cases to bring code coverage to 100%

#### Version 0.1.8

* corrected reference to derived class in documentation

#### Version 0.1.7

* refactored documentation

#### Version 0.1.6

* fixed issue with documentation

#### Version 0.1.5

* fixed issue with documentation

#### Version 0.1.4

* added web-server to npm scripts
* added message in client example HTML to check JavaScript console

#### Version 0.1.3

* fixed issue with documentation tag

#### Version 0.1.2 

* added __open__ method
* integrated jsdoc
* updated documentation

#### Version 0.1.1 

* added browser example

#### Version 0.1.0 

* initial release

* * *
