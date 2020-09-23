"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _context = require("antd/lib/config-provider/context");

require("./index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 默认的 index 列容器，提供一个好看的 index
 * @param param0
 */
var IndexColumn = function IndexColumn(_a) {
  var _b = _a.border,
      border = _b === void 0 ? false : _b,
      children = _a.children;
  return _react["default"].createElement(_context.ConfigConsumer, null, function (_a) {
    var _b;

    var getPrefixCls = _a.getPrefixCls;
    var className = getPrefixCls('pro-table-index-column');
    return _react["default"].createElement("div", {
      className: (0, _classnames["default"])(className, (_b = {}, _b[className + "-border"] = border, _b['top-three'] = children > 2, _b))
    }, children);
  });
};

var _default = IndexColumn;
exports["default"] = _default;