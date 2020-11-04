"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var useValue = function useValue(value) {
  var valueRef = (0, _react.useRef)(value);

  if (value) {
    valueRef.current = value;
  }

  return valueRef.current;
};

var _default = useValue;
exports["default"] = _default;