"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/form/style/css");

var _form = _interopRequireDefault(require("antd/es/form"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DateItem = function DateItem(_a) {
  var value = _a.value;
  return null;
};

var typeList = ['hide'];
/**
 * 隐藏元素，通常用于保存数据
 * @constructor
 */

var HideItem = function HideItem(_a) {
  var form = _a.form,
      type = _a.type,
      name = _a.name,
      initialValue = _a.initialValue;
  return _react["default"].createElement(_form["default"].Item, {
    noStyle: true,
    name: name,
    initialValue: initialValue
  }, _react["default"].createElement(DateItem, null));
};

HideItem.typeList = typeList;
var _default = HideItem;
exports["default"] = _default;