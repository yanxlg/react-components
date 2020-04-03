"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyArray = exports.EmptyObject = exports.isEmptyObject = void 0;

var isEmptyObject = function isEmptyObject(target) {
  return Object.keys(target).length === 0;
};

exports.isEmptyObject = isEmptyObject;
var EmptyObject = {};
exports.EmptyObject = EmptyObject;
var EmptyArray = [];
exports.EmptyArray = EmptyArray;