"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _toNumber = _interopRequireDefault(require("lodash/toNumber"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Percent = function Percent(_a) {
  var value = _a.value,
      prefix = _a.prefix,
      precision = _a.precision,
      showSymbol = _a.showSymbol,
      _b = _a.suffix,
      suffix = _b === void 0 ? '%' : _b,
      _c = _a.showColor,
      showColor = _c === void 0 ? false : _c;
  var realValue = (0, _react.useMemo)(function () {
    return typeof value === 'string' && value.includes('%') ? (0, _toNumber["default"])(value.replace('%', '')) : (0, _toNumber["default"])(value);
  }, [value]);
  /** 颜色有待确定, 根据提供 colors: ['正', '负'] | boolean */

  var style = showColor ? {
    color: (0, _util.getColorByRealValue)(realValue)
  } : {};
  return /*#__PURE__*/_react["default"].createElement("span", {
    style: style
  }, prefix && /*#__PURE__*/_react["default"].createElement("span", null, prefix), showSymbol && /*#__PURE__*/_react["default"].createElement(_react.Fragment, null, (0, _util.getSymbolByRealValue)(realValue), "\xA0"), (0, _util.getRealTextWithPrecision)(realValue, precision), suffix && suffix);
};

var _default = Percent;
exports["default"] = _default;