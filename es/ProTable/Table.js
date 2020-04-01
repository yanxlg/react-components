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

import './index.less';
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { ConfigProvider, Card, Typography, Empty, Tooltip } from 'antd';
import classNames from 'classnames';
import { ConfigConsumer } from "antd/es/config-provider";
import Toolbar from './component/toolBar';
import { checkUndefinedOrNull, genColumnKey, useDeepCompareEffect } from './component/util';
import { useRowSelection } from './hooks';
import TableAlert from './component/alert';
import FitTable, { goButton, showTotal } from '../FitTable';
import { defaultPageSizeOptions } from './config';
/**
 * 生成 Ellipsis 的 tooltip
 * @param dom
 * @param item
 * @param text
 */

var genEllipsis = function genEllipsis(dom, item, text) {
  if (!item.ellipsis) {
    return dom;
  }

  return React.createElement(Tooltip, {
    title: text
  }, React.createElement("div", null, dom));
};

var genCopyable = function genCopyable(dom, item) {
  if (item.copyable || item.ellipsis) {
    return React.createElement(Typography.Paragraph, {
      style: {
        width: item.width && item.width - 32,
        margin: 0,
        padding: 0
      },
      copyable: item.copyable,
      ellipsis: item.ellipsis
    }, dom);
  }

  return dom;
};
/**
 * 这个组件负责单元格的具体渲染
 * @param param0
 */


var columRender = function columRender(_a) {
  var item = _a.item,
      text = _a.text,
      row = _a.row,
      index = _a.index;
  var dom = genEllipsis(genCopyable(text, item), item, text);

  if (item.render) {
    var renderDom = item.render(text, row, index, dom);
    return renderDom;
  }

  return checkUndefinedOrNull(dom) ? dom : null;
};
/**
 * TODO 支持外部管控整个stateMap状态
 * @param columns
 * @param map
 */


var genColumnList = function genColumnList(columns, map) {
  return columns.map(function (item, columnsIndex) {
    var key = item.key,
        dataIndex = item.dataIndex;
    var columnKey = genColumnKey(key, dataIndex);
    var config = columnKey ? map[columnKey] || {
      fixed: item.fixed
    } : {
      fixed: item.fixed
    };

    var tempColumns = __assign(__assign({}, item), {
      ellipsis: false,
      fixed: config.fixed,
      width: item.width || (item.fixed ? 200 : undefined),
      // @ts-ignore
      children: item.children ? genColumnList(item.children, map) : undefined,
      render: function render(text, row, index) {
        return columRender({
          item: item,
          text: text,
          row: row,
          index: index
        });
      }
    });

    if (!tempColumns.children || !tempColumns.children.length) {
      delete tempColumns.children;
    }

    if (!tempColumns.dataIndex) {
      delete tempColumns.dataIndex;
    }

    if (!tempColumns.filters || !tempColumns.filters.length) {
      delete tempColumns.filters;
    }

    return tempColumns;
  });
};
/**
 * 🏆 Use Ant Design Table like a Pro!
 * 更快 更好 更方便
 * @param props
 */


