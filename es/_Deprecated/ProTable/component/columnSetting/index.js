import "antd/es/popover/style/css";
import _Popover from "antd/es/popover";
import "antd/es/checkbox/style/css";
import _Checkbox from "antd/es/checkbox";
import "antd/es/tooltip/style/css";
import _Tooltip from "antd/es/tooltip";

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

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

import React from 'react';
import { ConfigConsumer } from "antd/es/config-provider/context";
import { PushpinOutlined, SettingOutlined, VerticalAlignMiddleOutlined } from '@ant-design/icons';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DnDItem from './DndItem';
import './index.less';
import { genColumnKey } from '../util';

var ToolTipIcon = function ToolTipIcon(_a) {
  var title = _a.title,
      columnsMap = _a.columnsMap,
      setColumnsMap = _a.setColumnsMap,
      show = _a.show,
      children = _a.children,
      columnKey = _a.columnKey,
      fixed = _a.fixed;

  if (show) {
    return /*#__PURE__*/React.createElement(_Tooltip, {
      title: title
    }, /*#__PURE__*/React.createElement("span", {
      onClick: function onClick() {
        var _a;

        var config = columnsMap[columnKey || ''] || {};

        var columnKeyMap = __assign(__assign({}, columnsMap), (_a = {}, _a[columnKey] = __assign(__assign({}, config), {
          fixed: fixed
        }), _a));

        setColumnsMap(columnKeyMap);
      }
    }, children));
  }

  return null;
};

var CheckboxListItem = function CheckboxListItem(_a) {
  var columnKey = _a.columnKey,
      className = _a.className,
      columnsMap = _a.columnsMap,
      title = _a.title,
      setColumnsMap = _a.setColumnsMap,
      fixed = _a.fixed;
  var config = columnsMap[columnKey || 'null'] || {
    show: true
  };
  return /*#__PURE__*/React.createElement("span", {
    className: className + "-list-item",
    key: columnKey
  }, /*#__PURE__*/React.createElement(_Checkbox, {
    onChange: function onChange(e) {
      var _a;

      if (columnKey) {
        var tempConfig = columnsMap[columnKey || ''] || {};

        var newSetting = __assign({}, tempConfig);

        if (e.target.checked) {
          delete newSetting.show;
        } else {
          newSetting.show = false;
        }

        var columnKeyMap = __assign(__assign({}, columnsMap), (_a = {}, _a[columnKey] = newSetting, _a));

        setColumnsMap(columnKeyMap);
      }
    },
    checked: config.show !== false
  }, title), /*#__PURE__*/React.createElement("span", {
    className: className + "-list-item-option"
  }, /*#__PURE__*/React.createElement(ToolTipIcon, {
    columnsMap: columnsMap,
    setColumnsMap: setColumnsMap,
    columnKey: columnKey,
    fixed: "left",
    title: '固定到左边',
    show: fixed !== 'left'
  }, /*#__PURE__*/React.createElement(PushpinOutlined, {
    style: {
      transform: 'rotate(-90deg)'
    }
  })), /*#__PURE__*/React.createElement(ToolTipIcon, {
    columnsMap: columnsMap,
    setColumnsMap: setColumnsMap,
    columnKey: columnKey,
    fixed: undefined,
    title: '取消固定',
    show: !!fixed
  }, /*#__PURE__*/React.createElement(VerticalAlignMiddleOutlined, null)), /*#__PURE__*/React.createElement(ToolTipIcon, {
    columnsMap: columnsMap,
    setColumnsMap: setColumnsMap,
    columnKey: columnKey,
    fixed: "right",
    title: '固定到右边',
    show: fixed !== 'right'
  }, /*#__PURE__*/React.createElement(PushpinOutlined, null))));
};

var CheckboxList = function CheckboxList(_a) {
  var list = _a.list,
      sortKeyColumns = _a.sortKeyColumns,
      setSortKeyColumns = _a.setSortKeyColumns,
      columnsMap = _a.columnsMap,
      setColumnsMap = _a.setColumnsMap,
      className = _a.className,
      _b = _a.showTitle,
      showTitle = _b === void 0 ? true : _b,
      listTitle = _a.title;
  var show = list && list.length > 0;

  if (!show) {
    return null;
  }

  var move = function move(id, targetIndex) {
    var newColumns = __spreadArrays(sortKeyColumns);

    var findIndex = newColumns.findIndex(function (columnKey) {
      return columnKey === id;
    });
    var key = newColumns[findIndex];
    newColumns.splice(findIndex, 1);

    if (targetIndex === 0) {
      newColumns.unshift(key);
    } else {
      newColumns.splice(targetIndex, 0, key);
    }

    setSortKeyColumns(newColumns);
  };

  var listDom = list.map(function (_a, index) {
    var key = _a.key,
        dataIndex = _a.dataIndex,
        title = _a.title,
        fixed = _a.fixed,
        rest = __rest(_a, ["key", "dataIndex", "title", "fixed"]);

    var columnKey = genColumnKey(key, dataIndex || rest.index);
    return /*#__PURE__*/React.createElement(DnDItem, {
      index: index,
      id: columnKey + "_" + rest.index,
      key: columnKey,
      end: function end(id, targetIndex) {
        move(id, targetIndex);
      }
    }, /*#__PURE__*/React.createElement(CheckboxListItem, {
      setColumnsMap: setColumnsMap,
      columnKey: columnKey || "" + index,
      columnsMap: columnsMap,
      title: title,
      fixed: fixed,
      className: className
    }));
  });
  return /*#__PURE__*/React.createElement(DndProvider, {
    backend: HTML5Backend
  }, showTitle && /*#__PURE__*/React.createElement("span", {
    className: className + "-list-title"
  }, listTitle), listDom);
};

