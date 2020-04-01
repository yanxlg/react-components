import React from 'react';
import { Badge } from 'antd';
import './index.less';
/**
 * 快捷操作，用于快速的展示一个状态
 */

var Status = {
  Success: function Success(_a) {
    var children = _a.children;
    return React.createElement(Badge, {
      status: "success",
      text: children
    });
  },
  Error: function Error(_a) {
    var children = _a.children;
    return React.createElement(Badge, {
      status: "error",
      text: children
    });
  },
  Default: function Default(_a) {
    var children = _a.children;
    return React.createElement(Badge, {
      status: "default",
      text: children
    });
  },
  Processing: function Processing(_a) {
    var children = _a.children;
    return React.createElement(Badge, {
      status: "processing",
      text: children
    });
  },
  Warning: function Warning(_a) {
    var children = _a.children;
    return React.createElement(Badge, {
      status: "warning",
      text: children
    });
  }
};
export default Status;