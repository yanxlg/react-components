"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/alert/style/css");

var _alert = _interopRequireDefault(require("antd/es/alert"));

var _react = _interopRequireWildcard(require("react"));

var _context = require("antd/lib/config-provider/context");

require("./index.less");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var defaultAlertOptionRender = function defaultAlertOptionRender(props) {
  var onCleanSelected = props.onCleanSelected;
  return [_react["default"].createElement("a", {
    onClick: onCleanSelected,
    key: "0"
  }, "\u6E05\u7A7A")];
};

var TableAlert = function TableAlert(_a, ref) {
  var _b = _a.selectedRowKeys,
      selectedRowKeys = _b === void 0 ? [] : _b,
      onCleanSelected = _a.onCleanSelected,
      _c = _a.alertInfoRender,
      alertInfoRender = _c === void 0 ? function () {
    return _react["default"].createElement("span", null, "\u5DF2\u9009\u62E9 ", _react["default"].createElement("a", {
      style: {
        fontWeight: 600
      }
    }, selectedRowKeys.length), " \u9879\xA0\xA0");
  } : _c,
      _d = _a.alertOptionRender,
      alertOptionRender = _d === void 0 ? defaultAlertOptionRender : _d;

  var _e = (0, _react.useState)([]),
      innerSelectedRowKeys = _e[0],
      setInnerSelectedRowKeys = _e[1];

  var _selectedRowKeys = selectedRowKeys !== void 0 ? selectedRowKeys : innerSelectedRowKeys;

  (0, _react.useImperativeHandle)(ref, function () {
    return {
      updateSelectedState: function updateSelectedState(selectedRowKeys) {
        setInnerSelectedRowKeys(selectedRowKeys);
      }
    };
  }, []);
  var option = alertOptionRender && alertOptionRender({
    onCleanSelected: onCleanSelected
  });
  return (0, _react.useMemo)(function () {
    return _react["default"].createElement(_context.ConfigConsumer, null, function (_a) {
      var getPrefixCls = _a.getPrefixCls;
      var className = getPrefixCls('pro-table-alert');

      if (alertInfoRender === false) {
        return null;
      }

      var dom = alertInfoRender(_selectedRowKeys);

      if (dom === false) {
        return null;
      }

      return _react["default"].createElement("div", {
        className: className
      }, _react["default"].createElement(_alert["default"], {
        message: _react["default"].createElement("div", {
          className: className + "-info"
        }, _react["default"].createElement("div", {
          className: className + "-info-content"
        }, dom), option && _react["default"].createElement("div", {
          className: className + "-info-option"
        }, option)),
        type: "info",
        showIcon: true
      }));
    });
  }, [_selectedRowKeys]);
};

var _default = (0, _react.forwardRef)(TableAlert);

exports["default"] = _default;