import "antd/es/cascader/style/css";
import _Cascader from "antd/es/cascader";
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
var typeList = ['cascader'];

function filter(inputValue, path) {
  return path.some(function (option) {
    return option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
  });
}

var FormCascader = function FormCascader(props) {
  var name = props.name,
      label = props.label,
      _a = props.className,
      className = _a === void 0 ? formStyles.formItemDefault : _a,
      _b = props.formItemClassName,
      formItemClassName = _b === void 0 ? formStyles.formItem : _b,
      _onChange = props.onChange,
      labelClassName = props.labelClassName,
      form = props.form,
      rules = props.rules,
      placeholder = props.placeholder,
      disabled = props.disabled,
      initialValue = props.initialValue,
      hide = props.hide,
      extraProps = __rest(props, ["name", "label", "className", "formItemClassName", "onChange", "labelClassName", "form", "rules", "placeholder", "disabled", "initialValue", "hide"]);

  var eventProps = useMemo(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
  }, []);
  return useMemo(function () {
    return /*#__PURE__*/React.createElement(_Form.Item, {
      name: name,
      className: formItemClassName,
      label: /*#__PURE__*/React.createElement("span", {
        className: labelClassName
      }, label),
      rules: rules,
      initialValue: initialValue,
      style: hide ? {
        display: 'none'
      } : {}
    }, /*#__PURE__*/React.createElement(_Cascader, __assign({
      disabled: disabled,
      className: className,
      placeholder: placeholder,
      showSearch: {
        filter: filter
      }
    }, eventProps, extraProps)));
  }, [extraProps, disabled, hide]);
};

FormCascader.typeList = typeList;
export default FormCascader;