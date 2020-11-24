"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

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

var typeList = ['component'];

var CustomFragment = function CustomFragment(_a) {
  var form = _a.form,
      Component = _a.Component,
      props = _a.props;
  return /*#__PURE__*/_react["default"].createElement(Component, __assign({
    form: form
  }, props));
};

CustomFragment.typeList = typeList;
var _default = CustomFragment;
exports["default"] = _default;