"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/divider/style/css");

var _divider = _interopRequireDefault(require("antd/es/divider"));

require("antd/es/tooltip/style/css");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

var _react = _interopRequireWildcard(require("react"));

var _icons = require("@ant-design/icons");

var _context = require("antd/lib/config-provider/context");

var _columnSetting = _interopRequireDefault(require("../columnSetting"));

require("./index.less");

var _FullscreenIcon = _interopRequireDefault(require("./FullscreenIcon"));

var _DensityIcon = _interopRequireDefault(require("./DensityIcon"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var __assign = void 0 && (void 0).__assign || function () {
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

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var getButtonText = function getButtonText(_a, config) {
  return {
    fullScreen: {
      text: '全屏',
      icon: /*#__PURE__*/_react["default"].createElement(_FullscreenIcon["default"], null)
    },
    reload: {
      text: '刷新',
      icon: /*#__PURE__*/_react["default"].createElement(_icons.ReloadOutlined, null)
    },
    setting: {
      text: '列设置',
      icon: /*#__PURE__*/_react["default"].createElement(_icons.SettingOutlined, null)
    },
    density: {
      text: '表格密度',
      icon: /*#__PURE__*/_react["default"].createElement(_DensityIcon["default"], {
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
      return /*#__PURE__*/_react["default"].createElement(_columnSetting["default"], {
        key: key,
        columns: defaultOptions.columns,
        columnsMap: defaultOptions.columnsMap,
        setColumnsMap: defaultOptions.setColumnsMap,
        setSortKeyColumns: defaultOptions.setSortKeyColumns,
        sortKeyColumns: defaultOptions.sortKeyColumns
      });
    }

    if (key === 'fullScreen') {
      return /*#__PURE__*/_react["default"].createElement("span", {
        key: key,
        style: {
          marginLeft: index === 0 ? 8 : 16
        },
        className: className,
        onClick: value
      }, /*#__PURE__*/_react["default"].createElement(_FullscreenIcon["default"], null));
    }

    var optionItem = getButtonText(defaultOptions, options)[key];

    if (optionItem) {
      return /*#__PURE__*/_react["default"].createElement("span", {
        key: key,
        style: {
          marginLeft: index === 0 ? 8 : 16
        },
        className: className,
        onClick: value && typeof value === 'function' ? value : undefined
      }, /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
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

  var _b = (0, _react.useState)([]),
      innerSelectedRowKeys = _b[0],
      setInnerSelectedRowKeys = _b[1];

  var optionDom = (0, _react.useMemo)(function () {
    return renderDefaultOption(options, className + "-item-icon", {
      sortKeyColumns: sortKeyColumns,
      setSortKeyColumns: setSortKeyColumns,
      columns: columns,
      columnsMap: columnsMap,
      setColumnsMap: setColumnsMap
    }) || [];
  }, [options, columns, sortKeyColumns, columnsMap]);

  var _selectedRowKeys = selectedRowKeys !== void 0 ? selectedRowKeys : innerSelectedRowKeys; // 操作列表


  var actions = (0, _react.useMemo)(function () {
    return toolBarRender ? toolBarRender(_selectedRowKeys) : [];
  }, [toolBarRender, _selectedRowKeys]);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      updateSelectedState: function updateSelectedState(selectedRowKeys) {
        setInnerSelectedRowKeys(selectedRowKeys);
      }
    };
  }, []);
  return (0, _react.useMemo)(function () {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: className
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: className + "-title"
    }, headerTitle), /*#__PURE__*/_react["default"].createElement("div", {
      className: className + "-option"
    }, actions.filter(function (item) {
      return item;
    }).map(function (node, index) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        // eslint-disable-next-line react/no-array-index-key
        key: index,
        className: className + "-item"
      }, node);
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: className + "-default-option"
    }, optionDom.length > 0 && actions.length > 0 && /*#__PURE__*/_react["default"].createElement(_divider["default"], {
      type: "vertical"
    }), optionDom)));
  }, [actions, optionDom, toolBarRender]);
};

var ToolbarWrap = /*#__PURE__*/(0, _react.forwardRef)(ToolBar);

var WarpToolBar = function WarpToolBar(props) {
  return /*#__PURE__*/_react["default"].createElement(_context.ConfigConsumer, null, function (_a) {
    var getPrefixCls = _a.getPrefixCls;
    var className = getPrefixCls('pro-table-toolbar');

    var toolbarRef = props.toolbarRef,
        _props = __rest(props, ["toolbarRef"]);

    return /*#__PURE__*/_react["default"].createElement(ToolbarWrap, __assign({
      className: className
    }, _props, {
      ref: toolbarRef
    }));
  });
};

var _default = WarpToolBar;
exports["default"] = _default;