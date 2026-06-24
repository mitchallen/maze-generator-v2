/**
    Module: grid
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

var squareGrid = require('grid-square').create,
    circleGrid = require('./circle');

module.exports = {
    Square: squareGrid,
    Circle: circleGrid,
    // For future expansion (mapped to square for now)
    Hexagon: squareGrid,
    Triangle: squareGrid,
};

