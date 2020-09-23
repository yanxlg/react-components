"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/input-number/style/css");

var _inputNumber = _interopRequireDefault(require("antd/es/input-number"));

var _react = _interopRequireDefault(require("react"));

var _utils = require("../RichInput/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var IntegerInput = function IntegerInput(_a) {
  var positive = _a.positive,
      props = __rest(_a, ["positive"]);

  return _react["default"].createElement(_inputNumber["default"], __assign({}, props, {
    min: 0,
    formatter: positive ? _utils.positiveIntFormatter : _utils.intFormatter
  }));
};

var _default = IntegerInput;
exports["default"] = _default;