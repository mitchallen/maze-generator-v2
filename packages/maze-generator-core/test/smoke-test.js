/**
    Module: @mitchallen/maze-generator-core-v2
      Test: square/smoke-test
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

const { describe, it, before, after, beforeEach, afterEach } = require('node:test');
var assert = require('node:assert/strict'),
  cgFactory = require("@mitchallen/connection-grid-square-v2"),
  modulePath = "../src/index";
// modulePath = "../dist/maze-generator-core";

function printboard(spec = {}) {

  let { 
    target = {},
    x: _x, y: _y,
    maze,
  } = spec;

  let { x: tX = -1, y: tY = -1 } = target;
  // print top north walls
  var border = "";
  // var lim = _x  * 2;
  // for( var i = 0; i < lim; i++ ) {
  //     border += i === 0 ? " " : maze.connects(i,0,"N") ? " " : "_";
  // }
  for (var i = 0; i < _x; i++) {
    border += (i === 0 ? " " : "");
    border += maze.connects(i, 0, "N") ? "  " : "__";
  }
  console.log(border);
  // print maze east and south walls
  let dirMap = maze.dirMap;
  for (var my = 0; my < _y; my++) {
    var row = maze.connects(0, my, "W") ? " " : "|";
    for (var mx = 0; mx < _x; mx++) {
      // let isTarget = (tX == mx && tY == my);
      let isGreen = maze.isGreen(mx, my);
      // See Unicode characters: https://jrgraphix.net/r/Unicode/2300-23FF
      // https://jrgraphix.net/r/Unicode/2500-257F
      let southClosed = isGreen ? "\u235C" : "_";
      let southOpen = isGreen ? "\u233E" : " ";  
      row += maze.connects(mx, my, "S") ? southOpen : southClosed;
      if (maze.connects(mx, my, "E")) {
        row += (((maze.get(mx, my) | maze.get(mx + 1, my)) & dirMap.S) !== 0) ? " " : "_";
      } else {
        row += "|";
      }
    }
    console.log(row);
  }
}

describe('module create', function () {

  var _module = null;

  before(function() {
    // Call before all tests
    delete require.cache[require.resolve(modulePath)];
    _module = require(modulePath);
  });

  after(function() {
    // Call after all tests
  });

  beforeEach(function() {
    // Call before each test
  });

  afterEach(function() {
    // Call after eeach test
  });

  it('module should exist', function() {
    assert.ok(_module != null);
  });

  it('with no spec should return null', function() {
    var mazeGenerator = _module.create();
    assert.ok(mazeGenerator == null);
  });

  it('generate 0 x 0 method should generate an empty maze', function() {
    var _connectionGrid = cgFactory.create({ x: 0, y: 0 });
    assert.ok(_connectionGrid != null);
    var maze = _module.create({
      grid: _connectionGrid,
    });
    assert.ok(maze != null);
    maze.generate();
  });

  it('generate 1 x 1 method should generate a maze', function() {
    var _connectionGrid = cgFactory.create({ x: 1, y: 1 });
    assert.ok(_connectionGrid != null);
    var maze = _module.create({
      grid: _connectionGrid,
    });
    assert.ok(maze != null);
    maze.generate();
  });

  it('generate 1 x 2 method should generate a maze', function() {
    var _connectionGrid = cgFactory.create({ x: 1, y: 2 });
    assert.ok(_connectionGrid != null);
    var maze = _module.create({
      grid: _connectionGrid,
    });
    assert.ok(maze != null);
    maze.generate();
  });

  it('generate 2 x 1 method should generate a maze', function() {
    var _connectionGrid = cgFactory.create({ x: 2, y: 1 });
    assert.ok(_connectionGrid != null);
    var maze = _module.create({
      grid: _connectionGrid,
    });
    assert.ok(maze != null);
    maze.generate();
  });

  it('generate 5 x 5 method should generate a maze', function() {
    var _connectionGrid = cgFactory.create({ x: 5, y: 5 });
    assert.ok(_connectionGrid != null);
    var maze = _module.create({
      grid: _connectionGrid,
    });
    assert.ok(maze != null);
    maze.generate();
  });

  it('generate 10 x 5 method should generate a maze', function() {
    var _connectionGrid = cgFactory.create({ x: 10, y: 5 });
    assert.ok(_connectionGrid != null);
    var maze = _module.create({
      grid: _connectionGrid,
    });
    assert.ok(maze != null);
    maze.generate();
  });

  it('generate 10 x 10 method should generate a maze', function() {
    var _connectionGrid = cgFactory.create({ x: 10, y: 10 });
    assert.ok(_connectionGrid != null);
    var maze = _module.create({
      grid: _connectionGrid,
    });
    assert.ok(maze != null);
    maze.generate();
  });

  it('generate 20 x 15 method should generate a maze', function() {
    var _connectionGrid = cgFactory.create({ x: 20, y: 10 });
    assert.ok(_connectionGrid != null);
    var maze = _module.create({
      grid: _connectionGrid,
    });
    assert.ok(maze != null);
    maze.generate();
  });

  it('generate 20 x 20 method should generate a maze', function() {
    var _connectionGrid = cgFactory.create({ x: 20, y: 20 });
    assert.ok(_connectionGrid != null);
    var maze = _module.create({
      grid: _connectionGrid,
    });
    assert.ok(maze != null);
    maze.generate();
  });

  it('generate called twice should generate two valid and distinct mazes', function() {
    var _connectionGrid = cgFactory.create({ x: 10, y: 5 });
    assert.ok(_connectionGrid != null);
    var maze = _module.create({
      grid: _connectionGrid,
    });
    assert.ok(maze != null);
    maze.generate();
    maze.generate();
  });

  it('generate start should start the maze in a new location', function() {
    var _connectionGrid = cgFactory.create({ x: 10, y: 5 });
    assert.ok(_connectionGrid != null);
    var maze = _module.create({
      grid: _connectionGrid,
    });
    let spec = {
      start: { c: 3, r: 3 },
      mask: [
        { c: 0, r: 0 },
        { c: 0, r: 1 },
        { c: 1, r: 0 },
        { c: 1, r: 1 },
      ]
    };
    maze.generate(spec);
  });

  it('generate start with a negative c value should fail gracefully', function() {
    var _connectionGrid = cgFactory.create({ x: 10, y: 5 });
    assert.ok(_connectionGrid != null);
    var maze = _module.create({
      grid: _connectionGrid,
    });
    let spec = {
      start: { c: -3, r: 3 }
    };
    maze.generate(spec);
  });

  it('generate mask should mask parts of the maze', function() {
    var _connectionGrid = cgFactory.create({ x: 10, y: 5 });
    assert.ok(_connectionGrid != null);
    var maze = _module.create({
      grid: _connectionGrid,
    });
    let spec = {
      start: { c: 3, r: 3 },
      mask: [
        { c: 0, r: 1 },
        { c: 1, r: 0 },
        { c: 1, r: 1 },
      ]
    };
    maze.generate(spec);
  });

  it('generate mask should mask center parts of the maze', function() {
    var _connectionGrid = cgFactory.create({ x: 10, y: 5 });
    assert.ok(_connectionGrid != null);
    var maze = _module.create({
      grid: _connectionGrid,
    });
    let spec = {
      start: { c: 0, r: 0 },
      mask: [
        { c: 1, r: 2 },
        { c: 2, r: 2 },
        { c: 2, r: 3 },
        { c: 3, r: 2 },
      ]
    };
    maze.generate(spec);
  });

  it('solve maze method should solve maze', function() {
    let _size = { x: 25, y: 25 };
    let _connectionGrid = cgFactory.create(_size);
    assert.ok(_connectionGrid != null);
    var maze = _module.create({
      grid: _connectionGrid,
    });
    assert.ok(maze != null);
    maze.generate();
    let points = [
      { x: 0, y: 0 },
      { x: _size.x - 1, y: _size.y - 1 },
    ];

    printboard({ maze, x: _size.x, y: _size.y });

    maze.solve(points);
    for (let iy = 0; iy < _size.y; iy++) {
      let row = "";
      for (let ix = 0; ix < _size.x; ix++) {
        if (maze.isRed(ix, iy)) {
          row += "R";
        } else if (maze.isGreen(ix, iy)) {
          row += "G";
        } else {
          row += "?";
        }
      }
      // console.log(row);
    }
    printboard({ maze, x: _size.x, y: _size.y });
  });

  it('solve with empty points should return without error', function() {
    let _connectionGrid = cgFactory.create({ x: 5, y: 5 });
    var maze = _module.create({ grid: _connectionGrid });
    maze.generate();
    maze.solve([]);
  });

  it('solveNode at or beyond max depth should stop', function() {
    let _connectionGrid = cgFactory.create({ x: 5, y: 5 });
    var maze = _module.create({ grid: _connectionGrid });
    maze.generate();
    let origWarn = console.warn;
    console.warn = function () {};
    maze.solveNode(0, 0, 5, 1);
    console.warn = origWarn;
  });

  it('solveNode should skip a red neighbor', function() {
    let _connectionGrid = cgFactory.create({ x: 5, y: 5 });
    var maze = _module.create({ grid: _connectionGrid });
    maze.generate();
    maze.clearAllVisited();
    maze.connectUndirected(0, 0, "E");
    maze.markGreen(0, 0);
    maze.markRed(1, 0);
    maze.solveNode(0, 0, 0, maze.xSize * maze.ySize);
    assert.ok((maze.isRed(1, 0)) == true);
  });

  it('alt method should control depth', function() {
    let _size = { x: 25, y: 25 };
    let _connectionGrid = cgFactory.create(_size);
    assert.ok(_connectionGrid != null);
    var maze = _module.create({
      grid: _connectionGrid,
    });
    assert.ok(maze != null);
    let options = {
      start: { c: 0, r: 0 },
      depthFunction: function (depth, maxDepth) { 
        return depth > 13 || depth >= maxDepth; 
      }
    }
    maze.generate(options);

    printboard({ maze, x: _size.x, y: _size.y });

  });
});