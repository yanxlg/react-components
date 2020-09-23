"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _index = _interopRequireDefault(require("./index"));

var _ColumnsSetting = _interopRequireDefault(require("./ColumnsSetting"));

var _index2 = _interopRequireDefault(require("./_index.less"));

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

var ColumnsSettingWrap = function ColumnsSettingWrap(_a) {
  var columns = _a.columns,
      columnsSettingRender = _a.columnsSettingRender,
      resetColumnsSetting = _a.resetColumnsSetting,
      props = __rest(_a, ["columns", "columnsSettingRender", "resetColumnsSetting"]);

  var filterColumns = (0, _react.useRef)(columns);
  (0, _react.useMemo)(function () {
    filterColumns.current = columns; // 强制覆盖仅当columns变化时
  }, [columns]);

  var _b = (0, _react.useState)(false),
      reload = _b[0],
      setReload = _b[1];

  var setFilterColumns = (0, _react.useCallback)(function (columns) {
    filterColumns.current = columns;
    setReload(!reload);
  }, [reload]);
  (0, _react.useEffect)(function () {
    setFilterColumns(columns === null || columns === void 0 ? void 0 : columns.filter(function (item) {
      return !item.defaultHide;
    }));
  }, [columns]);
  return (0, _react.useMemo)(function () {
    return _react["default"].createElement("div", {
      className: _index2["default"].relative
    }, _react["default"].createElement(_index["default"], __assign({}, props, {
      columns: filterColumns.current,
      // @ts-ignore
      settingComponent: _react["default"].createElement(_ColumnsSetting["default"], {
        columnsSettingRender: columnsSettingRender,
        columns: columns,
        onColumnsChange: setFilterColumns,
        resetColumnsSetting: resetColumnsSetting
      })
    })));
  }, [reload, props, filterColumns.current]);
};

var _default = ColumnsSettingWrap;
exports["default"] = _default;