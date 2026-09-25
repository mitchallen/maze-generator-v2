@mitchallen/maze-generator-square-v2
==
square maze generator
--

> Internal package of [maze-generator-v2](https://github.com/mitchallen/maze-generator-v2). It is not published; it is bundled into `@mitchallen/maze-generator-v2`.
> It continues the code of `@mitchallen/maze-generator-square`, which stays on GitHub Packages frozen at 0.1.29 for existing users.

* * *

## Usage

```js
    "use strict";

    var mazeFactory = require("@mitchallen/maze-generator-square-v2");

    let xSize = 5;
    let ySize = 6;

    var maze = mazeFactory.create({ x: xSize, y: ySize });
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

* [bitbucket.org/mitchallen/maze-generator-square.git](https://bitbucket.org/mitchallen/maze-generator-square.git)
* [github.com/mitchallen/maze-generator-square.git](https://github.com/mitchallen/maze-generator-v2/tree/main/packages/maze-generator-square)

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

* updated @mitchallen/connection-grid-square-v2 to version 0.1.4

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

