
@mitchallen/maze-generator-core-v2
==
maze generator core
--

> Internal package of [maze-generator-v2](https://github.com/mitchallen/maze-generator-v2). It is not published; it is bundled into `@mitchallen/maze-generator-v2`.
> It continues the code of `@mitchallen/maze-generator-core`, which stays on GitHub Packages frozen at 0.1.19 for existing users.

* * *

## Usage

```js
let cgFactory = require("@mitchallen/connection-grid-square-v2"),
    mazeCore = require("@mitchallen/maze-generator-core-v2");
    
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

## Documentation

* [DOC-API.md](./DOC-API.md)
	
* * *

## Testing

To test, go to the root folder and type (sans __$__):

    $ npm test
   
* * *
 
## Repo(s)

* [bitbucket.org/mitchallen/maze-generator-core.git](https://bitbucket.org/mitchallen/maze-generator-core.git)
* [github.com/mitchallen/maze-generator-core.git](https://github.com/mitchallen/maze-generator-v2/tree/main/packages/maze-generator-core)

* * *

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

* * *

## Version History

#### Version 0.1.14

* replaced the legacy grunt/browserify/babel build with [esbuild](https://esbuild.github.io/)
* migrated CI from Travis to GitHub Actions
* modernized dependencies and resolved all `npm audit` / Dependabot alerts
* removed unused `supertest` dependency and stopped tracking `node_modules` in git
* upgraded `should` and `esbuild` to current releases

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
