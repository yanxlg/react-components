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

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var typeList = ['layout'];

var Layout = function Layout(props) {
  var form = props.form,
      labelClassName = props.labelClassName,
      layoutType = props.layoutType,
      type = props.type,
      fieldList = props.fieldList,
      itemCol = props.itemCol,
      itemRow = props.itemRow,
      header = props.header,
      footer = props.footer,
      _props = __rest(props, ["form", "labelClassName", "layoutType", "type", "fieldList", "itemCol", "itemRow", "header", "footer"]);

  switch (layoutType) {
    case 'card':
      return _react["default"].createElement(_card["default"], __assign({}, _props), header, (0, _index.getFormItems)(fieldList, form, labelClassName, itemCol, itemRow), footer);

    default:
      return _react["default"].createElement("div", __assign({}, _props), header, (0, _index.getFormItems)(fieldList, form, labelClassName, itemCol, itemRow), footer);
  }
};

Layout.typeList = typeList;
var _default = Layout;
exports["default"] = _default;