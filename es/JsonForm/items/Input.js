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
import RichInput from '../../RichInput';
import formStyles from '../_form.less';
var typeList = ['input', 'integer', 'number', 'positiveInteger'];

var FormInput = function FormInput(props) {
  var name = props.name,
      placeholder = props.placeholder,
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
      colon = props.colon,
      initialValue = props.initialValue,
      hide = props.hide,
      _props = __rest(props, ["name", "placeholder", "label", "className", "formItemClassName", "onChange", "labelClassName", "form", "type", "rules", "colon", "initialValue", "hide"]);

  var eventProps = useMemo(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
  }, []);
  return useMemo(function () {
    return /*#__PURE__*/React.createElement(_Form.Item, {
      className: formItemClassName,
      name: name,
      label: /*#__PURE__*/React.createElement("span", {
        className: labelClassName
      }, label),
      rules: rules,
      colon: colon,
      initialValue: initialValue,
      style: hide ? {
        display: 'none'
      } : {}
    }, /*#__PURE__*/React.createElement(RichInput, __assign({
      placeholder: placeholder,
      className: className
    }, _props, eventProps, {
      richType: type
    })));
  }, [_props, hide]);
};

FormInput.typeList = typeList;
export default FormInput;