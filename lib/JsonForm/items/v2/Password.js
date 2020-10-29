"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/input/style/css");

var _input = _interopRequireDefault(require("antd/es/input"));

require("antd/es/form/style/css");

var _form = _interopRequireDefault(require("antd/es/form"));

var _react = _interopRequireWildcard(require("react"));

var _form2 = _interopRequireDefault(require("../../_form.less"));

var _icons = require("@ant-design/icons");

var _classnames = _interopRequireDefault(require("classnames"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var typeList = ['password@2'];

var FormPassword = function FormPassword(props) {
  var _a = props.className,
      className = _a === void 0 ? _form2["default"].formItem : _a,
      _onChange = props.onChange,
      labelClassName = props.labelClassName,
      form = props.form,
      childrenProps = props.childrenProps,
      labelCol = props.labelCol,
      formatter = props.formatter,
      defaultVisible = props.defaultVisible,
      formItemProps = __rest(props, ["className", "onChange", "labelClassName", "form", "childrenProps", "labelCol", "formatter", "defaultVisible"]);

  var eventProps = (0, _react.useMemo)(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
  }, []);

  var _b = (0, _react.useState)(defaultVisible),
      visible = _b[0],
      setVisible = _b[1];

  var iconRender = (0, _react.useMemo)(function () {
    return (childrenProps === null || childrenProps === void 0 ? void 0 : childrenProps.iconRender) || function (visible) {
      return visible ? /*#__PURE__*/_react["default"].createElement(_icons.EyeOutlined, null) : /*#__PURE__*/_react["default"].createElement(_icons.EyeInvisibleOutlined, null);
    };
  }, []);
  var suffix = (0, _react.useMemo)(function () {
    var icon = iconRender(visible);
    var iconProps = {
      onClick: function onClick() {
        setVisible(function (visible) {
          return !visible;
        });
      },
      className: _form2["default"].formPwdIcon,
      onMouseDown: function onMouseDown(e) {
        e.preventDefault();
      },
      onMouseUp: function onMouseUp(e) {
        e.preventDefault();
      }
    };
    return /*#__PURE__*/_react["default"].cloneElement( /*#__PURE__*/ /*#__PURE__*/_react["default"].isValidElement(icon) ? icon : /*#__PURE__*/_react["default"].createElement('span', null, icon), iconProps);
  }, [visible]);
  return (0, _react.useMemo)(function () {
    return /*#__PURE__*/_react["default"].createElement(_form["default"].Item, __assign({
      className: className,
      labelCol: __assign(__assign({}, labelCol), {
        className: (0, _classnames["default"])(labelCol === null || labelCol === void 0 ? void 0 : labelCol.className, labelClassName)
      })
    }, formItemProps), /*#__PURE__*/_react["default"].createElement(_input["default"], __assign({
      className: _form2["default"].formItemDefault
    }, childrenProps, eventProps, {
      suffix: suffix,
      type: visible ? 'text' : 'password'
    })));
  }, [childrenProps, visible]);
};

FormPassword.typeList = typeList;
var _default = FormPassword;
exports["default"] = _default;