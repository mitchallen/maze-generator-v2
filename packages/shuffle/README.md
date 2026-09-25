
@mitchallen/shuffle
==
Uses Fisher-Yates to shuffle an array.
--

<p align="left">

  <a href="https://github.com/mitchallen/maze-generator-v2/actions/workflows/ci.yml">
    <img src="https://github.com/mitchallen/maze-generator-v2/actions/workflows/ci.yml/badge.svg?branch=main" alt="Build Status">
  </a>
  
  <a href="https://github.com/mitchallen/maze-generator-v2/actions/workflows/ci.yml?query=branch%3Amain">
    <img src="https://img.shields.io/badge/coverage-100%25-brightgreen" alt="Coverage: 100%">
  </a>
  
  <a href="https://github.com/users/mitchallen/packages/npm/package/shuffle">
    <img src="https://img.shields.io/github/package-json/v/mitchallen/maze-generator-v2?filename=packages%2Fshuffle%2Fpackage.json&label=version" alt="Version">
  </a>
  
  <a href="https://github.com/mitchallen/maze-generator-v2/blob/main/packages/shuffle/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-green">
  </a>
  
</p>


* * *
## Installation

This package is published to the **GitHub Packages** registry, not npmjs.
Versions **0.1.10** and earlier remain on npmjs.org and are no longer updated there.
GitHub Packages requires authentication for every install, even though the
package is public, so you need a GitHub personal access token with the
`read:packages` scope.

1. Route the `@mitchallen` scope to GitHub Packages in your project `.npmrc`.
   This line has no secret and is safe to commit:

       @mitchallen:registry=https://npm.pkg.github.com

2. Add your token to your **user** `~/.npmrc` so it never lands in the repo:

       npm config set //npm.pkg.github.com/:_authToken=YOUR_TOKEN --location=user

   Do **not** put the `_authToken` line in the project `.npmrc` — if it is
   committed, your token is exposed. In CI, set the `NODE_AUTH_TOKEN`
   environment variable and reference it with
   `//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}` instead.

3. Install:

       $ npm install @mitchallen/shuffle --save

> Tip: with the GitHub CLI you can use
> `npm config set //npm.pkg.github.com/:_authToken="$(gh auth token)" --location=user`
> (after `gh auth refresh --scopes read:packages`).
  
* * *

## Usage 

    "use strict";
    
    var shuffleFactory = require("@mitchallen/shuffle");
    
	var list = [1, 2, 3, 4, 5];
	
    var shuffler = shuffleFactory.create({ array: list });
    
    var shuffled = shuffler.shuffle();
    
    console.log(shuffled);
    
## Browser Usage:

You can reference a minimized client version inside an HTML script tag using
the jsDelivr CDN, which serves the file from GitHub by tag:

* https://cdn.jsdelivr.net/gh/mitchallen/shuffle@v0.1.15/dist/shuffle.min.js

Adjust for the version that you wish to use.

The factory function can be retrieved from __window.MitchAllen.Shuffle__:

    var factory = window.MitchAllen.Shuffle;
    var list = [1, 2, 3, 4, 5];
    var obj = factory.create({ array: list });
    var shuffled = obj.shuffle();

Example:

    <!DOCTYPE html>
    <html>
      <head>
    <meta charset="utf-8">
        <title>Shuffle Example</title>
        <meta name="description" content="Shuffle Example">
        <script src="https://cdn.jsdelivr.net/gh/mitchallen/shuffle@v0.1.15/dist/shuffle.min.js"></script>
        <script>
          var factory = window.MitchAllen.Shuffle;
          var list = [1, 2, 3, 4, 5];
          var obj = factory.create({ array: list });
          var shuffled = obj.shuffle();
          console.log(shuffled); 
        </script>
      </head>
      <body>
        <h1>Shuffle Example</h1>
        <p>See the JavaScript console for results.</p>
      </body>
    </html>
    
* * * 
   
## Methods

### create( spec )

Factory method that returns a shuffle object.

It takes one spec parameter that must be an object an array value specifying the array to be shuffled.

The method will return null if create fails, such as with bad parameters.

You can call create multiple times to create multiple shuffle objects.

	var shuffleFactory = require("@mitchallen/shuffle");

	var s1 = shuffleFactory.create( { array: [ 1, 2, 3, 4, 5 ] } );
	var s2 = shuffleFactory.create( { array: [ 6, 7, 8, 9, 10 ] }  );

    if(!s1 || !s2) ...
    
### shuffle()

Returns a shuffled version of the array passed to the create method. It does not affect the original but instead returns a shuffled copy. You can call __shuffle__ multiple times and it will keep shuffling it's internal copy.

	var shuffleFactory = require("@mitchallen/shuffle");

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
