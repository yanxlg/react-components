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
import FitTable from '../FitTable2';
import useTableSetting from '../hooks/useTableSetting';

function SettingTable(_a) {
  var settingKey = _a.settingKey,
      props = __rest(_a, ["settingKey"]);

  var _b = useTableSetting(settingKey),
      hideKeys = _b.hideKeys,
      sortKeys = _b.sortKeys,
      updateHideKeys = _b.updateHideKeys,
      updateSortKeys = _b.updateSortKeys;

  return useMemo(function () {
    return React.createElement(FitTable, __assign({
      columnsSettingRender: true,
      bordered: true,
      hideKeys: hideKeys,
      sortKeys: sortKeys,
      onHideKeysChange: updateHideKeys,
      onSortKeysChange: updateSortKeys
    }, props));
  }, [hideKeys, sortKeys, props]);
}

export default SettingTable;