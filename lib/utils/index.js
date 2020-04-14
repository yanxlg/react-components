"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNumber = isNumber;
exports.EmptyArray = exports.EmptyObject = exports.isEmptyObject = void 0;

var isEmptyObject = function isEmptyObject(target) {
  return Object.keys(target).length === 0;
};

exports.isEmptyObject = isEmptyObject;
var EmptyObject = {};
exports.EmptyObject = EmptyObject;
var EmptyArray = [];
exports.EmptyArray = EmptyArray;

function isNumber(value) {
  return /^\d+$/.test(String(value));
}