"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/select/style/css");

var _select = _interopRequireDefault(require("antd/es/select"));

require("antd/es/form/style/css");

var _form = _interopRequireDefault(require("antd/es/form"));

require("antd/es/radio/style/css");

var _radio = _interopRequireDefault(require("antd/es/radio"));

var _react = _interopRequireWildcard(require("react"));

var _utils = require("../utils");

var _form2 = _interopRequireDefault(require("../_form.less"));

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

<<<<<<< HEAD
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

=======
>>>>>>> form_optimize
var typeList = ["select"];

var FormSelect = function FormSelect(props) {
  var name = props.name,
      label = props.label,
      _a = props.className,
      className = _a === void 0 ? _form2["default"].formItemDefault : _a,
      _b = props.formItemClassName,
      formItemClassName = _b === void 0 ? _form2["default"].formItem : _b,
      syncDefaultOption = props.syncDefaultOption,
      optionListDependence = props.optionListDependence,
      _onChange = props.onChange,
      labelClassName = props.labelClassName,
      form = props.form,
      optionList = props.optionList,
      rules = props.rules,
      mode = props.mode,
      maxTagCount = props.maxTagCount,
      placeholder = props.placeholder,
<<<<<<< HEAD
      _b = props.isShortcut,
      isShortcut = _b === void 0 ? false : _b,
      disabled = props.disabled,
      extraProps = __rest(props, ["name", "label", "className", "formItemClassName", "syncDefaultOption", "optionListDependence", "onChange", "labelClassName", "form", "optionList", "rules", "mode", "maxTagCount", "placeholder", "isShortcut", "disabled"]);
=======
      _c = props.isShortcut,
      isShortcut = _c === void 0 ? false : _c,
      disabled = props.disabled;
>>>>>>> form_optimize

  var _d = (0, _react.useState)(undefined),
      options = _d[0],
      setOptions = _d[1];

  var isFunction = typeof optionList === "function";
  (0, _react.useEffect)(function () {
    if (isFunction) {
      optionList().then(function (optionList) {
        setOptions(optionList);
      })["catch"](function () {
        setOptions([]);
      });
    }
  }, []);
  var getOptionList = (0, _react.useCallback)(function () {
    var _a;

    if (isFunction) {
      if (optionListDependence) {
        var name_1 = optionListDependence.name,
            dependenceKey = optionListDependence.key;
        var dependenceNameList = typeof name_1 === "string" ? [name_1] : name_1 || [];
        var parentItem = options;

        var _loop_1 = function _loop_1(i) {
          var dependenceName = dependenceNameList[i];
          var dependenceValue = form === null || form === void 0 ? void 0 : form.getFieldValue(dependenceName);
          var siblings = parentItem === null || parentItem === void 0 ? void 0 : parentItem.find(function (_a) {
            var value = _a.value;
            return value === dependenceValue;
          });
          parentItem = (_a = siblings === null || siblings === void 0 ? void 0 : siblings[dependenceKey]) !== null && _a !== void 0 ? _a : undefined;
        };

        for (var i = 0; i < dependenceNameList.length; i++) {
          _loop_1(i);
        }

        var loading = !options;
        var mergeList = parentItem || [];
        return {
          loading: loading,
          optionList: mergeList
        };
      } else {
        var loading = isFunction && !options;
        var mergeList = options || [];
        return {
          loading: loading,
          optionList: mergeList
        };
      }
    } else {
      return {
        loading: false,
        optionList: optionList || []
      };
    }
  }, [optionListDependence, optionList, options]);
  var eventProps = (0, _react.useMemo)(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
  }, []);
  var dropdownRender = (0, _react.useCallback)(function (menu) {
    var list = getOptionList().optionList;

    if (isShortcut) {
      return _react["default"].createElement("div", null, _react["default"].createElement(_radio["default"].Group, {
        style: {
          display: "flex",
          padding: "5px 0"
        },
        value: ""
      }, _react["default"].createElement(_radio["default"].Button, {
        value: "1",
        style: {
          flex: 1,
          textAlign: "center"
        },
        onClick: function onClick() {
          var _a;

          form.setFieldsValue((_a = {}, _a[name] = list.map(function (item) {
            return item.value;
          }), _a));
        }
      }, "\u5168\u9009"), _react["default"].createElement(_radio["default"].Button, {
        value: "0",
        style: {
          flex: 1,
          textAlign: "center"
        },
        onClick: function onClick() {
          var _a;

          form.setFieldsValue((_a = {}, _a[name] = [], _a));
        }
      }, "\u53D6\u6D88\u5168\u9009")), menu);
    }

    return menu;
  }, [isShortcut, getOptionList]);
  return (0, _react.useMemo)(function () {
    if (optionListDependence === void 0) {
      var _a = getOptionList(),
          loading = _a.loading,
          list = _a.optionList;

      return _react["default"].createElement(_form["default"].Item, {
        name: name,
        className: formItemClassName,
        label: _react["default"].createElement("span", {
          className: labelClassName
        }, label),
        rules: rules
      }, _react["default"].createElement(_select["default"], __assign({
        disabled: disabled,
        className: className,
        loading: loading,
        mode: mode,
        maxTagCount: maxTagCount
      }, eventProps, {
        placeholder: placeholder,
        dropdownRender: dropdownRender
      }, extraProps), syncDefaultOption ? _react["default"].createElement(_select["default"].Option, {
        value: syncDefaultOption.value
      }, syncDefaultOption.name) : null, list.map(function (item) {
        return _react["default"].createElement(_select["default"].Option, {
          key: item.value,
          value: item.value
        }, item.name);
      })));
    } else {
      return _react["default"].createElement(_form["default"].Item, {
        noStyle: true,
        shouldUpdate: function shouldUpdate(prevValues, currentValues) {
          var name = optionListDependence.name;
          var dependenceNameList = typeof name === "string" ? [name] : name || [];
          var updated = false;
          var i = 0;
          var length = dependenceNameList.length;

          while (!updated && i < length) {
            var dependenceName = dependenceNameList[i];
            updated = prevValues[dependenceName] !== currentValues[dependenceName];
            i++;
          }

          return updated;
        }
      }, function (_a) {
        var getFieldValue = _a.getFieldValue;

        var _b = getOptionList(),
            loading = _b.loading,
            list = _b.optionList;

        return _react["default"].createElement(_form["default"].Item, {
          name: name,
          className: formItemClassName,
          label: _react["default"].createElement("span", {
            className: labelClassName
          }, label),
          rules: rules
        }, _react["default"].createElement(_select["default"], __assign({
          disabled: disabled,
          className: className,
          loading: loading,
          mode: mode,
          maxTagCount: maxTagCount
        }, eventProps, {
          dropdownRender: dropdownRender
        }, extraProps), syncDefaultOption ? _react["default"].createElement(_select["default"].Option, {
          value: syncDefaultOption.value
        }, syncDefaultOption.name) : null, list.map(function (item) {
          return _react["default"].createElement(_select["default"].Option, {
            key: item.value,
            value: item.value
          }, item.name);
        })));
      });
    }
  }, [options, optionList, optionListDependence]);
};

FormSelect.typeList = typeList;

FormSelect.formatter = function (formatter) {
  // return formatter ? (formatter === 'number' ? transNumber : transNullValue) : transNullValue;
  switch (formatter) {
    case "number":
      return _utils.transNumber;

    case "joinStr":
      return _utils.transJoinStr;

    default:
      return _utils.transNullValue;
  }
};

var _default = FormSelect;
exports["default"] = _default;