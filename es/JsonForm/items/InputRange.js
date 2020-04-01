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
import { Form, InputNumber } from 'antd';
import formStyles from '../_form.less';
import styles from '../_index.less';
import { transNumber } from '../utils';
var typeList = ['inputRange'];

var FormInputRange = function FormInputRange(props) {
  var label = props.label,
      className = props.className,
      _a = props.name,
      name1 = _a[0],
      name2 = _a[1],
      formItemClassName = props.formItemClassName,
      _onChange = props.onChange,
      _b = props.labelClassName,
      labelClassName = _b === void 0 ? '' : _b,
      form = props.form,
      _c = props.precision,
      precision = _c === void 0 ? 0 : _c,
      _d = props.rules,
      rules = _d === void 0 ? [[function (_a) {
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
  }]] : _d;
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
    var itemClassName = [formStyles.formInline, styles.inlineBlock, styles.marginNone, styles.verticalMiddle].join(' ');
    return React.createElement(Form.Item, {
      label: React.createElement("span", {
        className: labelClassName
      }, label),
      className: "" + formItemClassName
    }, React.createElement(Form.Item, {
      shouldUpdate: function shouldUpdate(prevValues, currentValues) {
        return prevValues[name2] !== currentValues[name2];
      },
      className: itemClassName
    }, React.createElement(Form.Item, {
      name: name1,
      className: styles.marginNone,
      validateTrigger: "onBlur",
      rules: rules === null || rules === void 0 ? void 0 : rules[0]
    }, React.createElement(InputNumber, __assign({
      min: 0,
      precision: precision,
      className: className
    }, event1Props)))), React.createElement("span", {
      className: [formStyles.formColon, styles.verticalMiddle].join(' ')
    }, "-"), React.createElement(Form.Item, {
      className: itemClassName,
      shouldUpdate: function shouldUpdate(prevValues, currentValues) {
        return prevValues[name1] !== currentValues[name1];
      }
    }, React.createElement(Form.Item, {
      name: name2,
      className: styles.marginNone,
      validateTrigger: "onBlur",
      rules: rules === null || rules === void 0 ? void 0 : rules[1]
    }, React.createElement(InputNumber, __assign({
      min: 0,
      precision: precision,
      className: className
    }, event2Props)))));
  }, []);
};

FormInputRange.typeList = typeList;

FormInputRange.formatter = function () {
  return transNumber;
};

export default FormInputRange;