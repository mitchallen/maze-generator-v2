/**
    Module: connection-grid
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

let squareGrid = require('connection-grid-square').create,
    hexagonGrid = require('./hexagon'),
    circleGrid = require('./circle'),
    triangleGrid = require('./triangle');

module.exports = {
    Square: squareGrid,
    Hexagon: hexagonGrid,
    Circle: circleGrid,
    Triangle: triangleGrid,
};