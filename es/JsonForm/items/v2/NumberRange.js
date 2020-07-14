import "antd/es/input/style/css";
import _Input from "antd/es/input";
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

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import React, { useMemo } from 'react';
import formStyles from '../../_form.less';
import classNames from 'classnames';
import RichInput from '../../../RichInput';
var typeList = ['numberRange@2'];

var FormInputRange = function FormInputRange(props) {
  var _a = props.className,
      className = _a === void 0 ? formStyles.formItem : _a,
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
      formItemProps = __rest(props, ["className", "name", "onChange", "labelClassName", "labelCol", "form", "precision", "initialValue", "addonAfter", "childrenProps"]);

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
    return React.createElement(_Form.Item, __assign({
      className: className,
      labelCol: __assign(__assign({}, labelCol), {
        className: classNames(labelCol === null || labelCol === void 0 ? void 0 : labelCol.className, labelClassName)
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
    }, formItemProps), React.createElement(_Input.Group, {
      compact: true,
      className: formStyles.flex
    }, React.createElement(_Form.Item, {
      name: name1,
      validateTrigger: "onBlur",
      initialValue: initialValue === null || initialValue === void 0 ? void 0 : initialValue[0],
      noStyle: true
    }, React.createElement(RichInput, __assign({
      richType: "number",
      precision: precision
    }, event1Props, childrenProps, {
      className: classNames((childrenProps === null || childrenProps === void 0 ? void 0 : childrenProps.className) || formStyles.inputRange, formStyles.inputRangeFocus)
    }))), React.createElement(_Input, {
      className: formStyles.inputRangeSplit,
      placeholder: "~",
      disabled: true
    }), React.createElement(_Form.Item, {
      name: name2,
      validateTrigger: "onBlur",
      initialValue: initialValue === null || initialValue === void 0 ? void 0 : initialValue[1],
      noStyle: true
    }, React.createElement(RichInput, __assign({
      richType: "number",
      precision: precision
    }, event2Props, {
      className: classNames((childrenProps === null || childrenProps === void 0 ? void 0 : childrenProps.className) || formStyles.inputRange, formStyles.inputRangeRight, formStyles.inputRangeFocus)
    })))), addonAfter ? React.createElement("span", {
      className: [formStyles.endExtra, formStyles.verticalMiddle].join(' ')
    }, addonAfter) : null);
  }, []);
};

FormInputRange.typeList = typeList;
export default FormInputRange;