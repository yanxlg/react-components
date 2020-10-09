"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/button/style/css");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/dropdown/style/css");

var _dropdown = _interopRequireDefault(require("antd/es/dropdown"));

require("antd/es/menu/style/css");

var _menu = _interopRequireDefault(require("antd/es/menu"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _icons = require("@ant-design/icons");

var _context = require("antd/lib/config-provider/context");

require("./index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 默认的 index 列容器，提供一个好看的 index
 * @param param0
 */
var DropdownButton = function DropdownButton(_a) {
  var children = _a.children,
      _b = _a.menus,
      menus = _b === void 0 ? [] : _b,
      onSelect = _a.onSelect,
      className = _a.className,
      style = _a.style;
  return /*#__PURE__*/_react["default"].createElement(_context.ConfigConsumer, null, function (_a) {
    var getPrefixCls = _a.getPrefixCls;
    var tempClassName = getPrefixCls('pro-table-dropdown');

    var menu = /*#__PURE__*/_react["default"].createElement(_menu["default"], {
      onClick: function onClick(params) {
        return onSelect && onSelect(params.key);
      }
    }, menus.map(function (item) {
      return /*#__PURE__*/_react["default"].createElement(_menu["default"].Item, {
        key: item.key
      }, item.name);
    }));

    return /*#__PURE__*/_react["default"].createElement(_dropdown["default"], {
      overlay: menu,
      className: (0, _classnames["default"])(tempClassName, className)
    }, /*#__PURE__*/_react["default"].createElement(_button["default"], {
      style: style
    }, children, " ", /*#__PURE__*/_react["default"].createElement(_icons.DownOutlined, null)));
  });
};

var TableDropdown = function TableDropdown(_a) {
  var propsClassName = _a.className,
      style = _a.style,
      onSelect = _a.onSelect,
      _b = _a.menus,
      menus = _b === void 0 ? [] : _b;
  return /*#__PURE__*/_react["default"].createElement(_context.ConfigConsumer, null, function (_a) {
    var getPrefixCls = _a.getPrefixCls;
    var className = getPrefixCls('pro-table-dropdown');

    var menu = /*#__PURE__*/_react["default"].createElement(_menu["default"], {
      onClick: function onClick(params) {
        return onSelect && onSelect(params.key);
      }
    }, menus.map(function (item) {
      return /*#__PURE__*/_react["default"].createElement(_menu["default"].Item, {
        key: item.key
      }, item.name);
    }));

    return /*#__PURE__*/_react["default"].createElement(_dropdown["default"], {
      overlay: menu,
      className: (0, _classnames["default"])(className, propsClassName)
    }, /*#__PURE__*/_react["default"].createElement("a", {
      style: style
    }, /*#__PURE__*/_react["default"].createElement(_icons.EllipsisOutlined, null)));
  });
};

TableDropdown.Button = DropdownButton;
var _default = TableDropdown;
exports["default"] = _default;