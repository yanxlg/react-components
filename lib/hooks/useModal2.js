"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

function useModal2() {
  var _a = (0, _react.useState)(false),
      visible = _a[0],
      setVisible = _a[1];

  var setHide = (0, _react.useCallback)(function () {
    setVisible(false);
  }, []);
  var setShow = (0, _react.useCallback)(function (visible) {
    setVisible(visible);
  }, []);
  return [visible, setShow, setHide];
}

var _default = useModal2;
exports["default"] = _default;