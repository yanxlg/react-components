import "antd/es/input-number/style/css";
import _InputNumber from "antd/es/input-number";
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

import React, { useMemo } from "react";
import formStyles from "../_form.less";
import { transNumber } from "../utils";
var typeList = ["inputRange"];

var FormInputRange = function FormInputRange(props) {
  var label = props.label,
      className = props.className,
      _a = props.name,
      name1 = _a[0],
      name2 = _a[1],
      _b = props.formItemClassName,
      formItemClassName = _b === void 0 ? formStyles.formItem : _b,
      _onChange = props.onChange,
<<<<<<< HEAD
      _b = props.labelClassName,
      labelClassName = _b === void 0 ? "" : _b,
=======
      _c = props.labelClassName,
      labelClassName = _c === void 0 ? "" : _c,
>>>>>>> form_optimize
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

        if (typeof value !== "number" || typeof value1 !== "number" || value >= value1) {
          // validateFields([name1]);
          return Promise.resolve();
        }

        return Promise.reject("请检查范围区间!");
      }
    };
  }]] : _e;
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
<<<<<<< HEAD
    var itemClassName = [formStyles.formInline, formStyles.inlineBlock, formStyles.marginNone, formStyles.verticalMiddle].join(" ");
=======
    var itemClassName = [formStyles.inlineBlock, formStyles.marginNone, formStyles.verticalMiddle].join(" ");
>>>>>>> form_optimize
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
    }, React.createElement(_Form.Item, {
      name: name1,
      className: formStyles.marginNone,
      validateTrigger: "onBlur",
      rules: rules === null || rules === void 0 ? void 0 : rules[0]
    }, React.createElement(_InputNumber, __assign({
      min: 0,
      precision: precision,
      className: className
    }, event1Props)))), React.createElement("span", {
      className: [formStyles.formColon, formStyles.verticalMiddle].join(" ")
    }, "-"), React.createElement(_Form.Item, {
      className: itemClassName,
      shouldUpdate: function shouldUpdate(prevValues, currentValues) {
        return prevValues[name1] !== currentValues[name1];
      }
    }, React.createElement(_Form.Item, {
      name: name2,
      className: formStyles.marginNone,
      validateTrigger: "onBlur",
      rules: rules === null || rules === void 0 ? void 0 : rules[1]
    }, React.createElement(_InputNumber, __assign({
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