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
import { transNullValue } from '../utils';
import formStyles from '../_form.less';
import classNames from 'classnames';
import { startDateToUnix, endDateToUnix } from '../../utils/date';
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
      _d = props.formatter,
      _e = _d === void 0 ? [] : _d,
      formatter1 = _e[0],
      formatter2 = _e[1];

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
    return React.createElement(_Form.Item, {
      label: React.createElement("span", {
        className: labelClassName
      }, label),
      className: "" + formItemClassName
    }, React.createElement(_Form.Item, {
      shouldUpdate: function shouldUpdate(prevValues, currentValues) {
        return prevValues[name2] !== currentValues[name2];
      },
      className: itemClassName
    }, function (_a) {
      var getFieldValue = _a.getFieldValue;
      var endTime = getFieldValue(name2);
      return React.createElement(_Form.Item, {
        name: name1,
        className: formStyles.marginNone,
        rules: rules === null || rules === void 0 ? void 0 : rules[0],
        normalize: formatter1 ? formatter1 === 'start_date' ? startDateToUnix : formatter1 === 'end_date' ? endDateToUnix : transNullValue : transNullValue
      }, React.createElement(_DatePicker, __assign({
        disabledDate: function disabledDate(currentDate) {
          return currentDate ? endTime ? currentDate.isAfter(endTime) : false : false;
        },
        className: className
      }, event1Props)));
    }), React.createElement("span", {
      className: [formStyles.formColon, formStyles.verticalMiddle].join(' ')
    }, "-"), React.createElement(_Form.Item, {
      className: itemClassName,
      shouldUpdate: function shouldUpdate(prevValues, currentValues) {
        return prevValues[name1] !== currentValues[name1];
      }
    }, function (_a) {
      var getFieldValue = _a.getFieldValue;
      var startTime = getFieldValue(name1);
      return React.createElement(_Form.Item, {
        name: name2,
        className: formStyles.marginNone,
        rules: rules === null || rules === void 0 ? void 0 : rules[1],
        normalize: formatter2 ? formatter2 === 'start_date' ? startDateToUnix : formatter2 === 'end_date' ? endDateToUnix : transNullValue : transNullValue
      }, React.createElement(_DatePicker, __assign({
        disabledDate: function disabledDate(currentDate) {
          return currentDate ? startTime ? currentDate.isBefore(startTime) : false : false;
        },
        className: className
      }, event2Props)));
    }));
  }, []);
};

FormDateRanger.typeList = typeList;
export default FormDateRanger;