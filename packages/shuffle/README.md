
@mitchallen/shuffle-v2
==
Uses Fisher-Yates to shuffle an array.
--

> Internal package of [maze-generator-v2](https://github.com/mitchallen/maze-generator-v2). It is not published; it is bundled into `@mitchallen/maze-generator-v2`.
> It continues the code of `@mitchallen/shuffle`, which stays on GitHub Packages frozen at 0.1.17 for existing users.

* * *

## Usage 

    "use strict";
    
    var shuffleFactory = require("@mitchallen/shuffle-v2");
    
	var list = [1, 2, 3, 4, 5];
	
    var shuffler = shuffleFactory.create({ array: list });
    
    var shuffled = shuffler.shuffle();
    
    console.log(shuffled);
    
* * * 
   
## Methods

### create( spec )

Factory method that returns a shuffle object.

It takes one spec parameter that must be an object an array value specifying the array to be shuffled.

The method will return null if create fails, such as with bad parameters.

You can call create multiple times to create multiple shuffle objects.

	var shuffleFactory = require("@mitchallen/shuffle-v2");

	var s1 = shuffleFactory.create( { array: [ 1, 2, 3, 4, 5 ] } );
	var s2 = shuffleFactory.create( { array: [ 6, 7, 8, 9, 10 ] }  );

    if(!s1 || !s2) ...
    
### shuffle()

Returns a shuffled version of the array passed to the create method. It does not affect the original but instead returns a shuffled copy. You can call __shuffle__ multiple times and it will keep shuffling it's internal copy.

	var shuffleFactory = require("@mitchallen/shuffle-v2");

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
* [github.com/mitchallen/shuffle.git](https://github.com/mitchallen/maze-generator-v2/tree/main/packages/shuffle)

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
