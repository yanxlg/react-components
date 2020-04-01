"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _icons = require("@ant-design/icons");

var _antd = require("antd");

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
  return _react["default"].createElement(_context.ConfigConsumer, null, function (_a) {
    var getPrefixCls = _a.getPrefixCls;
    var tempClassName = getPrefixCls('pro-table-dropdown');

    var menu = _react["default"].createElement(_antd.Menu, {
      onClick: function onClick(params) {
        return onSelect && onSelect(params.key);
      }
    }, menus.map(function (item) {
      return _react["default"].createElement(_antd.Menu.Item, {
        key: item.key
      }, item.name);
    }));

    return _react["default"].createElement(_antd.Dropdown, {
      overlay: menu,
      className: (0, _classnames["default"])(tempClassName, className)
    }, _react["default"].createElement(_antd.Button, {
      style: style
    }, children, " ", _react["default"].createElement(_icons.DownOutlined, null)));
  });
};

var TableDropdown = function TableDropdown(_a) {
  var propsClassName = _a.className,
      style = _a.style,
      onSelect = _a.onSelect,
      _b = _a.menus,
      menus = _b === void 0 ? [] : _b;
  return _react["default"].createElement(_context.ConfigConsumer, null, function (_a) {
    var getPrefixCls = _a.getPrefixCls;
    var className = getPrefixCls('pro-table-dropdown');

    var menu = _react["default"].createElement(_antd.Menu, {
      onClick: function onClick(params) {
        return onSelect && onSelect(params.key);
      }
    }, menus.map(function (item) {
      return _react["default"].createElement(_antd.Menu.Item, {
        key: item.key
      }, item.name);
    }));

    return _react["default"].createElement(_antd.Dropdown, {
      overlay: menu,
      className: (0, _classnames["default"])(className, propsClassName)
    }, _react["default"].createElement("a", {
      style: style
    }, _react["default"].createElement(_icons.EllipsisOutlined, null)));
  });
};

TableDropdown.Button = DropdownButton;
var _default = TableDropdown;
exports["default"] = _default;