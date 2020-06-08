"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var typeList = ['component'];

var CustomFragment = function CustomFragment(_a) {
  var form = _a.form,
      Component = _a.Component;
  return _react["default"].createElement(Component, {
    form: form
  });
};

CustomFragment.typeList = typeList;
var _default = CustomFragment;
exports["default"] = _default;