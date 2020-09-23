"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/form/style/css");

var _form = _interopRequireDefault(require("antd/es/form"));

var _react = _interopRequireDefault(require("react"));

var _index = require("../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 动态FormItem
 */
var typeList = ['dynamic'];

var DynamicItem = function DynamicItem(_a) {
  var form = _a.form,
      dynamic = _a.dynamic,
      shouldUpdate = _a.shouldUpdate,
      labelClassName = _a.labelClassName,
      itemCol = _a.itemCol,
      itemRow = _a.itemRow;
  return _react["default"].createElement(_form["default"].Item, {
    shouldUpdate: shouldUpdate,
    noStyle: true
  }, function () {
    var formField = dynamic(form);

    if (formField) {
      return (0, _index.getFormItem)(formField, form, labelClassName, itemCol, itemRow);
    } else {
      return null;
    }
  });
};

DynamicItem.typeList = typeList;
var _default = DynamicItem;
exports["default"] = _default;