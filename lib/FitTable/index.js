"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "useScrollXY", {
  enumerable: true,
  get: function get() {
    return _hooks.useScrollXY;
  }
});
exports["default"] = exports.goButton = exports.showTotal = void 0;

require("antd/es/col/style/css");

var _col = _interopRequireDefault(require("antd/es/col"));

require("antd/es/row/style/css");

var _row = _interopRequireDefault(require("antd/es/row"));

require("antd/es/table/style/css");

var _table = _interopRequireDefault(require("antd/es/table"));

require("antd/es/pagination/style/css");

var _pagination = _interopRequireDefault(require("antd/es/pagination"));

require("antd/es/button/style/css");

var _button = _interopRequireDefault(require("antd/es/button"));

var _react = _interopRequireWildcard(require("react"));

var _hooks = require("./hooks");

var _index = _interopRequireDefault(require("./_index.less"));

var _ColumnsSettingWrap = _interopRequireDefault(require("./ColumnsSettingWrap"));

var _utils = require("../utils");

var _config = require("../ProTable/config");

var _form = _interopRequireDefault(require("../JsonForm/_form.less"));

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

var showTotal = function showTotal(total) {
  return _react["default"].createElement("span", null, "\u5171\u6709", total, "\u6761");
};

exports.showTotal = showTotal;

var goButton = _react["default"].createElement(_button["default"], {
  className: _index["default"].btnGo
}, "Go");

exports.goButton = goButton;

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

  var ref = (0, _react.useRef)(null);
  var scroll = (0, _hooks.useScrollXY)(ref, bottom, minHeight, autoFitY, columns, rowSelection, propsScroll);
  var filtersRef = (0, _react.useRef)(_utils.EmptyObject);
  var sorterRef = (0, _react.useRef)(_utils.EmptyObject);
  var extraRef = (0, _react.useRef)({
    currentDataSource: _utils.EmptyArray
  });
  var onTableChange = (0, _react.useCallback)(function (page, filters, sorter, extra) {
    filtersRef.current = filters;
    sorterRef.current = sorter;
    extraRef.current = extra;

    if (onChange) {
      onChange(pagination || {}, filters, sorter, extra);
    }
  }, [pagination]);
  var onPageChange = (0, _react.useCallback)(function (page, pageSize) {
    if (onChange) {
      onChange(__assign(__assign({}, pagination), {
        current: page,
        pageSize: pageSize
      }), filtersRef.current, sorterRef.current, extraRef.current);
    }
  }, []);
  var paginationComponent = (0, _react.useMemo)(function () {
    return pagination ? _react["default"].createElement(_pagination["default"], __assign({}, __assign({
      pageSizeOptions: _config.defaultPageSizeOptions,
      showQuickJumper: {
        goButton: goButton
      },
      showTotal: showTotal
    }, pagination), {
      onChange: onPageChange,
      onShowSizeChange: onPageChange
    })) : null;
  }, [pagination]);
  var onHeaderRowEnter = (0, _react.useCallback)(function (event) {
    ref.current.setAttribute('data-show-setting', 'true');
  }, []);
  var onHeaderRowLeave = (0, _react.useCallback)(function (event) {
    ref.current.removeAttribute('data-show-setting');
  }, []);
  (0, _react.useEffect)(function () {
    return function () {
      ref.current.removeAttribute('data-show-setting');
    };
  }, []);
  var onHeaderRowFn = (0, _react.useCallback)(function (column, index) {
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
  var tableContent = (0, _react.useMemo)(function () {
    return _react["default"].createElement(_table["default"], __assign({
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
  var paginationTopContainer = (0, _react.useMemo)(function () {
    var top = pagination && pagination.position && pagination.position.includes('topRight'); // 需要有top配置，默认不显示

    return top ? _react["default"].createElement(_row["default"], null, _react["default"].createElement(_col["default"], {
      className: _index["default"].toolSpacing,
      flex: 1
    }, toolBarRender()), _react["default"].createElement(_col["default"], {
      className: _index["default"].toolSpacing
    }, paginationComponent)) : null;
  }, [pagination, toolBarRender]);
  var paginationBottomContainer = (0, _react.useMemo)(function () {
    var bottom = pagination ? pagination.position === void 0 || pagination.position.includes('bottomRight') : false;
    return bottom ? _react["default"].createElement(_row["default"], {
      className: _form["default"].formItem
    }, _react["default"].createElement(_col["default"], {
      flex: 1
    }), _react["default"].createElement(_col["default"], null, paginationComponent)) : null;
  }, [pagination]);
  return (0, _react.useMemo)(function () {
    return _react["default"].createElement("div", null, paginationTopContainer, _react["default"].createElement("div", {
      ref: ref,
      className: _index["default"].relative
    }, settingComponent, tableContent), paginationBottomContainer);
  }, [props, propsScroll, rowSelection, columns, pagination, onChange]);
}

function FitTableWrap(_a) {
  var columnsSettingRender = _a.columnsSettingRender,
      props = __rest(_a, ["columnsSettingRender"]);

  return (0, _react.useMemo)(function () {
    if (columnsSettingRender) {
      return _react["default"].createElement(_ColumnsSettingWrap["default"], __assign({}, props, {
        columnsSettingRender: columnsSettingRender
      }));
    } else {
      return _react["default"].createElement(FitTable, __assign({}, props));
    }
  }, [props]);
}

FitTableWrap.showTotal = showTotal;
FitTableWrap.goButton = goButton;
FitTableWrap.useScrollXY = _hooks.useScrollXY;
var _default = FitTableWrap;
exports["default"] = _default;