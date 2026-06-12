/**
    Module: maze-generator
      Test: weave/smoke-test
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

var request = require('supertest'),
    should = require('should'),
    modulePath = "../../src/index";

describe('Weave method', function() {

    var _module = null;

    before(function(done) {
        // Call before all tests
        delete require.cache[require.resolve(modulePath)];
        _module = require(modulePath);
        done();
    });

    after(function(done) {
        // Call after all tests
        done();
    });

    beforeEach(function(done) {
        // Call before each test
        done();
    });

    afterEach(function(done) {
        // Call after eeach test
        done();
    });

    it('module should exist', function(done) {
        should.exist(_module);
        done();
    });

    it('with no spec should return object', function(done) {
        var mazeGenerator = _module.Weave();
        should.exist(mazeGenerator);
        done();
    });

    it('with valid x and y parameters should return object', function(done) {
        var mazeGenerator = _module.Weave({ x: 5, y: 5 });
        should.exist(mazeGenerator);
        done();
    });

    it('generate 0 x 0 method should generate an empty maze', function(done) {
        var mazeGenerator = _module.Weave({ x: 0, y: 0 });
        should.exist(mazeGenerator);
        mazeGenerator.generate();
        mazeGenerator.printBoard();
        done();
    });

    it('generate -1 x -1 method should generate an empty maze', function(done) {
        var mazeGenerator = _module.Weave({ x: -1, y: -1 });
        should.exist(mazeGenerator);
        mazeGenerator.generate();
        mazeGenerator.printBoard();
        done();
    });

    it('generate -1 x -1 method should normalize x and y to 0', function(done) {
        var mazeGenerator = _module.Weave({ x: -1, y: -1 });
        mazeGenerator.xSize.should.eql(0);
        mazeGenerator.ySize.should.eql(0);
        done();
    });

    it('generate 1 x 1 method should generate a maze', function(done) {
        var mazeGenerator = _module.Weave({ x: 1, y: 1 });
        should.exist(mazeGenerator);
        mazeGenerator.generate();
        mazeGenerator.printBoard();
        done();
    });

    it('generate 1 x 2 method should generate a maze', function(done) {
        var mazeGenerator = _module.Weave({ x: 1, y: 2 });
        should.exist(mazeGenerator);
        mazeGenerator.generate();
        mazeGenerator.printBoard();
        done();
    });

    it('generate 2 x 1 method should generate a maze', function(done) {
        var mazeGenerator = _module.Weave({ x: 2, y: 1 });
        should.exist(mazeGenerator);
        mazeGenerator.generate();
        mazeGenerator.printBoard();
        done();
    });

    it('generate 5 x 5 method should generate a maze', function(done) {
        var mazeGenerator = _module.Weave({ x: 5, y: 5 });
        should.exist(mazeGenerator);
        mazeGenerator.generate();
        mazeGenerator.printBoard();
        done();
    });

    it('generate 10 x 5 method should generate a maze', function(done) {
        var mazeGenerator = _module.Weave({ x: 10, y: 5 });
        should.exist(mazeGenerator);
        mazeGenerator.generate();
        mazeGenerator.printBoard();
        done();
    });

    it('generate 10 x 10 method should generate a maze', function(done) {
        var mazeGenerator = _module.Weave({ x: 10, y: 10 });
        should.exist(mazeGenerator);
        mazeGenerator.generate();
        mazeGenerator.printBoard();
        done();
    });

    it('generate 20 x 15 method should generate a maze', function(done) {
        var mazeGenerator = _module.Weave({ x: 20, y: 15 });
        should.exist(mazeGenerator);
        mazeGenerator.generate();
        mazeGenerator.printBoard();
        done();
    });

    it('generate 20 x 20 method should generate a maze', function(done) {
        var mazeGenerator = _module.Weave({ x: 20, y: 20 });
        should.exist(mazeGenerator);
        mazeGenerator.generate();
        mazeGenerator.printBoard();
        done();
    });

    it('generate called twice should generate two valid and distinct mazes', function(done) {
        var mazeGenerator = _module.Weave({ x: 10, y: 5 });
        should.exist(mazeGenerator);
        mazeGenerator.generate();
        mazeGenerator.printBoard();
        mazeGenerator.generate();
        mazeGenerator.printBoard();
        done();
    });

    it('generate start should start the maze in a new location', function(done) {
        var mazeGenerator = _module.Weave({ x: 5, y: 6 });
        should.exist(mazeGenerator);
        let spec = {
            start: { c: 3, r: 3 },
            mask: [
                { c: 0, r: 0 },
                { c: 0, r: 1 },
                { c: 1, r: 0 },
                { c: 1, r: 1 },
            ]
        };
        mazeGenerator.generate(spec);
        mazeGenerator.printBoard();
        done();
    });

    it('generate mask should mask parts of the maze', function(done) {
        var mazeGenerator = _module.Weave({ x: 5, y: 6 });
        should.exist(mazeGenerator);
        let spec = {
            start: { c: 3, r: 3 },
            mask: [
                { c: 0, r: 1 },
                { c: 1, r: 0 },
                { c: 1, r: 1 },
            ]
        };
        mazeGenerator.generate(spec);
        mazeGenerator.printBoard();
        done();
    });

    it('generate mask should mask center parts of the maze', function(done) {
        var mazeGenerator = _module.Weave({ x: 5, y: 6 });
        should.exist(mazeGenerator);
        let spec = {
            start: { c: 0, r: 0 },
            mask: [
                { c: 1, r: 2 },
                { c: 2, r: 2 },
                { c: 2, r: 3 },
                { c: 3, r: 2 },
            ]
        };
        mazeGenerator.generate(spec);
        mazeGenerator.printBoard();
        done();
    });

    it('generate mask should mask center parts of a larger maze', function(done) {
        var mazeGenerator = _module.Weave({ x: 25, y: 25 });
        should.exist(mazeGenerator);
        let spec = {
            start: { c: 0, r: 0 },
            mask: [
                { c: 1, r: 2 },
                { c: 2, r: 2 },
                { c: 2, r: 3 },
                { c: 3, r: 2 },
            ]
        };
        mazeGenerator.generate(spec);
        mazeGenerator.printBoard();
        done();
    });

    it('getMaxDistance for maze 20x20', function(done) {
        var mazeGenerator = _module.Weave({ x: 20, y: 20 });
        should.exist(mazeGenerator);
        mazeGenerator.generate();
        let d = mazeGenerator.getMaxDistance(0, 0);
        mazeGenerator.printBoard({ target: d });
        console.log('\ntarget: ', d, '\n');
        done();
    });

    it('solve for maze corner to corner', function(done) {
        let size = { x: 9, y: 9 }
        var mazeGenerator = _module.Weave(size);
        should.exist(mazeGenerator);
        mazeGenerator.generate();
        let { x, y } = size;
        let d = { x: x - 1, y: y - 1 };
        mazeGenerator.printBoard({ target: d });
        console.log('\ntarget: ', d, '\n');
        let points = [
            { x: 0, y: 0 },
            { x: d.x, y: d.y },
        ];
        mazeGenerator.solve(points);
        mazeGenerator.printBoard({ target: d });
        done();
    });

    it('generate should create at least one crossing for a large enough maze', function(done) {
        var mazeGenerator = _module.Weave({ x: 12, y: 12 });
        should.exist(mazeGenerator);
        mazeGenerator.generate();
        mazeGenerator.printBoard();
        let crossings = 0;
        for (let x = 0; x < 12; x++) {
            for (let y = 0; y < 12; y++) {
                if (mazeGenerator.isUnder(x, y) !== null) {
                    crossings++;
                }
            }
        }
        console.log('\ncrossings: ', crossings, '\n');
        crossings.should.be.above(0);
        done();
    });

    it('afterGenerate should open borders', function(done) {
        var xSize = 5, ySize = 6;
        var mazeGenerator = _module.Weave({ x: xSize, y: ySize });
        should.exist(mazeGenerator);
        let spec = {
            open: [
                { border: "N", list: [0, 2, xSize - 1] },
                { border: "S", list: [0, 2, xSize - 1] },
                { border: "E", list: [0, 2, ySize - 1] },
                { border: "W", list: [0, 2, ySize - 1] }
            ]
        };
        mazeGenerator.generate(spec);
        mazeGenerator.printBoard();
        done();
    });
});
