import React from 'react';
import classnames from 'classnames';
import { ConfigConsumer } from "antd/es/config-provider/context";
import './index.less';
/**
 * 默认的 index 列容器，提供一个好看的 index
 * @param param0
 */

var IndexColumn = function IndexColumn(_a) {
  var _b = _a.border,
      border = _b === void 0 ? false : _b,
      children = _a.children;
  return /*#__PURE__*/React.createElement(ConfigConsumer, null, function (_a) {
    var _b;

    var getPrefixCls = _a.getPrefixCls;
    var className = getPrefixCls('pro-table-index-column');
    return /*#__PURE__*/React.createElement("div", {
      className: classnames(className, (_b = {}, _b[className + "-border"] = border, _b['top-three'] = children > 2, _b))
    }, children);
  });
};

export default IndexColumn;