import "antd/es/input-number/style/css";
import _InputNumber from "antd/es/input-number";

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

import React from 'react';
import { intFormatter, positiveIntFormatter } from "../RichInput/utils";

var IntegerInput = function IntegerInput(_a) {
  var positive = _a.positive,
      props = __rest(_a, ["positive"]);

  return /*#__PURE__*/React.createElement(_InputNumber, __assign({}, props, {
    min: 0,
    formatter: positive ? positiveIntFormatter : intFormatter
  }));
};

export default IntegerInput;