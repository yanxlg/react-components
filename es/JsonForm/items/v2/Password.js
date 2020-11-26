import "antd/es/input/style/css";
import _Input from "antd/es/input";
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

import React, { useMemo, useState } from 'react';
import formStyles from '../../_form.less';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import classNames from 'classnames';
var typeList = ['password@2'];

var FormPassword = function FormPassword(props) {
  var _a = props.className,
      className = _a === void 0 ? formStyles.formItem : _a,
      _onChange = props.onChange,
      labelClassName = props.labelClassName,
      form = props.form,
      childrenProps = props.childrenProps,
      labelCol = props.labelCol,
      formatter = props.formatter,
      defaultVisible = props.defaultVisible,
      formItemProps = __rest(props, ["className", "onChange", "labelClassName", "form", "childrenProps", "labelCol", "formatter", "defaultVisible"]);

  var eventProps = useMemo(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
  }, []);

  var _b = useState(defaultVisible),
      visible = _b[0],
      setVisible = _b[1];

  var iconRender = useMemo(function () {
    return (childrenProps === null || childrenProps === void 0 ? void 0 : childrenProps.iconRender) || function (visible) {
      return visible ? /*#__PURE__*/React.createElement(EyeOutlined, null) : /*#__PURE__*/React.createElement(EyeInvisibleOutlined, null);
    };
  }, []);
  var suffix = useMemo(function () {
    var icon = iconRender(visible);
    var iconProps = {
      onClick: function onClick() {
        setVisible(function (visible) {
          return !visible;
        });
      },
      className: formStyles.formPwdIcon,
      onMouseDown: function onMouseDown(e) {
        e.preventDefault();
      },
      onMouseUp: function onMouseUp(e) {
        e.preventDefault();
      }
    };
    return /*#__PURE__*/React.cloneElement( /*#__PURE__*/React.isValidElement(icon) ? icon : /*#__PURE__*/React.createElement('span', null, icon), iconProps);
  }, [visible]);
  return useMemo(function () {
    return React.createElement(_Form.Item, __assign({
      className: className,
      labelCol: __assign(__assign({}, labelCol), {
        className: classNames(labelCol === null || labelCol === void 0 ? void 0 : labelCol.className, labelClassName)
      })
    }, formItemProps), React.createElement(_Input, __assign({
      className: formStyles.formItemDefault
    }, childrenProps, eventProps, {
      suffix: suffix,
      type: visible ? 'text' : 'password'
    })));
  }, [childrenProps, visible]);
};

FormPassword.typeList = typeList;
export default FormPassword;