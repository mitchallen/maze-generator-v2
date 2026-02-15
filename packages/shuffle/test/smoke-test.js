/**
    Module: @mitchallen/shuffle
      Test: smoke-test
    Author: Mitch Allen
*/

"use strict";

var request = require('supertest'),
    should = require('should'),
    modulePath = "../dist/shuffle";

describe('module smoke test', function() {

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

    it('create method with no spec should return null', function(done) {
        var obj = _module.create();
        should.not.exist(obj);
        done();
    });

    it('create method with no spec.array should return null', function(done) {
        var obj = _module.create( {} );
        should.not.exist(obj);
        done();
    });

    it('create method with valid array parameters should return object', function(done) {
        var list = [1, 2, 3, 4, 5];
        var obj = _module.create({ array: list });
        should.exist(obj);
        done();
    });

    it('shuffle method with valid array parameters should return shuffled array', function(done) {
        var list = [1, 2, 3, 4, 5];
        var obj = _module.create({ array: list });
        should.exist(obj);
        var shuffled = obj.shuffle();
        should.exist(shuffled);
        shuffled.should.not.eql(list);
        shuffled.length.should.eql(list.length);
        done();
    });
});
