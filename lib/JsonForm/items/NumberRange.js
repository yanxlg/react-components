"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/input/style/css");

var _input = _interopRequireDefault(require("antd/es/input"));

require("antd/es/form/style/css");

var _form = _interopRequireDefault(require("antd/es/form"));

var _react = _interopRequireWildcard(require("react"));

var _RichInput = _interopRequireDefault(require("../../RichInput"));

var _form2 = _interopRequireDefault(require("../_form.less"));

var _classnames = _interopRequireDefault(require("classnames"));

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

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

var typeList = ['inputRange', 'integerRange', 'numberRange', 'positiveIntegerRange'];

var FormNumberRange = function FormNumberRange(props) {
  var name = props.name,
      placeholder = props.placeholder,
      label = props.label,
      _a = props.className,
      className = _a === void 0 ? _form2["default"].flex1 : _a,
      // formStyles.formItemDefault,
  _b = props.formItemClassName,
      // formStyles.formItemDefault,
  formItemClassName = _b === void 0 ? _form2["default"].formItem : _b,
      _onChange = props.onChange,
      labelClassName = props.labelClassName,
      form = props.form,
      type = props.type,
      _c = props.rules,
      rules = _c === void 0 ? [] : _c,
      colon = props.colon,
      initialValue = props.initialValue,
      _props = __rest(props, ["name", "placeholder", "label", "className", "formItemClassName", "onChange", "labelClassName", "form", "type", "rules", "colon", "initialValue"]);

  var name1 = name[0],
      name2 = name[1]; // console.log(11111111, name1, name2);

  var _type = type.replace('Range', '');

  var eventProps = (0, _react.useMemo)(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
  }, []);
  return (0, _react.useMemo)(function () {
    return _react["default"].createElement(_form["default"].Item, {
      className: formItemClassName,
      name: "_range",
      label: _react["default"].createElement("span", {
        className: labelClassName
      }, label),
      colon: colon,
      validateTrigger: "onBlur",
      rules: __spreadArrays([function (_a) {
        var getFieldValue = _a.getFieldValue;
        return {
          validator: function validator(rule, value) {
            var min = getFieldValue(name1);
            var max = getFieldValue(name2);

            if (min && max && Number(min) > Number(max)) {
              return Promise.reject('请检查区间!');
            }

            return Promise.resolve();
          }
        };
      }], rules)
    }, _react["default"].createElement(_input["default"].Group, {
      compact: true,
      className: _form2["default"].flex
    }, _react["default"].createElement(_form["default"].Item, {
      name: name1,
      className: (0, _classnames["default"])(_form2["default"].marginNone),
      initialValue: initialValue === null || initialValue === void 0 ? void 0 : initialValue[0]
    }, _react["default"].createElement(_RichInput["default"], __assign({
      placeholder: placeholder,
      className: (0, _classnames["default"])(_form2["default"].inputRange, _form2["default"].inputRangeLeft, className)
    }, _props, eventProps, {
      richType: _type
    }))), _react["default"].createElement(_input["default"], {
      className: _form2["default"].inputRangeSplit,
      placeholder: "~",
      disabled: true
    }), _react["default"].createElement(_form["default"].Item, {
      name: name2,
      className: (0, _classnames["default"])(_form2["default"].marginNone),
      initialValue: initialValue === null || initialValue === void 0 ? void 0 : initialValue[1]
    }, _react["default"].createElement(_RichInput["default"], __assign({
      placeholder: placeholder,
      className: (0, _classnames["default"])(_form2["default"].inputRange, _form2["default"].inputRangeRight, className)
    }, _props, eventProps, {
      richType: _type
    })))));
  }, [_props]);
};

FormNumberRange.typeList = typeList;
var _default = FormNumberRange;
exports["default"] = _default;