"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNumber = isNumber;
exports.clearEmptyVal = exports.EmptyArray = exports.EmptyObject = exports.isEmptyObject = void 0;

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

var clearEmptyVal = function clearEmptyVal(data) {
  if (typeof data !== 'object') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.filter(function (item) {
      return item !== '' && item !== undefined && item !== null;
    }).map(function (item) {
      return clearEmptyVal(item);
    });
  } else {
    var result = {};

    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var val = data[key];

        if (val !== '' && val !== undefined && val !== null) {
          result[key] = clearEmptyVal(val);
        }
      }
    }

    return result;
  }
};

exports.clearEmptyVal = clearEmptyVal;