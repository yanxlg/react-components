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

import React from 'react';
import { InputNumber } from 'antd';
import { numberFormatter } from "../RichInput/utils";

var NumberInput = function NumberInput(props) {
  return React.createElement(InputNumber, __assign({}, props, {
    min: 0,
    formatter: numberFormatter
  }));
};

export default NumberInput;