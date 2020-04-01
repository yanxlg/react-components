"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transNullValue = transNullValue;
exports.transJoinStr = transJoinStr;
exports.transNumber = transNumber;
exports.transStrArr = transStrArr;
exports.transNumberStrArr = transNumberStrArr;
exports.transStartDate = transStartDate;
exports.transEndDate = transEndDate;
exports.isNull = void 0;

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
    return value.replace(/(^\s*)|(\s*$)/g, '').split(',').filter(function (str) {
      return str;
    });
  }

  return value;
}

function transNumberStrArr(value) {
  if (typeof value === 'string') {
    return value.replace(/(^\s*)|(\s*$)/g, '').split(',').filter(function (str) {
      return str && !/[^0-9\,]/g.test(str);
    });
  }

  return value;
}
/**
 * 日期转换成unix
 * @param moment
 */


function transStartDate(moment) {
  return moment ? moment.clone().hour(0).minute(0).second(0).unix() : undefined;
}

function transEndDate(moment) {
  return moment ? moment.clone().add(1, 'd').hour(0).minute(0).second(0).unix() : undefined;
}