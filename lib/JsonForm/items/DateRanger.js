"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/date-picker/style/css");

var _datePicker = _interopRequireDefault(require("antd/es/date-picker"));

require("antd/es/form/style/css");

var _form = _interopRequireDefault(require("antd/es/form"));

var _react = _interopRequireWildcard(require("react"));

var _utils = require("../utils");

var _form2 = _interopRequireDefault(require("../_form.less"));

var _classnames = _interopRequireDefault(require("classnames"));

var _date = require("../../utils/date");

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

var typeList = ["dateRanger"];

var FormDateRanger = function FormDateRanger(props) {
  var label = props.label,
      className = props.className,
      _a = props.name,
      name1 = _a[0],
      name2 = _a[1],
      _b = props.formItemClassName,
      formItemClassName = _b === void 0 ? _form2["default"].formItem : _b,
      _onChange = props.onChange,
      _c = props.labelClassName,
      labelClassName = _c === void 0 ? "" : _c,
      form = props.form,
      rules = props.rules;
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
    var itemClassName = (0, _classnames["default"])(_form2["default"].inlineBlock, _form2["default"].marginNone, _form2["default"].verticalMiddle);
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
    }, function (_a) {
      var getFieldValue = _a.getFieldValue;
      var endTime = getFieldValue(name2);
      return _react["default"].createElement(_form["default"].Item, {
        name: name1,
        className: _form2["default"].marginNone,
        rules: rules === null || rules === void 0 ? void 0 : rules[0]
      }, _react["default"].createElement(_datePicker["default"], __assign({
        disabledDate: function disabledDate(currentDate) {
          return currentDate ? endTime ? currentDate.isAfter(endTime) : false : false;
        },
        className: className
      }, event1Props)));
    }), _react["default"].createElement("span", {
      className: [_form2["default"].formColon, _form2["default"].verticalMiddle].join(" ")
    }, "-"), _react["default"].createElement(_form["default"].Item, {
      className: itemClassName,
      shouldUpdate: function shouldUpdate(prevValues, currentValues) {
        return prevValues[name1] !== currentValues[name1];
      }
    }, function (_a) {
      var getFieldValue = _a.getFieldValue;
      var startTime = getFieldValue(name1);
      return _react["default"].createElement(_form["default"].Item, {
        name: name2,
        className: _form2["default"].marginNone,
        rules: rules === null || rules === void 0 ? void 0 : rules[1]
      }, _react["default"].createElement(_datePicker["default"], __assign({
        disabledDate: function disabledDate(currentDate) {
          return currentDate ? startTime ? currentDate.isBefore(startTime) : false : false;
        },
        className: className
      }, event2Props)));
    }));
  }, []);
};

FormDateRanger.typeList = typeList;

FormDateRanger.formatter = function (formatter) {
  return formatter ? formatter === "start_date" ? _date.startDateToUnix : formatter === "end_date" ? _date.endDateToUnix : _utils.transNullValue : _utils.transNullValue;
};

var _default = FormDateRanger;
exports["default"] = _default;