"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/collapse/style/css");

var _collapse = _interopRequireDefault(require("antd/es/collapse"));

var _react = _interopRequireDefault(require("react"));

var _index = require("../index");

var _form = _interopRequireDefault(require("../_form.less"));

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

var typeList = ['collapse'];

var CollapseLayout = function CollapseLayout(props) {
  var form = props.form,
      labelClassName = props.labelClassName,
      type = props.type,
      fieldList = props.fieldList,
      itemCol = props.itemCol,
      itemRow = props.itemRow,
      header = props.header,
      footer = props.footer,
      _a = props.panel,
      _header = _a.header,
      __props = __rest(_a, ["header"]),
      _props = __rest(props, ["form", "labelClassName", "type", "fieldList", "itemCol", "itemRow", "header", "footer", "panel"]);

  return _react["default"].createElement(_collapse["default"], __assign({
    className: _form["default"].formCollapse
  }, _props), _react["default"].createElement(_collapse["default"].Panel, __assign({
    header: (0, _index.getFormItems)([_header], form)
  }, __props), (0, _index.getFormItems)(fieldList, form, labelClassName, itemCol, itemRow)));
};

CollapseLayout.typeList = typeList;
var _default = CollapseLayout;
exports["default"] = _default;