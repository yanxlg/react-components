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
import formStyles from '../_form.less';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
var typeList = ['password'];

var FormPassword = function FormPassword(props) {
  var name = props.name,
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
      iconRender = props.iconRender,
      _c = props.defaultVisible,
      defaultVisible = _c === void 0 ? false : _c,
      _props = __rest(props, ["name", "label", "className", "formItemClassName", "onChange", "labelClassName", "form", "type", "rules", "colon", "initialValue", "iconRender", "defaultVisible"]);

  var eventProps = useMemo(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
  }, []);

  var _d = useState(defaultVisible),
      visible = _d[0],
      setVisible = _d[1];

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
    return React.createElement(_Form.Item, {
      className: formItemClassName,
      name: name,
      label: React.createElement("span", {
        className: labelClassName
      }, label),
      rules: rules,
      colon: colon,
      initialValue: initialValue
    }, React.createElement(_Input, __assign({
      className: className
    }, _props, eventProps, {
      suffix: suffix,
      type: visible ? 'text' : 'password'
    })));
  }, [_props, visible]);
};

FormPassword.defaultProps = {
  iconRender: function iconRender(visible) {
    return visible ? /*#__PURE__*/React.createElement(EyeOutlined, null) : /*#__PURE__*/React.createElement(EyeInvisibleOutlined, null);
  }
};
FormPassword.typeList = typeList;
export default FormPassword;