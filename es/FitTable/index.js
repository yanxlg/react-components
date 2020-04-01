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

import React, { useMemo, useRef } from 'react';
import { Table, Button } from 'antd';
import { useScrollXY } from './hooks';
import styles from './_index.less';
export var showTotal = function showTotal(total) {
  return React.createElement("span", null, "\u5171\u6709", total, "\u6761");
};
export var goButton = React.createElement(Button, {
  className: styles.btnGo
}, "Go");

function FitTable(_a) {
  var _b = _a.bottom,
      bottom = _b === void 0 ? 0 : _b,
      _c = _a.minHeight,
      minHeight = _c === void 0 ? 500 : _c,
      _d = _a.autoFitY,
      autoFitY = _d === void 0 ? true : _d,
      _e = _a.columns,
      columns = _e === void 0 ? [] : _e,
      rowSelection = _a.rowSelection,
      propsScroll = _a.scroll,
      props = __rest(_a, ["bottom", "minHeight", "autoFitY", "columns", "rowSelection", "scroll"]);

  var ref = useRef(null);
  var scroll = useScrollXY(ref, bottom, minHeight, autoFitY, columns, rowSelection, propsScroll);
  return useMemo(function () {
    return React.createElement("div", {
      ref: ref
    }, React.createElement(Table, __assign({
      scroll: scroll,
      columns: columns,
      rowSelection: rowSelection
    }, props)));
  }, [props, propsScroll, rowSelection, columns]);
}

export default FitTable;
export { useScrollXY };