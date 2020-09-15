import "antd/es/form/style/css";
import _Form from "antd/es/form";

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
var typeList = ['label'];

var FormLabel = function FormLabel(props) {
  var name = props.name,
      placeholder = props.placeholder,
      label = props.label,
      _a = props.className,
      className = _a === void 0 ? formStyles.formItemDefault : _a,
      _b = props.formItemClassName,
      formItemClassName = _b === void 0 ? formStyles.formItem : _b,
      labelClassName = props.labelClassName,
      form = props.form,
      type = props.type,
      colon = props.colon,
      hide = props.hide,
      content = props.content,
      _props = __rest(props, ["name", "placeholder", "label", "className", "formItemClassName", "labelClassName", "form", "type", "colon", "hide", "content"]);

  return useMemo(function () {
    return /*#__PURE__*/React.createElement(_Form.Item, {
      className: formItemClassName,
      name: name,
      label: /*#__PURE__*/React.createElement("span", {
        className: labelClassName
      }, label),
      colon: colon,
      style: hide ? {
        display: 'none'
      } : {}
    }, /*#__PURE__*/React.createElement("div", {
      className: className
    }, content));
  }, [_props, hide]);
};

FormLabel.typeList = typeList;
export default FormLabel;