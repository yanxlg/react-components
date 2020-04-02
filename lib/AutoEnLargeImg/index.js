"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/popover/style/css");

var _popover = _interopRequireDefault(require("antd/es/popover"));

var _react = _interopRequireWildcard(require("react"));

var _index = _interopRequireDefault(require("./_index.less"));

var _LazyImage = _interopRequireDefault(require("../LazyImage"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AutoEnLargeImg = function AutoEnLargeImg(_a) {
  var _b = _a.className,
      className = _b === void 0 ? '' : _b,
      _c = _a.enLargeClassName,
      enLargeClassName = _c === void 0 ? '' : _c,
      src = _a.src,
      children = _a.children,
      enlargeContent = _a.enlargeContent,
      scrollContainer = _a.scrollContainer;
  return (0, _react.useMemo)(function () {
    return src || children ? _react["default"].createElement(_popover["default"], {
      placement: "right",
      content: src ? _react["default"].createElement("img", {
        src: src.replace('150_150', '240_240'),
        alt: "",
        className: _index["default"].enlarge + " " + enLargeClassName
      }) : enlargeContent,
      title: null,
      autoAdjustOverflow: true
    }, src ? _react["default"].createElement(_LazyImage["default"], {
      src: src,
      className: className,
      alt: "",
      scrollContainer: scrollContainer
    }) : // <img src={src} className={className} alt="" />
    children) : null;
  }, [className, enLargeClassName, src]);
};

var _default = AutoEnLargeImg;
exports["default"] = _default;