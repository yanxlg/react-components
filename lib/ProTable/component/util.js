"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDeepCompareEffect = useDeepCompareEffect;
exports.getProgressStatus = getProgressStatus;
exports["default"] = get;
exports.genColumnKey = exports.checkUndefinedOrNull = exports.parsingValueEnumToArray = exports.parsingText = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _status = _interopRequireDefault(require("./status"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * 转化 text 和 valueEnum
 * 通过 type 来添加 Status
 * @param text
 * @param valueEnum
 * @param prue 纯净模式，不增加 status
 */
var parsingText = function parsingText(text, valueEnum, pure) {
  if (!valueEnum) {
    return text;
  }

  var domText = valueEnum[text];

  if (!domText) {
    return text;
  }

  if (domText.status) {
    if (pure) {
      return domText.text;
    }

    var status_1 = domText.status;
    var Status = _status["default"][status_1 || 'Init'];
    return _react["default"].createElement(Status, null, domText.text);
  }

  return domText.text || domText;
};
/**
 * 把 value 的枚举转化为 数组
 * @param valueEnum
 */


exports.parsingText = parsingText;

var parsingValueEnumToArray = function parsingValueEnumToArray(valueEnum) {
  if (valueEnum === void 0) {
    valueEnum = {};
  }

  return Object.keys(valueEnum).map(function (key) {
    var value = valueEnum[key] || '';
    return {
      text: value.text || value || '',
      value: key
    };
  });
};
/**
 * 检查值是否存在
 * 为了 避开 0 和 false
 * @param value
 */


exports.parsingValueEnumToArray = parsingValueEnumToArray;

var checkUndefinedOrNull = function checkUndefinedOrNull(value) {
  return value !== undefined && value !== null;
};

exports.checkUndefinedOrNull = checkUndefinedOrNull;

function deepCompareEquals(a, b) {
  return (0, _lodash.isEqual)(a, b);
}

function useDeepCompareMemoize(value) {
  var ref = (0, _react.useRef)(); // it can be done by using useMemo as well
  // but useRef is rather cleaner and easier

  if (!deepCompareEquals(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffect(effect, dependencies) {
  (0, _react.useEffect)(effect, useDeepCompareMemoize(dependencies));
}

function getProgressStatus(text) {
  if (typeof text !== 'number') {
    return 'exception';
  }

  if (text === 100) {
    return 'success';
  }

  if (text < 100) {
    return 'active';
  } // magic


  if (text < 0) {
    return 'exception';
  }

  return 'normal';
}
/**
 *  根据 key 和 dataIndex 生成唯一 id
 * @param key
 * @param dataIndex
 */


var genColumnKey = function genColumnKey(key, dataIndex) {
  if (key) {
    return key;
  }

  if (!key && dataIndex) {
    if (Array.isArray(dataIndex)) {
      return dataIndex.join('-');
    }

    return dataIndex;
  }

  return undefined;
};

exports.genColumnKey = genColumnKey;

function get(entity, path) {
  var tempPath = [''];

  if (typeof path === 'string') {
    if (path.includes('.')) {
      tempPath = path.split('.');
    } else {
      tempPath = [path];
    }
  }

  if (Array.isArray(path)) {
    tempPath = path;
  }

  var current = entity;

  for (var i = 0; i < tempPath.length; i += 1) {
    if (current === null || current === undefined) {
      return undefined;
    }

    current = current[tempPath[i]];
  }

  return current;
}