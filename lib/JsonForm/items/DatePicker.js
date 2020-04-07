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

var _moment = _interopRequireDefault(require("moment"));

var _utils = require("../utils");

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

var typeList = ["datePicker"];

var FormDatePicker = function FormDatePicker(props) {
  var name = props.name,
      placeholder = props.placeholder,
      label = props.label,
      _a = props.className,
      className = _a === void 0 ? _form2["default"].formItemDefault : _a,
      formItemClassName = props.formItemClassName,
      dateBeginWith = props.dateBeginWith,
      dateEndWith = props.dateEndWith,
      _onChange = props.onChange,
      labelClassName = props.labelClassName,
      form = props.form,
      rules = props.rules;
  var disabledStartDate = (0, _react.useCallback)(function (dateBeginWith) {
    if (!dateBeginWith || dateBeginWith.length === 0) {
      return undefined;
    }

    return function (startTime) {
      var timeMax = undefined; // 取最小值=> endOf('d');

      dateBeginWith.map(function (dependence) {
        var date = dependence === "now" ? (0, _moment["default"])() : form.getFieldValue(dependence);

        if (date) {
          var time = date.startOf("day").valueOf();

          if (timeMax && time < timeMax || timeMax === void 0) {
            timeMax = time;
          }
        }
      });

      if (!startTime || timeMax === void 0) {
        return false;
      }

      return startTime.startOf("day").valueOf() < timeMax;
    };
  }, []);
  var disabledEndDate = (0, _react.useCallback)(function (dateEndWith) {
    if (!dateEndWith || dateEndWith.length === 0) {
      return undefined;
    }

    return function (endTime) {
      var timeMax = undefined; // 取最大值=> startOf('d');

      dateEndWith.map(function (dependence) {
        var date = dependence === "now" ? (0, _moment["default"])() : form.getFieldValue(dependence);

        if (date) {
          var time = date.endOf("day").valueOf();

          if (timeMax && time < timeMax || timeMax === void 0) {
            timeMax = time;
          }
        }
      });

      if (!endTime || timeMax === void 0) {
        return false;
      }

      return timeMax < endTime.endOf("day").valueOf();
    };
  }, []);
  var disabledDate = (0, _react.useMemo)(function () {
    return dateBeginWith ? disabledStartDate(dateBeginWith) : dateEndWith ? disabledEndDate(dateEndWith) : undefined;
  }, [dateBeginWith, dateEndWith]);
  var eventProps = (0, _react.useMemo)(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
  }, []);
  return _react["default"].createElement(_form["default"].Item, {
    name: name,
    className: formItemClassName,
    label: _react["default"].createElement("span", {
      className: labelClassName
    }, label),
    rules: rules
  }, _react["default"].createElement(_datePicker["default"], __assign({
    className: className,
    placeholder: placeholder,
    disabledDate: disabledDate
  }, eventProps)));
};

FormDatePicker.typeList = typeList;

FormDatePicker.formatter = function (formatter) {
  return formatter ? formatter === "start_date" ? _utils.transStartDate : formatter === "end_date" ? _utils.transEndDate : _utils.transNullValue : _utils.transNullValue;
};

var _default = FormDatePicker;
exports["default"] = _default;