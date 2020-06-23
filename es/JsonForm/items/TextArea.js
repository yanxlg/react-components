import "antd/es/form/style/css";
import _Form from "antd/es/form";
import "antd/es/input/style/css";
import _Input from "antd/es/input";

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
var TextArea = _Input.TextArea;
var typeList = ['textarea'];

var FormTextArea = function FormTextArea(props) {
  var name = props.name,
      // placeholder,
  label = props.label,
      _a = props.className,
      className = _a === void 0 ? formStyles.formItemDefault : _a,
      _b = props.formItemClassName,
      formItemClassName = _b === void 0 ? formStyles.formItem : _b,
      _onChange = props.onChange,
      labelClassName = props.labelClassName,
      form = props.form,
      type = props.type,
      rules = props.rules,
      _c = props.autoSize,
      autoSize = _c === void 0 ? {
    minRows: 1,
    maxRows: 6
  } : _c,
      initialValue = props.initialValue,
      hide = props.hide,
      _d = props.allowClear,
      allowClear = _d === void 0 ? true : _d,
      _props = __rest(props, ["name", "label", "className", "formItemClassName", "onChange", "labelClassName", "form", "type", "rules", "autoSize", "initialValue", "hide", "allowClear"]);

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
      name: name,
      label: React.createElement("span", {
        className: labelClassName
      }, label),
      rules: rules,
      initialValue: initialValue,
      style: hide ? {
        display: 'none'
      } : {}
    }, React.createElement(TextArea, __assign({
      autoSize: autoSize,
      // placeholder={placeholder}
      className: className
    }, _props, eventProps, {
      allowClear: allowClear
    })));
  }, [_props, hide]);
};

FormTextArea.typeList = typeList;
export default FormTextArea;