"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/skeleton/style/css");

var _skeleton = _interopRequireDefault(require("antd/es/skeleton"));

var _react = _interopRequireWildcard(require("react"));

var _reactLazyload = _interopRequireDefault(require("react-lazyload"));

var _classnames = _interopRequireDefault(require("classnames"));

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

var LazyImage = function LazyImage(_a, ref) {
  var _b = _a.scrollContainer,
      scrollContainer = _b === void 0 ? '.ant-table-body' : _b,
      className = _a.className,
      props = __rest(_a, ["scrollContainer", "className"]);

  return _react["default"].createElement(_reactLazyload["default"], {
    scrollContainer: scrollContainer,
    offset: 100,
    throttle: true,
    placeholder: _react["default"].createElement(_skeleton["default"].Input, {
      active: true,
      className: (0, _classnames["default"])(className, "inline-block")
    })
  }, _react["default"].createElement("img", __assign({}, props, {
    className: className
  })));
};

var _default = (0, _react.forwardRef)(LazyImage);

exports["default"] = _default;