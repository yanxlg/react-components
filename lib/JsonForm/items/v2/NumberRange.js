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

var _form2 = _interopRequireDefault(require("../../_form.less"));

var _classnames = _interopRequireDefault(require("classnames"));

var _RichInput = _interopRequireDefault(require("../../../RichInput"));

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

var typeList = ['numberRange@2'];

var FormInputRange = function FormInputRange(props) {
  var _a = props.className,
      className = _a === void 0 ? _form2["default"].formItem : _a,
      _b = props.name,
      name1 = _b[0],
      name2 = _b[1],
      _onChange = props.onChange,
      labelClassName = props.labelClassName,
      labelCol = props.labelCol,
      form = props.form,
      _c = props.precision,
      precision = _c === void 0 ? 0 : _c,
      initialValue = props.initialValue,
      addonAfter = props.addonAfter,
      childrenProps = props.childrenProps,
      maxDigits = props.maxDigits,
      formItemProps = __rest(props, ["className", "name", "onChange", "labelClassName", "labelCol", "form", "precision", "initialValue", "addonAfter", "childrenProps", "maxDigits"]);

  var event1Props = (0, _react.useMemo)(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name1, form);
      }
    } : {};
  }, []);
  var event2Props = (0, _react.useMemo)(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name2, form);
      }
    } : {};
  }, []);
  return (0, _react.useMemo)(function () {
    return _react["default"].createElement(_form["default"].Item, __assign({
      className: className,
      labelCol: __assign(__assign({}, labelCol), {
        className: (0, _classnames["default"])(labelCol === null || labelCol === void 0 ? void 0 : labelCol.className, labelClassName)
      }),
      name: "___range",
      rules: [function (_a) {
        var getFieldValue = _a.getFieldValue;
        return {
          validator: function validator(rule, value) {
            var min = getFieldValue(name1);
            var max = getFieldValue(name2);

            if (min && max && Number(min) > Number(max)) {
              return Promise.reject('最大值不能小于最小值!');
            }

            return Promise.resolve();
          }
        };
      }]
    }, formItemProps), _react["default"].createElement(_input["default"].Group, {
      compact: true,
      className: (0, _classnames["default"])(_form2["default"].flex, _form2["default"].flexAlign)
    }, _react["default"].createElement(_form["default"].Item, {
      name: name1,
      validateTrigger: "onBlur",
      initialValue: initialValue === null || initialValue === void 0 ? void 0 : initialValue[0],
      noStyle: true
    }, _react["default"].createElement(_RichInput["default"], __assign({
      richType: "number",
      precision: precision,
      maxDigits: maxDigits
    }, event1Props, childrenProps, {
      className: (0, _classnames["default"])((childrenProps === null || childrenProps === void 0 ? void 0 : childrenProps.className) || _form2["default"].inputRange, _form2["default"].inputRangeFocus)
    }))), _react["default"].createElement(_input["default"], {
      className: _form2["default"].inputRangeSplit,
      placeholder: "~",
      disabled: true
    }), _react["default"].createElement(_form["default"].Item, {
      name: name2,
      validateTrigger: "onBlur",
      initialValue: initialValue === null || initialValue === void 0 ? void 0 : initialValue[1],
      noStyle: true
    }, _react["default"].createElement(_RichInput["default"], __assign({
      richType: "number",
      precision: precision,
      maxDigits: maxDigits
    }, event2Props, {
      className: (0, _classnames["default"])((childrenProps === null || childrenProps === void 0 ? void 0 : childrenProps.className) || _form2["default"].inputRange, _form2["default"].inputRangeRight, _form2["default"].inputRangeFocus)
    }))), addonAfter ? _react["default"].createElement("span", {
      className: [_form2["default"].endExtra, _form2["default"].verticalMiddle].join(' ')
    }, addonAfter) : null));
  }, []);
};

FormInputRange.typeList = typeList;
var _default = FormInputRange;
exports["default"] = _default;