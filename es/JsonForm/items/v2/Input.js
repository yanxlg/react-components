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
import RichInput from '../../../RichInput';
import formStyles from '../../_form.less';
import classNames from 'classnames';
var typeList = ['input@2', 'integer@2', 'number@2', 'positiveInteger@2', 'textarea@2', 'numberSplit@2', 'naturalNumber@2'];
var TextArea = _Input.TextArea;

var FormInput = function FormInput(props) {
  var _a = props.className,
      className = _a === void 0 ? formStyles.formItem : _a,
      _onChange = props.onChange,
      labelClassName = props.labelClassName,
      form = props.form,
      type = props.type,
      childrenProps = props.childrenProps,
      labelCol = props.labelCol,
      formatter = props.formatter,
      formItemProps = __rest(props, ["className", "onChange", "labelClassName", "form", "type", "childrenProps", "labelCol", "formatter"]);

  var eventProps = useMemo(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
  }, []);
  return useMemo(function () {
    return React.createElement(_Form.Item, __assign({
      className: className,
      labelCol: __assign(__assign({}, labelCol), {
        className: classNames(labelCol === null || labelCol === void 0 ? void 0 : labelCol.className, labelClassName)
      })
    }, formItemProps), type === 'textarea@2' ? React.createElement(TextArea, __assign({
      allowClear: true,
      className: formStyles.formItemDefault,
      autoSize: {
        minRows: 1,
        maxRows: 6
      }
    }, childrenProps, eventProps)) : React.createElement(RichInput, __assign({
      allowClear: true,
      className: formStyles.formItemDefault
    }, childrenProps, eventProps, {
      richType: type.replace(/@\d+/, '')
    })));
  }, [childrenProps, formItemProps]);
};

FormInput.typeList = typeList;
export default FormInput;