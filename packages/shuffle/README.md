
shuffle
==
Uses Fisher-Yates to shuffle an array.
--


* * *
## Installation

> **Note:** This is a private workspace package. It is not published to npm and is resolved automatically via npm workspaces.

* * *

## Usage 

    "use strict";
    
    var shuffleFactory = require("shuffle");
    
	var list = [1, 2, 3, 4, 5];
	
    var shuffler = shuffleFactory.create({ array: list });
    
    var shuffled = shuffler.shuffle();
    
    console.log(shuffled);
    
## Browser usage

This package builds a browser IIFE bundle at `dist/shuffle.js` exposing the
`window.MitchAllen.Shuffle` global. Build it from the repo root with
`make build`, then open [`examples/client-example/`](examples/client-example/)
— a runnable example that loads the local build (serve the repo root). As a
private workspace package it is not available on npm or a CDN.

* * * 
   
## Methods

### create( spec )

Factory method that returns a shuffle object.

It takes one spec parameter that must be an object an array value specifying the array to be shuffled.

The method will return null if create fails, such as with bad parameters.

You can call create multiple times to create multiple shuffle objects.

	var shuffleFactory = require("shuffle");

	var s1 = shuffleFactory.create( { array: [ 1, 2, 3, 4, 5 ] } );
	var s2 = shuffleFactory.create( { array: [ 6, 7, 8, 9, 10 ] }  );

    if(!s1 || !s2) ...
    
### shuffle()

Returns a shuffled version of the array passed to the create method. It does not affect the original but instead returns a shuffled copy. You can call __shuffle__ multiple times and it will keep shuffling it's internal copy.

	var shuffleFactory = require("shuffle");

	var s1 = shuffleFactory.create( { array: [ 1, 2, 3, 4, 5 ] } );
	
	console.log( s1.shuffle() );
	console.log( s1.shuffle() );

* * *

## Testing

To test, go to the root folder and type (sans __$__):

    $ npm test
   
* * *
 
## Repo(s)

* [bitbucket.org/mitchallen/shuffle.git](https://bitbucket.org/mitchallen/shuffle.git)
* [github.com/mitchallen/shuffle.git](https://github.com/mitchallen/shuffle.git)

* * *

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

* * *

## Version History

#### Version 0.1.10

* updated .npmignore

#### Version 0.1.9

* updated test cases for 100% code coverage

#### Version 0.1.8

* integrated travis-ci and codecov.io

#### Version 0.1.4

* Added namespace requirement for browser: changed window.SHUFFLE to window.MitchAllen.Shuffle

#### Version 0.1.3

* updated CDN URL

#### Version 0.1.2

* added client example

#### Version 0.1.1

* added client side distribution

#### Version 0.1.0 

* initial release

* * *
