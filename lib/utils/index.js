"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEmptyObject = void 0;

var isEmptyObject = function isEmptyObject(target) {
  return Object.keys(target).length === 0;
};

exports.isEmptyObject = isEmptyObject;