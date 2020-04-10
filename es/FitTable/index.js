import "antd/es/table/style/css";
import _Table from "antd/es/table";
import "antd/es/button/style/css";
import _Button from "antd/es/button";

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

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useScrollXY } from './hooks';
import styles from './_index.less';
import ColumnsSetting from './ColumnsSetting';
export var showTotal = function showTotal(total) {
  return React.createElement("span", null, "\u5171\u6709", total, "\u6761");
};
export var goButton = React.createElement(_Button, {
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
      onChange = _a.onChange,
      pagination = _a.pagination,
      _f = _a.showColumnsSetting,
      showColumnsSetting = _f === void 0 ? false : _f,
      props = __rest(_a, ["bottom", "minHeight", "autoFitY", "columns", "rowSelection", "scroll", "onChange", "pagination", "showColumnsSetting"]);

  var ref = useRef(null);
  var scroll = useScrollXY(ref, bottom, minHeight, autoFitY, columns, rowSelection, propsScroll);

  var _g = useState(columns),
      filterColumns = _g[0],
      setFilterColumns = _g[1];

  useEffect(function () {
    setFilterColumns(columns);
  }, [columns]);
  var onPaginationChange = useCallback(function (page, filters, sorter, extra) {
    if (!pagination) {
      onChange && onChange(page, filters, sorter, extra);
      return;
    }

    var _a = pagination,
        total = _a.total,
        current = _a.current,
        pageSize = _a.pageSize;

    if (page.pageSize !== pageSize) {
      // pageSize发生变化，保留原油current
      // 计算如果不能够满足当前的pageNumber则重置为1
      var maxPageNumber = Math.ceil(Number(total) / page.pageSize);
      var pageNumber = current <= maxPageNumber ? current : 1;
      onChange && onChange(__assign(__assign({}, page), {
        current: pageNumber
      }), filters, sorter, extra);
    } else {
      onChange && onChange(page, filters, sorter, extra);
    }
  }, [pagination]);
  var onFilterColumns = useCallback(function (columns) {
    setFilterColumns(columns);
  }, [columns]);

  var _columns = showColumnsSetting ? filterColumns : columns;

  var setting = useMemo(function () {
    return React.createElement(ColumnsSetting, {
      columns: columns,
      filterColumns: onFilterColumns
    });
  }, [_columns]);
  return useMemo(function () {
    return React.createElement("div", {
      ref: ref,
      className: styles.relative
    }, setting, React.createElement(_Table, __assign({
      scroll: scroll,
      columns: _columns,
      rowSelection: rowSelection
    }, props, {
      pagination: pagination,
      onChange: onChange ? onPaginationChange : undefined
    })));
  }, [props, propsScroll, rowSelection, _columns, pagination, onChange]);
}

FitTable.showTotal = showTotal;
FitTable.goButton = goButton;
FitTable.useScrollXY = useScrollXY;
export default FitTable;
export { useScrollXY };