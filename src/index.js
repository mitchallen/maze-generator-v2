/**
    Module: @mitchallen/maze-generator-v2
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

var squareMaze = require('@mitchallen/maze-generator-square').create,
    weaveMaze = require('@mitchallen/maze-generator-weave').create,
    hexagonMaze = require('./hexagon'),
    triangleMaze = require('./triangle'),
    circleMaze = require('./circle');

module.exports = {
    Square: squareMaze,
    Weave: weaveMaze,
    Hexagon: hexagonMaze,
    Triangle: triangleMaze,
    Circle: circleMaze
};
