"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/form/style/css");

var _form = _interopRequireDefault(require("antd/es/form"));

var _react = _interopRequireDefault(require("react"));

var _form2 = _interopRequireDefault(require("./_form.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FormItem = function FormItem(_a) {
  var _b = _a.formItemClassName,
      formItemClassName = _b === void 0 ? _form2["default"].formItem : _b,
      children = _a.children;
  return _react["default"].createElement(_form["default"].Item, {
    className: formItemClassName
  }, children);
};

var _default = FormItem;
exports["default"] = _default;