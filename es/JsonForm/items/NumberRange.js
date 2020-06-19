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

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

import React, { useMemo } from 'react';
import RichInput from '../../RichInput';
import formStyles from '../_form.less';
import classnames from 'classnames';
var typeList = ['inputRange', 'integerRange', 'numberRange', 'positiveIntegerRange'];

var FormNumberRange = function FormNumberRange(props) {
  var name = props.name,
      placeholder = props.placeholder,
      label = props.label,
      _a = props.className,
      className = _a === void 0 ? formStyles.flex1 : _a,
      // formStyles.formItemDefault,
  _b = props.formItemClassName,
      // formStyles.formItemDefault,
  formItemClassName = _b === void 0 ? formStyles.formItem : _b,
      _onChange = props.onChange,
      labelClassName = props.labelClassName,
      form = props.form,
      type = props.type,
      _c = props.rules,
      rules = _c === void 0 ? [] : _c,
      colon = props.colon,
      initialValue = props.initialValue,
      _props = __rest(props, ["name", "placeholder", "label", "className", "formItemClassName", "onChange", "labelClassName", "form", "type", "rules", "colon", "initialValue"]);

  var name1 = name[0],
      name2 = name[1]; // console.log(11111111, name1, name2);

  var _type = type.replace('Range', '');

  var eventProps = useMemo(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
  }, []);
  return useMemo(function () {
    return React.createElement(_Form.Item, {
      className: formItemClassName,
      name: "_range",
      label: React.createElement("span", {
        className: labelClassName
      }, label),
      colon: colon,
      validateTrigger: "onBlur",
      rules: __spreadArrays([function (_a) {
        var getFieldValue = _a.getFieldValue;
        return {
          validator: function validator(rule, value) {
            var min = getFieldValue(name1);
            var max = getFieldValue(name2);

            if (min && max && Number(min) > Number(max)) {
              return Promise.reject('请检查区间!');
            }

            return Promise.resolve();
          }
        };
      }], rules)
    }, React.createElement(_Input.Group, {
      compact: true,
      className: formStyles.flex
    }, React.createElement(_Form.Item, {
      name: name1,
      className: classnames(formStyles.marginNone),
      initialValue: initialValue === null || initialValue === void 0 ? void 0 : initialValue[0]
    }, React.createElement(RichInput, __assign({
      placeholder: placeholder,
      className: classnames(formStyles.inputRange, formStyles.inputRangeLeft, className)
    }, _props, eventProps, {
      richType: _type
    }))), React.createElement(_Input, {
      className: formStyles.inputRangeSplit,
      placeholder: "~",
      disabled: true
    }), React.createElement(_Form.Item, {
      name: name2,
      className: classnames(formStyles.marginNone),
      initialValue: initialValue === null || initialValue === void 0 ? void 0 : initialValue[1]
    }, React.createElement(RichInput, __assign({
      placeholder: placeholder,
      className: classnames(formStyles.inputRange, formStyles.inputRangeRight, className)
    }, _props, eventProps, {
      richType: _type
    })))));
  }, [_props]);
};

FormNumberRange.typeList = typeList;
export default FormNumberRange;