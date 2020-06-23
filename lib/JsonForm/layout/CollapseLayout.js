"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/collapse/style/css");

var _collapse = _interopRequireDefault(require("antd/es/collapse"));

var _react = _interopRequireWildcard(require("react"));

var _index = require("../index");

var _form = _interopRequireDefault(require("../_form.less"));

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
}; // 支持仅Icon可控


var typeList = ['collapse'];

var CollapseLayout = function CollapseLayout(props) {
  var form = props.form,
      labelClassName = props.labelClassName,
      type = props.type,
      fieldList = props.fieldList,
      itemCol = props.itemCol,
      itemRow = props.itemRow,
      header = props.header,
      footer = props.footer,
      _a = props.panel,
      _header = _a.header,
      __props = __rest(_a, ["header"]),
      activeKey = props.activeKey,
      _b = props.controlByIcon,
      controlByIcon = _b === void 0 ? false : _b,
      onChange = props.onChange,
      expandIcon = props.expandIcon,
      _props = __rest(props, ["form", "labelClassName", "type", "fieldList", "itemCol", "itemRow", "header", "footer", "panel", "activeKey", "controlByIcon", "onChange", "expandIcon"]);

  var _c = (0, _react.useState)(activeKey),
      key = _c[0],
      setKey = _c[1];

  var onMixChange = (0, _react.useCallback)(function (key) {
    if (!controlByIcon) {
      onChange && onChange(key);
      setKey(key);
    }
  }, []);
  var toggleActive = (0, _react.useCallback)(function () {
    setKey(function (key) {
      if (key === __props.key || Array.isArray(key) && key.indexOf(__props.key) > -1) {
        onChange && onChange([]);
        return [];
      } else {
        onChange && onChange([__props.key]);
        return [__props.key];
      }
    });
  }, []);
  var icon = (0, _react.useMemo)(function () {
    if (expandIcon) {
      return function (props) {
        var _icon = expandIcon(props);

        return _react["default"].cloneElement(_icon, __assign(__assign({}, _icon.props), {
          onClick: controlByIcon ? toggleActive : undefined
        }));
      };
    } else {
      return undefined;
    }
  }, []);
  return _react["default"].createElement(_collapse["default"], __assign({
    className: _form["default"].formCollapse
  }, _props, {
    activeKey: key,
    onChange: onMixChange,
    expandIcon: icon
  }), _react["default"].createElement(_collapse["default"].Panel, __assign({
    header: (0, _index.getFormItems)([_header], form)
  }, __props), (0, _index.getFormItems)(fieldList, form, labelClassName, itemCol, itemRow)));
};

CollapseLayout.typeList = typeList;
var _default = CollapseLayout;
exports["default"] = _default;