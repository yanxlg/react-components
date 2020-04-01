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
import { Checkbox, Form } from 'antd';
var typeList = ['checkbox'];

var FormCheckbox = function FormCheckbox(props) {
  var name = props.name,
      label = props.label,
      formItemClassName = props.formItemClassName,
      className = props.className,
      _onChange = props.onChange,
      form = props.form,
      rules = props.rules;
  var eventProps = useMemo(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
  }, []);
  return React.createElement(Form.Item, {
    name: name,
    className: formItemClassName,
    valuePropName: "checked",
    rules: rules
  }, React.createElement(Checkbox, __assign({
    className: className
  }, eventProps), label));
};

FormCheckbox.typeList = typeList;
export default FormCheckbox;