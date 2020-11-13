import "antd/es/date-picker/style/css";
import _DatePicker from "antd/es/date-picker";
import "antd/es/form/style/css";
import _Form from "antd/es/form";

var __assign = this && this.__assign || function () {
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

import React, { useMemo } from 'react';
import formStyles from '../_form.less';
import classNames from 'classnames';
var typeList = ['dateRanger'];

var FormDateRanger = function FormDateRanger(props) {
  var label = props.label,
      className = props.className,
      _a = props.name,
      name1 = _a[0],
      name2 = _a[1],
      _b = props.formItemClassName,
      formItemClassName = _b === void 0 ? formStyles.formItem : _b,
      _onChange = props.onChange,
      _c = props.labelClassName,
      labelClassName = _c === void 0 ? '' : _c,
      form = props.form,
      rules = props.rules,
      initialValue = props.initialValue,
      hide = props.hide;
  var event1Props = useMemo(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name1, form);
      }
    } : {};
  }, []);
  var event2Props = useMemo(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name2, form);
      }
    } : {};
  }, []);
  return useMemo(function () {
    var itemClassName = classNames(formStyles.inlineBlock, formStyles.marginNone, formStyles.verticalMiddle);
    return /*#__PURE__*/React.createElement(_Form.Item, {
      label: /*#__PURE__*/React.createElement("span", {
        className: labelClassName
      }, label),
      className: "" + formItemClassName,
      style: hide ? {
        display: 'none'
      } : {}
    }, /*#__PURE__*/React.createElement(_Form.Item, {
      shouldUpdate: function shouldUpdate(prevValues, currentValues) {
        return prevValues[name2] !== currentValues[name2];
      },
      className: itemClassName
    }, function (_a) {
      var getFieldValue = _a.getFieldValue;
      var endTime = getFieldValue(name2);
      return /*#__PURE__*/React.createElement(_Form.Item, {
        name: name1,
        className: formStyles.marginNone,
        rules: rules === null || rules === void 0 ? void 0 : rules[0],
        initialValue: initialValue === null || initialValue === void 0 ? void 0 : initialValue[0]
      }, /*#__PURE__*/React.createElement(_DatePicker, __assign({
        disabledDate: function disabledDate(currentDate) {
          return currentDate ? endTime ? currentDate.isAfter(endTime) : false : false;
        },
        className: className
      }, event1Props)));
    }), /*#__PURE__*/React.createElement("span", {
      className: [formStyles.formColon, formStyles.verticalMiddle].join(' ')
    }, "-"), /*#__PURE__*/React.createElement(_Form.Item, {
      className: itemClassName,
      shouldUpdate: function shouldUpdate(prevValues, currentValues) {
        return prevValues[name1] !== currentValues[name1];
      }
    }, function (_a) {
      var getFieldValue = _a.getFieldValue;
      var startTime = getFieldValue(name1);
      return /*#__PURE__*/React.createElement(_Form.Item, {
        name: name2,
        className: formStyles.marginNone,
        rules: rules === null || rules === void 0 ? void 0 : rules[1],
        initialValue: initialValue === null || initialValue === void 0 ? void 0 : initialValue[1]
      }, /*#__PURE__*/React.createElement(_DatePicker, __assign({
        disabledDate: function disabledDate(currentDate) {
          return currentDate ? startTime ? currentDate.isBefore(startTime) : false : false;
        },
        className: className
      }, event2Props)));
    }));
  }, [hide]);
};

FormDateRanger.typeList = typeList;
export default FormDateRanger;