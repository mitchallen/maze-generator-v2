/**
    Module: maze-generator-weave/src/index
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

var cgFactory = require("connection-grid-square"),
  baseGrid = require("maze-generator-core");

/**
 * Maze Generator Core {@link https://www.npmjs.com/package/maze-generator-core|npm documentation}
 * @module maze-generator-core
 */

/**
 * Weave Maze Generator
 * @module maze-generator-weave
 * @augments module:maze-generator-core
 */

// Cell flags marking a "crossing" cell carved by a weave tunnel - the cell
// has all four directions connected (its original straight passage plus the
// tunnel that passes under/over it). The flag records the tunnel's axis so
// printBoard can mark the crossing. These bits sit above the direction bits
// (0x010-0x080) and the connection-grid-core status bits (0x01-0x08), so they
// don't collide with either.
const UNDER_NS = 0x100;
const UNDER_EW = 0x200;

// Perpendicular directions for a given direction - used to detect whether a
// visited neighbor is a straight corridor that a tunnel can pass under.
const PERP = {
  N: ["E", "W"],
  S: ["E", "W"],
  E: ["N", "S"],
  W: ["N", "S"],
};

/**
* Factory method that returns a weave maze generator object.
* It takes one spec parameter that must be an object with x and y values specifying the size of the maze.
* If x and y size values are less than one (0) they will be normalized to 0.
* You can call create multiple times to create multiple mazes.
* @param {Object} options Named parameters for generating a weave maze
* @param {number} options.x Width of the maze
* @param {number} options.y Height of the maze
* @returns {module:maze-generator-weave}
* @example <caption>Creating a maze-generator-weave</caption>
* var mazeFactory = require("maze-generator-weave");
* let xSize = 5;
* let ySize = 6;
* var maze = mazeFactory.create({ x: xSize, y: ySize });
*/
module.exports.create = (spec = {}) => {

  let {
    x: _x = 0,
    y: _y = 0,
  } = spec;

  var connections = cgFactory.create(spec);

  var obj = baseGrid.create({
    grid: connections,
  });

  return Object.assign(obj, {

    /** Returns the axis ("NS" or "EW") of the weave tunnel that passes
      * under/over the cell at x,y, or null if the cell is not a crossing.
      * @param {number} x X coordinate of cell
      * @param {number} y Y coordinate of cell
      * @function
      * @instance
      * @memberof module:maze-generator-weave
      * @returns {string|null}
     */
    isUnder: function (x, y) {
      if (!this.isCell(x, y)) { return null; }
      if (this.isFlagSet(x, y, UNDER_NS)) { return "NS"; }
      if (this.isFlagSet(x, y, UNDER_EW)) { return "EW"; }
      return null;
    },

    /**
      * Generates a weave maze using a recursive backtracker that may
      * occasionally tunnel a passage under (or over) an existing straight
      * corridor, producing a "crossing" cell connected in all four
      * directions. Accepts the same mask/start/open options as
      * {@link module:maze-generator-square}.
      * @param {Object} options Named parameters for generating a maze
      * @param {Array} options.mask An array of cells to mask off from maze generation
      * @param {Object} options.start An object containing the c and r coordinates of the cell to start generation from
      * @param {Array} options.open An array of objects designating what borders to open after generation
      * @param {number} options.weaveChance Probability (0-1) of taking a tunnel when one is available. Defaults to 0.6
      * @function
      * @instance
      * @memberof module:maze-generator-weave
      * @example <caption>generate</caption>
      * maze.generate();
      */
    generate: function (spec = {}) {

      spec = spec || {};

      let aMask = spec.mask || [],
        start = spec.start || {},
        sx = start.c || 0,
        sy = start.r || 0;

      let weaveChance = spec.weaveChance;
      if (typeof weaveChance !== "number") {
        weaveChance = 0.6;
      }

      this.fill(0);

      for (let mKey in aMask) {
        let mask = aMask[mKey];
        this.mask(mask.c, mask.r);
      }

      if (this.isCell(sx, sy) && !this.isMasked(sx, sy)) {

        this.clearAllVisited();

        var stack = [{ x: sx, y: sy }];
        this.markVisited(sx, sy);

        while (stack.length > 0) {

          let cur = stack[stack.length - 1];
          let cx = cur.x, cy = cur.y;
          let moves = [];

          let dirs = this.getShuffledNeighborDirs(cx, cy);
          for (let d of dirs) {
            let n = this.getNeighbor(cx, cy, d);
            if (n === null) { continue; }
            if (this.isMasked(n.x, n.y)) { continue; }

            if (!this.visited(n.x, n.y)) {
              moves.push({ dir: d, x: n.x, y: n.y });
              continue;
            }

            // Tunnel candidate: n is a straight corridor perpendicular to d,
            // not already a crossing, and the cell beyond it is unvisited.
            let [p1, p2] = PERP[d];
            if (
              this.isUnder(n.x, n.y) === null &&
              this.connectionCount(n.x, n.y) === 2 &&
              this.connects(n.x, n.y, p1) &&
              this.connects(n.x, n.y, p2)
            ) {
              let b = this.getNeighbor(n.x, n.y, d);
              if (b !== null && !this.isMasked(b.x, b.y) && !this.visited(b.x, b.y)) {
                moves.push({ dir: d, x: b.x, y: b.y, under: { x: n.x, y: n.y } });
              }
            }
          }

          if (moves.length === 0) {
            stack.pop();
            continue;
          }

          // Favor tunnels when available - they are the point of a weave maze.
          // Fall back to a tunnel only when it's the sole option, so
          // weaveChance: 0 produces an ordinary (non-weave) square maze.
          let tunnelMoves = moves.filter(m => m.under);
          let plainMoves = moves.filter(m => !m.under);
          let pool;
          if (tunnelMoves.length > 0 && Math.random() < weaveChance) {
            pool = tunnelMoves;
          } else if (plainMoves.length > 0) {
            pool = plainMoves;
          } else {
            pool = tunnelMoves;
          }
          let m = pool[Math.floor(Math.random() * pool.length)];

          this.connectUndirected(cx, cy, m.dir);

          if (m.under) {
            // Connect the crossing cell on through to the cell beyond it,
            // turning it into a four-way crossing, and record the tunnel's
            // axis for printBoard.
            this.connectUndirected(m.under.x, m.under.y, m.dir);
            let orient = (m.dir === "N" || m.dir === "S") ? "NS" : "EW";
            this.setFlag(m.under.x, m.under.y, orient === "NS" ? UNDER_NS : UNDER_EW);
          }

          this.markVisited(m.x, m.y);
          stack.push({ x: m.x, y: m.y });
        }
      }

      // derived class can parse extra spec parameters
      this.afterGenerate(spec);
    },

    /**
      * Called by generate after the maze has been generated.
      * Opens border walls, same as {@link module:maze-generator-square#afterGenerate}.
      * @param {Object} spec Object containing named parameters passed through generate method.
      * @param {Array} spec.open Array of objects specifying what borders to open
      * @param {Object} spec.open[i] Item containing info on how to open border
      * @param {string} spec.open[i].border String representing border ("N","E","W","S")
      * @param {number} spec.open[i].list[j] Zero-based id along border designating which cell to open
      * @function
      * @instance
      * @memberof module:maze-generator-weave
      * @example <caption>open north border</caption>
      * var xSize = 5, ySize = 6;
      * var mazeGenerator = factory.create({ x: xSize, y: ySize });
      * let spec = {
      *     open: [
      *         { border: "N", list: [0,2,xSize-1] }
      *     ]
      * };
      * mazeGenerator.generate(spec);
      * mazeGenerator.printBoard();
      */
    afterGenerate: function (spec = {}) {

      let {
        open: aOpen = [],
      } = spec;

      if (aOpen.length === 0) {
        return;
      }

      var borders = ["N", "E", "W", "S"];

      for (var oKey in aOpen) {
        var open = aOpen[oKey];
        if (borders.indexOf(open.border) >= 0) {

          var list = open.list;

          if (!list) {
            console.error("ERROR: open border requires list parameter.");
            continue;
          }

          for (var key in list) {
            var id = list[key];
            if (open.border === "N") {
              if (id >= 0 && id < _x) {
                this.open(id, 0, "N");
              }
            }
            if (open.border === "S") {
              if (id >= 0 && id < _x) {
                this.open(id, _y - 1, "S");
              }
            }
            if (open.border === "W") {
              if (id >= 0 && id < _y) {
                this.open(0, id, "W");
              }
            }
            if (open.border === "E") {
              if (id >= 0 && id < _y) {
                this.open(_x - 1, id, "E");
              }
            }
          }

        } else {
          console.error("ERROR: open.border ('%s') not found", open.border);
        }
      }

    },

    /** Print board to console. Drawing a weave maze works just like
      * {@link module:maze-generator-square#printBoard}, except crossing
      * cells (where a passage tunnels under/over another) are marked with
      * "+".
      * @function
      * @instance
      * @memberof module:maze-generator-weave
      */
    printBoard: function (spec = {}) {
      console.log("WEAVE MAZE: %d, %d", _x, _y);
      let { target = {} } = spec;
      let { x: tX = -1, y: tY = -1 } = target;
      // print top north walls
      var border = "";
      for (var i = 0; i < _x; i++) {
        border += (i === 0 ? " " : "");
        border += this.connects(i, 0, "N") ? "  " : "__";
      }
      console.log(border);
      // print maze east and south walls
      let dirMap = this.dirMap;
      for (var my = 0; my < _y; my++) {
        var row = this.connects(0, my, "W") ? " " : "|";
        for (var mx = 0; mx < _x; mx++) {
          let isTarget = (tX == mx && tY == my);
          let isGreen = this.isGreen(mx, my);
          let isCrossing = this.isUnder(mx, my) !== null;
          // See Unicode characters: https://jrgraphix.net/r/Unicode/2300-23FF
          // https://jrgraphix.net/r/Unicode/2500-257F
          let southClosed = isTarget ? "⏂" : isGreen ? "⍜" : isCrossing ? "+" : "_";
          let southOpen = isTarget ? "▼" : isGreen ? "⌾" : isCrossing ? "+" : " ";
          row += this.connects(mx, my, "S") ? southOpen : southClosed;
          if (this.connects(mx, my, "E")) {
            row += (((this.get(mx, my) | this.get(mx + 1, my)) & dirMap.S) !== 0) ? " " : "_";
          } else {
            row += "|";
          }
        }
        console.log(row);
      }
    }
  });
};
