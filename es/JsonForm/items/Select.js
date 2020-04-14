import "antd/es/select/style/css";
import _Select from "antd/es/select";
import "antd/es/form/style/css";
import _Form from "antd/es/form";
import "antd/es/radio/style/css";
import _Radio from "antd/es/radio";

var __assign = this && this.__assign || function () {
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

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import formStyles from '../_form.less';
var typeList = ['select'];

var FormSelect = function FormSelect(props) {
  var name = props.name,
      label = props.label,
      _a = props.className,
      className = _a === void 0 ? formStyles.formItemDefault : _a,
      _b = props.formItemClassName,
      formItemClassName = _b === void 0 ? formStyles.formItem : _b,
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
      _c = props.isShortcut,
      isShortcut = _c === void 0 ? false : _c,
      disabled = props.disabled,
      extraProps = __rest(props, ["name", "label", "className", "formItemClassName", "syncDefaultOption", "optionListDependence", "onChange", "labelClassName", "form", "optionList", "rules", "mode", "maxTagCount", "placeholder", "isShortcut", "disabled"]);

  var _d = useState(undefined),
      options = _d[0],
      setOptions = _d[1];

  var isFunction = typeof optionList === 'function';
  useEffect(function () {
    if (isFunction) {
      optionList().then(function (optionList) {
        setOptions(optionList);
      })["catch"](function () {
        setOptions([]);
      });
    }
  }, []);
  var getOptionList = useCallback(function () {
    var _a;

    if (isFunction) {
      if (optionListDependence) {
        var name_1 = optionListDependence.name,
            dependenceKey = optionListDependence.key;
        var dependenceNameList = typeof name_1 === 'string' ? [name_1] : name_1 || [];
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
  var eventProps = useMemo(function () {
    return _onChange ? {
      onChange: function onChange() {
        _onChange(name, form);
      }
    } : {};
  }, []);
  var dropdownRender = useCallback(function (menu) {
    var list = getOptionList().optionList;

    if (isShortcut) {
      return React.createElement("div", null, React.createElement(_Radio.Group, {
        style: {
          display: 'flex',
          padding: '5px 0'
        },
        value: ""
      }, React.createElement(_Radio.Button, {
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
        }
      }, "\u5168\u9009"), React.createElement(_Radio.Button, {
        value: "0",
        style: {
          flex: 1,
          textAlign: 'center'
        },
        onClick: function onClick() {
          var _a;

          form.setFieldsValue((_a = {}, _a[name] = [], _a));
        }
      }, "\u53D6\u6D88\u5168\u9009")), menu);
    }

    return menu;
  }, [isShortcut, getOptionList]);
  return useMemo(function () {
    if (optionListDependence === void 0) {
      var _a = getOptionList(),
          loading = _a.loading,
          list = _a.optionList;

      return React.createElement(_Form.Item, {
        name: name,
        className: formItemClassName,
        label: React.createElement("span", {
          className: labelClassName
        }, label),
        rules: rules
      }, React.createElement(_Select, __assign({
        disabled: disabled,
        className: className,
        loading: loading,
        mode: mode,
        maxTagCount: maxTagCount
      }, eventProps, {
        placeholder: placeholder,
        dropdownRender: dropdownRender
      }, extraProps), syncDefaultOption ? React.createElement(_Select.Option, {
        value: syncDefaultOption.value
      }, syncDefaultOption.name) : null, list.map(function (item) {
        return React.createElement(_Select.Option, {
          key: item.value,
          value: item.value
        }, item.name);
      })));
    } else {
      return React.createElement(_Form.Item, {
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

        return React.createElement(_Form.Item, {
          name: name,
          className: formItemClassName,
          label: React.createElement("span", {
            className: labelClassName
          }, label),
          rules: rules
        }, React.createElement(_Select, __assign({
          disabled: disabled,
          className: className,
          loading: loading,
          mode: mode,
          maxTagCount: maxTagCount
        }, eventProps, {
          dropdownRender: dropdownRender
        }, extraProps), syncDefaultOption ? React.createElement(_Select.Option, {
          value: syncDefaultOption.value
        }, syncDefaultOption.name) : null, list.map(function (item) {
          return React.createElement(_Select.Option, {
            key: item.value,
            value: item.value
          }, item.name);
        })));
      });
    }
  }, [options, optionList, optionListDependence]);
};

FormSelect.typeList = typeList;
export default FormSelect;