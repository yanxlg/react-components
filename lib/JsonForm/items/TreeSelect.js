"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/tree-select/style/css");

var _treeSelect = _interopRequireDefault(require("antd/es/tree-select"));

require("antd/es/form/style/css");

var _form = _interopRequireDefault(require("antd/es/form"));

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

var typeList = ['treeSelect'];

var FormTreeSelect = function FormTreeSelect(props) {
  var _a;

  var form = props.form,
      label = props.label,
      rules = props.rules,
      name = props.name,
      labelClassName = props.labelClassName,
      optionListDependence = props.optionListDependence,
      optionList = props.optionList,
      _onChange = props.onChange,
      _b = props.className,
      className = _b === void 0 ? _form2["default"].formItemDefault : _b,
      _c = props.formItemClassName,
      formItemClassName = _c === void 0 ? _form2["default"].formItem : _c,
      _d = props.treeCheckable,
      treeCheckable = _d === void 0 ? true : _d,
      _e = props.treeDefaultExpandAll,
      treeDefaultExpandAll = _e === void 0 ? true : _e,
      _f = props.maxTagCount,
      maxTagCount = _f === void 0 ? 6 : _f,
      _g = props.treeNodeLabelProp,
      treeNodeLabelProp = _g === void 0 ? 'name' : _g,
      _h = props.dropdownClassName,
      dropdownClassName = _h === void 0 ? _form2["default"].customTreeSelect : _h,
      initialValue = props.initialValue,
      hide = props.hide,
      extraProps = __rest(props, ["form", "label", "rules", "name", "labelClassName", "optionListDependence", "optionList", "onChange", "className", "formItemClassName", "treeCheckable", "treeDefaultExpandAll", "maxTagCount", "treeNodeLabelProp", "dropdownClassName", "initialValue", "hide"]);

  var _j = (0, _react.useState)(undefined),
      options = _j[0],
      setOptions = _j[1];

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
  var eventProps = (0, _react.useMemo)(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
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
        var loading = isFunction && !options;
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
  var getTreeData = (0, _react.useCallback)(function (optionList) {
    if (optionList.length === 0) {
      return [];
    }

    return [{
      name: '全部',
      value: 'all',
      children: optionList.map(function (_a) {
        var name = _a.name,
            value = _a.value,
            disabled = _a.disabled;
        return {
          name: name,
          value: value,
          disabled: disabled
        };
      })
    }];
  }, []);
  var getFormItem = (0, _react.useCallback)(function () {
    var _a = getOptionList(),
        loading = _a.loading,
        list = _a.optionList;

    var treeData = getTreeData(list);
    return _react["default"].createElement(_form["default"].Item, {
      name: name,
      className: formItemClassName,
      label: _react["default"].createElement("span", {
        className: labelClassName
      }, label),
      rules: rules,
      initialValue: initialValue,
      style: hide ? {
        display: 'none'
      } : {}
    }, _react["default"].createElement(_treeSelect["default"], __assign({
      treeNodeLabelProp: "name",
      loading: loading,
      className: className,
      treeData: treeData,
      treeCheckable: treeCheckable,
      maxTagCount: maxTagCount,
      treeDefaultExpandAll: treeDefaultExpandAll,
      dropdownClassName: dropdownClassName
    }, eventProps, extraProps)));
  }, [options, optionList, getOptionList, hide, dvaOptions]);
  return (0, _react.useMemo)(function () {
    if (optionListDependence === void 0) {
      return getFormItem();
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
      }, function () {
        return getFormItem();
      });
    }
  }, [options, optionList, optionListDependence, getFormItem, hide, dvaOptions]);
};

FormTreeSelect.typeList = typeList;
var _default = FormTreeSelect;
exports["default"] = _default;