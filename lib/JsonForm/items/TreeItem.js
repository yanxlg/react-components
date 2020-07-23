"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/tree/style/css");

var _tree = _interopRequireDefault(require("antd/es/tree"));

require("antd/es/form/style/css");

var _form = _interopRequireDefault(require("antd/es/form"));

var _react = _interopRequireDefault(require("react"));

var _form2 = _interopRequireDefault(require("../_form.less"));

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

var typeList = ['tree'];

var FormTree = function FormTree(props) {
  var name = props.name,
      label = props.label,
      labelClassName = props.labelClassName,
      _a = props.formItemClassName,
      formItemClassName = _a === void 0 ? _form2["default"].formItem : _a,
      className = props.className,
      form = props.form,
      rules = props.rules,
      required = props.required,
      initialValue = props.initialValue,
      hide = props.hide,
      _props = __rest(props, ["name", "label", "labelClassName", "formItemClassName", "className", "form", "rules", "required", "initialValue", "hide"]);

  var requiredProps = required ? {
    required: required
  } : {};
  return /*#__PURE__*/_react["default"].createElement(_form["default"].Item, __assign({
    name: name,
    label: label ? /*#__PURE__*/_react["default"].createElement("span", {
      className: labelClassName
    }, label) : undefined,
    className: formItemClassName
  }, requiredProps, {
    rules: rules,
    initialValue: initialValue,
    style: hide ? {
      display: 'none'
    } : {},
    valuePropName: 'checkedKeys',
    trigger: 'onCheck'
  }), /*#__PURE__*/_react["default"].createElement(_tree["default"], __assign({
    className: className
  }, _props)));
};

FormTree.typeList = typeList;
var _default = FormTree;
exports["default"] = _default;