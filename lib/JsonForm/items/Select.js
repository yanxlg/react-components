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

var _form2 = _interopRequireDefault(require("../_form.less"));

var _reactRedux = require("react-redux");

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

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

var typeList = ['select'];

var FormSelect = function FormSelect(props) {
  var _a;

  var name = props.name,
      label = props.label,
      _b = props.className,
      className = _b === void 0 ? _form2["default"].formItemDefault : _b,
      _c = props.formItemClassName,
      formItemClassName = _c === void 0 ? _form2["default"].formItem : _c,
      syncDefaultOption = props.syncDefaultOption,
      optionListDependence = props.optionListDependence,
      _onChange = props.onChange,
      labelClassName = props.labelClassName,
      form = props.form,
      optionList = props.optionList,
      rules = props.rules,
      mode = props.mode,
      maxTagCount = props.maxTagCount,
      // placeholder,
  _d = props.isShortcut,
      // placeholder,
  isShortcut = _d === void 0 ? false : _d,
      disabled = props.disabled,
      colon = props.colon,
      initialValue = props.initialValue,
      hide = props.hide,
      extraProps = __rest(props, ["name", "label", "className", "formItemClassName", "syncDefaultOption", "optionListDependence", "onChange", "labelClassName", "form", "optionList", "rules", "mode", "maxTagCount", "isShortcut", "disabled", "colon", "initialValue", "hide"]);

  var _e = (0, _react.useState)(undefined),
      options = _e[0],
      setOptions = _e[1];

  var useDva = (optionList === null || optionList === void 0 ? void 0 : optionList['type']) === 'select';
  var dvaOptions = (0, _reactRedux.useSelector)(useDva ? optionList.selector : function () {
    return undefined;
  }, (_a = optionList) === null || _a === void 0 ? void 0 : _a.equalityFn);
  var isFunction = typeof optionList === 'function';
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
    if (isFunction) {
      if (optionListDependence) {
        var name_1 = optionListDependence.name,
            dependenceKey_1 = optionListDependence.key;
        var dependenceNameList = typeof name_1 === 'string' ? [name_1] : name_1 || [];
        var parentItem = options;

        var _loop_1 = function _loop_1(i) {
          var dependenceName = dependenceNameList[i]; // 兼容多选

          var dependenceValue = form === null || form === void 0 ? void 0 : form.getFieldValue(dependenceName);
          dependenceValue = Array.isArray(dependenceValue) ? dependenceValue : [dependenceValue];
          var siblings = parentItem === null || parentItem === void 0 ? void 0 : parentItem.filter(function (_a) {
            var value = _a.value;
            return dependenceValue.indexOf(value) > -1;
          });

          if (siblings) {
            var list_1 = [];
            siblings.forEach(function (item) {
              list_1 = __spreadArrays(list_1, item[dependenceKey_1] || []);
            });
            parentItem = list_1;
          } else {
            parentItem = [];
          }
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
        var loading = isFunction && !options; // dva 显示进度

        var mergeList = options || [];
        return {
          loading: loading,
          optionList: mergeList
        };
      }
    } else {
      if (useDva) {
        if (optionListDependence) {
          var name_2 = optionListDependence.name,
              dependenceKey_2 = optionListDependence.key;
          var dependenceNameList = typeof name_2 === 'string' ? [name_2] : name_2 || [];
          var parentItem = dvaOptions;

          var _loop_2 = function _loop_2(i) {
            var dependenceName = dependenceNameList[i]; // 兼容多选

            var dependenceValue = form === null || form === void 0 ? void 0 : form.getFieldValue(dependenceName);
            dependenceValue = Array.isArray(dependenceValue) ? dependenceValue : [dependenceValue];
            var siblings = parentItem === null || parentItem === void 0 ? void 0 : parentItem.filter(function (_a) {
              var value = _a.value;
              return dependenceValue.indexOf(value) > -1;
            });

            if (siblings) {
              var list_2 = [];
              siblings.forEach(function (item) {
                list_2 = __spreadArrays(list_2, item[dependenceKey_2] || []);
              });
              parentItem = list_2;
            } else {
              parentItem = [];
            }
          };

          for (var i = 0; i < dependenceNameList.length; i++) {
            _loop_2(i);
          }

          var loading = !dvaOptions; // dva 显示进度

          var mergeList = parentItem || [];
          return {
            loading: loading,
            optionList: mergeList
          };
        } else {
          var loading = !dvaOptions; // dva 显示进度

          var mergeList = dvaOptions || [];
          return {
            loading: loading,
            optionList: mergeList
          };
        }
      }

      return {
        loading: false,
        optionList: optionList || []
      };
    }
  }, [optionListDependence, optionList, options, dvaOptions]);
  var eventProps = (0, _react.useMemo)(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
  }, [_onChange]);
  var dropdownRender = (0, _react.useCallback)(function (menu) {
    var list = getOptionList().optionList;

    if (isShortcut && list.length) {
      return _react["default"].createElement("div", null, _react["default"].createElement(_radio["default"].Group, {
        style: {
          display: 'flex',
          padding: '5px 0'
        },
        value: ""
      }, _react["default"].createElement(_radio["default"].Button, {
        value: "1",
        style: {
          flex: 1,
          textAlign: 'center'
        },
        onClick: function onClick() {
          var _a;

          form.setFieldsValue((_a = {}, _a[name] = list.map(function (item) {
            return item.value;
          }), _a));
          _onChange && _onChange(name, form);
        }
      }, "\u5168\u9009"), _react["default"].createElement(_radio["default"].Button, {
        value: "0",
        style: {
          flex: 1,
          textAlign: 'center'
        },
        onClick: function onClick() {
          var _a;

          form.setFieldsValue((_a = {}, _a[name] = [], _a));
          _onChange && _onChange(name, form);
        }
      }, "\u53D6\u6D88\u5168\u9009")), menu);
    }

    return menu;
  }, [isShortcut, getOptionList, _onChange]);
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
        rules: rules,
        colon: colon,
        initialValue: initialValue,
        style: hide ? {
          display: 'none'
        } : {}
      }, _react["default"].createElement(_select["default"], __assign({
        disabled: disabled,
        className: className,
        loading: loading,
        mode: mode,
        maxTagCount: maxTagCount
      }, eventProps, {
        // placeholder={placeholder}
        dropdownRender: dropdownRender
      }, extraProps), syncDefaultOption ? _react["default"].createElement(_select["default"].Option, {
        value: syncDefaultOption.value,
        title: syncDefaultOption.name
      }, syncDefaultOption.name) : null, list.map(function (item) {
        return _react["default"].createElement(_select["default"].Option, {
          key: item.value,
          value: item.value,
          title: item.name,
          disabled: item.disabled
        }, item.name);
      })));
    } else {
      return _react["default"].createElement(_form["default"].Item, {
        noStyle: true,
        shouldUpdate: function shouldUpdate(prevValues, currentValues) {
          var name = optionListDependence.name;
          var dependenceNameList = typeof name === 'string' ? [name] : name || [];
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
          rules: rules,
          colon: colon,
          initialValue: initialValue,
          style: hide ? {
            display: 'none'
          } : {}
        }, _react["default"].createElement(_select["default"], __assign({
          disabled: disabled,
          className: className,
          loading: loading,
          mode: mode,
          maxTagCount: maxTagCount
        }, eventProps, {
          dropdownRender: dropdownRender
        }, extraProps), syncDefaultOption ? _react["default"].createElement(_select["default"].Option, {
          value: syncDefaultOption.value,
          title: syncDefaultOption.name
        }, syncDefaultOption.name) : null, list.map(function (item) {
          return _react["default"].createElement(_select["default"].Option, {
            key: item.value,
            value: item.value,
            title: item.name,
            disabled: item.disabled
          }, item.name);
        })));
      });
    }
  }, [options, optionList, optionListDependence, disabled, hide, dvaOptions]);
};

FormSelect.typeList = typeList;
var _default = FormSelect;
exports["default"] = _default;