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

var _form2 = _interopRequireDefault(require("../../_form.less"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Select = require("./Select");

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

var typeList = ['dateRanger@2'];

var FormDateRanger = function FormDateRanger(props) {
  var _a = props.name,
      name1 = _a[0],
      name2 = _a[1],
      _b = props.className,
      className = _b === void 0 ? _form2["default"].formItem : _b,
      _onChange = props.onChange,
      labelClassName = props.labelClassName,
      form = props.form,
      type = props.type,
      rules = props.rules,
      initialValue = props.initialValue,
      childrenProps = props.childrenProps,
      formatter = props.formatter,
      labelCol = props.labelCol,
      formItemProps = __rest(props, ["name", "className", "onChange", "labelClassName", "form", "type", "rules", "initialValue", "childrenProps", "formatter", "labelCol"]);

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
    return _react["default"].createElement(_form["default"].Item, __assign({
      labelCol: __assign(__assign({}, labelCol), {
        className: (0, _classnames["default"])(labelCol === null || labelCol === void 0 ? void 0 : labelCol.className, labelClassName)
      }),
      className: className
    }, formItemProps), _react["default"].createElement(_form["default"].Item, {
      shouldUpdate: function shouldUpdate(prevValues, currentValues) {
        return (0, _Select.getValueByNamePath)(prevValues, name2) !== (0, _Select.getValueByNamePath)(currentValues, name2);
      },
      className: itemClassName
    }, function (_a) {
      var getFieldValue = _a.getFieldValue;
      var endTime = getFieldValue(name2);
      return _react["default"].createElement(_form["default"].Item, {
        name: name1,
        className: _form2["default"].marginNone,
        rules: rules === null || rules === void 0 ? void 0 : rules[0],
        initialValue: initialValue === null || initialValue === void 0 ? void 0 : initialValue[0],
        colon: false
      }, _react["default"].createElement(_datePicker["default"], __assign({
        disabledDate: function disabledDate(currentDate) {
          return currentDate ? endTime ? currentDate.isAfter(endTime) : false : false;
        }
      }, childrenProps, event1Props)));
    }), _react["default"].createElement("span", {
      className: (0, _classnames["default"])(_form2["default"].formColon, _form2["default"].verticalMiddle)
    }, "-"), _react["default"].createElement(_form["default"].Item, {
      className: itemClassName,
      shouldUpdate: function shouldUpdate(prevValues, currentValues) {
        return (0, _Select.getValueByNamePath)(prevValues, name1) !== (0, _Select.getValueByNamePath)(currentValues, name1);
      }
    }, function (_a) {
      var getFieldValue = _a.getFieldValue;
      var startTime = getFieldValue(name1);
      return _react["default"].createElement(_form["default"].Item, {
        name: name2,
        className: _form2["default"].marginNone,
        rules: rules === null || rules === void 0 ? void 0 : rules[1],
        initialValue: initialValue === null || initialValue === void 0 ? void 0 : initialValue[1],
        colon: false
      }, _react["default"].createElement(_datePicker["default"], __assign({
        disabledDate: function disabledDate(currentDate) {
          return currentDate ? startTime ? currentDate.isBefore(startTime) : false : false;
        }
      }, childrenProps, event2Props)));
    }));
  }, [childrenProps]);
};

FormDateRanger.typeList = typeList;
var _default = FormDateRanger;
exports["default"] = _default;