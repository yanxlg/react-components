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

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _hooks = require("./hooks");

var _index = _interopRequireDefault(require("./_index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var goButton = _react["default"].createElement(_antd.Button, {
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
      props = __rest(_a, ["bottom", "minHeight", "autoFitY", "columns", "rowSelection", "scroll", "onChange", "pagination"]);

  var ref = (0, _react.useRef)(null);
  var scroll = (0, _hooks.useScrollXY)(ref, bottom, minHeight, autoFitY, columns, rowSelection, propsScroll); // Table 的onChange 在pageSize发生改变时自动重置pageNumber为1，调整为pagination默认行为

  var onPaginationChange = (0, _react.useCallback)(function (page, filters, sorter, extra) {
    if (!pagination) {
      onChange && onChange(page, filters, sorter, extra);
      return;
    }

    var _a = pagination,
        total = _a.total,
        current = _a.current,
        pageSize = _a.pageSize;

    if (page.pageSize !== pageSize) {
      // pageSize发生变化，保留原油current
      // 计算如果不能够满足当前的pageNumber则重置为1
      var maxPageNumber = Math.ceil(Number(total) / page.pageSize);
      var pageNumber = current <= maxPageNumber ? current : 1;
      onChange && onChange(__assign(__assign({}, page), {
        current: pageNumber
      }), filters, sorter, extra);
    } else {
      onChange && onChange(page, filters, sorter, extra);
    }
  }, [pagination]);
  return (0, _react.useMemo)(function () {
    return _react["default"].createElement("div", {
      ref: ref
    }, _react["default"].createElement(_antd.Table, __assign({
      scroll: scroll,
      columns: columns,
      rowSelection: rowSelection
    }, props, {
      pagination: pagination,
      onChange: onChange ? onPaginationChange : undefined
    })));
  }, [props, propsScroll, rowSelection, columns, pagination, onChange]);
}

FitTable.showTotal = showTotal;
FitTable.goButton = goButton;
FitTable.useScrollXY = _hooks.useScrollXY;
var _default = FitTable;
exports["default"] = _default;