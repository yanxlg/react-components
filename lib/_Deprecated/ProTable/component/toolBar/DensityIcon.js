"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/tooltip/style/css");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

require("antd/es/menu/style/css");

var _menu = _interopRequireDefault(require("antd/es/menu"));

require("antd/es/dropdown/style/css");

var _dropdown = _interopRequireDefault(require("antd/es/dropdown"));

var _react = _interopRequireWildcard(require("react"));

var _icons = require("@ant-design/icons");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DensityIcon = function DensityIcon(_a) {
  var tableSize = _a.tableSize,
      setTableSize = _a.setTableSize;
  return (0, _react.useMemo)(function () {
    return /*#__PURE__*/_react["default"].createElement(_dropdown["default"], {
      overlay: /*#__PURE__*/_react["default"].createElement(_menu["default"], {
        selectedKeys: [tableSize],
        onClick: function onClick(_a) {
          var key = _a.key;
          setTableSize(key);
        },
        style: {
          width: 80
        }
      }, /*#__PURE__*/_react["default"].createElement(_menu["default"].Item, {
        key: "large"
      }, "\u9ED8\u8BA4"), /*#__PURE__*/_react["default"].createElement(_menu["default"].Item, {
        key: "middle"
      }, "\u4E2D\u7B49"), /*#__PURE__*/_react["default"].createElement(_menu["default"].Item, {
        key: "small"
      }, "\u7D27\u51D1")),
      trigger: ['click']
    }, /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
      title: '表格密度'
    }, /*#__PURE__*/_react["default"].createElement(_icons.ColumnHeightOutlined, null)));
  }, [tableSize, setTableSize]);
};

var _default = DensityIcon;
exports["default"] = _default;