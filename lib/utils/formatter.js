"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transNullValue = transNullValue;
exports.transJoinStr = transJoinStr;
exports.transNumber = transNumber;
exports.transStrArr = transStrArr;
exports.transNumberStrArr = transNumberStrArr;
exports.transNumberArray = transNumberArray;
exports["default"] = exports.isNull = void 0;

var _date = require("./date");

var _addOn = _interopRequireDefault(require("./addOn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isNull = function isNull(value) {
  return value === null || value === void 0;
};

exports.isNull = isNull;

function transNullValue(value) {
  return value === '' || isNull(value) ? undefined : value;
}

function transJoinStr(value) {
  return value && value.length ? value.join(',') : undefined;
}

function transNumber(value) {
  var _value = typeof value === 'string' ? value === '' ? undefined : Number(value) : typeof value === 'number' ? value : undefined;

  return _value && isNaN(_value) ? undefined : _value;
}

function transStrArr(value) {
  if (typeof value === 'string') {
    return value.trim().split(/\,|\s+|\;|\\r|\\n/g).filter(function (str) {
      return str;
    });
  }

  return value;
}

function transNumberStrArr(value) {
  if (typeof value === 'string') {
    return value.trim().split(',').filter(function (str) {
      return str && !/[^0-9\,]/g.test(str);
    });
  }

  return value;
}

function transNumberArray(value) {
  if (typeof value === 'string') {
    return transNumberStrArr(value).map(function (item) {
      return transNumber(item);
    });
  }

  return value;
}

var formatter = (0, _addOn["default"])({
  number: transNumber,
  str_arr: transStrArr,
  join: transJoinStr,
  "null": transNullValue,
  number_arr: transNumberArray,
  number_str_arr: transNumberStrArr,
  start_date: _date.startDateToUnix,
  end_date: _date.endDateToUnix
});
var _default = formatter;
exports["default"] = _default;