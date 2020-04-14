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
import FitTable from './index';
import ColumnsSetting from './ColumnsSetting';
import styles from './_index.less';

var ColumnsSettingWrap = function ColumnsSettingWrap(_a) {
  var columns = _a.columns,
      columnsSettingRender = _a.columnsSettingRender,
      resetColumnsSetting = _a.resetColumnsSetting,
      props = __rest(_a, ["columns", "columnsSettingRender", "resetColumnsSetting"]);

  var filterColumns = useRef(columns);
  useMemo(function () {
    filterColumns.current = columns; // 强制覆盖仅当columns变化时
  }, [columns]);

  var _b = useState(false),
      reload = _b[0],
      setReload = _b[1];

  var setFilterColumns = useCallback(function (columns) {
    filterColumns.current = columns;
    setReload(!reload);
  }, [reload]);
  useEffect(function () {
    setFilterColumns(columns);
  }, [columns]);
  return useMemo(function () {
    return React.createElement("div", {
      className: styles.relative
    }, React.createElement(FitTable, __assign({}, props, {
      columns: filterColumns.current,
      // @ts-ignore
      settingComponent: React.createElement(ColumnsSetting, {
        columnsSettingRender: columnsSettingRender,
        columns: columns,
        onColumnsChange: setFilterColumns,
        resetColumnsSetting: resetColumnsSetting
      })
    })));
  }, [reload, props, filterColumns.current]);
};

export default ColumnsSettingWrap;