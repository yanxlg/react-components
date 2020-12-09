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
import { EmptyObject } from '../utils';
import { defaultPageSizeOptions } from '../_Deprecated/ProTable/config';
import formStyles from '../JsonForm/_form.less';
import DraggableHeaderCell from './DraggableHeaderCell';
import DragDropProvider from './DragDropProvider';
import assert from 'assert';
var defaultScroll = {
  x: true,
  scrollToFirstRowOnChange: true
};
export var showTotal = function showTotal(total) {
  return /*#__PURE__*/React.createElement("span", null, "\u5171\u6709", total, "\u6761");
};
export var goButton = /*#__PURE__*/React.createElement(_Button, {
  className: styles.btnGo
}, "Go"); // 针对columns进行检查，如果dataIndex不是字符串则需要唯一key

export var getColumnKey = function getColumnKey(column) {
  return String(column.key || column['dataIndex']);
};

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
      _f = _a.scroll,
      propsScroll = _f === void 0 ? defaultScroll : _f,
      onChange = _a.onChange,
      pagination = _a.pagination,
      _g = _a.toolBarRender,
      toolBarRender = _g === void 0 ? function () {
    return null;
  } : _g,
      hideKeys = _a.hideKeys,
      sortKeys = _a.sortKeys,
      onHeaderRow = _a.onHeaderRow,
      // @ts-ignore
  settingComponent = _a.settingComponent,
      onSortKeysChange = _a.onSortKeysChange,
      onHideKeysChange = _a.onHideKeysChange,
      props = __rest(_a, ["bottom", "minHeight", "autoFitY", "columns", "rowSelection", "scroll", "onChange", "pagination", "toolBarRender", "hideKeys", "sortKeys", "onHeaderRow", "settingComponent", "onSortKeysChange", "onHideKeysChange"]);

  var hideKeysRef = useRef(hideKeys);
  useMemo(function () {
    hideKeysRef.current = hideKeys;
  }, [hideKeys]);
  var sortKeysRef = useRef([]); // 缓存真实sortKeys
  // columns => sort => filter

  if (process.env.NODE_ENV === 'development') {
    columns.forEach(function (item) {
      var dataIndex = typeof item['dataIndex'] === 'string';
      var key = item.key;
      assert(key || dataIndex, 'column must have a unique key or dataIndex(String).');
    });
  }

  var ref = useRef(null);
  var filtersRef = useRef(EmptyObject);
  var sorterRef = useRef(EmptyObject);
  var extraRef = useRef();
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
    return pagination ? /*#__PURE__*/React.createElement(_Pagination, __assign({}, __assign({
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
  var moveColumn = useCallback(function (from, to) {
    // 新增或删除column时怎么合理处理本地缓存
    if (from !== to) {
      var keys = sortKeysRef.current;

      if (to > from) {
        keys.splice(to + 1, 0, keys[from]);
        keys.splice(from, 1);
      } else {
        keys.splice(to, 0, keys[from]);
        keys.splice(from + 1, 1);
      }

      onSortKeysChange === null || onSortKeysChange === void 0 ? void 0 : onSortKeysChange(Array.from(keys));
    }
  }, []);
  var hideColumn = useCallback(function (key) {
    var set = new Set(hideKeysRef.current);
    set.add(key);
    onHideKeysChange(Array.from(set));
  }, []); // 隐藏某一列

  var sortMap = useMemo(function () {
    var map = {};

    if (sortKeys) {
      sortKeys.forEach(function (key, index) {
        map[String(key)] = index;
      });
    } else {
      columns.forEach(function (item, index) {
        map[getColumnKey(item)] = index;
      });
    }

    return map;
  }, [sortKeys, columns]); // columns转换 columns => sort => filter

  var mergeColumns = useMemo(function () {
    var alignsArray = [];
    sortKeysRef.current = [];
    var filterColumns = columns.sort(function (a, b) {
      var preSortIndex = sortMap[getColumnKey(a)];
      var nextSortIndex = sortMap[getColumnKey(b)];

      if (preSortIndex !== void 0 && nextSortIndex !== void 0) {
        return preSortIndex - nextSortIndex;
      }

      return 0;
    }).map(function (column, index) {
      sortKeysRef.current.push(getColumnKey(column));
      return __assign(__assign({}, column), {
        onHeaderCell: function onHeaderCell() {
          return {
            index: index,
            moveColumn: moveColumn,
            hideColumn: hideColumn,
            column: column
          };
        }
      });
    }).filter(function (item) {
      var filtered = !hideKeys || hideKeys.indexOf(getColumnKey(item)) === -1;

      if (filtered) {
        alignsArray.push(item.fixed);
      }

      return filtered;
    });
    var alignsString = alignsArray.join(',');
    var left = alignsString.match(/^left(,left)*/);
    var right = alignsString.match(/right(,right)*$/);
    var leftAlignSize = left ? left[0].split(',').length : 0;
    var rightAlignSize = right ? right[0].split(',').length : 0;
    var length = filterColumns.length; // 获取left最长位，获取right最长位

    return filterColumns.map(function (item, index) {
      if (index + 1 <= leftAlignSize || index >= length - rightAlignSize) {
        return item;
      } else {
        return __assign(__assign({}, item), {
          fixed: undefined
        });
      }
    }); // fixed处理不可断层
  }, [columns, hideKeys, sortKeys]);
  var scroll = useScrollXY(ref, bottom, minHeight, autoFitY, mergeColumns, rowSelection, propsScroll);
  var tableContent = useMemo(function () {
    return /*#__PURE__*/React.createElement(DragDropProvider, null, /*#__PURE__*/React.createElement(_Table, __assign({
      bordered: true,
      scroll: scroll,
      columns: mergeColumns,
      rowSelection: rowSelection
    }, props, {
      pagination: false,
      onChange: onChange ? onTableChange : undefined,
      onHeaderRow: onHeaderRowFn,
      components: {
        header: {
          cell: DraggableHeaderCell
        }
      }
    })));
  }, [props, propsScroll, rowSelection, columns, onChange, hideKeys, sortKeys]);
  var paginationTopContainer = useMemo(function () {
    var top = pagination && pagination.position && pagination.position.includes('topRight'); // 需要有top配置，默认不显示

    return top ? /*#__PURE__*/React.createElement(_Row, null, /*#__PURE__*/React.createElement(_Col, {
      className: styles.toolSpacing,
      flex: 1
    }, toolBarRender()), /*#__PURE__*/React.createElement(_Col, {
      className: styles.toolSpacing
    }, paginationComponent)) : null;
  }, [pagination, toolBarRender]);
  var paginationBottomContainer = useMemo(function () {
    var bottom = pagination ? pagination.position === void 0 || pagination.position.includes('bottomRight') : false;
    return bottom ? /*#__PURE__*/React.createElement(_Row, {
      className: formStyles.formItem
    }, /*#__PURE__*/React.createElement(_Col, {
      flex: 1
    }), /*#__PURE__*/React.createElement(_Col, null, paginationComponent)) : null;
  }, [pagination]);
  return useMemo(function () {
    return /*#__PURE__*/React.createElement("div", null, paginationTopContainer, /*#__PURE__*/React.createElement("div", {
      ref: ref,
      className: styles.relative
    }, settingComponent, tableContent), paginationBottomContainer);
  }, [props, propsScroll, rowSelection, columns, pagination, onChange, hideKeys, sortKeys]);
}

function FitTableWrap(_a) {
  var columnsSettingRender = _a.columnsSettingRender,
      props = __rest(_a, ["columnsSettingRender"]);

  return useMemo(function () {
    if (columnsSettingRender) {
      return /*#__PURE__*/React.createElement(ColumnsSettingWrap, __assign({}, props, {
        columnsSettingRender: columnsSettingRender
      }));
    } else {
      return /*#__PURE__*/React.createElement(FitTable, __assign({}, props));
    }
  }, [props]);
}

FitTableWrap.showTotal = showTotal;
FitTableWrap.goButton = goButton;
FitTableWrap.useScrollXY = useScrollXY;
export default FitTableWrap;
export { useScrollXY };