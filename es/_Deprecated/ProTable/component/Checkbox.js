import "antd/es/checkbox/style/css";
import _Checkbox from "antd/es/checkbox";

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
/**提供自我管控的Checkbox**/


import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';

var Checkbox = function Checkbox(_a, ref) {
  var componentWillUnMont = _a.componentWillUnMont,
      onChange = _a.onChange,
      props = __rest(_a, ["componentWillUnMont", "onChange"]);

  var _b = useState({
    checked: false,
    indeterminate: false
  }),
      state = _b[0],
      setState = _b[1];

  useImperativeHandle(ref, function () {
    return {
      updateChecked: function updateChecked(checked) {
        setState({
          checked: checked,
          indeterminate: false
        });
      },
      setIndeterminate: function setIndeterminate() {
        setState({
          checked: false,
          indeterminate: true
        });
      },
      getValue: function getValue() {
        return props.value;
      },
      getValues: function getValues() {
        return {
          value: props.value,
          checked: state.checked
        };
      }
    };
  }, [state.checked]);
  useEffect(function () {
    return function () {
      componentWillUnMont(props.value);

      setState = function setState() {};
    };
  }, []);
  var onInnerChange = useCallback(function (e) {
    var checked = e.target.checked;
    setState({
      checked: checked,
      indeterminate: false
    });
    onChange && onChange(e);
  }, [onChange]);
  var checked = state.checked,
      indeterminate = state.indeterminate;
  return useMemo(function () {
    return /*#__PURE__*/React.createElement(_Checkbox, __assign({}, props, {
      checked: checked,
      indeterminate: indeterminate,
      onChange: onInnerChange
    }));
  }, [checked, indeterminate, onChange]);
};

export default /*#__PURE__*/forwardRef(Checkbox);