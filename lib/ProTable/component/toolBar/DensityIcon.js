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

var DensityIcon = function DensityIcon(_a, ref) {
  var tableSize = _a.tableSize,
      setTableSize = _a.setTableSize;
  return (0, _react.useMemo)(function () {
    return _react["default"].createElement(_antd.Dropdown, {
      ref: ref,
      overlay: _react["default"].createElement(_antd.Menu, {
        selectedKeys: [tableSize],
        onClick: function onClick(_a) {
          var key = _a.key;
          setTableSize(key);
        },
        style: {
          width: 80
        }
      }, _react["default"].createElement(_antd.Menu.Item, {
        key: "large"
      }, "\u9ED8\u8BA4"), _react["default"].createElement(_antd.Menu.Item, {
        key: "middle"
      }, "\u4E2D\u7B49"), _react["default"].createElement(_antd.Menu.Item, {
        key: "small"
      }, "\u7D27\u51D1")),
      trigger: ['click']
    }, _react["default"].createElement(_antd.Tooltip, {
      title: '表格密度'
    }, _react["default"].createElement(_icons.ColumnHeightOutlined, null)));
  }, [tableSize, setTableSize]);
};

var _default = _react["default"].forwardRef(DensityIcon);

exports["default"] = _default;