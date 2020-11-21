"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/form/style/css");

var _form = _interopRequireDefault(require("antd/es/form"));

var _react = _interopRequireDefault(require("react"));

var _form2 = _interopRequireDefault(require("../../_form.less"));

var _classnames = _interopRequireDefault(require("classnames"));

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

var typeList = ['label@2'];

var FormLabel = function FormLabel(props) {
  var _a = props.className,
      className = _a === void 0 ? _form2["default"].formItem : _a,
      labelClassName = props.labelClassName,
      colon = props.colon,
      content = props.content,
      labelCol = props.labelCol,
      childProps = props.childProps,
      formItemProps = __rest(props, ["className", "labelClassName", "colon", "content", "labelCol", "childProps"]);

  return _react["default"].createElement(_form["default"].Item, __assign({
    className: className,
    labelCol: __assign(__assign({}, labelCol), {
      className: (0, _classnames["default"])(labelCol === null || labelCol === void 0 ? void 0 : labelCol.className, labelClassName)
    })
  }, formItemProps), _react["default"].createElement("div", __assign({
    className: _form2["default"].formItemDefault
  }, childProps), content));
};

FormLabel.typeList = typeList;
var _default = FormLabel;
exports["default"] = _default;