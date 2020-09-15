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

var NumberInput = function NumberInput(props) {
  return /*#__PURE__*/_react["default"].createElement(_inputNumber["default"], __assign({}, props, {
    min: 0,
    formatter: _utils.numberFormatter
  }));
};

var _default = NumberInput;
exports["default"] = _default;