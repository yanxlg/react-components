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
import formStyles from '../../_form.less';
import classNames from 'classnames';
var typeList = ['radioGroup@2'];

var FormRadioGroup = function FormRadioGroup(props) {
  var _a = props.className,
      className = _a === void 0 ? formStyles.formItem : _a,
      labelClassName = props.labelClassName,
      _onChange = props.onChange,
      labelCol = props.labelCol,
      formatter = props.formatter,
      form = props.form,
      childrenProps = props.childrenProps,
      formItemProps = __rest(props, ["className", "labelClassName", "onChange", "labelCol", "formatter", "form", "childrenProps"]);

  var eventProps = useMemo(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
  }, [_onChange]);
  return React.createElement(_Form.Item, __assign({
    className: className,
    labelCol: __assign(__assign({}, labelCol), {
      className: classNames(labelCol === null || labelCol === void 0 ? void 0 : labelCol.className, labelClassName)
    })
  }, formItemProps), React.createElement(_Radio.Group, __assign({}, eventProps, childrenProps)));
};

FormRadioGroup.typeList = typeList;
export default FormRadioGroup;