var ProTable = function ProTable(props) {
  var propsClassName = props.className,
      headerTitle = props.headerTitle,
      pagination = props.pagination,
      _a = props.columns,
      proColumns = _a === void 0 ? [] : _a,
      _b = props.toolBarRender,
      toolBarRender = _b === void 0 ? function () {
    return [];
  } : _b,
      style = props.style,
      tableStyle = props.tableStyle,
      tableClassName = props.tableClassName,
      onColumnsStateChange = props.onColumnsStateChange,
      proOptions = props.options,
      _c = props.rowSelection,
      propsRowSelection = _c === void 0 ? {} : _c,
      _d = props.tableAlertRender,
      tableAlertRender = _d === void 0 ? false : _d,
      defaultClassName = props.defaultClassName,
      proSize = props.size,
      loading = props.loading,
      _e = props.dataSource,
      dataSource = _e === void 0 ? [] : _e,
      onSizeChange = props.onSizeChange,
      propsScroll = props.scroll,
      _f = props.bottom,
      bottom = _f === void 0 ? 0 : _f,
      _g = props.minHeight,
      minHeight = _g === void 0 ? 500 : _g,
      _h = props.autoFitY,
      autoFitY = _h === void 0 ? true : _h,
      _j = props.optimize,
      optimize = _j === void 0 ? true : _j,
      _k = props.rowKey,
      rowKey = _k === void 0 ? '' : _k,
      rest = __rest(props, ["className", "headerTitle", "pagination", "columns", "toolBarRender", "style", "tableStyle", "tableClassName", "onColumnsStateChange", "options", "rowSelection", "tableAlertRender", "defaultClassName", "size", "loading", "dataSource", "onSizeChange", "scroll", "bottom", "minHeight", "autoFitY", "optimize", "rowKey"]);

  var selectedRowKeys = propsRowSelection.selectedRowKeys,
      onChange = propsRowSelection.onChange;
  var rootRef = useRef(null);

  var _l = useState([]),
      sortKeyColumns = _l[0],
      setSortKeyColumns = _l[1];

  var _m = useState({}),
      columnsMap = _m[0],
      setColumnsMap = _m[1];

  var _o = useState(proColumns),
      tableColumns = _o[0],
      setTableColumns = _o[1];

  var _p = useState(proSize || 'large'),
      tableSize = _p[0],
      setTableSize = _p[1];
  /***********************密度设置**************************/


  var size = proSize === void 0 ? tableSize : proSize;
  var updateTableSize = useCallback(function (tableSize) {
    if (proSize === void 0) {
      setTableSize(tableSize);
    } else {
      onSizeChange && onSizeChange(tableSize);
    }
  }, []);
  /**
   * Table Column 变化的时候更新一下，这个参数将会用于渲染
   */

  useDeepCompareEffect(function () {
    var tableColumn = genColumnList(proColumns, columnsMap);

    if (tableColumn && tableColumn.length > 0) {
      setTableColumns(tableColumn); // 重新生成key的字符串用于排序

      setSortKeyColumns(tableColumn.map(function (item, index) {
        var key = genColumnKey(item.key, item.dataIndex) || "" + index;
        return key + "_" + item.index;
      }));
    }
  }, [proColumns]);
  /**
   * 这里主要是为了排序，为了保证更新及时，每次都重新计算
   */

  useDeepCompareEffect(function () {
    var keys = sortKeyColumns.join(',');
    var tableColumn = genColumnList(proColumns, columnsMap);

    if (keys.length > 0) {
      // 用于可视化的排序
      tableColumn = tableColumn.sort(function (a, b) {
        // 如果没有index，在 dataIndex 或者 key 不存在的时候他会报错
        var aKey = (genColumnKey(a.key, a.dataIndex) || a.index) + "_" + a.index;
        var bKey = (genColumnKey(b.key, b.dataIndex) || b.index) + "_" + b.index;
        return keys.indexOf(aKey) - keys.indexOf(bKey);
      });
    }

    tableColumn.sort(function (a, b) {
      // if (a.fixed === 'left' && b.fixed === 'left') return -1;
      if (a.fixed === 'left' && b.fixed !== 'left') return -1;
      if (a.fixed !== 'left' && b.fixed === 'left') return 1;

      if (a.fixed === 'right' && b.fixed !== 'right') {
        return 1;
      }

      if (a.fixed !== 'right' && b.fixed === 'right') {
        return -1;
      }

      return 0;
    });

    if (tableColumn && tableColumn.length > 0) {
      setTableColumns(tableColumn);
    }
  }, [columnsMap, sortKeyColumns.join('-')]);
  /**
   * columns 过滤筛选  待优化
   */

  var onSelectedRowKeysUpdate = useCallback(function (selectedRowKeys) {
    var _a, _b;

    (_a = toolbarRef.current) === null || _a === void 0 ? void 0 : _a.updateSelectedState(selectedRowKeys);
    (_b = alertRef.current) === null || _b === void 0 ? void 0 : _b.updateSelectedState(selectedRowKeys);
  }, []);

  var _q = useRowSelection(tableColumns, rowKey, dataSource, propsRowSelection, optimize, onSelectedRowKeysUpdate),
      columns = _q.columns,
      rowSelection = _q.rowSelection,
      clearCheckedRows = _q.clearCheckedRows;
  /**
   * 需要清除选中状态时
   */


  useEffect(function () {
    onCleanSelected();
  }, [dataSource]); //  数据发生改变需要清除selectedRowKeys

  var fullScreenFn = function fullScreenFn() {
    if (proOptions) {
      if (proOptions.fullScreen && typeof proOptions.fullScreen === 'function') {
        proOptions.fullScreen();
        return;
      }
    }

    if (!rootRef.current || !document.fullscreenEnabled) {
      return;
    }

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      rootRef.current.requestFullscreen();
    }
  };

  var className = classNames(defaultClassName, propsClassName);
  /************************toolbar 处理***********************/

  var toolbarRef = useRef(null); // 优化模式用于动态修改selectedRowKeys

  /************************options 处理***********************/

  var options = useMemo(function () {
    if (!proOptions) {
      return proOptions;
    }

    var density = proOptions.density,
        fullScreen = proOptions.fullScreen;
    return __assign(__assign(__assign({}, proOptions), density ? {
      density: {
        tableSize: size,
        setTableSize: updateTableSize
      }
    } : {}), fullScreen ? {
      fullScreen: fullScreenFn
    } : {});
  }, [proOptions, size]);
  var toolbar = useMemo(function () {
    if (optimize) {
      return toolBarRender === false ? null : React.createElement(Toolbar, {
        columns: tableColumns,
        sortKeyColumns: sortKeyColumns,
        setSortKeyColumns: setSortKeyColumns,
        setColumnsMap: setColumnsMap,
        columnsMap: columnsMap,
        toolbarRef: toolbarRef,
        options: options,
        headerTitle: headerTitle,
        toolBarRender: toolBarRender
      });
    } else {
      return toolBarRender === false ? null : React.createElement(Toolbar, {
        columns: tableColumns,
        sortKeyColumns: sortKeyColumns,
        setSortKeyColumns: setSortKeyColumns,
        setColumnsMap: setColumnsMap,
        columnsMap: columnsMap,
        selectedRowKeys: selectedRowKeys,
        toolbarRef: toolbarRef,
        options: options,
        headerTitle: headerTitle,
        toolBarRender: toolBarRender
      });
    }
  }, [size, optimize ? undefined : selectedRowKeys, tableColumns, options, toolBarRender]);
  /************************alert 处理***********************/

  var alertRef = useRef(null); // 优化模式用于动态修改selectedRowKeys

  var alert = useMemo(function () {
    if (propsRowSelection === false) {
      return null;
    }

    if (optimize) {
      return React.createElement(TableAlert, {
        ref: alertRef,
        onCleanSelected: onCleanSelected,
        alertOptionRender: rest.tableAlertOptionRender,
        alertInfoRender: tableAlertRender
      });
    } else {
      return React.createElement(TableAlert, {
        selectedRowKeys: selectedRowKeys,
        onCleanSelected: onCleanSelected,
        alertOptionRender: rest.tableAlertOptionRender,
        alertInfoRender: tableAlertRender
      });
    }
  }, [optimize ? undefined : selectedRowKeys]);
  var onCleanSelected = useCallback(function () {
    if (!optimize) {
      onChange && onChange([], []);
    } else {
      clearCheckedRows && clearCheckedRows(); // 触发组件更新

      onSelectedRowKeysUpdate([]);
    }
  }, []);
  var table = useMemo(function () {
    return React.createElement(FitTable, __assign({}, rest, {
      scroll: propsScroll,
      size: size,
      rowSelection: propsRowSelection === false ? undefined : rowSelection,
      className: tableClassName,
      style: tableStyle,
      columns: columns,
      loading: loading,
      dataSource: dataSource,
      rowKey: rowKey,
      pagination: __assign({
        pageSizeOptions: defaultPageSizeOptions,
        showQuickJumper: {
          goButton: goButton
        },
        showTotal: showTotal
      }, pagination)
    }));
  }, [columns, pagination, size, propsRowSelection, loading]);

  if (proColumns.length < 1) {
    return React.createElement(Empty, null);
  }

  return React.createElement(ConfigProvider, {
    getPopupContainer: function getPopupContainer() {
      return rootRef.current || document.body;
    }
  }, React.createElement("div", {
    className: className,
    id: "ant-design-pro-table",
    style: style,
    ref: rootRef
  }, React.createElement(Card, {
    bordered: true,
    style: {
      height: '100%'
    },
    bodyStyle: {
      padding: 0
    }
  }, toolbar, alert, table)));
};
/**
 * 🏆 Use Ant Design Table like a Pro!
 * 更快 更好 更方便
 * @param props
 */


var ProviderWarp = function ProviderWarp(props) {
  return React.createElement(ConfigConsumer, null, function (_a) {
    var getPrefixCls = _a.getPrefixCls;
    return React.createElement(ProTable, __assign({
      defaultClassName: getPrefixCls('pro-table')
    }, props));
  });
};

export default ProviderWarp;