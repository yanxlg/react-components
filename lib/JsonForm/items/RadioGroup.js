"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/radio/style/css");

var _radio = _interopRequireDefault(require("antd/es/radio"));

require("antd/es/form/style/css");

var _form = _interopRequireDefault(require("antd/es/form"));

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

var typeList = ["radioGroup"];

var FormRadioGroup = function FormRadioGroup(props) {
  var name = props.name,
      label = props.label,
      labelClassName = props.labelClassName,
      _a = props.formItemClassName,
      formItemClassName = _a === void 0 ? _form2["default"].formItem : _a,
      className = props.className,
      _onChange = props.onChange,
      form = props.form,
      rules = props.rules,
      _b = props.radioType,
      radioType = _b === void 0 ? "radio" : _b,
      options = props.options,
      _props = __rest(props, ["name", "label", "labelClassName", "formItemClassName", "className", "onChange", "form", "rules", "radioType", "options"]);

  var eventProps = (0, _react.useMemo)(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
  }, []);
  return _react["default"].createElement(_form["default"].Item, {
    name: name,
    label: label ? _react["default"].createElement("span", {
      className: labelClassName
    }, label) : undefined,
    className: formItemClassName,
    rules: rules
  }, _react["default"].createElement(_radio["default"].Group, __assign({
    className: className
  }, eventProps, _props), options.map(function (option) {
    var _a = typeof option === "string" ? {
      label: option,
      value: option
    } : option,
        label = _a.label,
        value = _a.value;

    if (radioType === "radio") {
      return _react["default"].createElement(_radio["default"], {
        key: String(value),
        value: value
      }, label);
    } else {
      return _react["default"].createElement(_radio["default"].Button, {
        key: String(value),
        value: value
      }, label);
    }
  })));
};

FormRadioGroup.typeList = typeList;
var _default = FormRadioGroup;
exports["default"] = _default;