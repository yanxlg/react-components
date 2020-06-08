import "antd/es/col/style/css";
import _Col from "antd/es/col";
import "antd/es/row/style/css";
import _Row from "antd/es/row";
import "antd/es/table/style/css";
import _Table from "antd/es/table";
import "antd/es/pagination/style/css";
import _Pagination from "antd/es/pagination";
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

import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useScrollXY } from './hooks';
import styles from './_index.less';
import ColumnsSettingWrap from './ColumnsSettingWrap';
import { EmptyArray, EmptyObject } from '../utils';
import { defaultPageSizeOptions } from '../ProTable/config';
import formStyles from '../JsonForm/_form.less';
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
      _f = _a.toolBarRender,
      toolBarRender = _f === void 0 ? function () {
    return null;
  } : _f,
      onHeaderRow = _a.onHeaderRow,
      // @ts-ignore
  settingComponent = _a.settingComponent,
      props = __rest(_a, ["bottom", "minHeight", "autoFitY", "columns", "rowSelection", "scroll", "onChange", "pagination", "toolBarRender", "onHeaderRow", "settingComponent"]);

  var ref = useRef(null);
  var scroll = useScrollXY(ref, bottom, minHeight, autoFitY, columns, rowSelection, propsScroll);
  var filtersRef = useRef(EmptyObject);
  var sorterRef = useRef(EmptyObject);
  var extraRef = useRef({
    currentDataSource: EmptyArray
  });
  var onTableChange = useCallback(function (page, filters, sorter, extra) {
    filtersRef.current = filters;
    sorterRef.current = sorter;
    extraRef.current = extra;

    if (onChange) {
      onChange(pagination || {}, filters, sorter, extra);
    }
  }, [pagination]);
  var onPageChange = useCallback(function (page, pageSize) {
    if (onChange) {
      onChange(__assign(__assign({}, pagination), {
        current: page,
        pageSize: pageSize
      }), filtersRef.current, sorterRef.current, extraRef.current);
    }
  }, []);
  var paginationComponent = useMemo(function () {
    return pagination ? React.createElement(_Pagination, __assign({}, __assign({
      pageSizeOptions: defaultPageSizeOptions,
      showQuickJumper: {
        goButton: goButton
      },
      showTotal: showTotal
    }, pagination), {
      onChange: onPageChange,
      onShowSizeChange: onPageChange
    })) : null;
  }, [pagination]);
  var onHeaderRowEnter = useCallback(function (event) {
    ref.current.setAttribute('data-show-setting', 'true');
  }, []);
  var onHeaderRowLeave = useCallback(function (event) {
    ref.current.removeAttribute('data-show-setting');
  }, []);
  useEffect(function () {
    return function () {
      ref.current.removeAttribute('data-show-setting');
    };
  }, []);
  var onHeaderRowFn = useCallback(function (column, index) {
    if (onHeaderRow) {
      var _a = onHeaderRow(column, index),
          onMouseEnter_1 = _a.onMouseEnter,
          onMouseLeave_1 = _a.onMouseLeave,
          extra = __rest(_a, ["onMouseEnter", "onMouseLeave"]);

      return __assign(__assign({}, extra), {
        onMouseEnter: function onMouseEnter(event) {
          onHeaderRowEnter(event);
          onMouseEnter_1 && onMouseEnter_1(event);
        },
        onMouseLeave: function onMouseLeave(event) {
          onHeaderRowLeave(event);
          onMouseLeave_1 && onMouseLeave_1(event);
        }
      });
    } else {
      return {
        onMouseEnter: onHeaderRowEnter,
        onMouseLeave: onHeaderRowLeave
      };
    }
  }, [onHeaderRow]);
  var tableContent = useMemo(function () {
    return React.createElement(_Table, __assign({
      key: columns.length,
      scroll: scroll,
      columns: columns,
      rowSelection: rowSelection
    }, props, {
      pagination: false,
      onChange: onChange ? onTableChange : undefined,
      onHeaderRow: onHeaderRowFn
    }));
  }, [props, propsScroll, rowSelection, columns, onChange]);
  var paginationTopContainer = useMemo(function () {
    var top = pagination && pagination.position && pagination.position.includes('topRight'); // 需要有top配置，默认不显示

    return top ? React.createElement(_Row, null, React.createElement(_Col, {
      className: styles.toolSpacing,
      flex: 1
    }, toolBarRender()), React.createElement(_Col, {
      className: styles.toolSpacing
    }, paginationComponent)) : null;
  }, [pagination, toolBarRender]);
  var paginationBottomContainer = useMemo(function () {
    var bottom = pagination ? pagination.position === void 0 || pagination.position.includes('bottomRight') : false;
    return bottom ? React.createElement(_Row, {
      className: formStyles.formItem
    }, React.createElement(_Col, {
      flex: 1
    }), React.createElement(_Col, null, paginationComponent)) : null;
  }, [pagination]);
  return useMemo(function () {
    return React.createElement("div", null, paginationTopContainer, React.createElement("div", {
      ref: ref,
      className: styles.relative
    }, settingComponent, tableContent), paginationBottomContainer);
  }, [props, propsScroll, rowSelection, columns, pagination, onChange]);
}

function FitTableWrap(_a) {
  var columnsSettingRender = _a.columnsSettingRender,
      props = __rest(_a, ["columnsSettingRender"]);

  return useMemo(function () {
    if (columnsSettingRender) {
      return React.createElement(ColumnsSettingWrap, __assign({}, props, {
        columnsSettingRender: columnsSettingRender
      }));
    } else {
      return React.createElement(FitTable, __assign({}, props));
    }
  }, [props]);
}

FitTableWrap.showTotal = showTotal;
FitTableWrap.goButton = goButton;
FitTableWrap.useScrollXY = useScrollXY;
export default FitTableWrap;
export { useScrollXY };