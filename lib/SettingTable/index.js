"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _FitTable = _interopRequireDefault(require("../FitTable2"));

var _useTableSetting = _interopRequireDefault(require("../hooks/useTableSetting"));

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

function SettingTable(_a) {
  var settingKey = _a.settingKey,
      props = __rest(_a, ["settingKey"]);

  var _b = (0, _useTableSetting["default"])(settingKey),
      hideKeys = _b.hideKeys,
      sortKeys = _b.sortKeys,
      updateHideKeys = _b.updateHideKeys,
      updateSortKeys = _b.updateSortKeys;

  return _react["default"].createElement(_FitTable["default"], __assign({
    columnsSettingRender: true,
    bordered: true,
    hideKeys: hideKeys,
    sortKeys: sortKeys,
    onHideKeysChange: updateHideKeys,
    onSortKeysChange: updateSortKeys
  }, props));
}

var _default = _react["default"].memo(SettingTable);

exports["default"] = _default;