import "antd/es/checkbox/style/css";
import _Checkbox from "antd/es/checkbox";
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
var typeList = ['checkbox'];

var FormCheckbox = function FormCheckbox(props) {
  var name = props.name,
      label = props.label,
      _a = props.formItemClassName,
      formItemClassName = _a === void 0 ? formStyles.formItem : _a,
      className = props.className,
      _onChange = props.onChange,
      form = props.form,
      rules = props.rules,
      initialValue = props.initialValue,
      hide = props.hide;
  var eventProps = useMemo(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
  }, []);
  return /*#__PURE__*/React.createElement(_Form.Item, {
    name: name,
    className: formItemClassName,
    valuePropName: "checked",
    rules: rules,
    initialValue: initialValue,
    style: hide ? {
      display: 'none'
    } : {}
  }, /*#__PURE__*/React.createElement(_Checkbox, __assign({
    className: className
  }, eventProps), label));
};

FormCheckbox.typeList = typeList;
export default FormCheckbox;