import React from 'react';
import classnames from 'classnames';
import { DownOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Button } from 'antd';
import { ConfigConsumer } from "antd/es/config-provider/context";
import './index.less';
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
  return React.createElement(ConfigConsumer, null, function (_a) {
    var getPrefixCls = _a.getPrefixCls;
    var tempClassName = getPrefixCls('pro-table-dropdown');
    var menu = React.createElement(Menu, {
      onClick: function onClick(params) {
        return onSelect && onSelect(params.key);
      }
    }, menus.map(function (item) {
      return React.createElement(Menu.Item, {
        key: item.key
      }, item.name);
    }));
    return React.createElement(Dropdown, {
      overlay: menu,
      className: classnames(tempClassName, className)
    }, React.createElement(Button, {
      style: style
    }, children, " ", React.createElement(DownOutlined, null)));
  });
};

var TableDropdown = function TableDropdown(_a) {
  var propsClassName = _a.className,
      style = _a.style,
      onSelect = _a.onSelect,
      _b = _a.menus,
      menus = _b === void 0 ? [] : _b;
  return React.createElement(ConfigConsumer, null, function (_a) {
    var getPrefixCls = _a.getPrefixCls;
    var className = getPrefixCls('pro-table-dropdown');
    var menu = React.createElement(Menu, {
      onClick: function onClick(params) {
        return onSelect && onSelect(params.key);
      }
    }, menus.map(function (item) {
      return React.createElement(Menu.Item, {
        key: item.key
      }, item.name);
    }));
    return React.createElement(Dropdown, {
      overlay: menu,
      className: classnames(className, propsClassName)
    }, React.createElement("a", {
      style: style
    }, React.createElement(EllipsisOutlined, null)));
  });
};

TableDropdown.Button = DropdownButton;
export default TableDropdown;