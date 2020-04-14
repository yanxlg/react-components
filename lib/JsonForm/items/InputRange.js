"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/input-number/style/css");

var _inputNumber = _interopRequireDefault(require("antd/es/input-number"));

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

var typeList = ['inputRange'];

var FormInputRange = function FormInputRange(props) {
  var label = props.label,
      className = props.className,
      _a = props.name,
      name1 = _a[0],
      name2 = _a[1],
      _b = props.formItemClassName,
      formItemClassName = _b === void 0 ? _form2["default"].formItem : _b,
      _onChange = props.onChange,
      _c = props.labelClassName,
      labelClassName = _c === void 0 ? '' : _c,
      form = props.form,
      _d = props.precision,
      precision = _d === void 0 ? 0 : _d,
      _e = props.rules,
      rules = _e === void 0 ? [[function (_a) {
    var getFieldValue = _a.getFieldValue,
        validateFields = _a.validateFields;
    return {
      validator: function validator(rule, value) {
        // 校验最大值
        validateFields([name2]);
        return Promise.resolve();
      }
    };
  }], [function (_a) {
    var getFieldValue = _a.getFieldValue,
        validateFields = _a.validateFields;
    return {
      validator: function validator(rule, value) {
        var value1 = getFieldValue(name1);

        if (typeof value !== 'number' || typeof value1 !== 'number' || value >= value1) {
          // validateFields([name1]);
          return Promise.resolve();
        }

        return Promise.reject('请检查范围区间!');
      }
    };
  }]] : _e;
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
    var itemClassName = [_form2["default"].inlineBlock, _form2["default"].marginNone, _form2["default"].verticalMiddle].join(' ');
    return _react["default"].createElement(_form["default"].Item, {
      label: _react["default"].createElement("span", {
        className: labelClassName
      }, label),
      className: "" + formItemClassName
    }, _react["default"].createElement(_form["default"].Item, {
      shouldUpdate: function shouldUpdate(prevValues, currentValues) {
        return prevValues[name2] !== currentValues[name2];
      },
      className: itemClassName
    }, _react["default"].createElement(_form["default"].Item, {
      name: name1,
      className: _form2["default"].marginNone,
      validateTrigger: "onBlur",
      rules: rules === null || rules === void 0 ? void 0 : rules[0]
    }, _react["default"].createElement(_inputNumber["default"], __assign({
      min: 0,
      precision: precision,
      className: className
    }, event1Props)))), _react["default"].createElement("span", {
      className: [_form2["default"].formColon, _form2["default"].verticalMiddle].join(' ')
    }, "-"), _react["default"].createElement(_form["default"].Item, {
      className: itemClassName,
      shouldUpdate: function shouldUpdate(prevValues, currentValues) {
        return prevValues[name1] !== currentValues[name1];
      }
    }, _react["default"].createElement(_form["default"].Item, {
      name: name2,
      className: _form2["default"].marginNone,
      validateTrigger: "onBlur",
      rules: rules === null || rules === void 0 ? void 0 : rules[1]
    }, _react["default"].createElement(_inputNumber["default"], __assign({
      min: 0,
      precision: precision,
      className: className
    }, event2Props)))));
  }, []);
};

FormInputRange.typeList = typeList;
var _default = FormInputRange;
exports["default"] = _default;