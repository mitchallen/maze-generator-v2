/**
    Module: @mitchallen/connection-grid-v2
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

let squareGrid = require('@mitchallen/connection-grid-square-v2').create,
    hexagonGrid = require('./hexagon'),
    circleGrid = require('./circle'),
    triangleGrid = require('./triangle');

let createGrid = (spec) => {
    console.warn("@mitchallen/connection-grid-v2: .create is deprecated. Use .Square instead.");
    return squareGrid( spec );
};

module.exports = {
    create: createGrid,
    Square: squareGrid,
    Hexagon: hexagonGrid,
    Circle: circleGrid,
    Triangle: triangleGrid,
};