import "antd/es/radio/style/css";
import _Radio from "antd/es/radio";
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
import formStyles from '../_form.less';
var typeList = ['radioGroup'];

var FormRadioGroup = function FormRadioGroup(props) {
  var name = props.name,
      label = props.label,
      labelClassName = props.labelClassName,
      _a = props.formItemClassName,
      formItemClassName = _a === void 0 ? formStyles.formItem : _a,
      className = props.className,
      _onChange = props.onChange,
      form = props.form,
      rules = props.rules,
      _b = props.radioType,
      radioType = _b === void 0 ? 'radio' : _b,
      options = props.options,
      _props = __rest(props, ["name", "label", "labelClassName", "formItemClassName", "className", "onChange", "form", "rules", "radioType", "options"]);

  var eventProps = useMemo(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
  }, []);
  return React.createElement(_Form.Item, {
    name: name,
    label: label ? React.createElement("span", {
      className: labelClassName
    }, label) : undefined,
    className: formItemClassName,
    rules: rules
  }, React.createElement(_Radio.Group, __assign({
    className: className
  }, eventProps, _props), options.map(function (option) {
    var _a = typeof option === 'string' ? {
      label: option,
      value: option
    } : option,
        label = _a.label,
        value = _a.value;

    if (radioType === 'radio') {
      return React.createElement(_Radio, {
        key: String(value),
        value: value
      }, label);
    } else {
      return React.createElement(_Radio.Button, {
        key: String(value),
        value: value
      }, label);
    }
  })));
};

FormRadioGroup.typeList = typeList;
export default FormRadioGroup;