"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/cascader/style/css");

var _cascader = _interopRequireDefault(require("antd/es/cascader"));

require("antd/es/form/style/css");

var _form = _interopRequireDefault(require("antd/es/form"));

var _react = _interopRequireWildcard(require("react"));

var _form2 = _interopRequireDefault(require("../_form.less"));

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

var typeList = ['cascader'];

function _filter(inputValue, path, fieldNames) {
  return path.some(function (option) {
    return option[fieldNames ? fieldNames.label : 'label'].toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
  });
}

var FormCascader = function FormCascader(props) {
  var name = props.name,
      label = props.label,
      optionList = props.optionList,
      _a = props.className,
      className = _a === void 0 ? _form2["default"].formItemDefault : _a,
      _b = props.formItemClassName,
      formItemClassName = _b === void 0 ? _form2["default"].formItem : _b,
      _onChange = props.onChange,
      labelClassName = props.labelClassName,
      form = props.form,
      rules = props.rules,
      placeholder = props.placeholder,
      disabled = props.disabled,
      initialValue = props.initialValue,
      hide = props.hide,
      options = props.options,
      labelCol = props.labelCol,
      extraProps = __rest(props, ["name", "label", "optionList", "className", "formItemClassName", "onChange", "labelClassName", "form", "rules", "placeholder", "disabled", "initialValue", "hide", "options", "labelCol"]);

  var _c = (0, _react.useState)(undefined),
      list = _c[0],
      setList = _c[1];

  var isFunction = typeof optionList === 'function';
  (0, _react.useEffect)(function () {
    if (isFunction) {
      optionList().then(function (list) {
        setList(list);
      })["catch"](function () {
        setList([]);
      });
    }
  }, []);
  var eventProps = (0, _react.useMemo)(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
  }, []);
  return (0, _react.useMemo)(function () {
    return /*#__PURE__*/_react["default"].createElement(_form["default"].Item, {
      name: name,
      className: formItemClassName,
      // label={<span className={labelClassName}>{label}</span>}
      label: label,
      labelCol: __assign(__assign({}, labelCol), {
        className: (0, _classnames["default"])(labelCol === null || labelCol === void 0 ? void 0 : labelCol.className, labelClassName)
      }),
      rules: rules,
      initialValue: initialValue,
      style: hide ? {
        display: 'none'
      } : {}
    }, /*#__PURE__*/_react["default"].createElement(_cascader["default"], __assign({
      disabled: disabled,
      className: className,
      placeholder: placeholder,
      showSearch: {
        filter: function filter(inputValue, path) {
          return _filter(inputValue, path, extraProps.fieldNames);
        }
      }
    }, eventProps, extraProps, {
      options: options ? options : list
    })));
  }, [extraProps, disabled, hide, list]);
};

FormCascader.typeList = typeList;
var _default = FormCascader;
exports["default"] = _default;