"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/form/style/css");

var _form = _interopRequireDefault(require("antd/es/form"));

require("antd/es/input/style/css");

var _input = _interopRequireDefault(require("antd/es/input"));

var _react = _interopRequireWildcard(require("react"));

var _form2 = _interopRequireDefault(require("../_form.less"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var TextArea = _input["default"].TextArea;
var typeList = ['textarea'];

var FormTextArea = function FormTextArea(props) {
  var name = props.name,
      // placeholder,
  label = props.label,
      _a = props.className,
      className = _a === void 0 ? _form2["default"].formItemDefault : _a,
      _b = props.formItemClassName,
      formItemClassName = _b === void 0 ? _form2["default"].formItem : _b,
      _onChange = props.onChange,
      labelClassName = props.labelClassName,
      form = props.form,
      type = props.type,
      rules = props.rules,
      _c = props.autoSize,
      autoSize = _c === void 0 ? {
    minRows: 1,
    maxRows: 6
  } : _c,
      initialValue = props.initialValue,
      hide = props.hide,
      _d = props.allowClear,
      allowClear = _d === void 0 ? true : _d,
      _props = __rest(props, ["name", "label", "className", "formItemClassName", "onChange", "labelClassName", "form", "type", "rules", "autoSize", "initialValue", "hide", "allowClear"]);

  var eventProps = (0, _react.useMemo)(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
  }, []);
  return (0, _react.useMemo)(function () {
    return /*#__PURE__*/_react["default"].createElement(_form["default"].Item, {
      className: formItemClassName,
      name: name,
      label: /*#__PURE__*/_react["default"].createElement("span", {
        className: labelClassName
      }, label),
      rules: rules,
      initialValue: initialValue,
      style: hide ? {
        display: 'none'
      } : {}
    }, /*#__PURE__*/_react["default"].createElement(TextArea, __assign({
      autoSize: autoSize,
      // placeholder={placeholder}
      className: className
    }, _props, eventProps, {
      allowClear: allowClear
    })));
  }, [_props, hide]);
};

FormTextArea.typeList = typeList;
var _default = FormTextArea;
exports["default"] = _default;