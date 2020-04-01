"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _icons = require("@ant-design/icons");

var _antd = require("antd");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var FullScreenIcon = function FullScreenIcon() {
  var _a = (0, _react.useState)(false),
      fullscreen = _a[0],
      setFullscreen = _a[1];

  (0, _react.useEffect)(function () {
    document.onfullscreenchange = function () {
      setFullscreen(!!document.fullscreenElement);
    };
  }, []);
  return (0, _react.useMemo)(function () {
    return fullscreen ? _react["default"].createElement(_antd.Tooltip, {
      title: '退出全屏'
    }, _react["default"].createElement(_icons.FullscreenExitOutlined, null)) : _react["default"].createElement(_antd.Tooltip, {
      title: '全屏'
    }, _react["default"].createElement(_icons.FullscreenOutlined, null));
  }, [fullscreen]);
};

var _default = FullScreenIcon;
exports["default"] = _default;