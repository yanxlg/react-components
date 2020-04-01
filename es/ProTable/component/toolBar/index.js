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

import React, { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { ReloadOutlined, SettingOutlined } from '@ant-design/icons';
import { Divider, Tooltip } from 'antd';
import { ConfigConsumer } from "antd/es/config-provider/context";
import ColumnSetting from '../columnSetting';
import './index.less';
import FullScreenIcon from './FullscreenIcon';
import DensityIcon from './DensityIcon';

var getButtonText = function getButtonText(_a, config) {
  return {
    fullScreen: {
      text: '全屏',
      icon: React.createElement(FullScreenIcon, null)
    },
    reload: {
      text: '刷新',
      icon: React.createElement(ReloadOutlined, null)
    },
    setting: {
      text: '列设置',
      icon: React.createElement(SettingOutlined, null)
    },
    density: {
      text: '表格密度',
      icon: React.createElement(DensityIcon, {
        tableSize: config.density.tableSize,
        setTableSize: config.density.setTableSize
      })
    }
  };
};
/**
 * 渲染默认的 工具栏
 * @param options
 * @param className
 * @param defaultOptions
 */


var renderDefaultOption = function renderDefaultOption(options, className, defaultOptions) {
  return options && Object.keys(options).filter(function (item) {
    return item;
  }).map(function (key, index) {
    var value = options[key];

    if (!value) {
      return null;
    }

    if (key === 'setting') {
      return React.createElement(ColumnSetting, {
        key: key,
        columns: defaultOptions.columns,
        columnsMap: defaultOptions.columnsMap,
        setColumnsMap: defaultOptions.setColumnsMap,
        setSortKeyColumns: defaultOptions.setSortKeyColumns,
        sortKeyColumns: defaultOptions.sortKeyColumns
      });
    }

    if (key === 'fullScreen') {
      return React.createElement("span", {
        key: key,
        style: {
          marginLeft: index === 0 ? 8 : 16
        },
        className: className,
        onClick: value
      }, React.createElement(FullScreenIcon, null));
    }

    var optionItem = getButtonText(defaultOptions, options)[key];

    if (optionItem) {
      return React.createElement("span", {
        key: key,
        style: {
          marginLeft: index === 0 ? 8 : 16
        },
        className: className,
        onClick: value && typeof value === 'function' ? value : undefined
      }, React.createElement(Tooltip, {
        title: optionItem.text
      }, optionItem.icon));
    }

    return null;
  }).filter(function (item) {
    return item;
  });
};

var ToolBar = function ToolBar(_a, ref) {
  var headerTitle = _a.headerTitle,
      toolBarRender = _a.toolBarRender,
      sortKeyColumns = _a.sortKeyColumns,
      setSortKeyColumns = _a.setSortKeyColumns,
      columns = _a.columns,
      columnsMap = _a.columnsMap,
      setColumnsMap = _a.setColumnsMap,
      options = _a.options,
      className = _a.className,
      selectedRowKeys = _a.selectedRowKeys;

  var _b = useState([]),
      innerSelectedRowKeys = _b[0],
      setInnerSelectedRowKeys = _b[1];

  var optionDom = useMemo(function () {
    return renderDefaultOption(options, className + "-item-icon", {
      sortKeyColumns: sortKeyColumns,
      setSortKeyColumns: setSortKeyColumns,
      columns: columns,
      columnsMap: columnsMap,
      setColumnsMap: setColumnsMap
    }) || [];
  }, [options, columns, sortKeyColumns, columnsMap]);

  var _selectedRowKeys = selectedRowKeys !== void 0 ? selectedRowKeys : innerSelectedRowKeys; // 操作列表


  var actions = useMemo(function () {
    return toolBarRender ? toolBarRender(_selectedRowKeys) : [];
  }, [toolBarRender, _selectedRowKeys]);
  useImperativeHandle(ref, function () {
    return {
      updateSelectedState: function updateSelectedState(selectedRowKeys) {
        setInnerSelectedRowKeys(selectedRowKeys);
      }
    };
  }, []);
  return useMemo(function () {
    return React.createElement("div", {
      className: className
    }, React.createElement("div", {
      className: className + "-title"
    }, headerTitle), React.createElement("div", {
      className: className + "-option"
    }, actions.filter(function (item) {
      return item;
    }).map(function (node, index) {
      return React.createElement("div", {
        // eslint-disable-next-line react/no-array-index-key
        key: index,
        className: className + "-item"
      }, node);
    }), React.createElement("div", {
      className: className + "-default-option"
    }, optionDom.length > 0 && actions.length > 0 && React.createElement(Divider, {
      type: "vertical"
    }), optionDom)));
  }, [actions, optionDom, toolBarRender]);
};

var ToolbarWrap = forwardRef(ToolBar);

var WarpToolBar = function WarpToolBar(props) {
  return React.createElement(ConfigConsumer, null, function (_a) {
    var getPrefixCls = _a.getPrefixCls;
    var className = getPrefixCls('pro-table-toolbar');

    var toolbarRef = props.toolbarRef,
        _props = __rest(props, ["toolbarRef"]);

    return React.createElement(ToolbarWrap, __assign({
      className: className
    }, _props, {
      ref: toolbarRef
    }));
  });
};

export default WarpToolBar;