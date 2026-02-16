/**
    Module: grid
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

var squareGrid = require('grid-square').create,
    circleGrid = require('./circle');
 
var createGrid = (spec) => {
    console.warn("grid: .create is deprecated. Use .Square instead.");
    return squareGrid( spec );
};

module.exports = {
    create: createGrid,
    Square: squareGrid,
    Circle: circleGrid,
    // For future expansion (mapped to square for now)
    Hexagon: squareGrid,
    Triangle: squareGrid,
};

