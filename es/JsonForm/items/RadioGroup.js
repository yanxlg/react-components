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
import { Form, Radio } from 'antd';
var typeList = ['radioGroup'];

var FormRadioGroup = function FormRadioGroup(props) {
  var name = props.name,
      label = props.label,
      labelClassName = props.labelClassName,
      formItemClassName = props.formItemClassName,
      className = props.className,
      _onChange = props.onChange,
      form = props.form,
      rules = props.rules,
      _props = __rest(props, ["name", "label", "labelClassName", "formItemClassName", "className", "onChange", "form", "rules"]);

  var eventProps = useMemo(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
  }, []);
  return React.createElement(Form.Item, {
    name: name,
    label: label ? React.createElement("span", {
      className: labelClassName
    }, label) : undefined,
    className: formItemClassName,
    rules: rules
  }, React.createElement(Radio.Group, __assign({
    className: className
  }, eventProps, _props)));
};

FormRadioGroup.typeList = typeList;
export default FormRadioGroup;