"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/card/style/css");

var _card = _interopRequireDefault(require("antd/es/card"));

var _react = _interopRequireDefault(require("react"));

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var typeList = ['layout'];

var Layout = function Layout(props) {
  var form = props.form,
      labelClassName = props.labelClassName,
      layoutType = props.layoutType,
      fieldList = props.fieldList,
      itemCol = props.itemCol,
      itemRow = props.itemRow;

  switch (layoutType) {
    case "card":
      return _react["default"].createElement(_card["default"], null, (0, _index.getFormItems)(fieldList, form, labelClassName, itemCol, itemRow));

    default:
      return null;
  }
};

Layout.typeList = typeList;
var _default = Layout;
exports["default"] = _default;