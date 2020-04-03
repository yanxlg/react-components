"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

function useModal() {
  var _a = (0, _react.useState)(false),
      visible = _a[0],
      setVisible = _a[1];

  var onClose = (0, _react.useCallback)(function () {
    setVisible(false);
  }, []);
  var setVisibleProps = (0, _react.useCallback)(function (visibleProps) {
    setVisible(visibleProps);
  }, []);
  return {
    visible: visible,
    onClose: onClose,
    setVisibleProps: setVisibleProps
  };
}

var _default = useModal;
exports["default"] = _default;