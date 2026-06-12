maze-generator-weave
==
weave maze generator
--

## Installation

> **Note:** This is a private workspace package. It is not published to npm and is resolved automatically via npm workspaces.

* * *

## Usage

```js
    "use strict";

    var mazeFactory = require("maze-generator-weave");

    let xSize = 5;
    let ySize = 6;

    var maze = mazeFactory.create({ x: xSize, y: ySize });

    maze.generate();
    maze.printBoard();
```

* * *

## About weave mazes

A weave maze is a square maze where some passages tunnel under (or over) an
existing straight corridor instead of stopping at it. The cell where this
happens is called a __crossing__: it has open passages in all four
directions — two from its original straight corridor (the "over" passage)
and two from the tunnel that passes beneath it (the "under" passage).

`generate` runs a recursive backtracker, same as
[maze-generator-square](../maze-generator-square), but whenever the current
cell is adjacent to a straight, two-way corridor cell that has an unvisited
cell on its far side, it may tunnel through that cell to reach it. Tunnels
are preferred when available — that's the point of a weave maze — but an
ordinary connection is always made when no tunnel is possible.

* `spec.weaveChance` (default `0.6`) — probability of taking a tunnel when
  one is available. `0` produces an ordinary maze with few or no crossings;
  `1` always tunnels when possible.

`printBoard` marks crossing cells with `+`.

```
WEAVE MAZE: 9, 9
 __________________
| |  ___  |  _  | |
|___|  _ + _|  +  |
|  _ + ___|  _|___|
|_____| |  + _  | |
|  ___  |_ +  | | |
|___|    _|___| | |
|  ___| |  _  |_  |
|   |___ +  |_  | |
|_|_______|___|__⏂|
```

## isUnder(x, y)

Returns `"NS"` or `"EW"` if the cell at `x,y` is a crossing — naming the axis
of the tunnel that passes under/over it — or `null` if it is not a crossing.

```js
    var orientation = maze.isUnder(x, y);
```

* * *

## generate(spec)

Same `mask`, `start`, and `open` options as
[maze-generator-square](../maze-generator-square), plus `weaveChance`.

```js
    let spec = {
        start: { c: 3, r: 3 },
        mask: [
            { c: 0, r: 0 },
            { c: 0, r: 1 },
            { c: 1, r: 0 },
            { c: 1, r: 1 },
        ],
        weaveChance: 0.6,
    };
    maze.generate(spec);
```

* * *

## Testing

To test, go to the root folder and type (sans __$__):

    $ npm test

This builds the package (via esbuild) and runs the full test suite. Run the
weave suite directly (builds first via `npm run build`):

    $ npm run test-weave

* * *

## Repo(s)

* [github.com/mitchallen/maze-generator-v2](https://github.com/mitchallen/maze-generator-v2)

* * *

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

* * *

## Version History

#### Version 0.1.0

* initial release

* * *
