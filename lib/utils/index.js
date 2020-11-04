"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNumber = isNumber;
exports.clearEmptyVal = exports.isEmptyString = exports.EmptyArray = exports.EmptyObject = exports.isEmptyObject = void 0;

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

var isEmptyString = function isEmptyString(value) {
  return typeof value === 'string' && value.trim() === '';
};

exports.isEmptyString = isEmptyString;

var clearEmptyVal = function clearEmptyVal(data, excludeKeys) {
  // formData直接返回
  if (typeof data !== 'object' || data instanceof FormData) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.filter(function (item) {
      return !isEmptyString(item) && item !== undefined && item !== null;
    }).map(function (item) {
      return clearEmptyVal(item, excludeKeys);
    });
  } else {
    var result = {};

    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var val = data[key];

        if (excludeKeys && excludeKeys.includes(key)) {
          result[key] = val;
        } else if (!isEmptyString(val) && val !== undefined && val !== null) {
          result[key] = clearEmptyVal(val, excludeKeys);
        }
      }
    }

    return result;
  }
};

exports.clearEmptyVal = clearEmptyVal;