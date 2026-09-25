
@mitchallen/connection-grid-square-v2
==
Connection grid for square array
--

> Internal package of [maze-generator-v2](https://github.com/mitchallen/maze-generator-v2). It is not published; it is bundled into `@mitchallen/maze-generator-v2`.
> It continues the code of `@mitchallen/connection-grid-square`, which stays on GitHub Packages frozen at 0.1.23 for existing users.

* * *

## Usage

```js
"use strict";
    
let gridFactory = require("@mitchallen/connection-grid-square-v2");
    
let xSize = 5;
let ySize = 6;

let grid = gridFactory.create({ x: xSize, y: ySize });
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

* [bitbucket.org/mitchallen/connection-grid-square.git](https://bitbucket.org/mitchallen/connection-grid-square.git)
* [github.com/mitchallen/connection-grid-square.git](https://github.com/mitchallen/maze-generator-v2/tree/main/packages/connection-grid-square)

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

* installed latest version of __@mitchallen/connection-grid-core__ 

### Version 0.1.5

* installed latest version of __@mitchallen/connection-grid-core__ 
* refactored documentation

#### Version 0.1.4

* corrected version history

#### Version 0.1.3

* installed latest version of __@mitchallen/connection-grid-core__ 
* updated npm scripts
* updated client example
* integrated jsdoc 

#### Version 0.1.2

* error while publishing, trying again

#### Version 0.1.1 

* added missing package dependency for __@mitchallen/connection-grid-core__

#### Version 0.1.0 

* initial release

* * *
