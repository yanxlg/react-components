"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/button/style/css");

var _button = _interopRequireDefault(require("antd/es/button"));

var _react = _interopRequireWildcard(require("react"));

var _btn = _interopRequireDefault(require("./_btn.less"));

var _classnames = _interopRequireDefault(require("classnames"));

var _useUpdate = _interopRequireDefault(require("../hooks/useUpdate"));

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

var LoadingButton = function LoadingButton(_a) {
  var outerLoading = _a.loading,
      icon = _a.icon,
      className = _a.className,
      onDefaultClick = _a.onClick,
      _props = __rest(_a, ["loading", "icon", "className", "onClick"]);

  var _b = (0, _react.useState)(!!outerLoading),
      loading = _b[0],
      setLoading = _b[1];

  var onClick = (0, _react.useCallback)(function (event) {
    // 根据result 类型判断是否需要loading
    if (onDefaultClick) {
      var result = onDefaultClick(event);

      if (result['then']) {
        // promise
        setLoading(true);
      }

      if (result['finally']) {
        result['finally'](function () {
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    }
  }, [onDefaultClick]);
  (0, _useUpdate["default"])(function () {
    setLoading(!!outerLoading);
  }, [outerLoading]);
  return (0, _react.useMemo)(function () {
    return _react["default"].createElement(_button["default"], __assign({}, _props, {
      icon: icon,
      className: (0, _classnames["default"])(className, icon ? _btn["default"].btnWithoutAnim : ''),
      loading: loading,
      onClick: onClick
    }));
  }, [_props, loading, onDefaultClick, icon, className]);
};

var _default = LoadingButton;
exports["default"] = _default;