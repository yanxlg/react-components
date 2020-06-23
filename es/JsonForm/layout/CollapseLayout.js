import "antd/es/collapse/style/css";
import _Collapse from "antd/es/collapse";

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
import { getFormItems } from '../index';
import formStyles from '../_form.less';
var typeList = ['collapse'];

var CollapseLayout = function CollapseLayout(props) {
  var form = props.form,
      labelClassName = props.labelClassName,
      type = props.type,
      fieldList = props.fieldList,
      itemCol = props.itemCol,
      itemRow = props.itemRow,
      header = props.header,
      footer = props.footer,
      _a = props.panel,
      _header = _a.header,
      __props = __rest(_a, ["header"]),
      _props = __rest(props, ["form", "labelClassName", "type", "fieldList", "itemCol", "itemRow", "header", "footer", "panel"]);

  return React.createElement(_Collapse, __assign({
    className: formStyles.formCollapse
  }, _props), React.createElement(_Collapse.Panel, __assign({
    header: getFormItems([_header], form)
  }, __props), getFormItems(fieldList, form, labelClassName, itemCol, itemRow)));
};

CollapseLayout.typeList = typeList;
export default CollapseLayout;