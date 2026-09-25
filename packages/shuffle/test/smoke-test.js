/**
    Module: @mitchallen/shuffle
      Test: smoke-test
    Author: Mitch Allen
*/

"use strict";

const { test } = require("node:test");
const assert = require("node:assert");

const shuffle = require("../modules/index.js");

test("module should exist", () => {
  assert.ok(shuffle);
});

test("create with no spec should return null", () => {
  assert.strictEqual(shuffle.create(), null);
});

test("create with no spec.array should return null", () => {
  assert.strictEqual(shuffle.create({}), null);
});

test("create with a valid array should return an object", () => {
  const obj = shuffle.create({ array: [1, 2, 3, 4, 5] });
  assert.ok(obj);
  assert.strictEqual(typeof obj.shuffle, "function");
});

test("shuffle returns an array with the same elements", () => {
  const list = [1, 2, 3, 4, 5];
  const shuffled = shuffle.create({ array: list }).shuffle();
  assert.ok(Array.isArray(shuffled));
  assert.strictEqual(shuffled.length, list.length);
  assert.deepStrictEqual([...shuffled].sort(), [...list].sort());
});

test("shuffle does not mutate the original array", () => {
  const list = [1, 2, 3, 4, 5];
  shuffle.create({ array: list }).shuffle();
  assert.deepStrictEqual(list, [1, 2, 3, 4, 5]);
});
