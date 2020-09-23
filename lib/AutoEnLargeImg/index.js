"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/carousel/style/css");

var _carousel = _interopRequireDefault(require("antd/es/carousel"));

require("antd/es/popover/style/css");

var _popover = _interopRequireDefault(require("antd/es/popover"));

var _react = _interopRequireWildcard(require("react"));

var _LazyImage = _interopRequireDefault(require("../LazyImage"));

var _index = _interopRequireDefault(require("./_index.less"));

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

var AutoEnLargeImg = function AutoEnLargeImg(_a) {
  var _b = _a.className,
      className = _b === void 0 ? '' : _b,
      _c = _a.enLargeClassName,
      enLargeClassName = _c === void 0 ? '' : _c,
      src = _a.src,
      srcList = _a.srcList,
      children = _a.children,
      enlargeContent = _a.enlargeContent,
      props = __rest(_a, ["className", "enLargeClassName", "src", "srcList", "children", "enlargeContent"]);

  return (0, _react.useMemo)(function () {
    if (Array.isArray(srcList) && srcList.length > 0) {
      return _react["default"].createElement(_popover["default"], {
        placement: "right",
        content: function content() {
          return _react["default"].createElement("div", {
            style: {
              width: 240,
              height: 240
            }
          }, _react["default"].createElement(_carousel["default"], {
            style: {
              position: 'relative'
            }
          }, srcList.map(function (val) {
            return _react["default"].createElement("div", {
              key: val
            }, _react["default"].createElement("img", {
              src: val === null || val === void 0 ? void 0 : val.replace('150_150', '240_240'),
              alt: "",
              className: _index["default"].enlarge + " " + enLargeClassName
            }));
          })));
        },
        title: null,
        autoAdjustOverflow: true
      }, _react["default"].createElement(_LazyImage["default"], __assign({
        src: srcList[0],
        className: className,
        alt: ""
      }, props)));
    }

    return src || children ? _react["default"].createElement(_popover["default"], {
      placement: "right",
      content: src ? _react["default"].createElement("img", {
        src: src.replace('150_150', '240_240'),
        alt: "",
        className: _index["default"].enlarge + " " + enLargeClassName
      }) : enlargeContent,
      title: null,
      autoAdjustOverflow: true
    }, src ? _react["default"].createElement(_LazyImage["default"], __assign({
      src: src,
      className: className,
      alt: ""
    }, props)) : children) : null;
  }, [className, enLargeClassName, src]);
};

var _default = AutoEnLargeImg;
exports["default"] = _default;