var GroupCheckboxList = function GroupCheckboxList(_a) {
  var localColumns = _a.localColumns,
      columnsMap = _a.columnsMap,
      setColumnsMap = _a.setColumnsMap,
      sortKeyColumns = _a.sortKeyColumns,
      setSortKeyColumns = _a.setSortKeyColumns,
      className = _a.className;
  var rightList = [];
  var leftList = [];
  var list = [];
  localColumns.forEach(function (item) {
    var fixed = item.fixed;

    if (fixed === 'left') {
      leftList.push(item);
      return;
    }

    if (fixed === 'right') {
      rightList.push(item);
      return;
    }

    list.push(item);
  });
  var showRight = rightList && rightList.length > 0;
  var showLeft = leftList && leftList.length > 0;
  return /*#__PURE__*/React.createElement("div", {
    className: className + "-list"
  }, /*#__PURE__*/React.createElement(CheckboxList, {
    columnsMap: columnsMap,
    setColumnsMap: setColumnsMap,
    setSortKeyColumns: setSortKeyColumns,
    sortKeyColumns: sortKeyColumns,
    title: '固定在左侧',
    list: leftList,
    className: className
  }), /*#__PURE__*/React.createElement(CheckboxList, {
    columnsMap: columnsMap,
    setColumnsMap: setColumnsMap,
    setSortKeyColumns: setSortKeyColumns,
    sortKeyColumns: sortKeyColumns,
    list: list,
    title: '不固定',
    showTitle: showLeft || showRight,
    className: className
  }), /*#__PURE__*/React.createElement(CheckboxList, {
    columnsMap: columnsMap,
    setColumnsMap: setColumnsMap,
    setSortKeyColumns: setSortKeyColumns,
    sortKeyColumns: sortKeyColumns,
    title: '固定在右侧',
    list: rightList,
    className: className
  }));
};

var ColumnSetting = function ColumnSetting(props) {
  var localColumns = props.columns || [];
  var columnsMap = props.columnsMap,
      setColumnsMap = props.setColumnsMap,
      setSortKeyColumns = props.setSortKeyColumns,
      sortKeyColumns = props.sortKeyColumns;
  /**
   * 设置全部选中，或全部未选中
   * @param show
   */

  var setAllSelectAction = function setAllSelectAction(show) {
    if (show === void 0) {
      show = true;
    }

    var columnKeyMap = {};
    localColumns.forEach(function (_a) {
      var key = _a.key,
          fixed = _a.fixed,
          dataIndex = _a.dataIndex;
      var columnKey = genColumnKey(key, dataIndex);

      if (columnKey) {
        columnKeyMap[columnKey] = {
          show: show,
          fixed: fixed
        };
      }
    });
    setColumnsMap(columnKeyMap);
  };

  var selectKeys = Object.values(columnsMap).filter(function (value) {
    return !value || value.show === false;
  });
  var indeterminate = selectKeys.length > 0 && selectKeys.length !== localColumns.length;
  return /*#__PURE__*/React.createElement(ConfigConsumer, null, function (_a) {
    var getPrefixCls = _a.getPrefixCls;
    var className = getPrefixCls('pro-table-column-setting');
    var toolBarClassName = getPrefixCls('pro-table-toolbar');
    return /*#__PURE__*/React.createElement(_Popover, {
      arrowPointAtCenter: true,
      title: /*#__PURE__*/React.createElement("div", {
        className: className + "-title"
      }, /*#__PURE__*/React.createElement(_Checkbox, {
        indeterminate: indeterminate,
        checked: selectKeys.length === 0 && selectKeys.length !== localColumns.length,
        onChange: function onChange(e) {
          if (e.target.checked) {
            setAllSelectAction();
          } else {
            setAllSelectAction(false);
          }
        }
      }, "\u5217\u5C55\u793A"), /*#__PURE__*/React.createElement("a", {
        onClick: function onClick() {
          setColumnsMap({});
          setSortKeyColumns([]);
        }
      }, "\u91CD\u7F6E")),
      trigger: "click",
      placement: "bottomRight",
      content: /*#__PURE__*/React.createElement(GroupCheckboxList, {
        className: className,
        localColumns: localColumns,
        sortKeyColumns: sortKeyColumns,
        setSortKeyColumns: setSortKeyColumns,
        setColumnsMap: setColumnsMap,
        columnsMap: columnsMap
      })
    }, /*#__PURE__*/React.createElement(_Tooltip, {
      title: '列设置'
    }, /*#__PURE__*/React.createElement(SettingOutlined, {
      className: toolBarClassName + "-item-icon",
      style: {
        fontSize: 16
      }
    })));
  });
};

export default ColumnSetting;