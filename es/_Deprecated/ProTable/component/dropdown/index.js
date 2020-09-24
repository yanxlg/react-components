import "antd/es/button/style/css";
import _Button from "antd/es/button";
import "antd/es/dropdown/style/css";
import _Dropdown from "antd/es/dropdown";
import "antd/es/menu/style/css";
import _Menu from "antd/es/menu";
import React from 'react';
import classnames from 'classnames';
import { DownOutlined, EllipsisOutlined } from '@ant-design/icons';
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
  return /*#__PURE__*/React.createElement(ConfigConsumer, null, function (_a) {
    var getPrefixCls = _a.getPrefixCls;
    var tempClassName = getPrefixCls('pro-table-dropdown');
    var menu = /*#__PURE__*/React.createElement(_Menu, {
      onClick: function onClick(params) {
        return onSelect && onSelect(params.key);
      }
    }, menus.map(function (item) {
      return /*#__PURE__*/React.createElement(_Menu.Item, {
        key: item.key
      }, item.name);
    }));
    return /*#__PURE__*/React.createElement(_Dropdown, {
      overlay: menu,
      className: classnames(tempClassName, className)
    }, /*#__PURE__*/React.createElement(_Button, {
      style: style
    }, children, " ", /*#__PURE__*/React.createElement(DownOutlined, null)));
  });
};

var TableDropdown = function TableDropdown(_a) {
  var propsClassName = _a.className,
      style = _a.style,
      onSelect = _a.onSelect,
      _b = _a.menus,
      menus = _b === void 0 ? [] : _b;
  return /*#__PURE__*/React.createElement(ConfigConsumer, null, function (_a) {
    var getPrefixCls = _a.getPrefixCls;
    var className = getPrefixCls('pro-table-dropdown');
    var menu = /*#__PURE__*/React.createElement(_Menu, {
      onClick: function onClick(params) {
        return onSelect && onSelect(params.key);
      }
    }, menus.map(function (item) {
      return /*#__PURE__*/React.createElement(_Menu.Item, {
        key: item.key
      }, item.name);
    }));
    return /*#__PURE__*/React.createElement(_Dropdown, {
      overlay: menu,
      className: classnames(className, propsClassName)
    }, /*#__PURE__*/React.createElement("a", {
      style: style
    }, /*#__PURE__*/React.createElement(EllipsisOutlined, null)));
  });
};

TableDropdown.Button = DropdownButton;
export default TableDropdown;