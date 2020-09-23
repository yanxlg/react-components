"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/badge/style/css");

var _badge = _interopRequireDefault(require("antd/es/badge"));

var _react = _interopRequireDefault(require("react"));

require("./index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 快捷操作，用于快速的展示一个状态
 */
var Status = {
  Success: function Success(_a) {
    var children = _a.children;
    return _react["default"].createElement(_badge["default"], {
      status: "success",
      text: children
    });
  },
  Error: function Error(_a) {
    var children = _a.children;
    return _react["default"].createElement(_badge["default"], {
      status: "error",
      text: children
    });
  },
  Default: function Default(_a) {
    var children = _a.children;
    return _react["default"].createElement(_badge["default"], {
      status: "default",
      text: children
    });
  },
  Processing: function Processing(_a) {
    var children = _a.children;
    return _react["default"].createElement(_badge["default"], {
      status: "processing",
      text: children
    });
  },
  Warning: function Warning(_a) {
    var children = _a.children;
    return _react["default"].createElement(_badge["default"], {
      status: "warning",
      text: children
    });
  }
};
var _default = Status;
exports["default"] = _default;